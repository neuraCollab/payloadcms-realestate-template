import React from 'react'
import { getPayload, type TypedLocale } from 'payload'
import configPromise from '@payload-config'
import { MapNearbyClient } from './MapNearbyClient'
import type { PropertyMapItem } from '@/components/PropertyMap'

// SSR-обёртка: собирает до 30 активных квартир с координатами и
// отдаёт их в клиентский остров, который показывает карту и кнопку
// «Показать объекты рядом» с запросом геолокации только по клику
// (бриф п.5).
export const MapNearby = async ({ locale }: { locale: string }) => {
  const payload = await getPayload({ config: configPromise })
  let items: PropertyMapItem[] = []
  try {
    const res = await payload.find({
      collection: 'flats',
      where: { status: { equals: 'active' } },
      sort: '-createdAt',
      limit: 30,
      depth: 1,
      pagination: false,
      locale: locale as TypedLocale,
    })
    items = (res.docs as any[])
      .map((d) => ({
        id: String(d.id),
        title: d.title,
        price: typeof d.price === 'number' ? d.price : undefined,
        address: d.location?.address ?? d.location?.city,
        lat: d.coordinates?.lat,
        lng: d.coordinates?.lng,
        slug: d.slug,
      }))
      .filter(
        (m): m is PropertyMapItem =>
          typeof m.lat === 'number' && typeof m.lng === 'number',
      )
  } catch {
    items = []
  }

  return <MapNearbyClient items={items} />
}

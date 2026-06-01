'use client'
import React, { useEffect, useMemo, useState } from 'react'
import type { Page, Properties as PropertyType } from '@/payload-types'
import { PropertyMap, type PropertyMapItem } from '@/components/PropertyMap.tsx'

type MapBlockProps = Extract<Page['layout'][0], { blockType: 'map' }>

async function fetchProperties(limit: number): Promise<PropertyType[]> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL
  const url = `${base}/api/properties?limit=${limit}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return []
  const json = await res.json()
  return json?.docs || []
}

export const MapBlock: React.FC<MapBlockProps & { disableInnerContainer?: boolean }> = (
  props,
) => {
  const { title, center, properties, autoLoad, limit = 20 } = props
  const officeMarker = (props as any).officeMarker as
    | { label?: string; address?: string }
    | undefined
  const officeMode = Boolean(officeMarker?.label)
  const [items, setItems] = useState<PropertyType[]>(
    Array.isArray(properties) ? (properties as unknown as PropertyType[]) : [],
  )

  useEffect(() => {
    if (officeMode) return
    if (
      (!properties || (Array.isArray(properties) && properties.length === 0)) &&
      autoLoad
    ) {
      fetchProperties(limit).then((docs) => setItems(docs))
    }
  }, [autoLoad, limit, properties, officeMode])

  const computedCenter = useMemo(() => {
    if (center?.lat && center?.lng)
      return {
        lat: center.lat as number,
        lng: center.lng as number,
        zoom: Number(center.zoom || 12),
      }
    return undefined
  }, [center])

  const mapItems: PropertyMapItem[] = useMemo(() => {
    if (officeMode && computedCenter) {
      return [
        {
          id: 'office',
          title: officeMarker?.label ?? 'Наш офис',
          address: officeMarker?.address,
          slug: '',
          lat: computedCenter.lat,
          lng: computedCenter.lng,
        },
      ]
    }
    return items
      .map((p) => ({
        id: String((p as any).id),
        title: (p as any).title,
        price: (p as any).price,
        address: (p as any).address,
        lat: (p as any)?.coordinates?.lat,
        lng: (p as any)?.coordinates?.lng,
        slug: (p as any).slug,
      }))
      .filter(
        (m): m is PropertyMapItem =>
          typeof m.lat === 'number' && typeof m.lng === 'number',
      )
  }, [items, officeMode, computedCenter, officeMarker])

  return (
    <PropertyMap
      title={title || undefined}
      items={mapItems}
      baseUrl="/properties"
      center={computedCenter}
      className="container mx-auto"
    />
  )
}

"use client"
import React, { useEffect, useMemo, useState } from 'react'
import type { Page, Properties as PropertyType } from '@/payload-types'
import dynamic from 'next/dynamic'

// Dynamically import react-leaflet to avoid SSR issues
const MapContainer = dynamic(async () => (await import('react-leaflet')).MapContainer, { ssr: false })
const TileLayer = dynamic(async () => (await import('react-leaflet')).TileLayer, { ssr: false })
const Marker = dynamic(async () => (await import('react-leaflet')).Marker, { ssr: false })
const Popup = dynamic(async () => (await import('react-leaflet')).Popup, { ssr: false })

type MapBlockProps = Extract<Page['layout'][0], { blockType: 'map' }>

async function fetchProperties(limit: number): Promise<PropertyType[]> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL
  const url = `${base}/api/properties?limit=${limit}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return []
  const json = await res.json()
  return json?.docs || []
}

export const MapBlock: React.FC<MapBlockProps & { disableInnerContainer?: boolean }> = (props) => {
  const { title, center, properties, autoLoad, limit = 20 } = props
  const [items, setItems] = useState<PropertyType[]>(Array.isArray(properties) ? (properties as unknown as PropertyType[]) : [])

  useEffect(() => {
    if ((!properties || (Array.isArray(properties) && properties.length === 0)) && autoLoad) {
      fetchProperties(limit).then((docs) => setItems(docs))
    }
  }, [autoLoad, limit, properties])

  const defaultCenter = useMemo(() => {
    if (center?.lat && center?.lng) return { lat: center.lat as number, lng: center.lng as number, zoom: Number(center.zoom || 12) }
    // Moscow fallback
    return { lat: 55.751244, lng: 37.618423, zoom: 11 }
  }, [center])

  const markers = useMemo(() => {
    return items
      .map((p) => ({
        id: (p as any).id,
        title: (p as any).title,
        price: (p as any).price,
        address: (p as any).address,
        lat: (p as any)?.coordinates?.lat,
        lng: (p as any)?.coordinates?.lng,
        slug: (p as any).slug,
      }))
      .filter((m) => typeof m.lat === 'number' && typeof m.lng === 'number')
  }, [items])

  return (
    <section className="container mx-auto px-4">
      {title ? <h2 className="text-2xl font-semibold mb-4">{title}</h2> : null}
      <div className="h-[420px] w-full rounded-xl overflow-hidden border border-base-300">
        {/* @ts-expect-error dynamic import types */}
        <MapContainer center={[defaultCenter.lat, defaultCenter.lng]} zoom={defaultCenter.zoom} style={{ height: '100%', width: '100%' }}>
          {/* @ts-expect-error dynamic import types */}
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((m) => (
            // @ts-expect-error dynamic import types
            <Marker key={m.id} position={[m.lat, m.lng]}>
              {/* @ts-expect-error dynamic import types */}
              <Popup>
                <div className="space-y-1">
                  <div className="font-medium">{m.title}</div>
                  {m.price ? <div className="text-sm opacity-80">{m.price.toLocaleString()} ₽</div> : null}
                  {m.address ? <div className="text-xs opacity-70">{m.address}</div> : null}
                  {m.slug ? (
                    <a className="btn btn-sm btn-primary mt-2" href={`/properties/${m.slug}`}>
                      Подробнее
                    </a>
                  ) : null}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  )
}



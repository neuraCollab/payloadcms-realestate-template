// src/components/PropertyMap.tsx
'use client'

import React, { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'

// Configure Leaflet default icons on the client only — top-level import
// breaks SSR because `leaflet` accesses `window` at module load.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require('leaflet')
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

export interface PropertyMapItem {
  id: string
  title: string
  price?: number
  address?: string
  lat: number
  lng: number
  slug: string
}

interface PropertyMapProps {
  title?: string
  items: PropertyMapItem[]
  baseUrl: string
  center?: {
    lat?: number
    lng?: number
    zoom?: number
  }
  className?: string
  /** Tailwind/CSS-friendly height for the map area. Default 420px. */
  height?: string
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  title,
  items = [],
  baseUrl,
  center,
  className = '',
  height = '420px',
}) => {
  const defaultCenter = useMemo(() => {
    if (center?.lat && center?.lng) {
      return { lat: center.lat, lng: center.lng, zoom: center.zoom ?? 12 }
    }
    if (items.length > 0) {
      return { lat: items[0].lat, lng: items[0].lng, zoom: 13 }
    }
    return { lat: 55.751244, lng: 37.618423, zoom: 11 } // Moscow fallback
  }, [center, items])

  if (items.length === 0) return null

  return (
    <section className={`mx-auto px-4 ${className}`}>
      {title ? <h2 className="text-2xl font-semibold mb-4">{title}</h2> : null}
      <div
        className="w-full rounded-xl overflow-hidden border border-base-300"
        style={{ height }}
      >
        <MapContainer
          center={[defaultCenter.lat, defaultCenter.lng]}
          zoom={defaultCenter.zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          {/* OpenStreetMap */}
          <TileLayer
            attribution='Данные © <a href="https://2gis.ru">2GIS</a>'
  url="https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1"
          />
          {items.map((item) => (
            <Marker key={item.id} position={[item.lat, item.lng]}>
              <Popup>
                <div className="space-y-1 max-w-[200px]">
                  <div className="font-medium">{item.title}</div>
                  {item.price !== undefined && (
                    <div className="text-sm opacity-80">{item.price.toLocaleString()} ₽</div>
                  )}
                  {item.address && (
                    <div className="text-xs opacity-70">{item.address}</div>
                  )}
                  <a
                    href={`${baseUrl}/${item.slug}`}
                    className="mt-2 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Подробнее
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  )
}
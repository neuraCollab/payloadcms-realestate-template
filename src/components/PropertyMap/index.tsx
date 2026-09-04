// src/components/PropertyMap.tsx
'use client'

import React from 'react'
import { Map as MapIcon } from 'lucide-react'
import type { Map as MapboxMap, Marker, Popup } from 'mapbox-gl'
import { MyLocationButton } from '@/components/MyLocationButton'
import { formatPrice } from '@/utilities/formatPrice'


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
  /** Only needed if any item has a real `slug` to link to. */
  baseUrl?: string
  center?: {
    lat?: number
    lng?: number
    zoom?: number
  }
  className?: string
  /** Tailwind/CSS-friendly height for the map area. Default 420px. */
  height?: string
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
const STYLE_URL =
  process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? 'mapbox://styles/mapbox/streets-v12'


const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Mapbox-backed property map. Renders a marker per item with a popup
 * containing title, price, address and a "Подробнее" link. Falls back to
 * a placeholder card when NEXT_PUBLIC_MAPBOX_TOKEN is missing.
 */
export const PropertyMap: React.FC<PropertyMapProps> = ({
  title,
  items = [],
  baseUrl,
  center,
  className = '',
  height = '420px',
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mapRef = React.useRef<MapboxMap | null>(null)
  const markersRef = React.useRef<Marker[]>([])

  const computedCenter = React.useMemo(() => {
    if (center?.lat && center?.lng) {
      return { lat: center.lat, lng: center.lng, zoom: center.zoom ?? 12 }
    }
    if (items.length > 0) {
      // Centroid of items.
      const sum = items.reduce(
        (acc, it) => ({ lat: acc.lat + it.lat, lng: acc.lng + it.lng }),
        { lat: 0, lng: 0 },
      )
      return { lat: sum.lat / items.length, lng: sum.lng / items.length, zoom: 12 }
    }
    return { lat: 55.751244, lng: 37.618423, zoom: 11 } // Moscow fallback
  }, [center, items])

  // Initialise / tear down the mapbox-gl instance.
  React.useEffect(() => {
    if (!TOKEN || !containerRef.current) return
    let cancelled = false
    let popupCleanup: (() => void) | null = null

    ;(async () => {
      const mod = await import('mapbox-gl')
      // mapbox-gl ships CSS — pull it in lazily on the client.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore — CSS side-effect import has no types
      await import('mapbox-gl/dist/mapbox-gl.css')
      if (cancelled || !containerRef.current) return

      mod.default.accessToken = TOKEN
      const map = new mod.default.Map({
        container: containerRef.current,
        style: STYLE_URL,
        center: [computedCenter.lng, computedCenter.lat],
        zoom: computedCenter.zoom,
        attributionControl: true,
      })
      mapRef.current = map

      map.addControl(new mod.default.NavigationControl({ showCompass: false }), 'top-right')

      // Add markers + popups once style is loaded.
      map.on('load', () => {
        const popups: Popup[] = []
        for (const item of items) {
          const popupHtml = `
            <div style="min-width:180px">
              <div style="font-weight:600;margin-bottom:2px">${escapeHtml(item.title)}</div>
              ${item.price !== undefined ? `<div style="font-size:13px;opacity:.85">${formatPrice(item.price)} ₽</div>` : ''}
              ${item.address ? `<div style="font-size:12px;opacity:.7;margin-top:2px">${escapeHtml(item.address)}</div>` : ''}
              ${
                item.slug
                  ? `<a href="${baseUrl}/${item.slug}"
                       style="display:inline-block;margin-top:8px;padding:4px 10px;
                              background:#3b82f6;color:#fff;border-radius:9999px;
                              text-decoration:none;font-size:12px;font-weight:500">
                      Подробнее
                    </a>`
                  : ''
              }
            </div>
          `
          const popup = new mod.default.Popup({ offset: 24, closeButton: true }).setHTML(popupHtml)
          popups.push(popup)
          const marker = new mod.default.Marker({ color: '#3b82f6' })
            .setLngLat([item.lng, item.lat])
            .setPopup(popup)
            .addTo(map)
          markersRef.current.push(marker)
        }

        // Fit bounds if multiple points (with a sensible cap on zoom).
        if (items.length > 1) {
          const bounds = new mod.default.LngLatBounds()
          items.forEach((it) => bounds.extend([it.lng, it.lat]))
          map.fitBounds(bounds, { padding: 48, maxZoom: 14, duration: 400 })
        }

        popupCleanup = () => popups.forEach((p) => p.remove())
      })
    })()

    return () => {
      cancelled = true
      if (popupCleanup) popupCleanup()
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
      mapRef.current?.remove()
      mapRef.current = null
    }
    // We intentionally re-init when items reference or center changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, computedCenter.lat, computedCenter.lng, computedCenter.zoom, baseUrl])

  if (items.length === 0 && !center) return null

  // Token absent: surface a clear maintenance message instead of breaking layout.
  if (!TOKEN) {
    return (
      <section className={`mx-auto px-4 ${className}`}>
        {title ? <h2 className="text-2xl font-semibold mb-4">{title}</h2> : null}
        <div
          className="w-full rounded-xl overflow-hidden border border-dashed border-border bg-surface-container flex items-center justify-center text-center p-6"
          style={{ height }}
        >
          <div className="max-w-sm space-y-2">
            <MapIcon className="w-8 h-8 text-on-surface-variant/40 mx-auto" />
            <p className="text-body-sm text-on-surface-variant">
              Карта временно недоступна.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const flyToMe = (coords: { lat: number; lng: number }) => {
    if (!mapRef.current) return
    mapRef.current.flyTo({ center: [coords.lng, coords.lat], zoom: 14 })
  }

  return (
    <section className={`mx-auto px-4 ${className}`}>
      {title ? <h2 className="text-2xl font-semibold mb-4">{title}</h2> : null}
      <div className="relative w-full rounded-xl overflow-hidden border border-base-300" style={{ height }}>
        <div ref={containerRef} className="w-full h-full" />
        {/* «Ко мне» — на всех картах сайта (см. MyLocationButton). */}
        <div className="absolute bottom-3 right-3">
          <MyLocationButton onLocate={flyToMe} />
        </div>
      </div>
    </section>
  )
}

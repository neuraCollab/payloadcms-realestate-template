'use client'

import React from 'react'
import { MapPin as MapIcon, ChevronLeft, Crosshair } from 'lucide-react'
import { MyLocationButton } from '@/components/MyLocationButton'
import type { Map as MapboxMap, GeoJSONSource, MapMouseEvent } from 'mapbox-gl'
import { formatPrice } from '@/utilities/formatPrice'


export interface CatalogMapItem {
  id: string
  title: string
  price?: number
  address?: string
  lat: number
  lng: number
  slug: string
}

interface Props {
  items: CatalogMapItem[]
  baseUrl: string
  /** Внешний highlight (наведение в списке). Маркер пульсирует. */
  highlightId?: string | null
  /** Колбэк: hover/клик по маркеру → пробрасываем в список. */
  onSelect?: (id: string | null) => void
  /** Центр карты при инициализации. По умолчанию — Москва. */
  initialCenter?: { lat: number; lng: number; zoom?: number }
  /** Кнопка «← к списку» в левом верхнем углу — только для мобильного. */
  onBackToList?: () => void
  className?: string
  /** CSS height. По умолчанию 100% — должен иметь высоту от родителя. */
  height?: string
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
const STYLE_URL =
  process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? 'mapbox://styles/mapbox/streets-v12'

// Москва — дефолт центра, если не удалось определить иначе.
const MOSCOW = { lat: 55.751244, lng: 37.618423, zoom: 10 }

const PRIMARY = '#2563EB'
const PRIMARY_DARK = '#1D4ED8'


const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const buildFeatureCollection = (items: CatalogMapItem[]) => ({
  type: 'FeatureCollection' as const,
  features: items.map((it) => ({
    type: 'Feature' as const,
    id: it.id, // используется для feature-state hover
    geometry: { type: 'Point' as const, coordinates: [it.lng, it.lat] },
    properties: {
      id: it.id,
      title: it.title,
      price: it.price ?? null,
      address: it.address ?? '',
      slug: it.slug,
    },
  })),
})

/**
 * CatalogMap — карта каталога с кластеризацией Mapbox и двусторонней
 * синхронизацией со списком карточек.
 *
 * Особенности:
 *   • cluster: true → метки автоматически группируются с числом.
 *   • Hover/клик по точке → onSelect(id) пробрасывается в список.
 *   • highlightId извне → пульсация маркера через feature-state.
 *   • initialCenter позволяет передать гео-определённый центр; иначе Москва.
 *   • NavigationControl (zoom) и GeolocateControl (мобильный «найди меня»)
 *     добавляются автоматически.
 */
export const CatalogMap: React.FC<Props> = ({
  items,
  baseUrl,
  highlightId = null,
  onSelect,
  initialCenter,
  onBackToList,
  className = '',
  height = '100%',
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mapRef = React.useRef<MapboxMap | null>(null)
  const popupRef = React.useRef<any>(null)
  const mapboxRef = React.useRef<any>(null)
  const hoveredIdRef = React.useRef<string | null>(null)

  // Стартовый центр считается один раз. Обновление позиции после
  // инициализации — через map.flyTo (см. useEffect ниже).
  const startCenter = React.useMemo(
    () => initialCenter ?? MOSCOW,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // --- Инициализация ---
  React.useEffect(() => {
    if (!TOKEN || !containerRef.current) return
    let cancelled = false

    ;(async () => {
      const mod = await import('mapbox-gl')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await import('mapbox-gl/dist/mapbox-gl.css')
      if (cancelled || !containerRef.current) return

      mapboxRef.current = mod.default
      mod.default.accessToken = TOKEN

      const map = new mod.default.Map({
        container: containerRef.current,
        style: STYLE_URL,
        center: [startCenter.lng, startCenter.lat],
        zoom: startCenter.zoom ?? 10,
        attributionControl: true,
      })
      mapRef.current = map

      map.addControl(
        new mod.default.NavigationControl({ showCompass: false }),
        'top-right',
      )
      map.addControl(
        new mod.default.GeolocateControl({
          positionOptions: { enableHighAccuracy: false },
          trackUserLocation: false,
          showUserHeading: false,
        }),
        'top-right',
      )

      map.on('load', () => {
        // --- Source с кластеризацией ---
        map.addSource('properties', {
          type: 'geojson',
          data: buildFeatureCollection(items) as any,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        })

        // Круги кластеров. Радиус и оттенок зависят от количества.
        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'properties',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              PRIMARY,
              10,
              PRIMARY_DARK,
              50,
              '#0F172A',
            ],
            'circle-radius': ['step', ['get', 'point_count'], 18, 10, 22, 50, 28],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#FFFFFF',
          },
        })

        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'properties',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 13,
          },
          paint: { 'text-color': '#FFFFFF' },
        })

        // Одиночные точки. Hover/highlight — через feature-state.
        map.addLayer({
          id: 'unclustered',
          type: 'circle',
          source: 'properties',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              PRIMARY_DARK,
              PRIMARY,
            ],
            'circle-radius': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              10,
              7,
            ],
            'circle-stroke-width': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              4,
              2,
            ],
            'circle-stroke-color': '#FFFFFF',
          },
        })

        // --- Клик по кластеру → зум ---
        map.on('click', 'clusters', (e: MapMouseEvent) => {
          const feature = map.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          })[0] as any
          if (!feature) return
          const clusterId = feature.properties.cluster_id
          const src = map.getSource('properties') as GeoJSONSource
          src.getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
            if (err) return
            map.easeTo({ center: feature.geometry.coordinates, zoom })
          })
        })

        // --- Одиночные точки: hover + click ---
        const setHover = (id: string | number | undefined, on: boolean) => {
          if (id === undefined) return
          map.setFeatureState({ source: 'properties', id }, { hover: on })
        }

        map.on('mousemove', 'unclustered', (e: MapMouseEvent) => {
          map.getCanvas().style.cursor = 'pointer'
          const f = (e as any).features?.[0]
          if (!f) return
          if (hoveredIdRef.current !== f.id) {
            if (hoveredIdRef.current != null) {
              setHover(hoveredIdRef.current, false)
            }
            hoveredIdRef.current = String(f.id)
            setHover(f.id, true)
            onSelect?.(String(f.id))
          }
        })

        map.on('mouseleave', 'unclustered', () => {
          map.getCanvas().style.cursor = ''
          if (hoveredIdRef.current != null) {
            setHover(hoveredIdRef.current, false)
            hoveredIdRef.current = null
            onSelect?.(null)
          }
        })

        map.on('mouseenter', 'clusters', () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'clusters', () => {
          map.getCanvas().style.cursor = ''
        })

        map.on('click', 'unclustered', (e: MapMouseEvent) => {
          const f = (e as any).features?.[0]
          if (!f) return
          const { title, price, address, slug } = f.properties
          const lng = f.geometry.coordinates[0]
          const lat = f.geometry.coordinates[1]
          const html = `
            <div style="min-width:200px">
              <div style="font-weight:600;margin-bottom:2px">${escapeHtml(title)}</div>
              ${
                price !== null && price !== undefined && price !== ''
                  ? `<div style="font-size:13px;opacity:.85">${formatPrice(Number(price))} ₽</div>`
                  : ''
              }
              ${address ? `<div style="font-size:12px;opacity:.7;margin-top:2px">${escapeHtml(address)}</div>` : ''}
              <a href="${baseUrl}/${escapeHtml(slug)}"
                 style="display:inline-block;margin-top:8px;padding:4px 10px;
                        background:${PRIMARY};color:#fff;border-radius:9999px;
                        text-decoration:none;font-size:12px;font-weight:500">
                Подробнее
              </a>
            </div>`
          if (popupRef.current) popupRef.current.remove()
          popupRef.current = new mod.default.Popup({ offset: 14 })
            .setLngLat([lng, lat])
            .setHTML(html)
            .addTo(map)
        })

        // --- Fit bounds, если точек больше 1 ---
        if (items.length > 1 && !initialCenter) {
          const bounds = new mod.default.LngLatBounds()
          items.forEach((it) => bounds.extend([it.lng, it.lat]))
          map.fitBounds(bounds, { padding: 48, maxZoom: 13, duration: 400 })
        }
      })
    })()

    return () => {
      cancelled = true
      if (popupRef.current) popupRef.current.remove()
      mapRef.current?.remove()
      mapRef.current = null
      mapboxRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, baseUrl, startCenter.lat, startCenter.lng])

  // --- Внешний highlight: list → map (пульсация при hover карточки) ---
  React.useEffect(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) return
    // Снимаем предыдущий hover
    if (hoveredIdRef.current != null && hoveredIdRef.current !== highlightId) {
      try {
        map.setFeatureState(
          { source: 'properties', id: hoveredIdRef.current },
          { hover: false },
        )
      } catch {
        // sources/feature могло не быть, ок.
      }
    }
    if (highlightId != null) {
      try {
        map.setFeatureState(
          { source: 'properties', id: highlightId },
          { hover: true },
        )
        hoveredIdRef.current = highlightId
      } catch {
        // выполнится после загрузки стиля
      }
    } else {
      hoveredIdRef.current = null
    }
  }, [highlightId])

  // --- Внешний center: если приходит initialCenter (например, после
  // успешной геолокации), плавно летим туда. ---
  React.useEffect(() => {
    const map = mapRef.current
    if (!map || !initialCenter) return
    map.flyTo({
      center: [initialCenter.lng, initialCenter.lat],
      zoom: initialCenter.zoom ?? 11,
      duration: 600,
    })
  }, [initialCenter])

  // Нет токена → mobile-friendly placeholder, не ломаем layout.
  if (!TOKEN) {
    return (
      <div
        className={`w-full rounded-md overflow-hidden border border-dashed border-border bg-surface-container flex items-center justify-center text-center p-6 ${className}`}
        style={{ height }}
      >
        <div className="max-w-sm space-y-2">
          <MapIcon className="w-8 h-8 text-on-surface-variant/40 mx-auto" />
          <p className="text-body-sm text-on-surface-variant">
            Карта временно недоступна — не задан Mapbox-токен.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <div
        ref={containerRef}
        // w-full h-full (not just absolute+inset-0): mapbox-gl.css sets its
        // own `.mapboxgl-map { position: relative }` at equal specificity to
        // Tailwind's `.absolute`, and whichever stylesheet loads later wins
        // the tie — mapbox-gl.css is imported dynamically at runtime, so it
        // reliably wins, silently turning `inset-0` into a no-op offset (it
        // only affects position, not size, once `position` isn't `absolute`)
        // and collapsing this container to zero height. Percentage sizing
        // doesn't depend on which `position` value wins.
        className="absolute inset-0 w-full h-full rounded-md overflow-hidden"
      />

      {/* «Назад к списку» — только если родитель попросил
          (mobile full-screen режим). */}
      {onBackToList ? (
        <button
          type="button"
          onClick={onBackToList}
          aria-label="Вернуться к списку"
          className="lg:hidden absolute left-3 top-3 z-10 inline-flex items-center gap-1 h-10 pl-2 pr-3 rounded-full bg-card shadow-e2 text-on-surface text-body-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          К списку
        </button>
      ) : null}

      {/* «Ко мне» — overlay в правом нижнем углу, доступно на всех картах. */}
      <div className="absolute bottom-3 right-3 z-10">
        <MyLocationButton
          onLocate={(coords) => {
            mapRef.current?.flyTo({
              center: [coords.lng, coords.lat],
              zoom: 14,
            })
          }}
        />
      </div>
    </div>
  )
}

export { MOSCOW as MOSCOW_CENTER }

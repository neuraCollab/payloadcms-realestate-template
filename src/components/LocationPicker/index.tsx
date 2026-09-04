'use client'
import React from 'react'
import { MapPin } from 'lucide-react'
import { MyLocationButton } from '@/components/MyLocationButton'

interface Props {
  value?: { lat: number; lng: number } | null
  onChange: (
    coords: { lat: number; lng: number },
    address?: {
      formattedAddress?: string
      city?: string
      district?: string
      street?: string
    },
  ) => void
  /** Центр карты при первом рендере. Если не задан — Москва. */
  initialCenter?: { lat: number; lng: number; zoom?: number }
  className?: string
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
const STYLE_URL =
  process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? 'mapbox://styles/mapbox/streets-v12'
const MOSCOW = { lat: 55.751244, lng: 37.618423, zoom: 10 }

/**
 * Интерактивная карта для выбора местоположения кликом.
 *
 * Поведение:
 *   • клик по карте → ставится маркер + reverse-geocode через
 *     Mapbox Places API → возвращает structured address
 *   • перетаскивание маркера → то же самое
 *   • кнопка «Ко мне» → flyTo на координаты браузера
 *   • если value передан извне (например, из form state) — карта
 *     отображает маркер в этой точке
 *
 * Без NEXT_PUBLIC_MAPBOX_TOKEN компонент показывает fallback-
 * заглушку с инструкцией. Это деградирует gracefully — форма
 * остаётся юзабельна через ручной ввод адреса.
 */
export const LocationPicker: React.FC<Props> = ({
  value,
  onChange,
  initialCenter,
  className = '',
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const mapRef = React.useRef<any>(null) // mapboxgl.Map
  const markerRef = React.useRef<any>(null) // mapboxgl.Marker
  const [ready, setReady] = React.useState(false)
  const [reverseLoading, setReverseLoading] = React.useState(false)

  const handleSelect = async (lat: number, lng: number) => {
    onChange({ lat, lng })
    if (!TOKEN) return
    setReverseLoading(true)
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${TOKEN}&language=ru&types=address,place,locality,district`
      const res = await fetch(url)
      const data = await res.json()
      const feature = data.features?.[0]
      if (feature) {
        // Mapbox даёт context: [{ id: 'place.XX', text: '...' }]
        const ctx: Array<{ id: string; text: string }> = feature.context ?? []
        const find = (prefix: string) =>
          ctx.find((c) => c.id?.startsWith(prefix))?.text
        onChange(
          { lat, lng },
          {
            formattedAddress: feature.place_name,
            // place_name обычно «улица, дом, район, город, область»
            // pull discrete fields из context.
            city: find('place') ?? find('locality') ?? find('region'),
            district: find('district') ?? find('neighborhood'),
            street:
              feature.place_type?.[0] === 'address'
                ? `${feature.text}${feature.address ? `, ${feature.address}` : ''}`
                : undefined,
          },
        )
      }
    } catch (err) {
      console.error('[LocationPicker] reverse geocode', err)
    } finally {
      setReverseLoading(false)
    }
  }

  // Лениво загружаем mapbox-gl только когда токен есть.
  React.useEffect(() => {
    if (!TOKEN || !containerRef.current) return
    let cancelled = false

    const load = async () => {
      const mod = await import('mapbox-gl')
      const mapboxgl = mod.default
      await import('mapbox-gl/dist/mapbox-gl.css' as any).catch(() => {})
      if (cancelled || !containerRef.current) return

      mapboxgl.accessToken = TOKEN
      const center = value ?? initialCenter ?? MOSCOW
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: STYLE_URL,
        center: [center.lng, center.lat],
        zoom: (center as any).zoom ?? 13,
      })
      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

      // Маркер — draggable. Создаём при первом значении.
      const placeMarker = (lat: number, lng: number) => {
        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat])
        } else {
          markerRef.current = new mapboxgl.Marker({ draggable: true, color: '#1d4ed8' })
            .setLngLat([lng, lat])
            .addTo(map)
          markerRef.current.on('dragend', () => {
            const lngLat = markerRef.current.getLngLat()
            handleSelect(lngLat.lat, lngLat.lng)
          })
        }
      }

      if (value) placeMarker(value.lat, value.lng)

      map.on('click', (e: any) => {
        placeMarker(e.lngLat.lat, e.lngLat.lng)
        handleSelect(e.lngLat.lat, e.lngLat.lng)
      })

      map.on('load', () => setReady(true))
    }

    load().catch((err) => console.error('[LocationPicker] mapbox load', err))

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync external value updates → центрируем + двигаем маркер.
  React.useEffect(() => {
    if (!mapRef.current || !value) return
    if (markerRef.current) {
      markerRef.current.setLngLat([value.lng, value.lat])
    }
  }, [value])

  const flyToMe = (coords: { lat: number; lng: number }) => {
    if (!mapRef.current) return
    mapRef.current.flyTo({ center: [coords.lng, coords.lat], zoom: 15 })
  }

  if (!TOKEN) {
    return (
      <div className={`rounded-md border border-amber-200 bg-amber-50 p-4 text-body-sm text-amber-900 ${className}`}>
        <MapPin className="w-4 h-4 inline-block mr-1.5 align-text-bottom" />
        Карта недоступна — не задан <code>NEXT_PUBLIC_MAPBOX_TOKEN</code>.
        Введите адрес вручную в поле выше.
      </div>
    )
  }

  return (
    <div className={`relative rounded-md overflow-hidden border border-border bg-surface-container ${className}`}>
      <div ref={containerRef} className="w-full h-[360px]" />

      {/* Подсказка */}
      <div className="absolute top-2 left-2 inline-flex items-center h-8 px-3 rounded-full bg-card/95 text-body-sm text-on-surface shadow-e1">
        <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" />
        Кликните по карте, чтобы выбрать точку
      </div>

      {/* Кнопка к своему местоположению */}
      <div className="absolute bottom-3 right-3">
        <MyLocationButton onLocate={flyToMe} label="Моё место" />
      </div>

      {reverseLoading ? (
        <div className="absolute bottom-3 left-3 inline-flex items-center h-7 px-3 rounded-full bg-card/95 text-label text-on-surface-variant shadow-e1">
          Определяем адрес…
        </div>
      ) : null}

      {!ready ? (
        <div className="absolute inset-0 grid place-items-center bg-card/40 text-body-sm text-on-surface-variant">
          Загрузка карты…
        </div>
      ) : null}
    </div>
  )
}

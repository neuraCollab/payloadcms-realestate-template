'use client'
import React from 'react'
import { Crosshair, Loader2 } from 'lucide-react'
import { PropertyMap, type PropertyMapItem } from '@/components/PropertyMap.tsx'

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'denied' }
  | { kind: 'unavailable' }
  | { kind: 'ready'; lat: number; lng: number }

export const MapNearbyClient: React.FC<{ items: PropertyMapItem[] }> = ({ items }) => {
  const [state, setState] = React.useState<State>({ kind: 'idle' })

  const requestLocation = () => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setState({ kind: 'unavailable' })
      return
    }
    setState({ kind: 'loading' })
    // ВАЖНО: запрос делаем СТРОГО по клику пользователя — никаких
    // авто-запросов на mount. Это требование брифа + best practice
    // приватности (152-ФЗ).
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setState({
          kind: 'ready',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setState({ kind: 'denied' })
        else setState({ kind: 'unavailable' })
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    )
  }

  const center =
    state.kind === 'ready'
      ? { lat: state.lat, lng: state.lng, zoom: 13 }
      : undefined

  const hint =
    state.kind === 'denied'
      ? 'Доступ к геопозиции запрещён. Разрешите в настройках браузера и попробуйте ещё раз.'
      : state.kind === 'unavailable'
      ? 'Браузер не смог определить местоположение.'
      : null

  return (
    <section className="px-4 py-6 md:py-8 bg-surface-container-low/40">
      <div className="max-w-6xl mx-auto">
        <header className="mb-4 md:mb-5 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-headline text-on-surface">Объекты на карте</h2>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Посмотрите, что есть рядом с вами.
            </p>
          </div>
          <button
            type="button"
            onClick={requestLocation}
            disabled={state.kind === 'loading'}
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-md bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {state.kind === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Crosshair className="w-4 h-4" />
            )}
            Показать объекты рядом
          </button>
        </header>

        {hint ? (
          <p
            role="status"
            className="mb-3 text-body-sm text-on-surface-variant"
          >
            {hint}
          </p>
        ) : null}

        {/* key= форсирует переинициализацию карты при смене центра,
            т.к. PropertyMap читает center при mount/effect. */}
        <PropertyMap
          key={state.kind === 'ready' ? `${state.lat},${state.lng}` : 'default'}
          items={items}
          baseUrl="/flats"
          center={center}
          className=""
        />
      </div>
    </section>
  )
}

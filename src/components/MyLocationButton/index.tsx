'use client'
import React from 'react'
import { Crosshair } from 'lucide-react'

interface Props {
  /**
   * Колбэк с координатами пользователя. Получаем через
   * navigator.geolocation. Никаких внешних API.
   */
  onLocate: (coords: { lat: number; lng: number; accuracy?: number }) => void
  /** Аккуратное расположение для overlay на карту. */
  className?: string
  /** Метка для скринридеров. */
  label?: string
}

/**
 * Унифицированная кнопка «к моему местоположению» для всех карт сайта.
 * Поведение:
 *   • если геолокация недоступна — кнопка задизейблена с tooltip
 *   • при клике запрашивает координаты, отдаёт через onLocate
 *   • показывает loading-состояние пока браузер ждёт пермишн
 *
 * Без зависимостей от карты — вызывающий код сам решает что делать
 * с координатами (flyTo, setCenter и т.п.).
 */
export const MyLocationButton: React.FC<Props> = ({
  onLocate,
  className = '',
  label = 'Ко мне',
}) => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const supported = typeof navigator !== 'undefined' && 'geolocation' in navigator

  const handle = () => {
    if (!supported) {
      setError('Геолокация недоступна в браузере')
      return
    }
    setLoading(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocate({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setLoading(false)
      },
      (err) => {
        // 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
        setError(
          err.code === 1
            ? 'Доступ к геолокации запрещён в браузере'
            : err.code === 3
              ? 'Не удалось определить местоположение (тайм-аут)'
              : 'Не удалось определить местоположение',
        )
        setLoading(false)
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 30_000 },
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={handle}
        disabled={!supported || loading}
        aria-label={label}
        title={error ?? label}
        className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full bg-card shadow-e2 text-on-surface text-body-sm hover:bg-surface-container disabled:opacity-60"
      >
        <Crosshair className={loading ? 'w-4 h-4 animate-pulse' : 'w-4 h-4'} />
        {loading ? 'Определяем…' : label}
      </button>
      {error ? (
        <div className="absolute right-0 top-full mt-1 text-label text-rose-700 bg-rose-50 border border-rose-200 rounded px-2 py-1 whitespace-nowrap">
          {error}
        </div>
      ) : null}
    </div>
  )
}

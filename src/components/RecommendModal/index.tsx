'use client'
import React from 'react'
import Link from 'next/link'
import { X, Sparkles, Send, MapPin, Crosshair, Info } from 'lucide-react'
import { listFavorites } from '@/lib/favorites'
import { listRecentlyViewed } from '@/lib/recentlyViewed'
import { formatPrice } from '@/utilities/formatPrice'


interface Props {
  open: boolean
  onClose: () => void
}

interface Hit {
  collection: string
  id: number | string
  score: number
  reason?: string
  doc: any
}

const COLLECTION_LABEL: Record<string, string> = {
  flats: 'Квартира',
  houses: 'Дом',
  commercial: 'Коммерческая',
  lands: 'Участок',
  'residential-complexes': 'ЖК',
}


/**
 * Модальное окно AI-рекомендаций. Shared между:
 *   • header sparkle button
 *   • /search «Подобрать»
 *   • Hero AI mode toggle
 *
 * Auth-gated: проверяем cookie realty_email при открытии. Если
 * пусто — показываем заглушку с CTA «Войти».
 *
 * При сабмите:
 *   1. Если location ещё не есть, спрашиваем geo (опц.)
 *   2. POST /api/recommend с prompt + location + favorites + recent
 *   3. Рендерим 3 карточки + explanation от LLM (если есть)
 */
export const RecommendModal: React.FC<Props> = ({ open, onClose }) => {
  const [prompt, setPrompt] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [hits, setHits] = React.useState<Hit[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [location, setLocation] = React.useState<{ lat: number; lng: number } | null>(null)
  const [authed, setAuthed] = React.useState<boolean | null>(null) // null = ещё не проверили

  React.useEffect(() => {
    if (!open) return
    // Проверяем cookie на стороне клиента.
    try {
      const hasCookie = document.cookie.includes('realty_email=')
      setAuthed(hasCookie)
    } catch {
      setAuthed(false)
    }
  }, [open])

  const requestLocation = () => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: false, timeout: 8000 },
    )
  }

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!prompt.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    setHits([])

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          location,
          limit: 3,
          favorites: listFavorites(),
          recent: listRecentlyViewed().slice(0, 5),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 401) {
          setAuthed(false)
          return
        }
        setError(data.message ?? 'Не удалось получить рекомендации.')
        return
      }
      setHits(data.results ?? [])
    } catch {
      setError('Сеть недоступна.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI-помощник по подбору недвижимости"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-md shadow-e3 w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-title-lg text-on-surface flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-помощник по недвижимости
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="p-1 -m-1 rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth gate */}
        {authed === false ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary grid place-items-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-title text-on-surface">Войдите в кабинет</h3>
            <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
              AI-помощник учитывает ваши прошлые запросы и предпочтения.
              Для этого нужно войти — за пару секунд через Google, Yandex,
              Mail или email-ссылку.
            </p>
            <Link
              href="/cabinet/login"
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-primary text-primary-foreground text-body-sm font-medium"
            >
              Войти
            </Link>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            <form onSubmit={submit} className="space-y-3">
              <p className="text-body-sm text-on-surface-variant">
                Опишите что ищете — учтём ваши прошлые поиски и
                предпочтения. Например: <i>«квартира рядом со мной,
                похожа на прошлую, до 12 млн»</i>.
              </p>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Что вы ищете?"
                  rows={2}
                  maxLength={500}
                  required
                  className="w-full px-3 py-2 pr-10 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  disabled={submitting || !prompt.trim()}
                  className="absolute right-2 bottom-2 inline-flex w-9 h-9 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90"
                  aria-label="Подобрать"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3 flex-wrap text-body-sm">
                <button
                  type="button"
                  onClick={requestLocation}
                  className={
                    location
                      ? 'inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-emerald-100 text-emerald-900'
                      : 'inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-low'
                  }
                >
                  {location ? <Crosshair className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  {location ? 'Местоположение учтено' : 'Учитывать моё местоположение'}
                </button>
                <span className="text-label text-on-surface-variant ml-auto">
                  Используется рек.&nbsp;система
                  <Link
                    href="/privacy#ai-recommendations"
                    className="ml-1 text-on-surface-variant/80 hover:text-on-surface"
                    title="Подробнее"
                  >
                    <Info className="inline w-3 h-3" />
                  </Link>
                </span>
              </div>
            </form>

            {/* Состояния */}
            {error ? (
              <div className="rounded-md bg-rose-50 border border-rose-200 p-3 text-body-sm text-rose-900">
                {error}
              </div>
            ) : null}

            {submitting && hits.length === 0 ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse h-24 bg-surface-container rounded-md"
                  />
                ))}
              </div>
            ) : null}

            {hits.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-title text-on-surface">Топ {hits.length}</h3>
                {hits.map((h) => {
                  const url = `/${h.collection}/${h.doc.slug ?? h.id}`
                  const img = h.doc.images?.[0]?.image?.url
                  return (
                    <Link
                      key={`${h.collection}-${h.id}`}
                      href={url}
                      className="flex gap-3 p-3 rounded-md border border-border hover:border-primary hover:shadow-e1 transition"
                    >
                      <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-md overflow-hidden bg-surface-container">
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-label text-on-surface-variant uppercase">
                            {COLLECTION_LABEL[h.collection] ?? h.collection}
                          </span>
                          <span className="text-label text-primary">
                            score {h.score.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-title text-on-surface line-clamp-1">
                          {h.doc.title ?? h.doc.name ?? `#${h.id}`}
                        </div>
                        <div className="text-body-sm text-on-surface-variant">
                          {h.doc.location?.city ?? ''} · {formatPrice(h.doc.price)}
                        </div>
                        {h.reason ? (
                          <p className="text-body-sm text-on-surface mt-1.5 bg-primary/5 border-l-2 border-primary pl-2 py-1 rounded-r">
                            {h.reason}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  )
                })}
                <button
                  type="button"
                  onClick={() => {
                    setHits([])
                    setPrompt('')
                  }}
                  className="text-body-sm text-primary hover:underline"
                >
                  Другая идея →
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

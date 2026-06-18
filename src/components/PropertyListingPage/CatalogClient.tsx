'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Crosshair, List, Map as MapIcon } from 'lucide-react'
import { CatalogMap, type CatalogMapItem, MOSCOW_CENTER } from '@/components/CatalogMap'
import { FavoriteButton } from '@/components/FavoriteButton'
import { PropertyFiltersSheet } from '@/components/PropertyFilters/PropertyFiltersSheet'
import type { PropertyType } from '@/components/PropertyFilters/schemas'
import { cn } from '@/utilities/ui'

type CardItem = {
  id: string
  href: string
  title: string
  address?: string
  imageUrl: string | null
  badge?: string
  price?: number
  priceSuffix?: string
  meta: Array<{ label: string }>
}

interface Props {
  type: PropertyType
  cards: CardItem[]
  mapItems: CatalogMapItem[]
  totalDocs: number
  resultsSlot: React.ReactNode // server-rendered: грид + пагинация
  /** Базовый URL для попапов карты, e.g. "/flats". */
  mapBaseUrl: string
}

const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

// Тематическая заглушка по категории — без неё карточки без своего
// фото показывали голый блок «Нет фото», что в каталоге с десятками
// объектов выглядит как будто сайт сломан.
const FALLBACK_BY_TYPE: Record<PropertyType, string> = {
  flats: '/category-flats.jpg',
  commercial: '/category-commercial.jpg',
  lands: '/category-land.jpg',
  'residential-complexes': '/category-houses.jpg',
}

/**
 * CatalogClient — клиентский каркас каталога с картой.
 *
 * Десктоп: split-view (список слева, карта справа sticky).
 * Мобайл: tabs «Список / Карта» через ?view=map. В режиме карты —
 * полный экран с плавающими контролами.
 *
 * Карточки и метки синхронизируются: hover карточки → пульсация
 * маркера; hover/клик метки → подсветка карточки + автоскролл в видимую
 * область.
 */
export const CatalogClient: React.FC<Props> = ({
  type,
  cards,
  mapItems,
  totalDocs,
  resultsSlot,
  mapBaseUrl,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const view = searchParams.get('view') === 'map' ? 'map' : 'list'

  const [highlightId, setHighlightId] = React.useState<string | null>(null)
  const [geoCenter, setGeoCenter] =
    React.useState<{ lat: number; lng: number; zoom?: number } | undefined>(
      undefined,
    )

  // --- N13. Автогеолокация при первом монтировании каталога. ---
  // Запрос неблокирующий: ничего не рендерим в loading-state, просто
  // ждём ответа. Если permission denied / timeout — остаёмся на Москве.
  React.useEffect(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) return
    let cancelled = false
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return
        setGeoCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          zoom: 11,
        })
      },
      () => {
        // Тихо игнорируем — карта останется на дефолтном центре.
      },
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 5 * 60_000 },
    )
    return () => {
      cancelled = true
    }
  }, [])

  // Переключатель список ↔ карта (мобильные tabs).
  const setView = (v: 'list' | 'map') => {
    const p = new URLSearchParams(searchParams.toString())
    if (v === 'list') p.delete('view')
    else p.set('view', 'map')
    const qs = p.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  // Скролл к карточке при выборе через карту.
  const listRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!highlightId) return
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-card-id="${highlightId}"]`,
    )
    if (el && 'scrollIntoView' in el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [highlightId])

  const initialCenter = geoCenter ?? undefined

  return (
    <>
      {/* --- Мобайл tabs (десктоп всегда split). --- */}
      <div className="lg:hidden flex items-center gap-2 mb-3">
        <PropertyFiltersSheet type={type} totalDocs={totalDocs} />
        <div
          role="tablist"
          aria-label="Режим просмотра"
          className="ml-auto inline-flex p-0.5 rounded-md bg-surface-container border border-border"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === 'list'}
            onClick={() => setView('list')}
            className={cn(
              'inline-flex items-center gap-1 h-9 px-3 rounded-[5px] text-body-sm font-medium transition-colors',
              view === 'list'
                ? 'bg-card text-primary shadow-e1'
                : 'text-on-surface-variant',
            )}
          >
            <List className="w-4 h-4" /> Список
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'map'}
            onClick={() => setView('map')}
            className={cn(
              'inline-flex items-center gap-1 h-9 px-3 rounded-[5px] text-body-sm font-medium transition-colors',
              view === 'map'
                ? 'bg-card text-primary shadow-e1'
                : 'text-on-surface-variant',
            )}
          >
            <MapIcon className="w-4 h-4" /> Карта
          </button>
        </div>
      </div>

      {/* --- Desktop split (lg+): список слева, карта справа sticky. --- */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_minmax(420px,_36rem)] lg:gap-4">
        <div ref={listRef} className="space-y-4 min-w-0">
          <CardList
            cards={cards}
            highlightId={highlightId}
            onHover={setHighlightId}
            type={type}
          />
          {resultsSlot}
        </div>
        <aside
          className={cn(
            'sticky top-20 self-start',
            // A sticky full-viewport map next to a couple of small cards
            // towers awkwardly over the list. Scale the map's height to
            // the list so the split-view stays visually balanced — only
            // a longer list earns the full sticky height.
            cards.length === 0
              ? 'h-80'
              : cards.length <= 4
              ? 'h-[480px]'
              : 'h-[calc(100vh-6rem)]',
          )}
        >
          <CatalogMap
            items={mapItems}
            baseUrl={mapBaseUrl}
            highlightId={highlightId}
            onSelect={setHighlightId}
            initialCenter={initialCenter}
            className="h-full"
            height="100%"
          />
        </aside>
      </div>

      {/* --- Mobile single column ---. На view=map карта на весь экран
          с плавающими контролами; иначе обычный грид карточек. */}
      <div className="lg:hidden">
        {view === 'map' ? (
          <div
            className="fixed inset-0 top-16 z-30 bg-background"
            // top-16 — высота sticky-хедера.
          >
            <CatalogMap
              items={mapItems}
              baseUrl={mapBaseUrl}
              highlightId={highlightId}
              onSelect={setHighlightId}
              initialCenter={initialCenter}
              onBackToList={() => setView('list')}
              className="h-full"
              height="100%"
            />

            {/* Плавающая кнопка «гео» дополнительно к Mapbox-овой
                GeolocateControl (та сидит справа сверху с зумом). */}
            <button
              type="button"
              onClick={() => {
                if (
                  typeof navigator !== 'undefined' &&
                  'geolocation' in navigator
                ) {
                  navigator.geolocation.getCurrentPosition(
                    (pos) =>
                      setGeoCenter({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        zoom: 13,
                      }),
                    () => {},
                    { enableHighAccuracy: false, timeout: 8000 },
                  )
                }
              }}
              aria-label="Показать объекты рядом"
              className="absolute left-3 bottom-5 z-10 inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-primary text-primary-foreground shadow-e2 text-body-sm font-medium"
            >
              <Crosshair className="w-4 h-4" />
              Рядом со мной
            </button>
          </div>
        ) : (
          <>{resultsSlot}</>
        )}
      </div>
    </>
  )
}

const CardList: React.FC<{
  cards: CardItem[]
  highlightId: string | null
  onHover: (id: string | null) => void
  type: PropertyType
}> = ({ cards, highlightId, onHover, type }) => {
  if (cards.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-md shadow-e1">
        <p className="text-body text-on-surface-variant">Объекты не найдены</p>
      </div>
    )
  }
  return (
    <ul className="space-y-3">
      {cards.map((c, i) => (
        <li
          key={c.id}
          data-card-id={c.id}
          onMouseEnter={() => onHover(c.id)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            'bg-card rounded-md border border-border shadow-e1 hover:shadow-e2 transition-shadow',
            highlightId === c.id && 'ring-2 ring-primary border-primary',
          )}
        >
          <Link
            href={c.href}
            className="grid grid-cols-[120px_1fr] sm:grid-cols-[180px_1fr] gap-3 sm:gap-4 p-2 sm:p-3"
          >
            <div className="relative aspect-[4/3] bg-surface-container rounded overflow-hidden">
              <Image
                src={c.imageUrl || FALLBACK_BY_TYPE[type]}
                alt={c.title}
                fill
                sizes="180px"
                className="object-cover"
                // Первые 3 строки списка обычно above-the-fold даже на
                // тесном ноутбучном экране — на них priority снимает
                // lazy и хинтит fetchpriority=high. Заметно ускоряет
                // LCP, остальные грузятся как обычно.
                priority={i < 3}
              />
              {c.badge ? (
                <span className="absolute top-2 left-2 inline-flex h-6 px-2 items-center rounded-full bg-primary text-primary-foreground text-label font-medium">
                  {c.badge}
                </span>
              ) : null}
              <div className="absolute top-2 right-2">
                <FavoriteButton
                  collection={type}
                  id={c.id}
                  variant="icon"
                />
              </div>
            </div>

            <div className="min-w-0 flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-title text-on-surface line-clamp-2">
                  {c.title}
                </h3>
                {typeof c.price === 'number' ? (
                  <span className="text-title-lg text-primary whitespace-nowrap">
                    {formatPrice(c.price)}
                    {c.priceSuffix ? (
                      <span className="text-label text-on-surface-variant ml-1">
                        {c.priceSuffix}
                      </span>
                    ) : null}
                  </span>
                ) : null}
              </div>
              {c.address ? (
                <p className="text-body-sm text-on-surface-variant line-clamp-1">
                  {c.address}
                </p>
              ) : null}
              {c.meta.length > 0 ? (
                <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                  {c.meta.map((m, i) => (
                    <li
                      key={i}
                      className="text-label text-on-surface-variant"
                    >
                      {m.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

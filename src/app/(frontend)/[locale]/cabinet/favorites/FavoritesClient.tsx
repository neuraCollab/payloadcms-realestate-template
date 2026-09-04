'use client'
import React from 'react'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'
import { listFavorites, clearFavorites, type FavoriteRef } from '@/lib/favorites'
import { PropertyCard } from '@/components/PropertyCard'
import { pluralizeRu } from '@/utilities/pluralizeRu'

interface FetchedDoc {
  ref: FavoriteRef
  doc: any | null
}

const CATEGORY_LABEL: Record<FavoriteRef['collection'], string> = {
  flats: 'Квартиры',
  commercial: 'Коммерческая',
  lands: 'Земля',
  'residential-complexes': 'ЖК',
}

const BADGE: Record<'sale' | 'rent' | 'daily', string> = {
  sale: 'Продажа',
  rent: 'Аренда',
  daily: 'Посуточно',
}

export const FavoritesClient: React.FC = () => {
  const [items, setItems] = React.useState<FetchedDoc[]>([])
  const [loading, setLoading] = React.useState(true)

  const reload = React.useCallback(async () => {
    const refs = listFavorites()
    if (refs.length === 0) {
      setItems([])
      setLoading(false)
      return
    }
    setLoading(true)
    const fetched = await Promise.all(
      refs.map(async (ref) => {
        try {
          const res = await fetch(`/api/${ref.collection}/${ref.id}?depth=1`, {
            cache: 'no-store',
          })
          if (!res.ok) return { ref, doc: null }
          const doc = await res.json()
          return { ref, doc }
        } catch {
          return { ref, doc: null }
        }
      }),
    )
    setItems(fetched)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    reload()
    const onChange = () => reload()
    window.addEventListener('realty:favorites-changed', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('realty:favorites-changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [reload])

  const clearAll = () => {
    if (window.confirm('Удалить все объекты из избранного?')) {
      clearFavorites()
    }
  }

  return (
    <div>
      <header className="mb-6 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-headline text-on-surface flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            Избранное
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            {items.length}{' '}
            {pluralizeRu(items.length, ['объект', 'объекта', 'объектов'])}
          </p>
        </div>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex h-9 px-3 items-center gap-1.5 rounded-full border border-border text-body-sm text-on-surface-variant hover:bg-surface-container"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Очистить
          </button>
        ) : null}
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-md shadow-e1 p-4 animate-pulse h-72"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-md shadow-e1">
          <Heart className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-3" />
          <p className="text-body text-on-surface-variant">
            Пока ничего не сохранено. Откройте любой объект и нажмите «В избранное».
          </p>
          <Link
            href="/flats"
            className="mt-6 inline-flex h-10 px-5 items-center rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
          >
            К каталогу
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ ref, doc }) =>
            doc ? (
              <PropertyCard
                key={`${ref.collection}:${ref.id}`}
                href={`/${ref.collection}/${doc.slug}`}
                title={doc.title}
                address={doc.location?.address}
                imageUrl={doc.images?.[0]?.image?.url ?? null}
                badge={
                  doc.transactionType && BADGE[doc.transactionType as keyof typeof BADGE]
                    ? BADGE[doc.transactionType as keyof typeof BADGE]
                    : undefined
                }
                price={doc.price}
                priceSuffix={doc.transactionType === 'rent' ? '/ мес' : undefined}
                meta={[
                  { label: CATEGORY_LABEL[ref.collection] },
                  ...(doc.rooms ? [{ label: `${doc.rooms} комн.` }] : []),
                  ...(doc.area?.total ? [{ label: `${doc.area.total} м²` }] : []),
                ]}
                favCollection={ref.collection}
                favId={ref.id}
              />
            ) : (
              <div
                key={`${ref.collection}:${ref.id}`}
                className="bg-card rounded-md shadow-e1 p-4 text-center"
              >
                <p className="text-body-sm text-on-surface-variant">
                  Объект больше недоступен.
                </p>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}

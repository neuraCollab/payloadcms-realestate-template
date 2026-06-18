'use client'
import React from 'react'
import { Clock } from 'lucide-react'
import { useRecentlyViewed, clearRecentlyViewed, type RecentRef } from '@/lib/recentlyViewed'
import { PropertyCard } from '@/components/PropertyCard'
import { getTransactionBadge, getPriceSuffix } from '@/utilities/transactionType'

export type RecentlyViewedBlockType = {
  blockType: 'recently-viewed'
  title?: string
  limit?: number
}

interface FetchedDoc {
  ref: RecentRef
  doc: any | null
}

const CATEGORY_LABEL: Record<RecentRef['collection'], string> = {
  flats: 'Квартира',
  commercial: 'Коммерческая',
  lands: 'Земля',
  'residential-complexes': 'ЖК',
}

export const RecentlyViewed: React.FC<RecentlyViewedBlockType> = ({
  title = 'Недавно вы смотрели',
  limit = 8,
}) => {
  const refs = useRecentlyViewed()
  const [items, setItems] = React.useState<FetchedDoc[]>([])
  const [loading, setLoading] = React.useState(false)

  // Slice to the configured cap.
  const visibleRefs = React.useMemo(() => refs.slice(0, limit), [refs, limit])

  React.useEffect(() => {
    if (visibleRefs.length === 0) {
      setItems([])
      return
    }
    let cancelled = false
    setLoading(true)
    Promise.all(
      visibleRefs.map(async (ref) => {
        try {
          const res = await fetch(`/api/${ref.collection}/${ref.id}?depth=1`, {
            cache: 'no-store',
          })
          if (!res.ok) return { ref, doc: null }
          return { ref, doc: await res.json() }
        } catch {
          return { ref, doc: null }
        }
      }),
    ).then((fetched) => {
      if (cancelled) return
      setItems(fetched.filter((f) => f.doc !== null))
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [visibleRefs])

  if (visibleRefs.length === 0) return null

  return (
    <section className="px-4 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between gap-2 mb-5 flex-wrap">
          <h2 className="text-headline text-on-surface flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {title}
          </h2>
          <button
            type="button"
            onClick={() => clearRecentlyViewed()}
            className="text-body-sm text-on-surface-variant hover:text-on-surface hover:underline"
          >
            Очистить
          </button>
        </div>

        {loading && items.length === 0 ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-md shadow-e1 h-64 w-72 shrink-0 animate-pulse"
              />
            ))}
          </div>
        ) : (
          // Horizontal scroll ribbon — works well for any number of items.
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory">
            {items.map(({ ref, doc }) => (
              <div key={`${ref.collection}:${ref.id}`} className="w-72 shrink-0 snap-start">
                <PropertyCard
                  href={`/${ref.collection}/${doc.slug}`}
                  title={doc.title}
                  address={doc.location?.address}
                  imageUrl={doc.images?.[0]?.image?.url ?? null}
                  badge={getTransactionBadge(doc.transactionType)}
                  price={doc.price}
                  priceSuffix={getPriceSuffix(doc.transactionType)}
                  meta={[
                    { label: CATEGORY_LABEL[ref.collection] },
                    ...(doc.rooms ? [{ label: `${doc.rooms} комн.` }] : []),
                    ...(doc.area?.total ? [{ label: `${doc.area.total} м²` }] : []),
                  ]}
                  favCollection={ref.collection}
                  favId={ref.id}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

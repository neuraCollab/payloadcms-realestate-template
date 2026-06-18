import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight } from 'lucide-react'
import { PropertyCard } from '@/components/PropertyCard'
import { getTransactionBadge, getPriceSuffix } from '@/utilities/transactionType'

// «Витрина объектов» главной — 8 свежих активных квартир.
// Кнопка «Все объекты» справа вверху (см. бриф п.2.4).
export const FeaturedListings = async () => {
  const payload = await getPayload({ config: configPromise })
  let docs: any[] = []
  try {
    const res = await payload.find({
      collection: 'flats',
      where: { status: { equals: 'active' } },
      sort: '-createdAt',
      limit: 8,
      depth: 1,
      pagination: false,
    })
    docs = res.docs
  } catch {
    docs = []
  }

  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 md:mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-headline text-on-surface">Свежие предложения</h2>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Подобрали то, что только появилось в базе.
            </p>
          </div>
          <Link
            href="/flats"
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-md bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Все объекты
            <ArrowRight className="w-4 h-4" />
          </Link>
        </header>

        {docs.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <p className="text-body text-on-surface-variant">
              Каталог пока пуст. Загляните позже — мы добавляем новые объекты каждый день.
            </p>
          </div>
        ) : (
          // 2 кол. на mobile + sm — показываем только первые 2 карточки
          // (`hidden md:block` прячет остальные). С md (768) видны все 8
          // в сетке 2×4. Карточки уменьшены через size="compact".
          <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {docs.map((d, i) => {
              const meta: Array<{ label: string }> = []
              if (d.rooms === 'studio') meta.push({ label: 'Студия' })
              else if (d.rooms) meta.push({ label: `${d.rooms} комн.` })
              if (d.area?.total) meta.push({ label: `${d.area.total} м²` })
              const hiddenOnMobile = i >= 2 ? 'hidden md:block' : ''
              return (
                <div key={d.id} className={hiddenOnMobile}>
                  <PropertyCard
                    href={`/flats/${d.slug}`}
                    title={d.title}
                    address={d.location?.address ?? d.location?.city}
                    imageUrl={d.images?.[0]?.image?.url ?? null}
                    badge={getTransactionBadge(d.transactionType)}
                    price={typeof d.price === 'number' ? d.price : undefined}
                    priceSuffix={getPriceSuffix(d.transactionType)}
                    meta={meta}
                    favCollection="flats"
                    favId={d.id}
                    size="compact"
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

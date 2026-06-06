import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PropertyCard } from '@/components/PropertyCard'
import { SearchFilters } from '@/components/SearchFilters'
import PageClient from './page.client'

// SSG skipped — DB unreachable at build-time inside docker compose.
export const dynamic = 'force-dynamic'

// Categories searchable from this page. Map UI value → Payload collection slug.
const CATEGORIES = ['flats', 'commercial', 'lands', 'residential-complexes'] as const
type Category = (typeof CATEGORIES)[number]

type Args = {
  searchParams: Promise<{
    q?: string
    category?: string
    city?: string
    transactionType?: string
    minPrice?: string
    maxPrice?: string
  }>
}

type SearchHit = {
  id: string | number
  collection: Category
  slug: string
  title: string
  address?: string
  city?: string
  imageUrl: string | null
  price?: number
  transactionType?: 'sale' | 'rent' | 'daily'
  meta: Array<{ label: string }>
  createdAt?: string
}

const CATEGORY_LABEL: Record<Category, string> = {
  flats: 'Квартиры',
  commercial: 'Коммерческая',
  lands: 'Земля',
  'residential-complexes': 'Жилые комплексы',
}

const BADGE: Record<'sale' | 'rent' | 'daily', string> = {
  sale: 'Продажа',
  rent: 'Аренда',
  daily: 'Посуточно',
}

const parseIntOrUndef = (v: string | undefined): number | undefined => {
  if (!v) return undefined
  const n = parseInt(v, 10)
  return Number.isFinite(n) ? n : undefined
}

// Build a Payload `where` for a single collection. transactionType is
// applied only for collections that have it (flats, commercial).
const buildWhere = (
  collection: Category,
  sp: { q?: string; city?: string; transactionType?: string; minPrice?: string; maxPrice?: string },
) => {
  const where: any = {}

  // Hide drafts/sold from search results (where applicable).
  if (collection !== 'residential-complexes') {
    where.status = { equals: 'active' }
  }

  if (sp.city) where['location.city'] = { like: sp.city }

  const minPrice = parseIntOrUndef(sp.minPrice)
  const maxPrice = parseIntOrUndef(sp.maxPrice)
  if (minPrice !== undefined) where.price = { ...(where.price || {}), greater_than_equal: minPrice }
  if (maxPrice !== undefined) where.price = { ...(where.price || {}), less_than_equal: maxPrice }

  if (
    sp.transactionType &&
    sp.transactionType !== 'all' &&
    (collection === 'flats' || collection === 'commercial')
  ) {
    where.transactionType = { equals: sp.transactionType }
  }

  if (sp.q) {
    where.or = [
      { title: { like: sp.q } },
      { 'location.address': { like: sp.q } },
      { 'location.district': { like: sp.q } },
      { 'location.city': { like: sp.q } },
    ]
  }

  return where
}

const toHit = (doc: any, collection: Category): SearchHit => {
  const imageUrl: string | null = doc.images?.[0]?.image?.url ?? null
  const meta: Array<{ label: string }> = []

  if (collection === 'flats') {
    if (doc.rooms === 'studio') meta.push({ label: 'Студия' })
    else if (doc.rooms) meta.push({ label: `${doc.rooms} комн.` })
    if (doc.area?.total) meta.push({ label: `${doc.area.total} м²` })
  } else if (collection === 'commercial') {
    if (doc.commercialType) meta.push({ label: String(doc.commercialType) })
    if (doc.area?.total) meta.push({ label: `${doc.area.total} м²` })
  } else if (collection === 'lands') {
    if (doc.area?.total) meta.push({ label: `${doc.area.total} сот.` })
  } else if (collection === 'residential-complexes') {
    if (doc.type) meta.push({ label: String(doc.type) })
  }

  meta.unshift({ label: CATEGORY_LABEL[collection] })

  return {
    id: doc.id,
    collection,
    slug: doc.slug,
    title: doc.title,
    address: doc.location?.address,
    city: doc.location?.city,
    imageUrl,
    price: typeof doc.price === 'number' ? doc.price : undefined,
    transactionType: doc.transactionType,
    meta,
    createdAt: doc.createdAt,
  }
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const sp = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const categoryParam = (sp.category ?? 'all') as 'all' | Category
  const targets: Category[] =
    categoryParam === 'all' ? [...CATEGORIES] : [categoryParam as Category]

  // Per-collection limit. With 4 collections, 6 each = 24 cap when "all".
  const perLimit = categoryParam === 'all' ? 6 : 24

  const results = await Promise.all(
    targets.map((c) =>
      payload
        .find({
          collection: c as any,
          where: buildWhere(c, sp),
          sort: '-createdAt',
          limit: perLimit,
          depth: 1,
        })
        .then((r) => ({ c, docs: r.docs, totalDocs: r.totalDocs })),
    ),
  )

  const hits: SearchHit[] = []
  let totalDocs = 0
  for (const { c, docs, totalDocs: total } of results) {
    totalDocs += total
    for (const d of docs) hits.push(toHit(d, c))
  }

  // Newest first across collections.
  hits.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container space-y-6">
        <header className="space-y-1">
          <h1 className="text-display text-on-surface">Расширенный поиск</h1>
          <p className="text-body-sm text-on-surface-variant">
            Найдено: {totalDocs} {totalDocs === 1 ? 'объект' : 'объектов'}
            {sp.q ? ` по запросу «${sp.q}»` : ''}
          </p>
        </header>

        <SearchFilters />

        {hits.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {hits.map((hit) => (
              <PropertyCard
                key={`${hit.collection}-${hit.id}`}
                href={`/${hit.collection}/${hit.slug}`}
                title={hit.title}
                address={hit.address ?? hit.city}
                imageUrl={hit.imageUrl}
                badge={hit.transactionType ? BADGE[hit.transactionType] : undefined}
                price={hit.price}
                priceSuffix={hit.transactionType === 'rent' ? '/ мес' : undefined}
                meta={hit.meta}
                favCollection={hit.collection}
                favId={hit.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-md shadow-e1">
            <p className="text-body text-on-surface-variant">
              Ничего не найдено. Попробуйте смягчить фильтры или изменить поисковый запрос.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Поиск недвижимости',
    description:
      'Расширенный поиск по квартирам, коммерческой недвижимости, земельным участкам и ЖК.',
  }
}

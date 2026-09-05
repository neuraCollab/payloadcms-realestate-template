import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import React from 'react'

import { Link } from '@/i18n/navigation'
import { PropertyCard } from '@/components/PropertyCard'
import { pluralizeRu } from '@/utilities/pluralizeRu'
import { SearchFilters } from '@/components/SearchFilters'
import { AiHelperButton } from '@/components/AiHelperButton'
import PageClient from './page.client'

// SSG skipped — DB unreachable at build-time inside docker compose.
export const dynamic = 'force-dynamic'

// Categories searchable from this page. Map UI value → Payload collection slug.
const CATEGORIES = ['flats', 'commercial', 'lands', 'residential-complexes'] as const
type Category = (typeof CATEGORIES)[number]

type Args = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    q?: string
    category?: string
    city?: string
    transactionType?: string
    minPrice?: string
    maxPrice?: string
    /** AI-режим: ?ai=1 → используем семантический поиск через /api/ai-search. */
    ai?: string
  }>
}

import {
  embedQuery,
  isConfigured as embeddingsConfigured,
  searchEmbeddings,
  parsePrompt,
} from '@/lib/embeddings'

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

export default async function Page({ params, searchParams: searchParamsPromise }: Args) {
  const { locale } = await params
  const sp = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  // ── AI-режим ──
  // Если ai=1 и q непустой — пытаемся семантический поиск напрямую через
  // нашу embeddings lib (без HTTP-self-call). При недоступности TEI или
  // ошибке откатываемся на обычный keyword-поиск ниже.
  const aiMode = sp.ai === '1' && Boolean(sp.q?.trim())
  let aiHits: SearchHit[] | null = null
  let aiExtracted: ReturnType<typeof parsePrompt> | null = null
  if (aiMode && embeddingsConfigured()) {
    try {
      const parsed = parsePrompt(sp.q!)
      aiExtracted = parsed
      const targetColls = parsed.collections ?? [...CATEGORIES]
      const prefilterIds: Partial<Record<Category, number[]>> = {}
      await Promise.all(
        targetColls.map(async (c) => {
          const where = buildWhere(c, sp)
          if (parsed.city) where['location.city'] = { like: parsed.city }
          if (parsed.rooms && c === 'flats') where.rooms = { equals: parsed.rooms }
          if (parsed.transactionType && (c === 'flats' || c === 'commercial'))
            where.transactionType = { equals: parsed.transactionType }
          if (parsed.maxPrice !== undefined)
            where.price = { ...(where.price ?? {}), less_than_equal: parsed.maxPrice }
          if (parsed.minPrice !== undefined)
            where.price = { ...(where.price ?? {}), greater_than_equal: parsed.minPrice }
          const r = await payload.find({
            collection: c as any,
            where,
            depth: 0,
            limit: 200,
            sort: '-createdAt',
            locale: locale as TypedLocale,
          })
          prefilterIds[c] = (r.docs as Array<{ id: number }>).map((d) => Number(d.id))
        }),
      )
      const vec = await embedQuery(sp.q!)
      const ann = await searchEmbeddings(payload, {
        vector: vec,
        collections: targetColls as any,
        limit: 24,
        docIdsByCollection: prefilterIds as any,
      })

      // Гидрируем
      const byColl: Record<string, number[]> = {}
      for (const h of ann) (byColl[h.collection] ??= []).push(h.docId)
      const docsByColl: Record<string, Map<number, any>> = {}
      await Promise.all(
        Object.entries(byColl).map(async ([c, ids]) => {
          if (ids.length === 0) return
          const r = await payload.find({
            collection: c as any,
            where: { id: { in: ids } },
            depth: 1,
            limit: ids.length,
            locale: locale as TypedLocale,
          })
          const m = new Map<number, any>()
          for (const d of r.docs) m.set(Number(d.id), d)
          docsByColl[c] = m
        }),
      )
      aiHits = []
      for (const h of ann) {
        const d = docsByColl[h.collection]?.get(h.docId)
        if (d) aiHits.push(toHit(d, h.collection as Category))
      }
    } catch (err) {
      console.warn('[/search] AI mode failed, falling back to keyword:', err)
    }
  }

  const categoryParam = (sp.category ?? 'all') as 'all' | Category
  const targets: Category[] =
    categoryParam === 'all' ? [...CATEGORIES] : [categoryParam as Category]

  // Per-collection limit. With 4 collections, 6 each = 24 cap when "all".
  const perLimit = categoryParam === 'all' ? 6 : 24

  // Keyword-блок выполняется ТОЛЬКО если AI-режим не активен или
  // не отдал ничего. Иначе мы зря дёргаем БД и натыкаемся на
  // несовместимые поля (RC не имеет title и т.п.) → 500.
  const keywordHits: SearchHit[] = []
  let totalDocs = 0
  if (!aiHits) {
    const results = await Promise.all(
      targets.map((c) =>
        payload
          .find({
            collection: c as any,
            where: buildWhere(c, sp),
            sort: '-createdAt',
            limit: perLimit,
            depth: 1,
            locale: locale as TypedLocale,
          })
          .then((r) => ({ c, docs: r.docs, totalDocs: r.totalDocs }))
          .catch(() => ({ c, docs: [] as any[], totalDocs: 0 })),
      ),
    )
    for (const { c, docs, totalDocs: total } of results) {
      totalDocs += total
      for (const d of docs) keywordHits.push(toHit(d, c))
    }
    keywordHits.sort((a, b) =>
      (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
    )
  }

  const hits = aiHits ?? keywordHits
  const displayTotal = aiHits ? aiHits.length : totalDocs

  return (
    <div className="pt-24 pb-24">
      <PageClient isAiSearch={aiMode} query={sp.q} />
      <div className="container space-y-6">
        <header className="flex items-start justify-between gap-3 flex-wrap">
          <div className="space-y-1 min-w-0">
            <h1 className="text-display text-on-surface">
              {aiMode ? 'AI-поиск' : 'Расширенный поиск'}
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              {aiMode && aiHits
                ? `Релевантных: ${displayTotal}`
                : `Найдено: ${displayTotal} ${pluralizeRu(displayTotal, ['объект', 'объекта', 'объектов'])}`}
              {sp.q ? ` по запросу «${sp.q}»` : ''}
            </p>
          </div>
          {/* «Подобрать» — AI-помощник учитывает прошлые поиски и
              предпочтения. Auth-gated внутри. */}
          <AiHelperButton variant="button" label="Подобрать с AI" />
        </header>
        {aiMode && aiExtracted ? (
          <p className="text-label text-on-surface-variant">
            {renderExtractedFilters(aiExtracted)}
          </p>
        ) : null}
        <p className="text-label text-on-surface-variant">
          Используется рек.-система (embeddings + LLM). Подробнее в{' '}
          <Link href="/privacy#ai-recommendations" className="underline">политике</Link>.
        </p>

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
    // Поисковая страница даёт бесконечные комбинации параметров —
    // crawler потратит budget впустую. Закрываем от индекса, но не
    // от обхода (`nofollow` НЕ ставим — пусть Google идёт по ссылкам
    // на нашу детальную).
    robots: { index: false, follow: true },
  }
}

function renderExtractedFilters(p: ReturnType<typeof parsePrompt>): string {
  const parts: string[] = []
  if (p.city) parts.push(`🏙 ${p.city}`)
  if (p.district) parts.push(`📍 ${p.district}`)
  if (p.rooms) parts.push(`🛏 ${p.rooms === 'studio' ? 'студия' : p.rooms + ' комн'}`)
  if (p.transactionType === 'sale') parts.push('🏷 продажа')
  if (p.transactionType === 'rent') parts.push('🔑 аренда')
  if (p.minPrice) parts.push(`от ${p.minPrice.toLocaleString('ru-RU')} ₽`)
  if (p.maxPrice) parts.push(`до ${p.maxPrice.toLocaleString('ru-RU')} ₽`)
  if (p.minArea) parts.push(`от ${p.minArea} м²`)
  if (p.maxArea) parts.push(`до ${p.maxArea} м²`)
  return parts.length ? `Распознанные фильтры: ${parts.join(' · ')}` : ''
}

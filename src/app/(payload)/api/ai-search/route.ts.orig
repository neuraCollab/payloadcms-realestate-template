import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import config from '@/payload.config'
import {
  embedQuery,
  isConfigured,
  searchEmbeddings,
  parsePrompt,
  type ParsedQuery,
  type SupportedCollection,
} from '@/lib/embeddings'

/**
 * AI-поиск по недвижимости.
 *
 * GET /api/ai-search?q=<NL>&limit=20&collections=flats,commercial
 *
 * Алгоритм:
 *  1. parsePrompt(q) → structured фильтры (city, rooms, price...).
 *  2. Per-collection: применяем фильтры через payload.find, ограничиваем
 *     пул в 200 кандидатов. Это «префильтр» — все hard requirements
 *     обязаны выполниться.
 *  3. embedQuery(q) → query vector.
 *  4. searchEmbeddings: ANN среди префильтрованных ID, top-N по cosine.
 *  5. Hydrate: payload.find with where[id][in].
 *  6. Сохраняем порядок по score, отдаём.
 *
 * Без хотя бы одного фильтра ИЛИ при недоступности TEI fallback на
 * чисто-text-фильтр (без ранжирования по семантике).
 */

const ALL_COLLECTIONS: SupportedCollection[] = [
  'flats',
  'commercial',
  'lands',
  'residential-complexes',
]

const PREFILTER_POOL = 200
const DEFAULT_LIMIT = 20

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url)
  const q = (url.searchParams.get('q') ?? '').trim()
  if (!q) {
    return NextResponse.json(
      { error: 'q (query) обязателен' },
      { status: 400 },
    )
  }
  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get('limit') ?? '', 10) || DEFAULT_LIMIT, 1),
    50,
  )
  const collectionsParam = url.searchParams.get('collections')
  const requestedCollections =
    collectionsParam
      ?.split(',')
      .map((s) => s.trim())
      .filter((s): s is SupportedCollection =>
        ALL_COLLECTIONS.includes(s as SupportedCollection),
      ) ?? []
  const parsed = parsePrompt(q)
  const targetCollections =
    requestedCollections.length > 0
      ? requestedCollections
      : parsed.collections ?? ALL_COLLECTIONS

  const payload = await getPayload({ config })

  // 1. Префильтр по structured-полям через payload.find
  const prefilter = await prefilterCandidates(payload, targetCollections, parsed)

  // 2. Если эмбеддинги настроены — ранжируем семантикой, иначе берём
  //    префильтр как есть (отсортируем по createdAt).
  let semanticUsed = false
  let hits: Array<{
    collection: SupportedCollection
    docId: number
    score: number
  }> = []
  if (isConfigured()) {
    try {
      const vector = await embedQuery(q)
      const annHits = await searchEmbeddings(payload, {
        vector,
        collections: targetCollections,
        limit,
        docIdsByCollection: prefilter,
      })
      hits = annHits.map((h) => ({
        collection: h.collection,
        docId: h.docId,
        score: h.similarity,
      }))
      semanticUsed = hits.length > 0
    } catch (err) {
      payload.logger.warn({
        msg: '[ai-search] semantic ranking failed, falling back to prefilter',
        err: err instanceof Error ? err.message : String(err),
      })
    }
  }

  if (!semanticUsed) {
    // Fallback: первые N префильтр'ов как есть.
    for (const [coll, ids] of Object.entries(prefilter) as Array<
      [SupportedCollection, number[]]
    >) {
      for (const id of ids.slice(0, limit)) {
        hits.push({ collection: coll, docId: id, score: 0 })
      }
    }
  }

  // 3. Hydrate docs in batch per collection
  const hydrated = await hydrate(payload, hits, limit)

  // Лог запроса в search_queries для будущих suggestions.
  // Fire-and-forget: setImmediate + try/catch — никогда не блокируем
  // ответ. Только разумные запросы (3..200 символов).
  if (q.length >= 3 && q.length <= 200) {
    setImmediate(async () => {
      try {
        // @ts-expect-error drizzle exposed by postgres-adapter at runtime
        const drizzle = payload.db.drizzle
        await drizzle.execute(sql`
          INSERT INTO search_queries (query, query_lower, city, results_count)
          VALUES (
            ${q},
            ${q.toLowerCase()},
            ${parsed.city ?? null},
            ${hydrated.length}
          )
        `)
      } catch {
        /* ignore — миграция могла ещё не пройти, не лочим ответ */
      }
    })
  }

  return NextResponse.json({
    query: q,
    extracted: parsed,
    mode: semanticUsed ? 'semantic' : 'filter-only',
    total: hydrated.length,
    results: hydrated,
  })
}

// ─── Helpers ───

async function prefilterCandidates(
  payload: any,
  collections: SupportedCollection[],
  parsed: ParsedQuery,
): Promise<Partial<Record<SupportedCollection, number[]>>> {
  const out: Partial<Record<SupportedCollection, number[]>> = {}
  for (const coll of collections) {
    const where = buildWhere(coll, parsed)
    try {
      const res = await payload.find({
        collection: coll,
        where,
        depth: 0,
        limit: PREFILTER_POOL,
        sort: '-createdAt',
      })
      out[coll] = (res.docs as Array<{ id: number }>).map((d) => Number(d.id))
    } catch (err) {
      payload.logger.warn({
        msg: '[ai-search] prefilter failed',
        collection: coll,
        err: err instanceof Error ? err.message : String(err),
      })
      out[coll] = []
    }
  }
  return out
}

function buildWhere(coll: SupportedCollection, p: ParsedQuery): any {
  const w: any = {}
  if (coll !== 'residential-complexes') {
    w.status = { equals: 'active' }
  }
  if (p.city) w['location.city'] = { like: p.city }
  if (p.district) w['location.district'] = { like: p.district }

  if (coll === 'flats') {
    if (p.rooms) w.rooms = { equals: p.rooms }
    if (p.transactionType) w.transactionType = { equals: p.transactionType }
    if (p.minPrice !== undefined) w.price = { ...(w.price ?? {}), greater_than_equal: p.minPrice }
    if (p.maxPrice !== undefined) w.price = { ...(w.price ?? {}), less_than_equal: p.maxPrice }
    if (p.minArea !== undefined)
      w['area.total'] = { ...(w['area.total'] ?? {}), greater_than_equal: p.minArea }
    if (p.maxArea !== undefined)
      w['area.total'] = { ...(w['area.total'] ?? {}), less_than_equal: p.maxArea }
  } else if (coll === 'commercial') {
    if (p.transactionType) w.transactionType = { equals: p.transactionType }
    if (p.minPrice !== undefined) w.price = { ...(w.price ?? {}), greater_than_equal: p.minPrice }
    if (p.maxPrice !== undefined) w.price = { ...(w.price ?? {}), less_than_equal: p.maxPrice }
    if (p.minArea !== undefined)
      w['area.total'] = { ...(w['area.total'] ?? {}), greater_than_equal: p.minArea }
    if (p.maxArea !== undefined)
      w['area.total'] = { ...(w['area.total'] ?? {}), less_than_equal: p.maxArea }
  } else if (coll === 'lands') {
    if (p.minPrice !== undefined) w.price = { ...(w.price ?? {}), greater_than_equal: p.minPrice }
    if (p.maxPrice !== undefined) w.price = { ...(w.price ?? {}), less_than_equal: p.maxPrice }
    if (p.minArea !== undefined) w.area = { ...(w.area ?? {}), greater_than_equal: p.minArea }
    if (p.maxArea !== undefined) w.area = { ...(w.area ?? {}), less_than_equal: p.maxArea }
  }
  // residential-complexes: только city/district
  return w
}

async function hydrate(
  payload: any,
  hits: Array<{ collection: SupportedCollection; docId: number; score: number }>,
  limit: number,
): Promise<
  Array<{
    collection: SupportedCollection
    id: number
    score: number
    doc: any
  }>
> {
  const byColl: Record<string, number[]> = {}
  for (const h of hits) (byColl[h.collection] ??= []).push(h.docId)

  const docsByCollection: Record<string, Map<number, any>> = {}
  await Promise.all(
    Object.entries(byColl).map(async ([coll, ids]) => {
      if (ids.length === 0) return
      const res = await payload.find({
        collection: coll,
        where: { id: { in: ids } },
        depth: 1,
        limit: ids.length,
      })
      const map = new Map<number, any>()
      for (const d of res.docs) map.set(Number(d.id), d)
      docsByCollection[coll] = map
    }),
  )

  const out: Array<{
    collection: SupportedCollection
    id: number
    score: number
    doc: any
  }> = []
  for (const h of hits) {
    const doc = docsByCollection[h.collection]?.get(h.docId)
    if (!doc) continue
    out.push({ collection: h.collection, id: h.docId, score: h.score, doc })
    if (out.length >= limit) break
  }
  return out
}

/**
 * Recommendation engine — preference-aware semantic search.
 *
 * Поток:
 *   1. getUserContext(email) — последние 5 поисков пользователя
 *   2. buildEnrichedQuery(prompt, ctx, location) — обогащает запрос
 *      контекстом + LLM-извлечение фильтров (если ANTHROPIC_API_KEY есть)
 *   3. embedQuery(enrichedText) — единый 384-dim вектор
 *   4. Префильтр в SQL: hard constraints (city, type, price range)
 *   5. ANN searchEmbeddings — top-50 кандидатов по cosine similarity
 *   6. Re-rank с personalization signals:
 *        score = 0.55·sim + 0.25·prefMatch + 0.15·geoBoost + 0.05·recency
 *   7. (опц.) LLM explanation для top-N
 *
 * Cost: $0 без ANTHROPIC_API_KEY (только embeddings + heuristic).
 * С Anthropic Haiku — ~$0.0002 за запрос (extraction + N explanations).
 */

import { sql } from '@payloadcms/db-postgres'
import type { Payload } from 'payload'
import {
  embedQuery,
  isConfigured as embeddingsConfigured,
  searchEmbeddings,
  parsePrompt,
  type ParsedQuery,
  type SupportedCollection,
} from '@/lib/embeddings'
import { extractFiltersLLM, explainMatchLLM, shouldUseLLM } from '@/lib/llm'
import { correctTypos } from '@/lib/speller'

const ALL_COLLECTIONS: SupportedCollection[] = [
  'flats',
  'commercial',
  'lands',
  'residential-complexes',
]

const PREFILTER_POOL = 200
const ANN_TOP = 50
const DEFAULT_LIMIT = 3

interface UserContext {
  email: string
  recentQueries: string[]
  // Любимые/просмотренные — приходят с клиента в request body,
  // потому что они в localStorage. Сюда дублируем для удобства.
  favoriteIds?: Array<{ collection: SupportedCollection; id: string | number }>
  recentIds?: Array<{ collection: SupportedCollection; id: string | number }>
}

export interface RecommendInput {
  prompt: string
  email: string
  /** Координаты пользователя (если разрешил geolocation). */
  location?: { lat: number; lng: number } | null
  /** Сколько результатов вернуть. */
  limit?: number
  /** localStorage-данные клиента — favorites + recently viewed. */
  favorites?: Array<{ collection: SupportedCollection; id: string | number }>
  recent?: Array<{ collection: SupportedCollection; id: string | number }>
}

export interface RecommendHit {
  collection: SupportedCollection
  id: string | number
  score: number
  reason?: string
  doc: any
}

/** Пытаемся вытащить контекст пользователя из БД. */
async function getUserContext(
  payload: Payload,
  email: string,
): Promise<UserContext> {
  // @ts-expect-error drizzle exposed by postgres-adapter at runtime
  const drizzle = payload.db.drizzle
  let recentQueries: string[] = []
  try {
    const res = await drizzle.execute(sql`
      SELECT query FROM search_queries
      WHERE user_email = ${email.toLowerCase()}
      ORDER BY created_at DESC
      LIMIT 5
    `)
    recentQueries = (res.rows ?? []).map((r: any) => String(r.query ?? ''))
  } catch {
    /* table может ещё не иметь user_email column — fail-open */
  }
  return { email, recentQueries }
}

/**
 * Строит итоговый поисковый текст, объединяя:
 *   • явный prompt
 *   • LLM-извлечённые фильтры (опц.)
 *   • последний предыдущий поиск пользователя как «контекст
 *     предпочтений» (только если current prompt вообще ничего
 *     специфичного не содержит, типа «рядом со мной»)
 *
 * Возвращает: { enrichedText, parsed }, где
 *   enrichedText — что эмбеддим
 *   parsed       — структурированные фильтры для SQL pre-filter
 */
async function buildEnrichedQuery(
  prompt: string,
  ctx: UserContext,
): Promise<{ enrichedText: string; parsed: ParsedQuery & Record<string, any> }> {
  // 0) Spell checking to normalize the prompt before LLM and heuristic parsing
  const spellCheckedPrompt = await correctTypos(prompt)

  // 1) Heuristic parsing — быстрый, бесплатный, всегда работает.
  const parsed = parsePrompt(spellCheckedPrompt) as ParsedQuery & Record<string, any>

  // 2) LLM-extraction — если ключ задан, обогащаем фильтры. Не
  // блокируем при сетевой ошибке (extractFiltersLLM сама не throw'ит).
  if (shouldUseLLM()) {
    const llmExtracted = await extractFiltersLLM(spellCheckedPrompt)
    if (llmExtracted) {
      // Heuristic > LLM (heuristic-парсер хороший, LLM добавляет
      // то что не распознали regex'ы).
      for (const [k, v] of Object.entries(llmExtracted)) {
        if (parsed[k] === undefined || parsed[k] === null) {
          ;(parsed as any)[k] = v
        }
      }
    }
  }

  // 3) Контекст-обогащение: если prompt короткий/общий («рядом со
  // мной», «что-то небольшое»), добавляем предыдущий запрос как
  // вектор-сосед. Это лёгкий способ «помнить предпочтения».
  const shortAndGeneric =
    spellCheckedPrompt.trim().length < 30 &&
    !/\d/.test(spellCheckedPrompt) &&
    ctx.recentQueries.length > 0
  const enrichedText = shortAndGeneric
    ? `${spellCheckedPrompt}. Контекст предыдущего поиска: ${ctx.recentQueries[0]}`
    : spellCheckedPrompt

  return { enrichedText, parsed }
}

/**
 * Pre-filter — применяем hard constraints через payload.find.
 * Возвращает массив { collection, ids } — кандидаты для ANN.
 */
async function preFilter(
  payload: Payload,
  parsed: Record<string, any>,
  collections: SupportedCollection[],
): Promise<Array<{ collection: SupportedCollection; ids: Array<string | number> }>> {
  const results = await Promise.all(
    collections.map(async (coll) => {
      const where: any = { and: [] }
      // status='active' для всех, кроме residential-complexes (там
      // status = planning/built).
      if (coll !== 'residential-complexes') {
        where.and.push({ status: { equals: 'active' } })
      }
      if (parsed.city) {
        // Payload поддерживает оба синтаксиса — bracket и dot. dot
        // надёжнее для nested groups (см. как в ai-search/route.ts).
        where.and.push({ 'location.city': { equals: parsed.city } as any })
      }
      if (parsed.transactionType && coll !== 'lands' && coll !== 'residential-complexes') {
        where.and.push({ transactionType: { equals: parsed.transactionType } })
      }
      if (parsed.rooms && coll === 'flats') {
        where.and.push({ rooms: { equals: parsed.rooms } })
      }
      if (parsed.minPrice) {
        where.and.push({ price: { greater_than_equal: Number(parsed.minPrice) } })
      }
      if (parsed.maxPrice) {
        where.and.push({ price: { less_than_equal: Number(parsed.maxPrice) } })
      }
      const finalWhere = where.and.length > 0 ? where : undefined
      try {
        const res = await payload.find({
          collection: coll as any,
          where: finalWhere,
          limit: PREFILTER_POOL,
          depth: 0,
          pagination: false,
          overrideAccess: true,
        })
        return {
          collection: coll,
          ids: (res.docs as any[]).map((d) => d.id),
        }
      } catch {
        return { collection: coll, ids: [] }
      }
    }),
  )
  return results
}

/** Дистанция между двумя точками в км (формула Haversine). */
function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

/** geo-boost: 1.0 если рядом, 0 на > 50 км. */
function geoBoost(
  user: { lat: number; lng: number } | null | undefined,
  doc: any,
): number {
  if (!user || !doc?.coordinates?.lat || !doc?.coordinates?.lng) return 0
  const d = distanceKm(user, {
    lat: doc.coordinates.lat,
    lng: doc.coordinates.lng,
  })
  if (d <= 1) return 1
  if (d >= 50) return 0
  return Math.max(0, 1 - d / 50)
}

/** Preference match: совпадение по «частым» полям из недавних поисков. */
function prefMatch(parsed: ParsedQuery, doc: any): number {
  let s = 0
  let max = 0
  if (parsed.city) {
    max += 1
    if (doc.location?.city === parsed.city) s += 1
  }
  if (parsed.rooms) {
    max += 1
    if (doc.rooms === parsed.rooms) s += 1
  }
  if (parsed.transactionType) {
    max += 1
    if (doc.transactionType === parsed.transactionType) s += 1
  }
  return max === 0 ? 0.5 : s / max
}

/** Свежесть: моложе 7 дней → 1, старше 90 → 0, линейный спад. */
function recencyBoost(doc: any): number {
  const created = doc.createdAt ? new Date(doc.createdAt).getTime() : 0
  if (!created) return 0.5
  const ageDays = (Date.now() - created) / (1000 * 60 * 60 * 24)
  if (ageDays <= 7) return 1
  if (ageDays >= 90) return 0
  return Math.max(0, 1 - (ageDays - 7) / 83)
}

const COLLECTION_LABEL: Record<string, string> = {
  flats: 'Квартира',
  commercial: 'Коммерческая',
  lands: 'Участок',
  'residential-complexes': 'ЖК',
}

function describeForLLM(coll: SupportedCollection, doc: any): string {
  const parts: string[] = []
  parts.push(`${COLLECTION_LABEL[coll] ?? coll} «${doc.title ?? doc.name}»`)
  if (doc.location?.city) parts.push(doc.location.city)
  if (typeof doc.price === 'number') {
    parts.push(`${doc.price.toLocaleString('ru-RU')} ₽`)
  }
  if (doc.rooms) parts.push(`${doc.rooms} комн.`)
  if (doc.area?.total) parts.push(`${doc.area.total} м²`)
  if (doc.fromOwner) parts.push('от собственника')
  if (doc.noCommission) parts.push('без комиссии')
  return parts.join(', ')
}

/**
 * Основной API — выдаёт ranked рекомендации.
 */
export async function recommend(
  payload: Payload,
  input: RecommendInput,
): Promise<{
  results: RecommendHit[]
  mode: 'semantic' | 'filter-only' | 'no-embeddings'
  enrichedQuery: string
  parsed: Record<string, any>
}> {
  const limit = Math.min(Math.max(input.limit ?? DEFAULT_LIMIT, 1), 20)

  const ctx = await getUserContext(payload, input.email)
  const { enrichedText, parsed } = await buildEnrichedQuery(input.prompt, ctx)

  // Если embedding-сервис недоступен — отдаём filter-only результат.
  if (!embeddingsConfigured()) {
    const preF = await preFilter(payload, parsed, ALL_COLLECTIONS)
    const flat: RecommendHit[] = []
    for (const { collection, ids } of preF) {
      for (const id of ids.slice(0, limit)) {
        flat.push({ collection, id, score: 0, doc: { id } })
      }
    }
    return { results: flat.slice(0, limit), mode: 'no-embeddings', enrichedQuery: enrichedText, parsed }
  }

  // 1. Pre-filter pool
  const preF = await preFilter(payload, parsed, ALL_COLLECTIONS)

  // 2. Embed + ANN
  let queryVec: number[]
  try {
    queryVec = await embedQuery(enrichedText)
  } catch (err) {
    // TEI лагает — отдадим filter-only.
    payload.logger.warn({ err: (err as Error).message }, '[recommend] embed failed')
    const flat: RecommendHit[] = []
    for (const { collection, ids } of preF) {
      for (const id of ids.slice(0, limit)) {
        flat.push({ collection, id, score: 0, doc: { id } })
      }
    }
    return { results: flat.slice(0, limit), mode: 'filter-only', enrichedQuery: enrichedText, parsed }
  }

  // ANN: ищем top-ANN_TOP среди префильтрованных id'ов.
  // searchEmbeddings принимает мапу collection → ids — за один вызов
  // обрабатывает несколько коллекций параллельно.
  const docIdsByCollection: Record<string, Array<number | string>> = {}
  const activeColls: SupportedCollection[] = []
  for (const { collection, ids } of preF) {
    if (ids.length === 0) continue
    activeColls.push(collection)
    docIdsByCollection[collection] = ids
  }
  let flatHits: Array<{
    collection: SupportedCollection
    docId: any
    score: number
  }> = []
  if (activeColls.length > 0) {
    const hits = await searchEmbeddings(payload, {
      vector: queryVec,
      collections: activeColls,
      docIdsByCollection,
      limit: ANN_TOP,
    } as any)
    flatHits = (hits as any[]).map((h) => ({
      collection: h.collection as SupportedCollection,
      docId: h.docId,
      // searchEmbeddings отдаёт similarity 0..1 — берём её. Если нет —
      // fallback из distance (меньше=лучше).
      score:
        typeof h.similarity === 'number'
          ? h.similarity
          : Math.max(0, 1 - (h.distance ?? 0)),
    }))
  }

  // 3. Hydrate docs (one find per collection).
  const byCollection: Record<string, Array<string | number>> = {}
  for (const h of flatHits) {
    byCollection[h.collection] ??= []
    byCollection[h.collection]!.push(h.docId)
  }
  const docsByKey: Record<string, any> = {}
  await Promise.all(
    Object.entries(byCollection).map(async ([coll, ids]) => {
      if (ids.length === 0) return
      try {
        const res = await payload.find({
          collection: coll as any,
          where: { id: { in: ids } },
          limit: ids.length,
          depth: 1,
          pagination: false,
          overrideAccess: true,
        })
        for (const d of res.docs as any[]) {
          docsByKey[`${coll}:${d.id}`] = d
        }
      } catch {
        /* skip */
      }
    }),
  )

  // 4. Re-rank: combined score with personalization signals.
  const W_SIM = 0.55
  const W_PREF = 0.25
  const W_GEO = 0.15
  const W_REC = 0.05

  const hits: RecommendHit[] = flatHits
    .map((h) => {
      const doc = docsByKey[`${h.collection}:${h.docId}`]
      if (!doc) return null
      const sim = h.score ?? 0
      const pref = prefMatch(parsed, doc)
      const geo = geoBoost(input.location, doc)
      const rec = recencyBoost(doc)
      const score = W_SIM * sim + W_PREF * pref + W_GEO * geo + W_REC * rec
      return { collection: h.collection, id: h.docId, score, doc }
    })
    .filter((x): x is RecommendHit => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  // 5. (опц.) LLM-объяснения для топа.
  if (shouldUseLLM() && hits.length > 0) {
    const explanations = await Promise.all(
      hits.map((h) =>
        explainMatchLLM(input.prompt, describeForLLM(h.collection, h.doc)),
      ),
    )
    explanations.forEach((expl, i) => {
      if (expl) hits[i]!.reason = expl
    })
  }

  return { results: hits, mode: 'semantic', enrichedQuery: enrichedText, parsed }
}

/**
 * Bulk SEO-landing generator.
 *
 * Поток для одной (city, filter) комбо:
 *   1. Собираем фактуру из БД: count active, price min/max/median,
 *      топ-3 района по числу объявлений
 *   2. Промпт в OpenAI gpt-4o-mini с инструкцией вернуть JSON
 *   3. Парсим JSON, валидируем (длины, banned-phrases)
 *   4. Upsert в seo_landings (по city_slug + filter_slug)
 *
 * Cost: ~500 input + 800 output токенов на landing × $0.15+$0.60/M
 *   ≈ $0.0005 на одну страницу. 100 страниц ≈ $0.05.
 *
 * Если OPENAI_API_KEY нет — функция возвращает null и логирует.
 * Никогда не throws.
 */

import { sql } from '@payloadcms/db-postgres'
import type { Payload } from 'payload'
import { chat, shouldUseProvider } from '@/lib/llm'
import {
  ALL_FILTER_SLUGS,
  parseFilterSlug,
  type ParsedFilterSlug,
} from '@/lib/cityUrls'

export const PROMPT_VERSION = 'v1-2026-06-08'

export interface FactBundle {
  cityName: string
  filterLabel: string
  category: string
  transactionType?: string
  activeCount: number
  minPrice?: number
  maxPrice?: number
  medianPrice?: number
  topDistricts: string[]
}

export interface GeneratedLanding {
  title: string
  metaDescription: string
  h1: string
  intro: string
  faq: Array<{ q: string; a: string }>
}

/** Собирает реальные данные по комбо для подкормки промпта. */
export async function gatherFacts(
  payload: Payload,
  cityName: string,
  parsed: ParsedFilterSlug,
): Promise<FactBundle> {
  const collection = parsed.category
  const where: any = {
    and: [{ 'location.city': { equals: cityName } }],
  }
  if (collection !== 'residential-complexes') {
    where.and.push({ status: { equals: 'active' } })
  }
  if (parsed.transactionType && collection !== 'lands' && collection !== 'residential-complexes') {
    where.and.push({ transactionType: { equals: parsed.transactionType } })
  }

  let activeCount = 0
  let minPrice: number | undefined
  let maxPrice: number | undefined
  let medianPrice: number | undefined
  const districtCounts = new Map<string, number>()

  try {
    const res = await payload.find({
      collection: collection as any,
      where,
      limit: 200,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    })
    activeCount = res.totalDocs ?? res.docs.length
    const prices: number[] = []
    for (const d of res.docs as any[]) {
      if (typeof d.price === 'number') prices.push(d.price)
      const dist = d.location?.district
      if (dist) districtCounts.set(dist, (districtCounts.get(dist) ?? 0) + 1)
    }
    if (prices.length > 0) {
      prices.sort((a, b) => a - b)
      minPrice = prices[0]
      maxPrice = prices[prices.length - 1]
      medianPrice = prices[Math.floor(prices.length / 2)]
    }
  } catch (err) {
    payload.logger.warn(
      { err: (err as Error).message, city: cityName },
      '[seo] gatherFacts failed',
    )
  }

  const topDistricts = Array.from(districtCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([d]) => d)

  return {
    cityName,
    filterLabel: parsed.label,
    category: collection,
    transactionType: parsed.transactionType,
    activeCount,
    minPrice,
    maxPrice,
    medianPrice,
    topDistricts,
  }
}

/**
 * Промпт OpenAI: на вход факты, на выход JSON с title, description,
 * h1, intro, faq. Response_format=json_object форсит валидный JSON.
 */
export async function generateContent(
  facts: FactBundle,
): Promise<GeneratedLanding | null> {
  if (!shouldUseProvider('openai')) {
    console.warn('[seo] OPENAI_API_KEY not set — skipping generation')
    return null
  }

  const txLabel =
    facts.transactionType === 'sale'
      ? 'продажи'
      : facts.transactionType === 'rent'
        ? 'аренды'
        : facts.transactionType === 'daily'
          ? 'посуточной аренды'
          : ''

  const factsBlock =
    `Город: ${facts.cityName}\n` +
    `Категория: ${facts.filterLabel} (${facts.category})\n` +
    (txLabel ? `Тип сделки: ${txLabel}\n` : '') +
    `Активных объявлений: ${facts.activeCount}\n` +
    (facts.minPrice
      ? `Цена от ${facts.minPrice.toLocaleString('ru-RU')} до ${facts.maxPrice?.toLocaleString('ru-RU')} ₽, медиана ${facts.medianPrice?.toLocaleString('ru-RU')}\n`
      : '') +
    (facts.topDistricts.length > 0
      ? `Популярные районы: ${facts.topDistricts.join(', ')}\n`
      : '')

  // System-prompt собран из array.join — внутри обычных строк не
  // приходится экранировать тройные backtick'и и фигурные скобки,
  // на которых SWC спотыкается в template literal.
  const system = [
    'Ты — SEO-копирайтер для российской платформы недвижимости Demo Realty.',
    'Пишешь по-русски, без воды, цифры и факты конкретные.',
    'Возвращаешь ТОЛЬКО валидный JSON-объект. Никаких комментариев, никаких code-блоков.',
    '',
    'Поля ответа:',
    '  title — 60-70 символов для тега title. Главное keyword + город.',
    '  metaDescription — 140-160 символов, призыв + 2-3 USP.',
    '  h1 — заголовок страницы (естественный, до 70 символов).',
    '  intro — 2 параграфа через пустую строку, всего 80-120 слов. Без HTML.',
    '  faq — массив 4-5 объектов вида {q, a}. Вопросы — длинный хвост (Я.Wordstat). Ответы 2-3 предложения.',
    '',
    'Используй цифры из фактов буквально.',
    '',
    'Запреты:',
    '- НЕ начинай с «Добро пожаловать», «На нашем сайте»',
    '- НЕ используй «уникальный»',
    '- НЕ обещай «лучшие цены» без оснований',
    '- НЕ выдумывай районы — только из списка фактов',
  ].join('\n')

  const userMsg = `Сгенерируй SEO-контент для landing-страницы на основе фактов:\n\n${factsBlock}\n\nВерни JSON.`

  const raw = await chat([{ role: 'user', content: userMsg }], {
    provider: 'openai',
    system,
    maxTokens: 1500,
    temperature: 0.7,
  })

  if (!raw) return null

  // Пытаемся распарсить.
  let parsed: any
  try {
    parsed = JSON.parse(raw)
  } catch {
    const m = raw.match(/\{[\s\S]*\}/)
    if (!m) return null
    try {
      parsed = JSON.parse(m[0])
    } catch {
      return null
    }
  }

  // Валидация.
  const validated = validate(parsed)
  return validated
}

const BANNED = [
  /добро пожаловать/i,
  /на нашем сайте/i,
  /\bуникальн/i,
  /лучшие цены/i,
]

function validate(g: any): GeneratedLanding | null {
  if (!g || typeof g !== 'object') return null
  const title = typeof g.title === 'string' ? g.title.trim() : ''
  const metaDescription = typeof g.metaDescription === 'string' ? g.metaDescription.trim() : ''
  const h1 = typeof g.h1 === 'string' ? g.h1.trim() : ''
  const intro = typeof g.intro === 'string' ? g.intro.trim() : ''
  if (!title || !metaDescription || !h1 || !intro) return null

  // Длины — не критично, но шлём ворнинг если совсем плохо.
  if (title.length < 30 || title.length > 90) {
    console.warn('[seo] title length suspicious', title.length)
  }
  if (metaDescription.length < 100 || metaDescription.length > 200) {
    console.warn('[seo] meta length suspicious', metaDescription.length)
  }

  // Banned check.
  const blob = [title, metaDescription, h1, intro].join(' ')
  for (const re of BANNED) {
    if (re.test(blob)) {
      console.warn('[seo] banned phrase matched:', re)
      return null
    }
  }

  const faq = Array.isArray(g.faq)
    ? g.faq
        .filter((it: any) => typeof it?.q === 'string' && typeof it?.a === 'string')
        .map((it: any) => ({ q: String(it.q).trim(), a: String(it.a).trim() }))
        .slice(0, 6)
    : []

  return { title, metaDescription, h1, intro, faq }
}

/**
 * Сохранение в БД. Upsert по UNIQUE (city_slug, filter_slug).
 */
export async function upsertLanding(
  payload: Payload,
  args: {
    citySlug: string
    cityName: string
    filterSlug: string
    filterLabel: string
    category: string
    transactionType?: string
    content: GeneratedLanding
    model: string
  },
): Promise<void> {
  // @ts-expect-error drizzle exposed by postgres-adapter
  const drizzle = payload.db.drizzle

  await drizzle.execute(sql`
    INSERT INTO seo_landings (
      city_slug, city_name, filter_slug, filter_label, property_type,
      filter_params, title, meta_description, h1, intro, faq,
      is_published, generation_meta, updated_at
    )
    VALUES (
      ${args.citySlug}, ${args.cityName}, ${args.filterSlug}, ${args.filterLabel},
      ${args.category},
      ${JSON.stringify(args.transactionType ? { transactionType: args.transactionType } : {})}::jsonb,
      ${args.content.title}, ${args.content.metaDescription}, ${args.content.h1},
      ${args.content.intro},
      ${JSON.stringify(args.content.faq)}::jsonb,
      true,
      ${JSON.stringify({ model: args.model, prompt_version: PROMPT_VERSION, generated_at: new Date().toISOString() })}::jsonb,
      now()
    )
    ON CONFLICT (city_slug, filter_slug) DO UPDATE
      SET city_name = EXCLUDED.city_name,
          filter_label = EXCLUDED.filter_label,
          property_type = EXCLUDED.property_type,
          filter_params = EXCLUDED.filter_params,
          title = EXCLUDED.title,
          meta_description = EXCLUDED.meta_description,
          h1 = EXCLUDED.h1,
          intro = EXCLUDED.intro,
          faq = EXCLUDED.faq,
          generation_meta = EXCLUDED.generation_meta,
          updated_at = now()
  `)
}

/** Все возможные комбо city × filter из активных городов. */
export async function discoverCombos(
  payload: Payload,
): Promise<Array<{ citySlug: string; cityName: string; filterSlug: string }>> {
  const res = await payload.find({
    collection: 'cities',
    where: { isActive: { equals: true } },
    limit: 100,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })
  const combos: Array<{ citySlug: string; cityName: string; filterSlug: string }> = []
  for (const c of res.docs as any[]) {
    for (const f of ALL_FILTER_SLUGS) {
      combos.push({ citySlug: c.slug, cityName: c.name, filterSlug: f })
    }
  }
  return combos
}

/** Конвейер: 1 комбо → факты → LLM → upsert. */
export async function generateOne(
  payload: Payload,
  combo: { citySlug: string; cityName: string; filterSlug: string },
): Promise<{ ok: boolean; reason?: string }> {
  const parsed = parseFilterSlug(combo.filterSlug)
  if (!parsed) return { ok: false, reason: 'bad_filter_slug' }

  const facts = await gatherFacts(payload, combo.cityName, parsed)
  // Пропускаем комбо где совсем нет объявлений — пустые landing'и
  // Google flag'нет как «thin content».
  if (facts.activeCount === 0) {
    return { ok: false, reason: 'no_listings' }
  }

  const content = await generateContent(facts)
  if (!content) return { ok: false, reason: 'llm_failed' }

  await upsertLanding(payload, {
    citySlug: combo.citySlug,
    cityName: combo.cityName,
    filterSlug: combo.filterSlug,
    filterLabel: parsed.label,
    category: parsed.category,
    transactionType: parsed.transactionType,
    content,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  })
  return { ok: true }
}

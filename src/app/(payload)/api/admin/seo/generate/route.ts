import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { discoverCombos, generateOne } from '@/lib/seo/generate'
import { shouldUseProvider } from '@/lib/llm'

/**
 * POST /api/admin/seo/generate
 *   Auth: Bearer CRON_SECRET.
 *
 * Body (опц.):
 *   {
 *     combos?: Array<{ citySlug, cityName, filterSlug }>,  // если задан — только эти
 *     limit?: number,  // максимум комбо за запрос (default 50)
 *     dryRun?: boolean // если true — просто вернёт список комбо без LLM-запросов
 *   }
 *
 * Запускается батчами по 5 параллельных запросов в OpenAI, чтобы
 * не лочить event loop на полминуты при ~100 комбо. Каждый комбо:
 *   • факты из БД
 *   • prompt в gpt-4o-mini
 *   • upsert в seo_landings
 *
 * Возвращает summary: {created, skipped:{noListings,llmFailed,...}}
 */

const PARALLEL = 5

export async function POST(req: NextRequest): Promise<Response> {
  if (process.env.NEXT_PUBLIC_ENABLE_AI !== 'true') {
    return NextResponse.json(
      { error: 'AI features are disabled in this environment' },
      { status: 501 }
    )
  }

  const auth = req.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const limit = Math.min(Math.max(Number(body.limit) || 50, 1), 500)
  const dryRun = body.dryRun === true

  // Проверка LLM-ключа — только для НЕ-dryRun (dryRun LLM не зовёт).
  if (!dryRun && !shouldUseProvider('openai')) {
    return NextResponse.json(
      {
        error: 'no_openai_key',
        message: 'OPENAI_API_KEY не задан. См. docs/SEO-GENERATION.md',
      },
      { status: 503 },
    )
  }

  const payload = await getPayload({ config })

  let combos: Array<{ citySlug: string; cityName: string; filterSlug: string }>
  if (Array.isArray(body.combos) && body.combos.length > 0) {
    combos = body.combos.slice(0, limit)
  } else {
    combos = (await discoverCombos(payload)).slice(0, limit)
  }

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      combos: combos.length,
      sample: combos.slice(0, 10),
    })
  }

  const stats = {
    total: combos.length,
    created: 0,
    skipped_no_listings: 0,
    skipped_llm_failed: 0,
    skipped_bad_filter: 0,
    errors: 0,
  }

  // Батчим: PARALLEL запросов параллельно, последовательные «волны».
  for (let i = 0; i < combos.length; i += PARALLEL) {
    const batch = combos.slice(i, i + PARALLEL)
    const results = await Promise.all(
      batch.map((c) =>
        generateOne(payload, c).catch((err) => ({
          ok: false,
          reason: `error:${(err as Error).message}`,
        })),
      ),
    )
    for (const r of results) {
      if (r.ok) stats.created++
      else if (r.reason === 'no_listings') stats.skipped_no_listings++
      else if (r.reason === 'llm_failed') stats.skipped_llm_failed++
      else if (r.reason === 'bad_filter_slug') stats.skipped_bad_filter++
      else stats.errors++
    }
  }

  return NextResponse.json({ ok: true, stats })
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  indexDoc,
  isConfigured,
  type SupportedCollection,
} from '@/lib/embeddings'

/**
 * Полная переиндексация эмбеддингов.
 *
 * POST /api/admin/reindex-embeddings
 *   Body: { collections?: string[], force?: boolean }
 *
 * Auth:
 *   - Bearer CRON_SECRET (для cron'ов и скриптов)
 *   - ИЛИ Payload session с role=admin
 *
 * Идёт по всем активным docs батчами по 64, вызывает indexDoc.
 * Возвращает summary с количеством indexed / skipped / failed.
 */

const ALL_COLLECTIONS: SupportedCollection[] = [
  'flats',
  'commercial',
  'lands',
  'residential-complexes',
]

const BATCH = 64

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Auth ──
  if (!(await authorize(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isConfigured()) {
    return NextResponse.json(
      { error: 'EMBEDDINGS_URL not configured' },
      { status: 503 },
    )
  }

  const body = await req.json().catch(() => ({}))
  const force = body.force === true
  const requestedCollections: SupportedCollection[] = Array.isArray(body.collections)
    ? body.collections.filter((c: string): c is SupportedCollection =>
        ALL_COLLECTIONS.includes(c as SupportedCollection),
      )
    : ALL_COLLECTIONS

  const payload = await getPayload({ config })

  const stats: Record<
    string,
    { total: number; indexed: number; skipped: number; failed: number }
  > = {}

  for (const coll of requestedCollections) {
    stats[coll] = { total: 0, indexed: 0, skipped: 0, failed: 0 }
    let page = 1
    while (true) {
      const result = await payload.find({
        collection: coll,
        where:
          coll === 'residential-complexes'
            ? {}
            : { status: { equals: 'active' } },
        limit: BATCH,
        page,
        depth: 1,
      })
      if (result.docs.length === 0) break

      // Параллельно индексируем батч. indexDoc сам возвращает skipped,
      // ловит ошибки внутри — здесь только подсчёт.
      const outcomes = await Promise.all(
        result.docs.map(async (doc: any) => {
          try {
            const r = await indexDoc(payload, coll, doc, { force })
            return r.skipped ? 'skipped' : 'indexed'
          } catch {
            return 'failed'
          }
        }),
      )
      for (const o of outcomes) {
        stats[coll]!.total++
        stats[coll]![o as 'skipped' | 'indexed' | 'failed']++
      }

      if (result.docs.length < BATCH) break
      page++
    }
  }

  return NextResponse.json({ ok: true, stats })
}

async function authorize(req: NextRequest): Promise<boolean> {
  // 1. Bearer CRON_SECRET
  const auth = req.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (expected && auth === `Bearer ${expected}`) return true

  // 2. Payload session с role=admin
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: req.headers })
    return user?.role === 'admin'
  } catch {
    return false
  }
}

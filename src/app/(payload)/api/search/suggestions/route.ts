import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import config from '@/payload.config'

/**
 * GET /api/search/suggestions?q=<prefix>
 *
 * Возвращает массив строк-подсказок для автодополнения поискового
 * инпута на главной (Hero / search).
 *
 *   q пустой или ≤ 1 символ → топ-8 запросов за последние 90 дней
 *   q ≥ 2 символов → топ-8 запросов начинающихся с q (case-insensitive)
 *
 * Группируем по query_lower (case-insensitive), берём каноничный
 * текст из самого свежего вхождения каждой группы. Сортировка по
 * убыванию count.
 *
 * Ответ: { suggestions: string[] }
 */
const LIMIT = 8
const WINDOW_DAYS = 90

export async function GET(req: NextRequest): Promise<Response> {
  const q = (new URL(req.url).searchParams.get('q') ?? '').trim().toLowerCase()
  const payload = await getPayload({ config })
  // @ts-expect-error drizzle exposed at runtime by postgres-adapter
  const drizzle = payload.db.drizzle

  try {
    // Окно — последние 90 дней. Свежие запросы важнее «вечных».
    const sinceDate = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60_000)
      .toISOString()

    let rows: any[] = []
    if (q.length >= 2) {
      // Префиксный match. Сначала ищем где query начинается с q
      // (cheap on btree), потом fallback к contains для большего набора.
      const prefixLike = `${q}%`
      const containsLike = `%${q}%`
      const res = await drizzle.execute(sql`
        SELECT
          MAX(query) AS query,
          COUNT(*) AS cnt,
          BOOL_OR(query_lower LIKE ${prefixLike}) AS is_prefix
        FROM search_queries
        WHERE created_at > ${sinceDate}::timestamptz
          AND (query_lower LIKE ${prefixLike}
               OR query_lower LIKE ${containsLike})
        GROUP BY query_lower
        ORDER BY is_prefix DESC, cnt DESC, MAX(created_at) DESC
        LIMIT ${LIMIT}
      `)
      rows = res.rows ?? []
    } else {
      const res = await drizzle.execute(sql`
        SELECT
          MAX(query) AS query,
          COUNT(*) AS cnt
        FROM search_queries
        WHERE created_at > ${sinceDate}::timestamptz
        GROUP BY query_lower
        ORDER BY cnt DESC, MAX(created_at) DESC
        LIMIT ${LIMIT}
      `)
      rows = res.rows ?? []
    }

    const suggestions = rows
      .map((r: any) => String(r.query ?? ''))
      .filter((s) => s.length > 0)

    // Кэшим в браузере на 60 секунд — за это время самый свежий запрос
    // уже окажется в топе, но мы не дрочим БД на каждую клавишу.
    return new NextResponse(JSON.stringify({ suggestions }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    })
  } catch (err) {
    payload.logger.error(
      { err: (err as Error).message },
      '[search/suggestions]',
    )
    return NextResponse.json({ suggestions: [] })
  }
}

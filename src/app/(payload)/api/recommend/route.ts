import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import { cookies } from 'next/headers'
import config from '@/payload.config'
import { recommend } from '@/lib/recommend'
import { rateLimitOk } from '@/lib/rateLimit'

/**
 * POST /api/recommend
 *
 * Body: {
 *   prompt: string,
 *   location?: { lat, lng },
 *   limit?: number,
 *   favorites?: [{ collection, id }],  // из localStorage клиента
 *   recent?: [{ collection, id }]
 * }
 *
 * Требует cookie realty_email (auth-gated). Без логина — 401.
 *
 * Лимиты:
 *   • rate-limit 20/час по email (защита от перебора LLM)
 *   • prompt длина 3-500 символов
 *
 * Логирует запрос в search_queries для будущего контекста.
 */

async function getEmailFromCookie(): Promise<string | null> {
  const c = await cookies()
  const v = c.get('realty_email')?.value
  return v ? decodeURIComponent(v).toLowerCase() : null
}

export async function POST(req: NextRequest): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) {
    return NextResponse.json(
      {
        error: 'unauthorized',
        message:
          'AI-помощник доступен только в личном кабинете. Войдите через email-ссылку или OAuth.',
      },
      { status: 401 },
    )
  }

  const rl = rateLimitOk(req, {
    key: `recommend:${email}`,
    limit: 20,
    windowMs: 60 * 60_000,
  })
  if (!rl.ok) return rl.response

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  const prompt = String(body.prompt ?? '').trim()
  if (prompt.length < 3 || prompt.length > 500) {
    return NextResponse.json(
      { error: 'prompt_invalid', message: 'Запрос: 3-500 символов' },
      { status: 400 },
    )
  }

  const location =
    body.location &&
    typeof body.location.lat === 'number' &&
    typeof body.location.lng === 'number'
      ? { lat: body.location.lat, lng: body.location.lng }
      : null

  const payload = await getPayload({ config })

  // Лог в search_queries для будущих рек'омендаций.
  setImmediate(async () => {
    try {
      // @ts-expect-error drizzle exposed by postgres-adapter
      const drizzle = payload.db.drizzle
      await drizzle.execute(sql`
        INSERT INTO search_queries (query, query_lower, user_email)
        VALUES (${prompt}, ${prompt.toLowerCase()}, ${email})
      `)
    } catch {
      /* fail-open */
    }
  })

  try {
    const { results, mode, enrichedQuery, parsed } = await recommend(payload, {
      prompt,
      email,
      location,
      limit: typeof body.limit === 'number' ? body.limit : 3,
      favorites: Array.isArray(body.favorites) ? body.favorites : undefined,
      recent: Array.isArray(body.recent) ? body.recent : undefined,
    })

    return NextResponse.json({
      results,
      mode,
      enriched: enrichedQuery !== prompt ? enrichedQuery : undefined,
      extracted: parsed,
    })
  } catch (err: any) {
    payload.logger.error(
      { err: err?.message, email, prompt },
      '[recommend] engine error',
    )
    return NextResponse.json(
      { error: 'engine_error', message: 'Не удалось сделать рекомендацию' },
      { status: 500 },
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import { createHash } from 'crypto'
import config from '@/payload.config'

/**
 * GET /api/auth/verify?token=<plain>
 *
 * Принимает токен из письма, ищет по sha256-хешу в auth_tokens.
 * При успехе — ставит cookie `realty_email` и редиректит в /cabinet.
 * При просрочке/повторе/невалидном — редирект в /cabinet/login?error=...
 *
 * Атомарность: UPDATE ... WHERE used_at IS NULL — единственная запись
 * проходит, повтор возвращает 0 rows и считается уже использованным.
 */
const COOKIE_NAME = 'realty_email'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90 // 90 дней

const errorRedirect = (req: NextRequest, code: string): NextResponse => {
  const url = new URL(`/cabinet/login?error=${code}`, req.url)
  return NextResponse.redirect(url, { status: 303 })
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = new URL(req.url).searchParams.get('token')
  if (!token || token.length < 32 || token.length > 256) {
    return errorRedirect(req, 'invalid')
  }

  const tokenHash = createHash('sha256').update(token).digest('hex')

  const payload = await getPayload({ config })
  // @ts-expect-error drizzle exposed at runtime by postgres-adapter
  const drizzle = payload.db.drizzle

  // Атомарная активация — пользуемся RETURNING чтобы получить email
  // только если апдейт реально прошёл (used_at был NULL и не истёк).
  const result = await drizzle.execute(sql`
    UPDATE auth_tokens
    SET used_at = now()
    WHERE token_hash = ${tokenHash}
      AND used_at IS NULL
      AND expires_at > now()
    RETURNING email
  `)
  const row = (result.rows ?? [])[0] as { email?: string } | undefined
  if (!row?.email) {
    // Не отличаем «не существует» от «истёк» — для безопасности
    // не помогаем атакеру понять, что токен валиден но просрочен.
    return errorRedirect(req, 'expired')
  }

  const email = row.email
  const url = new URL('/cabinet/chats', req.url)
  const res = NextResponse.redirect(url, { status: 303 })
  res.cookies.set(COOKIE_NAME, email, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    httpOnly: false, // нужно читать клиент-сайдом для /cabinet
    secure: process.env.NODE_ENV === 'production',
  })

  // Чистим протухшие токены этого юзера (best-effort, ничего не ждём).
  void drizzle.execute(sql`
    DELETE FROM auth_tokens
    WHERE email = ${email} AND (expires_at < now() OR used_at IS NOT NULL)
  `)

  return res
}

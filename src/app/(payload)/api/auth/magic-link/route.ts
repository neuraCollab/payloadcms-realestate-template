import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import { randomBytes, createHash } from 'crypto'
import config from '@/payload.config'
import { sendEmail } from '@/lib/email'
import { rateLimitOk, HONEYPOT_FIELD, looksLikeBot } from '@/lib/rateLimit'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * POST /api/auth/magic-link
 *
 * Принимает email, генерирует одноразовый токен (32 байта → 64 hex),
 * хранит его SHA-256 хеш в auth_tokens, отправляет письмо со ссылкой
 * /api/auth/verify?token=<plain>.
 *
 * TTL токена 15 минут. Один email = до 5 активных токенов одновременно
 * (rate-limit на 5 запросов / 10 минут с IP сверху).
 *
 * ВАЖНО: ответ всегда `{ ok: true }`, даже если email не валиден или
 * не существует в системе. Это сознательно — иначе эндпоинт превратится
 * в email-enumeration оракул («тут зарегистрирован, а тут нет»).
 */
const isValidEmail = (s: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export async function POST(req: NextRequest): Promise<Response> {
  const rl = rateLimitOk(req, {
    key: 'magic-link',
    limit: 5,
    windowMs: 600_000,
  })
  if (!rl.ok) return rl.response

  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ ok: true })
  }
  if (looksLikeBot(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true })
  }

  const email = String(body.email ?? '')
    .trim()
    .toLowerCase()
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: true })
  }

  // Генерация: 32 байта → 64 hex-символа. Достаточно энтропии чтобы
  // brute-force был невозможен даже без rate-limit на verify.
  const token = randomBytes(32).toString('hex')
  const tokenHash = createHash('sha256').update(token).digest('hex')
  const expiresAt = new Date(Date.now() + 15 * 60_000).toISOString() // +15 минут

  const payload = await getPayload({ config })
  // @ts-expect-error drizzle exposed at runtime by postgres-adapter
  const drizzle = payload.db.drizzle

  try {
    await drizzle.execute(sql`
      INSERT INTO auth_tokens (token_hash, email, purpose, expires_at)
      VALUES (${tokenHash}, ${email}, 'login', ${expiresAt}::timestamptz)
    `)
  } catch (err) {
    console.error('[magic-link] db insert', (err as Error).message)
    return NextResponse.json({ ok: true }) // не раскрываем
  }

  const base = getServerSideURL()
  const verifyUrl = `${base}/api/auth/verify?token=${token}`

  // Текст письма — обычный, без HTML-шаблонов. Можно усложнить
  // (логотип, кнопка) позже.
  const subject = 'Вход в личный кабинет Demo Realty'
  const text =
    `Здравствуйте!\n\n` +
    `Чтобы войти в кабинет Demo Realty, перейдите по ссылке:\n` +
    `${verifyUrl}\n\n` +
    `Ссылка действительна 15 минут и работает один раз.\n` +
    `Если вы не запрашивали вход — просто проигнорируйте письмо.`
  const html =
    `<p>Здравствуйте!</p>` +
    `<p>Чтобы войти в кабинет Demo Realty, перейдите по ссылке:</p>` +
    `<p><a href="${verifyUrl}" style="background:#1d4ed8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:24px;display:inline-block">Войти в кабинет</a></p>` +
    `<p style="color:#666;font-size:13px">Ссылка действительна 15 минут и работает один раз. ` +
    `Если вы не запрашивали вход — просто проигнорируйте письмо.</p>` +
    `<hr/><p style="color:#999;font-size:12px">Если кнопка не работает: ${verifyUrl}</p>`

  // Fire-and-forget — если SMTP лагает, не блокируем ответ.
  void sendEmail({ to: email, subject, text, html })

  return NextResponse.json({ ok: true })
}

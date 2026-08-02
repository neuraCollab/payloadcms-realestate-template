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
const isValidEmail = (s: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

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

  const subject = 'Вход в личный кабинет MegaDomic'
  const text =
    `Здравствуйте!\n\n` +
    `Чтобы войти в кабинет Demo Realty, перейдите по ссылке:\n` +
    `${verifyUrl}\n\n` +
    `Ссылка действительна 15 минут и работает один раз.\n` +
    `Если вы не запрашивали вход — просто проигнорируйте письмо.`
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Вход в MegaDomic</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #111827;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <tr>
            <td style="padding: 40px; text-align: center; border-bottom: 1px solid #f3f4f6;">
              <img src="${base}/logo-light.png" alt="MegaDomic" width="190" style="display: block; margin: 0 auto; max-width: 100%; height: auto;">
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #111827; text-align: center;">Вход в личный кабинет</h1>
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #4b5563;">
                Здравствуйте! Вы запросили вход в личный кабинет <strong>MegaDomic</strong>. Для продолжения нажмите на кнопку ниже:
              </p>
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${verifyUrl}" style="display: inline-block; background-color: #1d4ed8; color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none; padding: 14px 28px; border-radius: 8px;">Войти в кабинет</a>
              </div>
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 20px; color: #6b7280; text-align: center;">
                Ссылка действительна 15 минут и работает один раз.
              </p>
              <p style="margin: 0; font-size: 14px; line-height: 20px; color: #6b7280; text-align: center;">
                Если вы не запрашивали вход, просто проигнорируйте это письмо.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 40px 40px; border-top: 1px solid #f3f4f6; background-color: #f9fafb;">
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #9ca3af; text-align: center; word-break: break-all;">
                Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:<br>
                <a href="${verifyUrl}" style="color: #2563eb; text-decoration: underline;">${verifyUrl}</a>
              </p>
            </td>
          </tr>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin-top: 20px;">
          <tr>
            <td style="text-align: center; padding: 0 20px;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                &copy; ${new Date().getFullYear()} MegaDomic. Все права защищены.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  // Fire-and-forget — если SMTP лагает, не блокируем ответ.
  void sendEmail({ to: email, subject, text, html })

  return NextResponse.json({ ok: true })
}

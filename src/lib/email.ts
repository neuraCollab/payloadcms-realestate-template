/**
 * Тонкая обёртка над Resend HTTP API.
 *
 * Resend выбран потому что:
 *   • простой REST API, без node-sdk → не тащим npm-зависимость
 *   • встроенный domain-verification + DKIM/SPF
 *   • 3000 писем/месяц бесплатно (хватит на ранний прод)
 *
 * Env:
 *   RESEND_API_KEY    — получить в https://resend.com/api-keys
 *   EMAIL_FROM        — «MegaDomic <no-reply@megadomic.ru>» — домен
 *                       должен быть верифицирован в Resend
 *
 * Если RESEND_API_KEY не задан — пишет в console.warn (dev/тест).
 * Никогда не валит вызывающий код.
 */

const RESEND_URL = 'https://api.resend.com/emails'

interface SendEmailParams {
  to: string | string[]
  subject: string
  /** Plain-text fallback (для клиентов без HTML). */
  text: string
  /** HTML версия. Поддерживает inline-стили; без CSS-классов. */
  html?: string
  /** Заголовок reply-to (если хочешь чтобы ответы шли не на no-reply). */
  replyTo?: string
}

export async function sendEmail(params: SendEmailParams): Promise<{
  ok: boolean
  id?: string
  error?: string
}> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'MegaDomic <onboarding@resend.dev>'

  // В деве (или если ключ не настроен) — пишем в лог + 200. Без падений.
  if (!apiKey) {
    console.warn(
      '[email] RESEND_API_KEY не задан, письмо НЕ отправлено. ' +
        'Содержимое для проверки:',
      {
        to: params.to,
        subject: params.subject,
        text: params.text.slice(0, 200),
      },
    )
    return { ok: true, id: 'no-op-no-api-key' }
  }

  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(params.to) ? params.to : [params.to],
        subject: params.subject,
        text: params.text,
        html: params.html ?? params.text,
        reply_to: params.replyTo,
      }),
    })
    if (!res.ok) {
      const errText = await res.text()
      console.error('[email] Resend error', res.status, errText)
      return { ok: false, error: `resend_${res.status}` }
    }
    const data = (await res.json()) as { id?: string }
    return { ok: true, id: data.id }
  } catch (err) {
    console.error('[email] network', (err as Error).message)
    return { ok: false, error: 'network' }
  }
}

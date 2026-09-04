import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { rateLimitOk, HONEYPOT_FIELD, looksLikeBot } from '@/lib/rateLimit'
import { notifyLeadWebhook, type LeadWebhookPayload } from '@/lib/leadWebhook'

/**
 * POST /api/leads
 *
 * Публичная форма «Заказать звонок» / «Написать в TG/WhatsApp/Instagram».
 * Сохраняет Lead с привязкой к объекту, риэлтору и каналу связи.
 *
 * Защита:
 *   • rate-limit по IP (5 запросов / 10 минут)
 *   • honeypot-поле `website` — если не пусто, тихо возвращаем 200
 *     (не злим бота 4xx, но в базу ничего не пишем)
 *   • минимальная валидация телефона
 *
 * Body:
 *   {
 *     phone, name?, channel: callback|telegram|whatsapp|instagram,
 *     contactHandle?, message?,
 *     propertyCollection, propertyId, propertyTitle, realtorId?,
 *     utmSource?, utmCampaign?, pageUrl?,
 *     website?  // honeypot
 *   }
 */
export async function POST(req: NextRequest): Promise<Response> {
  const rl = rateLimitOk(req, { key: 'leads', limit: 5, windowMs: 600_000 })
  if (!rl.ok) return rl.response

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  // Honeypot — если бот заполнил, делаем вид что приняли.
  if (looksLikeBot(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true })
  }

  const phone = String(body.phone ?? '').trim()
  const channel = String(body.channel ?? 'callback')
  const contactHandle = String(body.contactHandle ?? '').trim()

  // Для callback требуется телефон. Для tg/wa/ig — нужен хотя бы handle.
  if (channel === 'callback') {
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { error: 'phone_invalid' },
        { status: 400 },
      )
    }
  } else {
    if (!contactHandle && !phone) {
      return NextResponse.json(
        { error: 'handle_or_phone_required' },
        { status: 400 },
      )
    }
  }
  if (!['callback', 'telegram', 'whatsapp', 'instagram'].includes(channel)) {
    return NextResponse.json({ error: 'bad_channel' }, { status: 400 })
  }

  const payload = await getPayload({ config })
  try {
    const doc = await payload.create({
      collection: 'leads',
      data: {
        phone: phone || '(не указан)',
        name: body.name ? String(body.name).slice(0, 120) : undefined,
        channel: channel as any,
        contactHandle: contactHandle || undefined,
        message: body.message ? String(body.message).slice(0, 1000) : undefined,
        propertyCollection: body.propertyCollection
          ? String(body.propertyCollection)
          : undefined,
        propertyId: body.propertyId ? String(body.propertyId) : undefined,
        propertyTitle: body.propertyTitle
          ? String(body.propertyTitle).slice(0, 200)
          : undefined,
        realtor: body.realtorId ? Number(body.realtorId) : undefined,
        utmSource: body.utmSource ? String(body.utmSource).slice(0, 80) : undefined,
        utmCampaign: body.utmCampaign
          ? String(body.utmCampaign).slice(0, 80)
          : undefined,
        pageUrl: body.pageUrl ? String(body.pageUrl).slice(0, 500) : undefined,
        status: 'new' as any,
      } as any,
      overrideAccess: true,
    })

    // Fire-and-forget — never delay the visitor's response on a slow
    // or unconfigured external bot webhook.
    void notifyLeadWebhook({
      id: doc.id,
      phone: doc.phone,
      name: doc.name ?? undefined,
      channel: channel as LeadWebhookPayload['channel'],
      contactHandle: doc.contactHandle ?? undefined,
      message: doc.message ?? undefined,
      propertyCollection: doc.propertyCollection ?? undefined,
      propertyId: doc.propertyId ?? undefined,
      propertyTitle: doc.propertyTitle ?? undefined,
      realtorId: typeof doc.realtor === 'number' ? doc.realtor : undefined,
      pageUrl: doc.pageUrl ?? undefined,
      createdAt: doc.createdAt,
    })

    return NextResponse.json({ ok: true, id: doc.id })
  } catch (err: any) {
    console.error('[leads] create failed', err?.message ?? err)
    return NextResponse.json({ error: 'create_failed' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@/payload.config'
import { sendEmail } from '@/lib/email'
import { tg } from '@/lib/telegram/client'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * POST /api/cabinet/listings/[id]/submit
 *
 * Отправляет черновик на модерацию. Перед сменой статуса проверяет
 * pre-publish requirements (минимум фото, заполненность ключевых
 * полей).
 *
 * Что делает:
 *   1. Owner check + статус == 'draft'
 *   2. Pre-publish валидация: ≥1 фото, есть city/address/title/price
 *   3. Перевод в status='pending_review', submittedAt=now
 *   4. Email админу (если задан TELEGRAM_ADMIN_CHAT_ID) +
 *      нотификация в TG (если бот настроен)
 *   5. Email автору «принято на модерацию»
 */

async function getEmailFromCookie(): Promise<string | null> {
  const c = await cookies()
  const v = c.get('realty_email')?.value
  return v ? decodeURIComponent(v).toLowerCase() : null
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const payload = await getPayload({ config })

  const listing: any = await payload
    .findByID({
      collection: 'flats',
      id,
      depth: 1,
      overrideAccess: true,
    })
    .catch(() => null)
  if (!listing || listing.contactEmail !== email) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  if (listing.status !== 'draft') {
    return NextResponse.json(
      { error: 'wrong_status', message: 'Объявление уже отправлено или опубликовано.' },
      { status: 400 },
    )
  }

  // Pre-publish requirements — то что в админке отдельно валидируется
  // редактором. Хотим чтобы UGC-объявления не приходили модератору
  // совсем пустыми.
  const errors: Record<string, string> = {}
  if (!listing.title || listing.title.length < 10) errors.title = 'Заголовок обязателен (≥10 символов)'
  if (!listing.location?.city) errors.city = 'Город обязателен'
  if (!listing.location?.address) errors.address = 'Адрес обязателен'
  if (!listing.price || listing.price <= 0) errors.price = 'Цена обязательна'
  if (!Array.isArray(listing.images) || listing.images.length === 0) {
    errors.images = 'Загрузите хотя бы 1 фото'
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: 'pre_publish_failed', errors },
      { status: 400 },
    )
  }

  // Перевод в pending_review.
  await payload.update({
    collection: 'flats',
    id,
    data: {
      status: 'pending_review' as any,
      submittedAt: new Date().toISOString(),
    } as any,
    overrideAccess: true,
  })

  // Нотификации (fire-and-forget).
  const base = getServerSideURL()
  const adminUrl = `${base}/admin/collections/flats/${id}`
  setImmediate(() => {
    // Email автору
    void sendEmail({
      to: email,
      subject: 'Ваше объявление принято на модерацию — MegaDomic',
      text:
        `Спасибо! Объявление «${listing.title}» отправлено на проверку.\n` +
        `Обычно проверяем в течение 24 часов и пишем на этот же email.\n\n` +
        `Посмотреть статус: ${base}/cabinet/listings`,
    })
    // Email админу
    if (process.env.MODERATOR_EMAIL) {
      void sendEmail({
        to: process.env.MODERATOR_EMAIL,
        subject: `🔔 Новое объявление на модерацию — «${listing.title}»`,
        text:
          `Email автора: ${email}\n` +
          `Город: ${listing.location?.city}\n` +
          `Цена: ${listing.price?.toLocaleString('ru-RU')} ₽\n\n` +
          `Открыть в админке: ${adminUrl}`,
      })
    }
    // Уведомление админу в Telegram
    void tg.notifyAdmin(
      `🔔 <b>Новое объявление на модерацию</b>\n\n` +
        `«${listing.title}»\n` +
        `${listing.location?.city} · ${listing.price?.toLocaleString('ru-RU')} ₽\n` +
        `Автор: ${email}\n\n` +
        `<a href="${adminUrl}">Открыть в админке</a>`,
    )
  })

  return NextResponse.json({ ok: true })
}

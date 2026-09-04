import { tg } from './client'
import type { Payload } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'
import { formatPrice } from '@/utilities/formatPrice'


/**
 * Универсальная публикация объекта в city-канал Telegram.
 *
 * Поток:
 *   1. Берём city из doc.location.city
 *   2. Ищем telegram_channels где city_name = city + is_active=true
 *   3. Нашли → sendPhoto/sendMessage в этот канал, увеличиваем
 *      posted_count
 *   4. Не нашли → шлём в админ-чат «нужен канал для X», публикация
 *      не блокируется (graceful)
 *
 * Бот должен быть админом канала с правом отправлять сообщения.
 * Если не админ — Bot API вернёт 403, всё равно ловим, шлём админу.
 */
const COLLECTION_LABEL: Record<string, string> = {
  flats: 'Квартира',
  commercial: 'Коммерческая',
  lands: 'Участок',
  'residential-complexes': 'ЖК',
}

const TX_LABEL: Record<string, string> = {
  sale: '🏷 Продажа',
  rent: '🔑 Аренда',
  daily: '🛏 Посуточно',
}


export async function publishListingToCity(
  payload: Payload,
  collection: string,
  doc: any,
): Promise<void> {
  const city = doc?.location?.city
  if (!city) return

  // Ищем канал по точному совпадению city_name.
  const res = await payload.find({
    collection: 'telegram-channels',
    where: {
      and: [
        { cityName: { equals: city } },
        { status: { equals: 'active' } },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const channel: any = res.docs[0]
  if (!channel) {
    // Канала нет — единоразово нотифицируем админа.
    void tg.notifyAdmin(
      `📡 Нет канала для города <b>${escapeHtml(city)}</b>.\n\n` +
        `Создайте канал, добавьте бота админом, и зарегистрируйте командой:\n` +
        `<code>/register_channel ${slugify(city)} ${escapeHtml(city)}</code>\n` +
        `в чате с ботом (отправьте предварительно сообщение из самого канала боту, ` +
        `чтобы он узнал channel_id).`,
    )
    return
  }

  const base = getServerSideURL()
  const url = `${base}/${collection}/${doc.slug}`

  const caption =
    `<b>${escapeHtml(doc.title)}</b>\n` +
    (typeof doc.price === 'number'
      ? `${formatPrice(doc.price)}${doc.transactionType === 'rent' ? ' / мес' : ''}\n`
      : '') +
    `${TX_LABEL[doc.transactionType] ?? ''} · ${COLLECTION_LABEL[collection] ?? collection}\n` +
    (doc.location?.address ? `📍 ${escapeHtml(doc.location.address)}\n` : '') +
    (doc.area?.total ? `📐 ${doc.area.total} м²` : '') +
    (doc.rooms && doc.rooms !== 'studio' ? ` · ${escapeHtml(doc.rooms)} комн.\n` : '\n') +
    `\n${url}`

  const imageUrl = doc.images?.[0]?.image?.url
  const photo = imageUrl ? new URL(imageUrl, base).toString() : null

  const replyMarkup = {
    inline_keyboard: [
      [{ text: '📋 Открыть объявление', url }],
    ],
  }

  const result = photo
    ? await tg.sendPhoto({
        chat_id: channel.channelId,
        photo,
        caption,
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      })
    : await tg.sendMessage({
        chat_id: channel.channelId,
        text: caption,
        parse_mode: 'HTML',
        disable_web_page_preview: false,
        reply_markup: replyMarkup,
      })

  if (!result.ok) {
    void tg.notifyAdmin(
      `❌ Не удалось опубликовать <b>${escapeHtml(doc.title)}</b> в канал ` +
        `${channel.cityName} (${channel.channelId}): ${escapeHtml(result.description ?? 'unknown')}`,
    )
    return
  }

  // Инкремент счётчика
  try {
    await payload.update({
      collection: 'telegram-channels',
      id: channel.id,
      data: { postedCount: (channel.postedCount ?? 0) + 1 } as any,
      overrideAccess: true,
    })
  } catch {
    /* счётчик не критичен */
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

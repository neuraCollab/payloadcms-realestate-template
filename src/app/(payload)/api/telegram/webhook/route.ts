import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { tg } from '@/lib/telegram/client'
import { getSession, setSession, clearSession } from '@/lib/telegram/sessions'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * POST /api/telegram/webhook
 *
 * Принимает обновления от Telegram. Защищён secret_token, который мы
 * передавали в setWebhook. Telegram шлёт его в заголовке
 * X-Telegram-Bot-Api-Secret-Token.
 *
 * Поддерживаемые команды (см. /help):
 *   /start                    — приветствие
 *   /help                     — список команд
 *   /channels                 — все каналы
 *   /channel <city_slug>      — ссылка на канал города
 *   /search <запрос>          — AI-поиск, paginated
 *   /new                      — Q&A создание объявления
 *   /cancel                   — сбросить активную Q&A
 *   /register_channel <slug> <city_name>  — bind канал (admin-only)
 *
 * Callback queries: page:<offset>:<query>  — пагинация результатов /search
 */

const COMMANDS_HELP =
  '<b>Команды бота MegaDomic</b>\n\n' +
  '/channels — все городские каналы\n' +
  '/channel <i>город</i> — ссылка на канал города (например <code>/channel moskva</code>)\n' +
  '/search <i>запрос</i> — поиск по объявлениям (например <code>/search 2 комн в москве до 15 млн</code>)\n' +
  '/new — создать объявление в админ-режиме\n' +
  '/cancel — отменить текущую операцию\n' +
  '/help — это сообщение'

const isAdmin = (chatId: number): boolean => {
  const adminId = process.env.TELEGRAM_ADMIN_CHAT_ID
  return adminId !== undefined && String(chatId) === String(adminId)
}

export async function POST(req: NextRequest): Promise<Response> {
  // Защита: Telegram шлёт secret_token в этом заголовке если мы
  // его задали при setWebhook. Без проверки любой может POST'нуть
  // фейковый update.
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (secret) {
    const got = req.headers.get('x-telegram-bot-api-secret-token')
    if (got !== secret) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }
  }

  const update = await req.json().catch(() => null)
  if (!update) return NextResponse.json({ ok: true })

  const payload = await getPayload({ config })

  try {
    if (update.message) {
      await handleMessage(payload, update.message)
    } else if (update.callback_query) {
      await handleCallback(payload, update.callback_query)
    }
  } catch (err) {
    console.error('[tg webhook]', (err as Error).message)
    // Возвращаем 200 чтобы Telegram не ретраил.
  }

  return NextResponse.json({ ok: true })
}

async function handleMessage(payload: any, msg: any): Promise<void> {
  const chatId: number = msg.chat?.id
  const text: string = (msg.text ?? '').trim()
  if (!chatId) return

  // Команды начинаются со /.
  if (text.startsWith('/')) {
    const [cmd, ...rest] = text.split(/\s+/)
    const args = rest.join(' ').trim()
    const command = cmd!.split('@')[0]!.toLowerCase() // /channel@MyBot → /channel

    switch (command) {
      case '/start':
        await cmdStart(chatId)
        return
      case '/help':
        await tg.sendMessage({ chat_id: chatId, text: COMMANDS_HELP, parse_mode: 'HTML' })
        return
      case '/channels':
        await cmdChannels(payload, chatId)
        return
      case '/channel':
        await cmdChannel(payload, chatId, args)
        return
      case '/search':
        await cmdSearch(chatId, args)
        return
      case '/new':
        await cmdNewStart(payload, chatId)
        return
      case '/cancel':
        await clearSession(payload, chatId)
        await tg.sendMessage({ chat_id: chatId, text: 'Текущая операция отменена.' })
        return
      case '/register_channel':
        await cmdRegisterChannel(payload, chatId, msg, args)
        return
      default:
        await tg.sendMessage({
          chat_id: chatId,
          text: 'Неизвестная команда. Список: /help',
        })
        return
    }
  }

  // Не команда — может быть ответ внутри Q&A сессии.
  const session = await getSession(payload, chatId)
  if (session?.step) {
    await handleSessionStep(payload, chatId, session, text)
  } else {
    await tg.sendMessage({
      chat_id: chatId,
      text: 'Не понял. Список команд: /help',
    })
  }
}

// ─── Команды ──────────────────────────────────────────────────────

async function cmdStart(chatId: number): Promise<void> {
  await tg.sendMessage({
    chat_id: chatId,
    parse_mode: 'HTML',
    text:
      '👋 <b>Привет!</b> Я бот MegaDomic — помогаю найти и опубликовать недвижимость.\n\n' +
      COMMANDS_HELP,
  })
}

async function cmdChannels(payload: any, chatId: number): Promise<void> {
  const res = await payload.find({
    collection: 'telegram-channels',
    where: { isActive: { equals: true } },
    sort: 'cityName',
    limit: 50,
    depth: 0,
    overrideAccess: true,
  })
  if (res.docs.length === 0) {
    await tg.sendMessage({
      chat_id: chatId,
      text: 'Пока нет зарегистрированных каналов.',
    })
    return
  }
  const lines = res.docs.map((c: any) => {
    const link = c.channelUsername
      ? `https://t.me/${c.channelUsername}`
      : `(приватный, ID ${c.channelId})`
    return `• <b>${escapeHtml(c.cityName)}</b> — ${link}`
  })
  await tg.sendMessage({
    chat_id: chatId,
    parse_mode: 'HTML',
    text: `<b>Каналы по городам:</b>\n\n${lines.join('\n')}`,
    disable_web_page_preview: true,
  })
}

async function cmdChannel(payload: any, chatId: number, slugOrName: string): Promise<void> {
  if (!slugOrName) {
    await tg.sendMessage({
      chat_id: chatId,
      text: 'Использование: /channel <город>\nПример: /channel moskva',
    })
    return
  }
  const needle = slugOrName.toLowerCase()
  const res = await payload.find({
    collection: 'telegram-channels',
    where: {
      and: [{ isActive: { equals: true } }],
    },
    limit: 50,
    depth: 0,
    overrideAccess: true,
  })
  const found = (res.docs as any[]).find(
    (c) =>
      c.citySlug?.toLowerCase() === needle ||
      c.cityName?.toLowerCase() === needle,
  )
  if (!found) {
    await tg.sendMessage({
      chat_id: chatId,
      text: `Канал для «${slugOrName}» не найден. Список: /channels`,
    })
    return
  }
  const link = found.channelUsername
    ? `https://t.me/${found.channelUsername}`
    : `Приватный канал, ID: ${found.channelId}`
  await tg.sendMessage({
    chat_id: chatId,
    parse_mode: 'HTML',
    text: `📡 <b>${escapeHtml(found.cityName)}</b>\n${link}`,
    disable_web_page_preview: true,
  })
}

async function cmdRegisterChannel(
  payload: any,
  chatId: number,
  msg: any,
  args: string,
): Promise<void> {
  if (!isAdmin(chatId)) {
    await tg.sendMessage({
      chat_id: chatId,
      text: 'Только админ может регистрировать каналы.',
    })
    return
  }

  // /register_channel <slug> <city_name>
  // ИЛИ переслать любое сообщение из канала + /register_channel <slug> <name>
  const [slug, ...nameParts] = args.split(/\s+/)
  const cityName = nameParts.join(' ').trim()

  if (!slug || !cityName) {
    await tg.sendMessage({
      chat_id: chatId,
      text:
        'Использование: <code>/register_channel <slug> <Название города></code>\n' +
        'Сначала перешлите сюда любое сообщение из нужного канала.\n' +
        'Пример: <code>/register_channel moskva Москва</code>',
      parse_mode: 'HTML',
    })
    return
  }

  // Берём channel id из forward_from_chat (если переслано из канала)
  // или из reply_to_message. Иначе требуем явный передачи.
  const forwardChat = msg.reply_to_message?.forward_from_chat ?? msg.forward_from_chat
  if (!forwardChat || forwardChat.type !== 'channel') {
    await tg.sendMessage({
      chat_id: chatId,
      text:
        'Не вижу пересланного сообщения из канала. Перешлите боту любой пост ' +
        'из канала, и в ответном сообщении напишите эту команду.',
    })
    return
  }

  const channelId = String(forwardChat.id) // обычно -1001234567890
  const username = forwardChat.username ?? undefined

  try {
    await payload.create({
      collection: 'telegram-channels',
      data: {
        cityName,
        citySlug: slug,
        channelId,
        channelUsername: username,
        isActive: true,
      } as any,
      overrideAccess: true,
    })
    await tg.sendMessage({
      chat_id: chatId,
      parse_mode: 'HTML',
      text:
        `✅ Канал <b>${escapeHtml(forwardChat.title ?? cityName)}</b> привязан к городу ` +
        `<b>${escapeHtml(cityName)}</b> (slug <code>${escapeHtml(slug)}</code>).\n\n` +
        'Теперь новые объявления из этого города будут публиковаться сюда автоматически.',
    })
  } catch (err: any) {
    await tg.sendMessage({
      chat_id: chatId,
      text: `Ошибка: ${err?.message ?? 'unknown'}. Возможно, канал уже зарегистрирован.`,
    })
  }
}

async function cmdSearch(chatId: number, query: string): Promise<void> {
  if (!query) {
    await tg.sendMessage({
      chat_id: chatId,
      text: 'Использование: /search <запрос>\nПример: /search 2 комн в москве до 15 млн',
    })
    return
  }
  await sendSearchResults(chatId, query, 0)
}

async function sendSearchResults(
  chatId: number,
  query: string,
  offset: number,
): Promise<void> {
  const base = getServerSideURL()
  const url = `${base}/api/ai-search?q=${encodeURIComponent(query)}&limit=3&offset=${offset}`
  let data: any
  try {
    const res = await fetch(url)
    data = await res.json()
  } catch {
    await tg.sendMessage({
      chat_id: chatId,
      text: 'Поиск временно недоступен. Попробуйте позже.',
    })
    return
  }
  const results = (data?.results ?? []) as any[]
  if (results.length === 0) {
    await tg.sendMessage({
      chat_id: chatId,
      text:
        offset === 0
          ? 'По запросу ничего не нашлось. Попробуйте упростить.'
          : 'Это всё, что есть по запросу.',
    })
    return
  }

  for (const hit of results) {
    const doc = hit.doc ?? {}
    const link = `${base}/${hit.collection}/${doc.slug}`
    const caption =
      `<b>${escapeHtml(doc.title ?? '—')}</b>\n` +
      (typeof doc.price === 'number'
        ? `${doc.price.toLocaleString('ru-RU')} ₽\n`
        : '') +
      (doc.location?.address ? `📍 ${escapeHtml(doc.location.address)}\n` : '') +
      `\n${link}`
    const img = doc.images?.[0]?.image?.url
    const photo = img ? new URL(img, base).toString() : null
    const replyMarkup = {
      inline_keyboard: [[{ text: '📋 Открыть', url: link }]],
    }
    if (photo) {
      await tg.sendPhoto({
        chat_id: chatId,
        photo,
        caption,
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      })
    } else {
      await tg.sendMessage({
        chat_id: chatId,
        text: caption,
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      })
    }
  }

  // Кнопка «Ещё».
  if (results.length === 3) {
    await tg.sendMessage({
      chat_id: chatId,
      text: `Показано ${offset + results.length}. Ещё?`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '▶ Ещё 3',
              callback_data: `page:${offset + 3}:${query.slice(0, 40)}`,
            },
          ],
        ],
      },
    })
  }
}

// ─── Q&A создание объявления ──────────────────────────────────────

const NEW_STEPS = ['city', 'address', 'title', 'price', 'rooms', 'area'] as const

async function cmdNewStart(payload: any, chatId: number): Promise<void> {
  if (!isAdmin(chatId)) {
    await tg.sendMessage({
      chat_id: chatId,
      text:
        'Создавать объявления через бота могут только админы. ' +
        'Если у вас есть объект — отправьте заявку через сайт ' +
        '(megadomic.ru) или ответьте «да» в чате риэлтора.',
    })
    return
  }
  await setSession(payload, chatId, 'new:city', { collection: 'flats' })
  await tg.sendMessage({
    chat_id: chatId,
    text:
      'Создаём новое объявление (квартира).\n\n' +
      '1/6 — Город? (например, Москва)\n\n' +
      'Любой шаг можно отменить через /cancel',
  })
}

async function handleSessionStep(
  payload: any,
  chatId: number,
  session: any,
  text: string,
): Promise<void> {
  const step = session.step as string
  const draft = session.draft ?? {}

  if (step === 'new:city') {
    draft.location = { city: text }
    await setSession(payload, chatId, 'new:address', draft)
    await tg.sendMessage({ chat_id: chatId, text: '2/6 — Адрес?' })
  } else if (step === 'new:address') {
    draft.location = { ...(draft.location ?? {}), address: text, district: text }
    await setSession(payload, chatId, 'new:title', draft)
    await tg.sendMessage({ chat_id: chatId, text: '3/6 — Заголовок объявления?' })
  } else if (step === 'new:title') {
    draft.title = text
    await setSession(payload, chatId, 'new:price', draft)
    await tg.sendMessage({ chat_id: chatId, text: '4/6 — Цена в ₽? (число)' })
  } else if (step === 'new:price') {
    const n = Number(text.replace(/\s/g, ''))
    if (!Number.isFinite(n) || n <= 0) {
      await tg.sendMessage({ chat_id: chatId, text: 'Цена должна быть положительным числом.' })
      return
    }
    draft.price = n
    await setSession(payload, chatId, 'new:rooms', draft)
    await tg.sendMessage({
      chat_id: chatId,
      text: '5/6 — Сколько комнат? (studio | 1 | 2 | 3 | 4 | 5plus)',
    })
  } else if (step === 'new:rooms') {
    const valid = ['studio', '1', '2', '3', '4', '5plus']
    const v = text.toLowerCase()
    if (!valid.includes(v)) {
      await tg.sendMessage({
        chat_id: chatId,
        text: 'Введите одно из: studio, 1, 2, 3, 4, 5plus',
      })
      return
    }
    draft.rooms = v
    await setSession(payload, chatId, 'new:area', draft)
    await tg.sendMessage({ chat_id: chatId, text: '6/6 — Общая площадь в м²?' })
  } else if (step === 'new:area') {
    const n = Number(text.replace(/\s/g, '').replace(',', '.'))
    if (!Number.isFinite(n) || n <= 0) {
      await tg.sendMessage({ chat_id: chatId, text: 'Площадь должна быть положительным числом.' })
      return
    }
    draft.area = { total: n }
    // Создаём документ как draft — модератор/риэлтор подтверждает фото и публикует.
    try {
      const created = await payload.create({
        collection: draft.collection || 'flats',
        data: {
          ...draft,
          status: 'draft',
          propertyCategory: 'apartment',
          transactionType: 'sale',
          currency: 'RUB',
        } as any,
        overrideAccess: true,
      })
      await clearSession(payload, chatId)
      const base = getServerSideURL()
      await tg.sendMessage({
        chat_id: chatId,
        parse_mode: 'HTML',
        text:
          `✅ Создано как draft.\n` +
          `Редактировать и опубликовать: <a href="${base}/admin/collections/flats/${created.id}">в админке</a>`,
      })
    } catch (err: any) {
      await tg.sendMessage({
        chat_id: chatId,
        text: `Ошибка создания: ${err?.message ?? 'unknown'}`,
      })
      await clearSession(payload, chatId)
    }
  } else {
    // Неизвестное состояние — сбрасываем.
    await clearSession(payload, chatId)
    await tg.sendMessage({
      chat_id: chatId,
      text: 'Сессия сброшена. Новая команда: /help',
    })
  }
}

// ─── Callbacks (inline keyboard) ──────────────────────────────────

async function handleCallback(payload: any, cb: any): Promise<void> {
  const data: string = cb.data ?? ''
  const chatId: number = cb.message?.chat?.id

  await tg.answerCallbackQuery(cb.id)

  if (!chatId) return

  // page:<offset>:<query>
  if (data.startsWith('page:')) {
    const [, offsetStr, ...rest] = data.split(':')
    const offset = Number(offsetStr) || 0
    const query = rest.join(':')
    await sendSearchResults(chatId, query, offset)
    return
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

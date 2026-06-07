/**
 * Минимальный HTTP-клиент Bot API без зависимостей.
 *
 * Telegram Bot API: https://core.telegram.org/bots/api
 *
 * Env:
 *   TELEGRAM_BOT_TOKEN     — токен от @BotFather (формат 123:ABC...)
 *   TELEGRAM_ADMIN_CHAT_ID — chat_id куда слать админ-уведомления
 *                            (получить: написать боту, вытащить из getUpdates)
 *   TELEGRAM_WEBHOOK_SECRET — секрет для проверки X-Telegram-Bot-Api-Secret-Token
 *                              (можно сгенерировать openssl rand -hex 32)
 */

const API = (token: string, method: string) =>
  `https://api.telegram.org/bot${token}/${method}`

interface InlineKeyboardButton {
  text: string
  callback_data?: string
  url?: string
}

interface SendMessageOptions {
  chat_id: number | string
  text: string
  parse_mode?: 'HTML' | 'MarkdownV2'
  disable_web_page_preview?: boolean
  reply_markup?: {
    inline_keyboard: InlineKeyboardButton[][]
  }
}

interface SendPhotoOptions {
  chat_id: number | string
  photo: string // URL or file_id
  caption?: string
  parse_mode?: 'HTML' | 'MarkdownV2'
  reply_markup?: {
    inline_keyboard: InlineKeyboardButton[][]
  }
}

interface ApiResult<T = any> {
  ok: boolean
  result?: T
  error_code?: number
  description?: string
}

async function call<T = any>(
  method: string,
  body: Record<string, any>,
): Promise<ApiResult<T>> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) {
    return { ok: false, description: 'TELEGRAM_BOT_TOKEN not set' }
  }
  try {
    const res = await fetch(API(token, method), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return (await res.json()) as ApiResult<T>
  } catch (err) {
    return { ok: false, description: (err as Error).message }
  }
}

export const tg = {
  sendMessage: (opts: SendMessageOptions) => call('sendMessage', opts),
  sendPhoto: (opts: SendPhotoOptions) => call('sendPhoto', opts),
  setWebhook: (url: string, secretToken?: string) =>
    call('setWebhook', {
      url,
      ...(secretToken ? { secret_token: secretToken } : {}),
      allowed_updates: ['message', 'callback_query'],
    }),
  deleteWebhook: () => call('deleteWebhook', {}),
  getWebhookInfo: () => call('getWebhookInfo', {}),
  answerCallbackQuery: (callback_query_id: string, text?: string) =>
    call('answerCallbackQuery', { callback_query_id, text }),
  /** Шлёт админу — используется для биндинга каналов и ошибок. */
  notifyAdmin: async (text: string): Promise<void> => {
    const adminId = process.env.TELEGRAM_ADMIN_CHAT_ID
    if (!adminId) {
      console.warn('[tg] TELEGRAM_ADMIN_CHAT_ID not set, notification skipped:', text)
      return
    }
    await call('sendMessage', {
      chat_id: adminId,
      text,
      parse_mode: 'HTML',
    })
  },
}

export type { InlineKeyboardButton, SendMessageOptions, SendPhotoOptions }

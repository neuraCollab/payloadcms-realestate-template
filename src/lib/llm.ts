/**
 * Тонкий LLM-клиент. Без зависимостей. Поддерживает 2 провайдера:
 *   • anthropic (Claude Haiku) — для recommendation engine, premium edit
 *   • openai (gpt-4o-mini)     — для bulk SEO generation (×5 дешевле)
 *
 * Env:
 *   ANTHROPIC_API_KEY — для anthropic-провайдера
 *   ANTHROPIC_MODEL   — опц., default 'claude-haiku-4-5'
 *   OPENAI_API_KEY    — для openai-провайдера
 *   OPENAI_MODEL      — опц., default 'gpt-4o-mini'
 *
 * Никогда не throws. Возвращает null при отсутствии ключа / сетевой
 * ошибке / тайм-ауте.
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const DEFAULT_ANTHROPIC_MODEL = 'claude-haiku-4-5'
const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini'
const REQ_TIMEOUT_MS = 30000 // 30с — для bulk-генерации SEO допускаем longer

export type Provider = 'anthropic' | 'openai'

export function shouldUseLLM(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY)
}

export function shouldUseProvider(p: Provider): boolean {
  if (p === 'anthropic') return Boolean(process.env.ANTHROPIC_API_KEY)
  return Boolean(process.env.OPENAI_API_KEY)
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatOptions {
  /** System prompt — инструкция модели. */
  system?: string
  /** Hard cap. Дефолт 256 — для коротких ответов. */
  maxTokens?: number
  /** 0.0..1.0 — для extraction ставим низкий (детерминизм). */
  temperature?: number
  /**
   * Выбор провайдера. По умолчанию anthropic (для recommendation
   * engine). Для SEO bulk generation передаём 'openai' — gpt-4o-mini
   * в 5× дешевле Haiku на длинных текстах.
   */
  provider?: Provider
}

/**
 * Generic chat completion. Возвращает text ответа модели или null
 * на ошибку. Никогда не бросает.
 */
export async function chat(
  messages: Message[],
  opts: ChatOptions = {},
): Promise<string | null> {
  const provider = opts.provider ?? 'anthropic'
  if (provider === 'openai') return chatOpenAI(messages, opts)
  return chatAnthropic(messages, opts)
}

async function chatAnthropic(
  messages: Message[],
  opts: ChatOptions,
): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), REQ_TIMEOUT_MS)
  try {
    const res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: opts.maxTokens ?? 256,
        temperature: opts.temperature ?? 0.2,
        ...(opts.system ? { system: opts.system } : {}),
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    })
    clearTimeout(timer)
    if (!res.ok) {
      console.warn('[llm:anthropic]', res.status, await res.text().catch(() => ''))
      return null
    }
    const data = (await res.json()) as { content?: Array<{ text?: string }> }
    const text = data.content?.[0]?.text
    return typeof text === 'string' ? text.trim() : null
  } catch (err) {
    clearTimeout(timer)
    console.warn('[llm:anthropic] network', (err as Error).message)
    return null
  }
}

async function chatOpenAI(
  messages: Message[],
  opts: ChatOptions,
): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null
  const model = process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), REQ_TIMEOUT_MS)

  // OpenAI принимает system как первое message.
  const finalMessages: Array<{ role: string; content: string }> = []
  if (opts.system) {
    finalMessages.push({ role: 'system', content: opts.system })
  }
  for (const m of messages) {
    finalMessages.push({ role: m.role, content: m.content })
  }

  try {
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: opts.maxTokens ?? 256,
        temperature: opts.temperature ?? 0.2,
        messages: finalMessages,
        // response_format: json_object форсит JSON, но требует слова
        // «JSON» в промпте. Для SEO-промптов добавляем явно.
      }),
    })
    clearTimeout(timer)
    if (!res.ok) {
      console.warn('[llm:openai]', res.status, await res.text().catch(() => ''))
      return null
    }
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const text = data.choices?.[0]?.message?.content
    return typeof text === 'string' ? text.trim() : null
  } catch (err) {
    clearTimeout(timer)
    console.warn('[llm:openai] network', (err as Error).message)
    return null
  }
}

/**
 * Извлекает структурированные фильтры из NL-промпта.
 * Используется в recommendation engine.
 */
export async function extractFiltersLLM(
  prompt: string,
): Promise<Record<string, any> | null> {
  if (!shouldUseLLM()) return null

  const system = `Ты — анализатор поисковых запросов по недвижимости в России.
По русскому запросу возвращай ТОЛЬКО валидный JSON со следующими опциональными полями:
{
  "city": "Москва" | "Санкт-Петербург" | ...,  // точное название города в им.падеже
  "rooms": "studio" | "1" | "2" | "3" | "4" | "5plus",
  "minPrice": number,  // в рублях
  "maxPrice": number,
  "transactionType": "sale" | "rent" | "daily",
  "tags": ["метро", "парк", "новостройка", ...]  // ключевые слова
}
Не добавляй комментариев. Не оборачивай в код-блоки. Только JSON.
Если поле непонятно из запроса — пропусти.`

  const res = await chat([{ role: 'user', content: prompt }], {
    system,
    maxTokens: 256,
    temperature: 0.0,
  })
  if (!res) return null
  try {
    const direct = JSON.parse(res)
    if (typeof direct === 'object') return direct
  } catch {
    /* fallback */
  }
  const m = res.match(/\{[\s\S]*\}/)
  if (m) {
    try {
      const j = JSON.parse(m[0])
      if (typeof j === 'object') return j
    } catch {
      /* invalid */
    }
  }
  return null
}

/**
 * Генерирует 1-строчное объяснение «почему рекомендуем» для объекта.
 */
export async function explainMatchLLM(
  userPrompt: string,
  propertyDesc: string,
): Promise<string | null> {
  if (!shouldUseLLM()) return null
  const system = `Ты — помощник по недвижимости. На русском, 1 предложение, ≤ 120 символов.
Объясни почему конкретный объект подходит под запрос пользователя.
Не повторяй очевидное (название, цену). Подсвети 1-2 ключевых совпадения.
Без воды.`
  const res = await chat(
    [
      {
        role: 'user',
        content: `Запрос: «${userPrompt}»\nОбъект: ${propertyDesc}`,
      },
    ],
    { system, maxTokens: 120, temperature: 0.3 },
  )
  if (!res) return null
  return res.length > 200 ? res.slice(0, 197) + '…' : res
}

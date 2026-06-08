/**
 * Тонкий LLM-клиент. Без зависимостей, прямой fetch к Anthropic
 * Messages API. Достаточно для двух use case'ов:
 *   1. Извлечение структурированных фильтров из NL-промпта.
 *   2. Генерация 1-строчных объяснений «почему рекомендовано».
 *
 * Env:
 *   ANTHROPIC_API_KEY — обязательно (без него shouldUseLLM() = false)
 *   ANTHROPIC_MODEL   — опционально, default 'claude-haiku-4-5'
 *
 * Все промпты — короткие и инструктивные. Цель — держать токены под
 * 500 на запрос (~$0.0001 на gpt-4o-mini-ish, ~$0.0002 на Haiku).
 */

const API_URL = 'https://api.anthropic.com/v1/messages'
const DEFAULT_MODEL = 'claude-haiku-4-5'
const REQ_TIMEOUT_MS = 8000

export function shouldUseLLM(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY)
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
}

/**
 * Generic chat completion. Возвращает text ответа модели или null
 * на ошибку. Никогда не бросает — recommendation engine не должен
 * падать на сетевой ошибке.
 */
export async function chat(
  messages: Message[],
  opts: ChatOptions = {},
): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null

  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), REQ_TIMEOUT_MS)

  try {
    const res = await fetch(API_URL, {
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
      console.warn('[llm] non-OK', res.status, await res.text().catch(() => ''))
      return null
    }
    const data = (await res.json()) as { content?: Array<{ text?: string }> }
    // Anthropic возвращает content: [{ type: 'text', text: '...' }]
    const text = data.content?.[0]?.text
    return typeof text === 'string' ? text.trim() : null
  } catch (err) {
    clearTimeout(timer)
    console.warn('[llm] network', (err as Error).message)
    return null
  }
}

/**
 * Извлекает структурированные фильтры из NL-промпта.
 * Используется в recommendation engine для precise pre-filtering.
 *
 * Возвращает { city?, rooms?, minPrice?, maxPrice?, transactionType?,
 *              tags?: string[] }. Поля опциональны — LLM не выдумывает.
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
    // Сначала пробуем как есть, потом ищем фигурные скобки на случай
    // если модель вернула с текстом до/после.
    const direct = JSON.parse(res)
    if (typeof direct === 'object') return direct
  } catch {
    /* ниже fallback */
  }
  const m = res.match(/\{[\s\S]*\}/)
  if (m) {
    try {
      const j = JSON.parse(m[0])
      if (typeof j === 'object') return j
    } catch {
      /* нет валидного JSON — возвращаем null */
    }
  }
  return null
}

/**
 * Генерирует 1-строчное объяснение «почему рекомендуем» для объекта.
 * `userPrompt` — оригинальный запрос юзера, `propertyDesc` — краткое
 * описание объекта (title + city + price + специфика).
 *
 * Возвращает строку ≤ 120 символов на русском.
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

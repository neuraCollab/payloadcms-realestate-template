/**
 * Клиент к HuggingFace text-embeddings-inference (TEI).
 *
 * TEI API: POST /embed принимает `{ inputs: string | string[] }`
 * возвращает `number[][]` (массив векторов, по одному на input).
 *
 * Конфиг через env:
 *   EMBEDDINGS_URL    — http://tei:80
 *   EMBEDDING_MODEL   — bge-m3 (имя для записи в БД, не для TEI)
 *   EMBEDDING_DIM     — 1024 (для assert'а)
 */

const URL_BASE = (process.env.EMBEDDINGS_URL ?? '').replace(/\/+$/, '')
export const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL ?? 'bge-m3'
export const EMBEDDING_DIM = Number(process.env.EMBEDDING_DIM ?? '1024')

/**
 * e5 / multilingual-e5 модели требуют InfoNCE-стайл префиксы:
 *   • документы индексируются как `passage: <текст>`
 *   • запросы эмбеддятся как `query: <текст>`
 * Без префиксов similarity между запросом и документом получается
 * мутной — модель обучалась именно с ними. BGE-M3 префиксов не требует.
 */
const NEEDS_E5_PREFIX = /e5/i.test(EMBEDDING_MODEL)
export const passagePrefix = (s: string): string =>
  NEEDS_E5_PREFIX ? `passage: ${s}` : s
export const queryPrefix = (s: string): string =>
  NEEDS_E5_PREFIX ? `query: ${s}` : s

export class EmbeddingsClientError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message)
    this.name = 'EmbeddingsClientError'
  }
}

export const isConfigured = (): boolean => Boolean(URL_BASE)

const FETCH_TIMEOUT_MS = 20_000

/**
 * Embed одного или нескольких текстов. TEI поддерживает batching,
 * передавай массив — он эффективнее многих одиночных запросов.
 */
export async function embed(
  inputs: string | string[],
  options: { signal?: AbortSignal } = {},
): Promise<number[][]> {
  if (!URL_BASE) {
    throw new EmbeddingsClientError('EMBEDDINGS_URL not configured')
  }

  const list = Array.isArray(inputs) ? inputs : [inputs]
  if (list.length === 0) return []

  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
  if (options.signal) {
    options.signal.addEventListener('abort', () => ctrl.abort(), { once: true })
  }

  try {
    const res = await fetch(`${URL_BASE}/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: list, truncate: true }),
      signal: ctrl.signal,
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new EmbeddingsClientError(
        `TEI embed failed: ${res.status} ${res.statusText} ${body.slice(0, 200)}`,
        res.status,
      )
    }

    const vectors = (await res.json()) as number[][]
    if (!Array.isArray(vectors) || vectors.length !== list.length) {
      throw new EmbeddingsClientError('TEI returned malformed response')
    }
    if (vectors[0] && vectors[0].length !== EMBEDDING_DIM) {
      throw new EmbeddingsClientError(
        `Dim mismatch: expected ${EMBEDDING_DIM}, got ${vectors[0].length}`,
      )
    }
    return vectors
  } finally {
    clearTimeout(timeout)
  }
}

/** Удобный helper для одного текста. */
export async function embedOne(input: string): Promise<number[]> {
  const [vec] = await embed([input])
  if (!vec) throw new EmbeddingsClientError('Empty embedding result')
  return vec
}

/**
 * Эмбеддит «query» — пользовательский запрос. Применяет префикс
 * автоматически в зависимости от модели.
 */
export async function embedQuery(input: string): Promise<number[]> {
  return embedOne(queryPrefix(input))
}

/**
 * Эмбеддит «passage» — сериализованный документ.
 */
export async function embedPassage(input: string): Promise<number[]> {
  return embedOne(passagePrefix(input))
}

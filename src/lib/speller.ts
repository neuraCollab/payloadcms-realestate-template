/**
 * Yandex Speller API integration to correct user queries before LLM/heuristic parsing.
 */

interface YandexSpellerError {
  code: number
  pos: number
  row: number
  col: number
  len: number
  word: string
  s: string[]
}

const SPELLER_URL = 'https://speller.yandex.net/services/spellservice.json/checkText'
const REQ_TIMEOUT_MS = 3000

/**
 * Sends text to Yandex Speller API and returns the corrected version.
 * If the API fails or times out, it gracefully falls back to the original text.
 */
export async function correctTypos(text: string): Promise<string> {
  if (!text.trim()) return text

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), REQ_TIMEOUT_MS)

  try {
    const params = new URLSearchParams()
    params.append('text', text)
    // Options:
    // IGNORE_URLS (2) + IGNORE_LATIN (4) (optional, maybe not ignore latin if we want to correct things like "appertment"?)
    // Default options are mostly fine. Just specify language.
    params.append('lang', 'ru,en')
    // Option 512 = IGNORE_CAPITALIZATION
    params.append('options', '512')

    const res = await fetch(`${SPELLER_URL}?${params.toString()}`, {
      method: 'GET',
      signal: ctrl.signal,
    })

    clearTimeout(timer)
    if (!res.ok) {
      console.warn('[speller] API returned status', res.status)
      return text
    }

    const errors = (await res.json()) as YandexSpellerError[]

    if (!errors || errors.length === 0) {
      return text
    }

    // Process errors from the end of the string to the beginning so indices don't shift
    let corrected = text
    const sortedErrors = [...errors].sort((a, b) => b.pos - a.pos)

    for (const error of sortedErrors) {
      if (error.s && error.s.length > 0) {
        const replacement = error.s[0]!
        corrected = corrected.substring(0, error.pos) + replacement + corrected.substring(error.pos + error.len)
      }
    }

    return corrected
  } catch (err) {
    clearTimeout(timer)
    console.warn('[speller] request failed', (err as Error).message)
    return text // Fallback to original text on failure
  }
}

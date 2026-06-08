/**
 * Серверная утилита: по IP узнаём город пользователя.
 *
 * Стратегия:
 *   1. Cloudflare-заголовок `cf-ipcity` — если сидим за CF (не наш кейс,
 *      но дешёвый short-circuit когда появится).
 *   2. ip-api.com — free 45 req/min, без ключа, ru-ответ.
 *   3. Памятный кэш — TTL 24 часа, ключ IP. Защита от 45 req/min при
 *      всплеске трафика.
 *   4. На любую ошибку — возвращаем null, главная подставит дефолтный
 *      город (Москва) — never blocks render.
 *
 * Fail-open by design: разрешение города нельзя считать критичным
 * сервисом, его таймауты не должны лагать главную.
 */

interface CacheEntry {
  city: string | null
  expiresAt: number
}

const cache = new Map<string, CacheEntry>()
const TTL_MS = 24 * 60 * 60_000
const FETCH_TIMEOUT_MS = 1500 // быстро отваливаемся, рендер главной важнее

/** Локалхост / приватные IP → null без запроса (не пробьются всё равно). */
function isPrivateIp(ip: string): boolean {
  if (!ip) return true
  if (ip === '127.0.0.1' || ip === '::1') return true
  if (ip.startsWith('10.')) return true
  if (ip.startsWith('192.168.')) return true
  if (ip.startsWith('172.')) {
    // 172.16/12 → 172.16.0.0 — 172.31.255.255
    const second = parseInt(ip.split('.')[1] ?? '0', 10)
    if (second >= 16 && second <= 31) return true
  }
  return false
}

export function ipFromHeaders(headers: Headers): string {
  // Cloudflare заголовок — самый надёжный когда мы за CF.
  const cf = headers.get('cf-connecting-ip')
  if (cf) return cf.trim()
  const xff = headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]!.trim()
  const real = headers.get('x-real-ip')
  if (real) return real.trim()
  return ''
}

/**
 * Возвращает русское название города (например, «Москва») или null.
 * Безопасно вызывать из любого SSR route — не throws.
 */
export async function detectCityFromIp(ip: string): Promise<string | null> {
  if (!ip || isPrivateIp(ip)) return null

  const now = Date.now()
  const cached = cache.get(ip)
  if (cached && cached.expiresAt > now) return cached.city

  // ip-api.com — поля city/country. lang=ru даёт «Москва» вместо «Moscow».
  const url = `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,city,lang&lang=ru`

  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
    const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store' })
    clearTimeout(t)
    if (!res.ok) {
      cache.set(ip, { city: null, expiresAt: now + TTL_MS })
      return null
    }
    const data = (await res.json()) as { status?: string; city?: string }
    const city = data.status === 'success' && data.city ? data.city : null
    cache.set(ip, { city, expiresAt: now + TTL_MS })
    return city
  } catch {
    cache.set(ip, { city: null, expiresAt: now + 60_000 }) // короткий TTL на ошибки
    return null
  }
}

/** Прямой helper: достать ip из заголовков и получить город. */
export async function detectCityFromRequestHeaders(
  headers: Headers,
): Promise<string | null> {
  return detectCityFromIp(ipFromHeaders(headers))
}

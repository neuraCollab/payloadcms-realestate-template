/**
 * Единая авторизация для seed/admin endpoints.
 *
 * • В dev (NODE_ENV !== 'production') — открыто, можно дёргать curl'ом.
 * • В prod — нужен заголовок `Authorization: Bearer ${CRON_SECRET}`.
 *
 * Раньше эти эндпоинты молча отдавали 403 в проде через
 * `if (process.env.NODE_ENV === 'production')`. Это ломало
 * первый деплой — после `git pull` на сервере не было способа
 * засеять контент. Теперь — единый Bearer-токен решает.
 */
import { secureCompare } from './secureCompare'

export function requireSeedAuth(req: Request): Response | null {
  if (process.env.NODE_ENV !== 'production') return null

  const auth = req.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (!expected) {
    return new Response(
      JSON.stringify({
        error: 'CRON_SECRET not configured on the server',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  let isAuthorized = false
  if (auth) {
    isAuthorized = secureCompare(auth, `Bearer ${expected}`)
  }

  if (!isAuthorized) {
    return new Response(
      JSON.stringify({
        error: 'Unauthorized. Send header: Authorization: Bearer <CRON_SECRET>',
      }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    )
  }
  return null
}

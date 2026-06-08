import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isProviderId, getProvider, providerConfigured } from '@/lib/auth/oauth/providers'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * GET /api/auth/oauth/[provider]/callback?code=...&state=...
 *
 * Завершает OAuth-флоу:
 *   1. Проверяет state против куки (CSRF)
 *   2. POST на /token endpoint провайдера → access_token
 *   3. GET на userinfo → достаём verified email
 *   4. Ставим realty_email cookie (тот же что использует magic-link
 *      auth — единый identity-механизм кабинета)
 *   5. Редирект на oauth_next (или /cabinet/chats)
 *
 * При любой ошибке редиректим на /cabinet/login?error=... — юзеру
 * показывается дружелюбное сообщение, никаких stacktrace.
 */

const COOKIE_NAME = 'realty_email'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90 // 90 days, как у magic-link

function errorRedirect(req: NextRequest, code: string): NextResponse {
  const url = new URL(`/cabinet/login?error=oauth_${code}`, req.url)
  return NextResponse.redirect(url, { status: 303 })
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
): Promise<Response> {
  const { provider } = await params
  if (!isProviderId(provider)) return errorRedirect(req, 'unknown_provider')
  if (!providerConfigured(provider)) return errorRedirect(req, 'not_configured')

  const cfg = getProvider(provider)
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const err = url.searchParams.get('error')

  if (err) return errorRedirect(req, 'cancelled')
  if (!code || !state) return errorRedirect(req, 'missing_code')

  // CSRF: state из куки vs state в URL.
  const c = await cookies()
  const expectedState = c.get('oauth_state')?.value
  if (!expectedState || expectedState !== state) {
    return errorRedirect(req, 'state_mismatch')
  }
  const next = c.get('oauth_next')?.value
    ? decodeURIComponent(c.get('oauth_next')!.value)
    : '/cabinet/chats'

  const base = getServerSideURL()
  const redirectUri = `${base}/api/auth/oauth/${provider}/callback`

  // 1) code → access_token
  let accessToken: string
  try {
    const tokenRes = await fetch(cfg.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env[cfg.envClientId]!,
        client_secret: process.env[cfg.envClientSecret]!,
        redirect_uri: redirectUri,
      }).toString(),
    })
    if (!tokenRes.ok) {
      console.error('[oauth]', provider, 'token exchange', await tokenRes.text())
      return errorRedirect(req, 'token_exchange')
    }
    const tokenData = (await tokenRes.json()) as { access_token?: string }
    if (!tokenData.access_token) return errorRedirect(req, 'no_token')
    accessToken = tokenData.access_token
  } catch (e) {
    console.error('[oauth]', provider, 'token network', e)
    return errorRedirect(req, 'token_network')
  }

  // 2) access_token → userinfo
  let email: string | null = null
  try {
    const authHeader = `${cfg.userinfoAuthScheme} ${accessToken}`
    const uiRes = await fetch(cfg.userinfoUrl, {
      headers: { Authorization: authHeader, Accept: 'application/json' },
    })
    if (!uiRes.ok) {
      console.error('[oauth]', provider, 'userinfo', await uiRes.text())
      return errorRedirect(req, 'userinfo')
    }
    const ui = await uiRes.json()
    const raw = ui?.[cfg.emailField]
    if (typeof raw === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
      email = raw.toLowerCase()
    }
  } catch (e) {
    console.error('[oauth]', provider, 'userinfo network', e)
    return errorRedirect(req, 'userinfo_network')
  }

  if (!email) return errorRedirect(req, 'no_email')

  // Successful auth — ставим cookie + редиректим.
  const res = NextResponse.redirect(new URL(next, req.url), { status: 303 })
  const isProd = process.env.NODE_ENV === 'production'
  res.cookies.set(COOKIE_NAME, email, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    httpOnly: false, // нужен клиентскому коду /cabinet
    secure: isProd,
  })
  // Чистим OAuth-куки.
  res.cookies.set('oauth_state', '', { path: '/', maxAge: 0 })
  res.cookies.set('oauth_next', '', { path: '/', maxAge: 0 })
  return res
}

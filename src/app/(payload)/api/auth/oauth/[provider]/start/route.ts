import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import {
  isProviderId,
  providerConfigured,
  getProvider,
} from '@/lib/auth/oauth/providers'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * GET /api/auth/oauth/[provider]/start
 *
 * Стартует OAuth-флоу: генерит state-cookie (CSRF) и редиректит на
 * consent screen провайдера.
 *
 * Параметр ?next=/path сохраняем в state-куки чтобы потом вернуть
 * пользователя на ту же страницу куда он шёл изначально.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
): Promise<Response> {
  const { provider } = await params
  if (!isProviderId(provider)) {
    return NextResponse.json({ error: 'unknown_provider' }, { status: 404 })
  }
  if (!providerConfigured(provider)) {
    return NextResponse.json(
      { error: 'not_configured', message: `${provider} OAuth не настроен. См. docs/AUTH-OAUTH-SETUP.md` },
      { status: 503 },
    )
  }

  const cfg = getProvider(provider)
  const base = getServerSideURL()
  const next =
    new URL(req.url).searchParams.get('next')?.startsWith('/') &&
    new URL(req.url).searchParams.get('next')
  const safeNext = typeof next === 'string' ? next : '/cabinet/chats'

  // CSRF-state — случайные 32 байта. Хранится в cookie, сверяем
  // в callback. Покрывает CSRF + позволяет связать сессии.
  const state = randomBytes(16).toString('hex')

  const authUrl = new URL(cfg.authUrl)
  authUrl.searchParams.set('client_id', process.env[cfg.envClientId]!)
  authUrl.searchParams.set('redirect_uri', `${base}/api/auth/oauth/${provider}/callback`)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', cfg.scope)
  authUrl.searchParams.set('state', state)

  const res = NextResponse.redirect(authUrl.toString(), { status: 303 })

  // Кука короткоживущая (10 минут — этого хватит на сценарий «открыл
  // окно провайдера, ввёл пароль»). httpOnly, потому что клиенту читать
  // не нужно. SameSite=lax — нужен для рефлекшен в callback.
  const cookieAttrs = [
    `oauth_state=${state}`,
    'Path=/',
    'Max-Age=600',
    'SameSite=Lax',
    'HttpOnly',
    process.env.NODE_ENV === 'production' ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ')
  res.headers.append('Set-Cookie', cookieAttrs)

  // Куда вернуть юзера после успешной авторизации.
  res.headers.append(
    'Set-Cookie',
    `oauth_next=${encodeURIComponent(safeNext)}; Path=/; Max-Age=600; SameSite=Lax${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
  )

  return res
}

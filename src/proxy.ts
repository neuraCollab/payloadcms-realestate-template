import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Next.js 16 only allows a single "./src/proxy.ts" (middleware.ts is no
// longer supported alongside it — having both throws at boot). This file
// therefore does two jobs that used to live in two separate files:
//   1. next-intl locale routing (was src/middleware.ts)
//   2. /cabinet auth-gate redirect (original content of this file)

const intlMiddleware = createMiddleware(routing)

// Публичные роуты внутри /cabinet, доступные гостям (неавторизованным пользователям)
const publicCabinetPaths = ['/cabinet/login', '/cabinet/favorites', '/cabinet/recent']

// Strips a leading non-default locale prefix (e.g. "/kz") so cabinet-route
// checks below can work in locale-agnostic terms. The default locale (ru)
// is never prefixed under the "as-needed" strategy, so there's nothing to
// strip for it.
function stripLocalePrefix(pathname: string): string {
  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || '/'
    }
  }
  return pathname
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const unprefixed = stripLocalePrefix(pathname)

  const isCabinetRoute = unprefixed === '/cabinet' || unprefixed.startsWith('/cabinet/')

  if (isCabinetRoute && !publicCabinetPaths.includes(unprefixed)) {
    const email = request.cookies.get('realty_email')?.value

    if (!email) {
      const localePrefix = pathname.slice(0, pathname.length - unprefixed.length)
      const loginUrl = new URL(`${localePrefix}/cabinet/login`, request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  // Skip: /admin, /api/*, /next/* (seed/preview/operational routes),
  // Next.js internals, and any file with an extension (static assets,
  // robots.txt, the *-sitemap.xml routes — all excluded by the dot rule).
  // The (?:...)(?:/|$) exclusions are anchored to a path-segment boundary
  // so they only exclude those literal segments, not any path that merely
  // starts with the same characters (e.g. "/apidocs", "/administration").
  matcher: ['/((?!(?:admin|api|next|_next)(?:/|$)|.*\\..*).*)'],
}

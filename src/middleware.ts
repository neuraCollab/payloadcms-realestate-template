import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Skip: /admin, /api/*, /next/* (seed/preview/operational routes),
  // Next.js internals, any file with an extension (static assets,
  // robots.txt), and the three *-sitemap.xml routes.
  matcher: ['/((?!admin|api|next|_next|.*\\..*|.*-sitemap\\.xml).*)'],
}

import { test, expect, request } from '@playwright/test'

// Public routes that should all return 200. /demo was retired (B3) and
// /blogs got renamed to /posts (J1) — keep the list in sync with reality.
const ROUTES = [
  '/',
  '/flats',
  '/commercial',
  '/lands',
  '/residential-complexes',
  '/posts',
  '/search',
  '/admin',
  '/about',
  '/agents',
  '/contact',
  '/privacy',
  '/terms',
  '/cabinet/chats',
  '/cabinet/favorites',
  '/cabinet/recent',
  '/cabinet/saved-searches',
  '/cabinet/login',
] as const

// /home-v2 is intentionally disabled (DISABLED_PAGE_SLUGS in
// [slug]/page.tsx) — a draft homepage iteration kept in the CMS but
// not meant to be publicly reachable.
const NOT_FOUND_ROUTES = [
  '/flats/non-existing-slug-zzz',
  '/commercial/non-existing-slug-zzz',
  '/lands/non-existing-slug-zzz',
  '/residential-complexes/non-existing-slug-zzz',
  '/realtors/non-existing-slug-zzz',
  '/posts/non-existing-slug-zzz',
  '/nonexistent-city/arenda-kvartir',
  '/home-v2',
] as const

// HTTP-only smoke. Mobile project's testIgnore in playwright.config.ts
// excludes this file — the response is browser-agnostic.

test.describe('smoke', () => {
  for (const route of ROUTES) {
    test(`GET ${route} → 200`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL, timeout: 90_000 })
      const response = await ctx.get(route)
      expect(response.status(), `unexpected status for ${route}`).toBe(200)
      await ctx.dispose()
    })
  }

  for (const route of NOT_FOUND_ROUTES) {
    test(`GET ${route} → 404`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL, timeout: 90_000 })
      const response = await ctx.get(route)
      expect(response.status()).toBe(404)
      await ctx.dispose()
    })
  }
})

test.describe('SEO', () => {
  test('robots.txt is served by the dynamic route, not a stale static file', async ({
    baseURL,
  }) => {
    const ctx = await request.newContext({ baseURL, timeout: 90_000 })
    const res = await ctx.get('/robots.txt')
    expect(res.status()).toBe(200)
    const body = await res.text()
    // These Disallow rules only exist in src/app/(frontend)/robots.txt/route.ts.
    // A static public/robots.txt (e.g. from next-sitemap's generateRobotsTxt)
    // would shadow this route and silently drop them.
    expect(body).toMatch(/Disallow:\s*\/api/)
    expect(body).toMatch(/Disallow:\s*\/cabinet\//)
    expect(body).toMatch(/Sitemap:.*\/listings-sitemap\.xml/)
    await ctx.dispose()
  })

  test('sitemap.xml is reachable', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL, timeout: 90_000 })
    const res = await ctx.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    await ctx.dispose()
  })
})

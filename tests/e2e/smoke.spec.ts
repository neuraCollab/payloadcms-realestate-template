import { test, expect, request } from '@playwright/test'

const ROUTES = [
  '/',
  '/flats',
  '/commercial',
  '/lands',
  '/residential-complexes',
  '/posts',
  '/search',
  '/admin',
  '/demo',
  '/home-v2',
  '/about',
  '/agents',
  '/blogs',
  '/contact',
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

  test('GET /flats/non-existing-slug-zzz → 404', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL, timeout: 90_000 })
    const response = await ctx.get('/flats/non-existing-slug-zzz')
    expect(response.status()).toBe(404)
    await ctx.dispose()
  })
})

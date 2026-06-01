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
  '/home-v2',
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

const NOT_FOUND_ROUTES = [
  '/flats/non-existing-slug-zzz',
  '/commercial/non-existing-slug-zzz',
  '/realtors/non-existing-slug-zzz',
  '/nonexistent-city/arenda-kvartir',
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

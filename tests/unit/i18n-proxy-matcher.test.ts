import { test, describe } from 'node:test'
import * as assert from 'node:assert/strict'
import { NextRequest } from 'next/server'

import { config, proxy } from '../../src/proxy.js'

const pattern = new RegExp(`^${config.matcher[0]}$`)

describe('i18n proxy matcher', () => {
  test('excludes /admin, /api, /next, sitemaps, and static files', () => {
    assert.equal(pattern.test('/admin'), false)
    assert.equal(pattern.test('/admin/collections/flats'), false)
    assert.equal(pattern.test('/api/leads'), false)
    assert.equal(pattern.test('/next/seed-globals'), false)
    assert.equal(pattern.test('/listings-sitemap.xml'), false)
    assert.equal(pattern.test('/robots.txt'), false)
    assert.equal(pattern.test('/favicon.ico'), false)
  })

  test('matches real visitor-facing routes', () => {
    assert.equal(pattern.test('/'), true)
    assert.equal(pattern.test('/flats'), true)
    assert.equal(pattern.test('/kz/flats'), true)
    assert.equal(pattern.test('/kz/flats/some-slug'), true)
    // Regression: the matcher must be anchored to a path-segment boundary —
    // a slug that merely starts with "admin"/"api" but isn't that route
    // must not be wrongly excluded from locale routing (see Fix 1).
    assert.equal(pattern.test('/apidocs'), true)
    assert.equal(pattern.test('/administration'), true)
  })
})

// Builds a NextRequest the way a real incoming request would look: a URL and
// (optionally) the `realty_email` auth cookie the /cabinet gate checks for.
function makeRequest(path: string, email?: string): NextRequest {
  const url = new URL(path, 'http://localhost:3000')
  const headers = new Headers()
  if (email) headers.set('cookie', `realty_email=${email}`)
  return new NextRequest(url, { headers })
}

describe('proxy() /cabinet auth gate', () => {
  test('unauthenticated /cabinet/profile redirects to unprefixed /cabinet/login', () => {
    const res = proxy(makeRequest('/cabinet/profile'))
    assert.equal(res.status, 307)
    assert.equal(res.headers.get('location'), 'http://localhost:3000/cabinet/login')
  })

  test('unauthenticated /kz/cabinet/profile redirects to /kz-prefixed /cabinet/login', () => {
    const res = proxy(makeRequest('/kz/cabinet/profile'))
    assert.equal(res.status, 307)
    assert.equal(res.headers.get('location'), 'http://localhost:3000/kz/cabinet/login')
  })

  test('unauthenticated /cabinet/login is public — no redirect', () => {
    const res = proxy(makeRequest('/cabinet/login'))
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('location'), null)
  })

  test('unauthenticated /kz/cabinet/login is public — no redirect', () => {
    const res = proxy(makeRequest('/kz/cabinet/login'))
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('location'), null)
  })

  test('authenticated /cabinet/profile passes through to intlMiddleware — no redirect', () => {
    const res = proxy(makeRequest('/cabinet/profile', 'user@example.com'))
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('location'), null)
  })

  test('regression (Finding 1): /cabinet-info is not treated as a /cabinet route', () => {
    // A CMS-authored page slug that merely starts with "cabinet" (e.g.
    // "cabinet-info") must not be caught by a segment-unaware prefix check.
    const res = proxy(makeRequest('/cabinet-info'))
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('location'), null)
  })
})

import { test, describe } from 'node:test'
import * as assert from 'node:assert/strict'

import { config } from '../../src/middleware.js'

const pattern = new RegExp(`^${config.matcher[0]}$`)

describe('i18n middleware matcher', () => {
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
  })
})

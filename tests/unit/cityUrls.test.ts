// Unit tests for the city URL filter-slug parser.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { parseFilterSlug, ALL_FILTER_SLUGS } from '../../src/lib/cityUrls'

describe('parseFilterSlug', () => {
  it('returns null for unknown slugs', () => {
    assert.equal(parseFilterSlug('foo-bar'), null)
    assert.equal(parseFilterSlug(''), null)
  })

  it('decodes "arenda-kvartir" → flats + rent', () => {
    const parsed = parseFilterSlug('arenda-kvartir')
    assert.equal(parsed?.category, 'flats')
    assert.equal(parsed?.transactionType, 'rent')
  })

  it('decodes "prodazha-kvartir" → flats + sale', () => {
    const parsed = parseFilterSlug('prodazha-kvartir')
    assert.equal(parsed?.category, 'flats')
    assert.equal(parsed?.transactionType, 'sale')
  })

  it('decodes "novostroyki" → residential-complexes (no transaction)', () => {
    const parsed = parseFilterSlug('novostroyki')
    assert.equal(parsed?.category, 'residential-complexes')
    assert.equal(parsed?.transactionType, undefined)
  })

  it('is case-insensitive', () => {
    const upper = parseFilterSlug('ARENDA-KVARTIR')
    const lower = parseFilterSlug('arenda-kvartir')
    assert.deepEqual(upper, lower)
  })

  it('ALL_FILTER_SLUGS is non-empty and matches', () => {
    assert.ok(ALL_FILTER_SLUGS.length > 0)
    for (const slug of ALL_FILTER_SLUGS) {
      assert.ok(parseFilterSlug(slug), `failed to parse listed slug ${slug}`)
    }
  })
})

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { isValidCoordinates } from '../../src/utilities/geocode'

describe('isValidCoordinates', () => {
  it('returns true for valid coordinates (origin)', () => {
    assert.equal(isValidCoordinates(0, 0), true)
  })

  it('returns true for valid coordinates (boundaries)', () => {
    assert.equal(isValidCoordinates(90, 180), true)
    assert.equal(isValidCoordinates(-90, -180), true)
    assert.equal(isValidCoordinates(90, -180), true)
    assert.equal(isValidCoordinates(-90, 180), true)
  })

  it('returns true for valid floating point coordinates', () => {
    assert.equal(isValidCoordinates(45.5, -120.2), true)
  })

  it('returns false for invalid latitudes (out of bounds)', () => {
    assert.equal(isValidCoordinates(90.1, 0), false)
    assert.equal(isValidCoordinates(-90.1, 0), false)
    assert.equal(isValidCoordinates(100, 100), false)
  })

  it('returns false for invalid longitudes (out of bounds)', () => {
    assert.equal(isValidCoordinates(0, 180.1), false)
    assert.equal(isValidCoordinates(0, -180.1), false)
    assert.equal(isValidCoordinates(50, 200), false)
  })

  it('returns false for invalid types (non-numbers)', () => {
    assert.equal(isValidCoordinates(undefined as any, 0), false)
    assert.equal(isValidCoordinates(0, undefined as any), false)
    assert.equal(isValidCoordinates(null as any, 0), false)
    assert.equal(isValidCoordinates(0, null as any), false)
    assert.equal(isValidCoordinates('0' as any, 0), false)
    assert.equal(isValidCoordinates(0, '0' as any), false)
    assert.equal(isValidCoordinates(NaN, 0), false)
    assert.equal(isValidCoordinates(0, NaN), false)
  })
})

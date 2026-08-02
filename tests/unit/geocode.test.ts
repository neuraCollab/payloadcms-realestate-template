import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'

import { isValidCoordinates, yandexGeocode } from '../../src/utilities/geocode.js'

describe('geocode utilities', () => {
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

  describe('yandexGeocode', () => {
    let originalFetch: typeof global.fetch
    let originalConsoleError: typeof console.error

    beforeEach(() => {
      originalFetch = global.fetch
      originalConsoleError = console.error
    })

    afterEach(() => {
      global.fetch = originalFetch
      console.error = originalConsoleError
    })

    it('returns null and logs error when fetch throws an exception', async () => {
      // Mock fetch to throw an error
      global.fetch = async () => {
        throw new Error('Network failure')
      }

      // Mock console.error to prevent test output pollution and allow verification
      let loggedError: unknown
      console.error = (msg: string, err: unknown) => {
        if (msg === 'Yandex geocoding error:') {
          loggedError = err
        }
      }

      const result = await yandexGeocode('Moscow, Red Square 1', 'fake-api-key')

      // Assert that it returns null
      assert.equal(result, null)

      // Assert that error was logged
      assert.ok(loggedError instanceof Error)
      assert.equal((loggedError as Error).message, 'Network failure')
    })
  })
})

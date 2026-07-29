import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { yandexGeocode } from '../../src/utilities/geocode.js'

describe('geocode utilities', () => {
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

import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'

import { isValidCoordinates, yandexGeocode, geocodeAddress, reverseGeocode } from '../../src/utilities/geocode.js'

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
      global.fetch = async () => {
        throw new Error('Network failure')
      }

      let loggedError: unknown
      console.error = (msg: string, err: unknown) => {
        if (msg === 'Yandex geocoding error:') {
          loggedError = err
        }
      }

      const result = await yandexGeocode('Moscow, Red Square 1', 'fake-api-key')

      assert.equal(result, null)

      assert.ok(loggedError instanceof Error)
      assert.equal((loggedError as Error).message, 'Network failure')
    })
  })

  describe('geocodeAddress', () => {
    let originalFetch: typeof global.fetch
    let originalConsoleError: typeof console.error
    let originalConsoleWarn: typeof console.warn

    beforeEach(() => {
      originalFetch = global.fetch
      originalConsoleError = console.error
      originalConsoleWarn = console.warn

      console.error = mock.fn()
      console.warn = mock.fn()
    })

    afterEach(() => {
      global.fetch = originalFetch
      console.error = originalConsoleError
      console.warn = originalConsoleWarn
      mock.restoreAll()
    })

    it('returns null on network error', async () => {
      global.fetch = mock.fn(async () => {
        throw new Error('Network failure')
      }) as any

      const result = await geocodeAddress('Moscow')
      assert.equal(result, null)

      const consoleErrorMock = console.error as any
      assert.equal(consoleErrorMock.mock.calls.length, 1)
      assert.equal(consoleErrorMock.mock.calls[0].arguments[0], 'Geocoding error:')
    })

    it('returns null on non-OK HTTP status', async () => {
      global.fetch = mock.fn(async () => {
        return {
          ok: false,
          status: 500,
          statusText: 'Internal Server Error'
        }
      }) as any

      const result = await geocodeAddress('Moscow')
      assert.equal(result, null)

      const consoleErrorMock = console.error as any
      assert.equal(consoleErrorMock.mock.calls.length, 1)
      assert.equal(consoleErrorMock.mock.calls[0].arguments[0], 'Geocoding error:')
    })
  })

  describe('reverseGeocode', () => {
    let originalFetch: typeof global.fetch
    let originalConsoleError: typeof console.error

    beforeEach(() => {
      originalFetch = global.fetch
      originalConsoleError = console.error
      global.fetch = mock.fn()
      console.error = mock.fn()
    })

    afterEach(() => {
      global.fetch = originalFetch
      console.error = originalConsoleError
      mock.restoreAll()
    })

    it('returns display_name on success', async () => {
      const expectedAddress = 'Test Address, City, Country'

      global.fetch = mock.fn(async () => {
        return {
          ok: true,
          json: async () => ({ display_name: expectedAddress }),
        } as Response
      })

      const result = await reverseGeocode(55.7558, 37.6173)

      assert.equal(result, expectedAddress)

      const fetchMock = global.fetch as any
      assert.equal(fetchMock.mock.calls.length, 1)

      const call = fetchMock.mock.calls[0]
      const url = call.arguments[0]

      assert.ok(url.includes('lat=55.7558'))
      assert.ok(url.includes('lon=37.6173'))
    })

    it('returns null if response is not ok', async () => {
      global.fetch = mock.fn(async () => {
        return {
          ok: false,
          status: 500,
        } as Response
      })

      const result = await reverseGeocode(55.7558, 37.6173)

      assert.equal(result, null)
      const consoleErrorMock = console.error as any
      assert.ok(consoleErrorMock.mock.calls.length > 0)
      assert.ok(consoleErrorMock.mock.calls[0].arguments[0].includes('Reverse geocoding error:'))
    })

    it('returns null if no display_name in response', async () => {
      global.fetch = mock.fn(async () => {
        return {
          ok: true,
          json: async () => ({}),
        } as Response
      })

      const result = await reverseGeocode(55.7558, 37.6173)

      assert.equal(result, null)
    })

    it('returns null if fetch throws an error', async () => {
      global.fetch = mock.fn(async () => {
        throw new Error('Network error')
      })

      const result = await reverseGeocode(55.7558, 37.6173)

      assert.equal(result, null)

      const consoleErrorMock = console.error as any
      assert.ok(consoleErrorMock.mock.calls.length > 0)
    })
  })
})

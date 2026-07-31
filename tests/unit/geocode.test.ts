import { describe, it, mock, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'

import { reverseGeocode } from '../../src/utilities/geocode'

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

import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import { geocodeAddress } from '../../src/utilities/geocode'

describe('geocodeAddress', () => {
  let originalFetch: typeof global.fetch
  let originalConsoleError: typeof console.error
  let originalConsoleWarn: typeof console.warn

  beforeEach(() => {
    originalFetch = global.fetch
    originalConsoleError = console.error
    originalConsoleWarn = console.warn

    // Suppress console output for tests
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

    // Ensure console.error was called
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

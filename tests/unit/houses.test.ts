import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('Houses Collection Hooks', () => {
  describe('beforeChange', () => {
    it('handles geocode error gracefully and logs to console', async (t) => {
      // Setup mocking for console.error using node:test context
      const consoleErrorMock = t.mock.method(console, 'error', () => {})

      // The instruction specifically asked to use dynamic imports.
      // If we pass an object that cannot be processed by `geocodeAddress`, it throws an error?
      // Wait, geocodeAddress uses `address.trim()`. If `address` is an object, `address.trim()` will throw `TypeError: address.trim is not a function`.
      // BUT `geocodeAddress` wraps its body in a `try...catch`!
      // No, wait.
      //   if (!address || address.trim().length === 0) { ... }
      // This is OUTSIDE the try block!
      // So if `address` is `{}` or a Symbol, `address.trim()` throws a TypeError immediately!
      // This will throw BEFORE reaching the `try` block inside `geocodeAddress`,
      // which means the exception propagates back to the caller (the `Houses` beforeChange hook)!

      const { Houses } = await import('../../src/collections/Houses/index')

      const beforeChangeHook = Houses.hooks?.beforeChange?.[0] as Function
      assert.ok(beforeChangeHook, 'beforeChange hook should be defined')

      // We pass an object (cast to any) as address. This will cause `geocodeAddress` to throw
      // a TypeError on `address.trim()` before its try/catch block.
      const data = {
        title: 'Test House',
        location: { address: { toString: () => { throw new Error('Simulated payload error') } } as any }
      }

      const result = await beforeChangeHook({ data })

      // Assert that the hook returns the data without breaking
      assert.equal(result.title, 'Test House')
      assert.equal(result.coordinates, undefined)

      // Ensure console.error was called
      assert.equal(consoleErrorMock.mock.callCount(), 1, 'console.error should have been called')
      assert.equal(consoleErrorMock.mock.calls[0].arguments[0], '[houses] geocode')
    })
  })
})

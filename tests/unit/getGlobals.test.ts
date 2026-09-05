import { describe, it, mock } from 'node:test'
import * as assert from 'node:assert/strict'

// `getGlobals.ts` calls `getPayload({ config: configPromise })` inside its
// callback, which would need a real DB connection — so this test never
// invokes the function `getCachedGlobal` hands back from `unstable_cache`.
// Instead it spies on `next/cache`'s `unstable_cache` export (via
// `node:test`'s `mock.module`, run with `--experimental-test-module-mocks` —
// see the `test:unit` script in package.json) and asserts on the
// `keyParts`/`tags` arguments `getCachedGlobal` passed it for two different
// locales. `mock.method` can't do this directly: `next/cache`'s named
// exports are non-configurable ES module bindings, so redefining a property
// on the module namespace throws `TypeError: Cannot redefine property`.
//
// `mock.module`'s `namedExports` option fully replaces the module rather
// than patching one export, so the mock spreads in the *real* module's
// exports first (`revalidatePath`, `revalidateTag`, etc.) — otherwise
// unrelated code pulled in transitively by importing `getGlobals.ts` (e.g.
// `src/collections/Pages/hooks/revalidatePage.ts`, which also imports from
// `next/cache`) fails with "does not provide an export named ...". (The
// installed `@types/node` predates the newer, non-deprecated `exports`
// option, so this uses the typed — if runtime-deprecated — `namedExports`;
// it still works, just prints one deprecation warning.)
describe('getCachedGlobal', () => {
  it('threads locale into both the unstable_cache key and its tag', async () => {
    const calls: Array<{ keyParts: unknown; tags: unknown }> = []

    const realNextCache: Record<string, unknown> = await import('next/cache')

    const moduleMock = mock.module('next/cache', {
      namedExports: {
        ...realNextCache,
        unstable_cache: (
          _cb: (...args: unknown[]) => unknown,
          keyParts: unknown,
          options: { tags?: unknown },
        ) => {
          calls.push({ keyParts, tags: options.tags })
          // Never actually called in this test, but keep the shape honest.
          return () => {
            throw new Error('the cached function should not be invoked in this test')
          }
        },
      },
    })

    try {
      const { getCachedGlobal } = await import('../../src/utilities/getGlobals.js')

      getCachedGlobal('header', 0, 'ru')
      getCachedGlobal('header', 0, 'kz')

      assert.equal(calls.length, 2, 'expected one unstable_cache call per getCachedGlobal call')

      const ruCall = calls[0]
      const kzCall = calls[1]
      assert.ok(ruCall, 'expected a call recorded for locale=ru')
      assert.ok(kzCall, 'expected a call recorded for locale=kz')

      assert.deepEqual(ruCall.keyParts, ['header', 'ru'])
      assert.deepEqual(ruCall.tags, ['global_header_ru'])

      assert.deepEqual(kzCall.keyParts, ['header', 'kz'])
      assert.deepEqual(kzCall.tags, ['global_header_kz'])

      // The actual point of this test: RU and KZ must never share a cache
      // key or a revalidation tag, or a save to one locale's global would
      // serve (or invalidate) the other locale's cached copy.
      assert.notDeepEqual(ruCall.keyParts, kzCall.keyParts)
      assert.notDeepEqual(ruCall.tags, kzCall.tags)
    } finally {
      moduleMock.restore()
    }
  })
})

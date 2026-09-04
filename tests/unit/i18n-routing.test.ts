import { test, describe } from 'node:test'
import * as assert from 'node:assert/strict'

import { routing } from '../../src/i18n/routing.js'

describe('i18n routing config', () => {
  test('declares ru as default and kz as the only other locale', () => {
    assert.deepEqual(routing.locales, ['ru', 'kz'])
    assert.equal(routing.defaultLocale, 'ru')
  })

  test('uses as-needed prefix so ru URLs stay unprefixed', () => {
    assert.equal(routing.localePrefix, 'as-needed')
  })
})

import { test, mock, describe } from 'node:test'
import assert from 'node:assert/strict'
import { correctTypos } from '../../src/lib/speller'

describe('speller service', () => {
  test('corrects a misspelled query using Yandex.Speller mock', async (t) => {
    mock.method(global, 'fetch', async () => {
      return {
        ok: true,
        json: async () => [
          {
            code: 1,
            pos: 0,
            row: 0,
            col: 0,
            len: 7,
            word: 'квртира',
            s: ['квартира']
          },
          {
            code: 1,
            pos: 10,
            row: 0,
            col: 10,
            len: 6,
            word: 'маскве',
            s: ['москве']
          }
        ]
      }
    })

    const result = await correctTypos('квртира в маскве')
    assert.equal(result, 'квартира в москве')

    // Reset mock
    mock.restoreAll()
  })

  test('returns original string if fetch fails', async () => {
    mock.method(global, 'fetch', async () => {
      throw new Error('Network error')
    })

    const result = await correctTypos('квртира в маскве')
    assert.equal(result, 'квртира в маскве')

    mock.restoreAll()
  })

  test('returns original string if fetch is not ok', async () => {
    mock.method(global, 'fetch', async () => {
      return {
        ok: false,
        status: 500
      }
    })

    const result = await correctTypos('квртира в маскве')
    assert.equal(result, 'квртира в маскве')

    mock.restoreAll()
  })
})

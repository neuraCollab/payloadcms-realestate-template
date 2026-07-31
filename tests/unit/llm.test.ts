import { describe, it, mock, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { extractFiltersLLM } from '../../src/lib/llm'

// We will test `extractFiltersLLM`. We need to mock `global.fetch`.
// Also, we need to temporarily set process.env.ANTHROPIC_API_KEY so `shouldUseLLM()` returns true.

describe('extractFiltersLLM', () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = originalEnv
    mock.restoreAll()
  })

  const setupMock = (responseText: string | null, ok = true) => {
    process.env = { ...originalEnv, ANTHROPIC_API_KEY: 'test-key' }

    mock.method(global, 'fetch', async () => {
      return {
        ok,
        json: async () => {
          if (!ok) return {}
          return {
            content: [{ text: responseText }]
          }
        },
        text: async () => 'error text'
      }
    })
  }

  it('returns null if no API keys are set', async () => {
    process.env = { ...originalEnv, ANTHROPIC_API_KEY: '', OPENAI_API_KEY: '' }
    const res = await extractFiltersLLM('test prompt')
    assert.equal(res, null)
  })

  it('parses direct JSON response correctly', async () => {
    setupMock('{"city": "Москва", "rooms": "2", "transactionType": "sale"}')
    const res = await extractFiltersLLM('купить двушку в москве')
    assert.deepEqual(res, { city: 'Москва', rooms: '2', transactionType: 'sale' })
  })

  it('parses JSON embedded in a markdown code block', async () => {
    setupMock('```json\n{"city": "Санкт-Петербург", "minPrice": 5000000}\n```')
    const res = await extractFiltersLLM('спб от 5 млн')
    assert.deepEqual(res, { city: 'Санкт-Петербург', minPrice: 5000000 })
  })

  it('parses JSON embedded in text', async () => {
    setupMock('Here is the parsed request:\n{"tags": ["метро", "парк"]}\nHave a nice day!')
    const res = await extractFiltersLLM('у метро рядом с парком')
    assert.deepEqual(res, { tags: ['метро', 'парк'] })
  })

  it('returns null for invalid JSON structure', async () => {
    setupMock('{"city": "Москва", }') // trailing comma is invalid JSON in standard JSON.parse
    const res = await extractFiltersLLM('москва')
    assert.equal(res, null)
  })

  it('returns null if response contains no JSON', async () => {
    setupMock('I am sorry, I do not understand the request.')
    const res = await extractFiltersLLM('asdf')
    assert.equal(res, null)
  })

  it('returns null if fetch fails (e.g. timeout or non-ok status)', async () => {
    setupMock(null, false)
    const res = await extractFiltersLLM('test')
    assert.equal(res, null)
  })
})

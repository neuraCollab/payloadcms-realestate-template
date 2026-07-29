import { describe, it, mock } from 'node:test'
import * as assert from 'node:assert/strict'

import { seedGlobals } from '../../src/endpoints/seed-globals/index.js'
import type { Payload, PayloadRequest } from 'payload'

describe('seedGlobals', () => {
  it('throws an error if Postgres adapter is not available', async () => {
    const infoMock = mock.fn()
    const updateGlobalMock = mock.fn()

    const mockPayload = {
      logger: {
        info: infoMock,
      },
      updateGlobal: updateGlobalMock,
      db: {
        // no drizzle
      },
    } as unknown as Payload

    const mockReq = {} as PayloadRequest

    await assert.rejects(
      seedGlobals({ payload: mockPayload, req: mockReq }),
      new Error('Postgres adapter not available')
    )

    assert.equal(infoMock.mock.calls.length, 1)
    assert.equal(updateGlobalMock.mock.calls.length, 1)
  })

  it('successfully seeds globals via drizzle execute', async () => {
    const executedQueries: string[] = []
    const mockDrizzle = {
      execute: mock.fn(async (query: any) => {
        const queryString = typeof query === 'string' ? query : query.toString() || ''
        executedQueries.push(queryString.trim().replace(/\s+/g, ' '))
      }),
    }

    const infoMock = mock.fn()
    const updateGlobalMock = mock.fn()

    const mockPayload = {
      logger: {
        info: infoMock,
      },
      updateGlobal: updateGlobalMock,
      db: {
        drizzle: mockDrizzle,
      },
    } as unknown as Payload

    const mockReq = {} as PayloadRequest

    const result = await seedGlobals({ payload: mockPayload, req: mockReq })

    assert.deepEqual(result, { header: 6, footer: 6 })

    // Verify logger
    assert.equal(infoMock.mock.calls.length, 2)
    assert.equal(infoMock.mock.calls[0].arguments[0], '[seed-globals] updating header & footer & legal-info…')
    assert.equal(infoMock.mock.calls[1].arguments[0], '[seed-globals] done')

    // Verify updateGlobal
    assert.equal(updateGlobalMock.mock.calls.length, 1)
    const updateGlobalArgs = updateGlobalMock.mock.calls[0].arguments[0] as any
    assert.equal(updateGlobalArgs.slug, 'legal-info')
    assert.equal(updateGlobalArgs.req, mockReq)
    assert.equal(updateGlobalArgs.data.displayName, 'Realty')

    // Verify drizzle queries
    assert.ok(mockDrizzle.execute.mock.calls.length > 0)

    const headerInsertGlobal = executedQueries.find(q => q.includes('INSERT INTO header (id) VALUES (1)'))
    assert.ok(headerInsertGlobal, 'Should insert header global')

    const headerDeleteItems = executedQueries.find(q => q.includes('DELETE FROM header_nav_items WHERE _parent_id = 1'))
    assert.ok(headerDeleteItems, 'Should delete header nav items')

    const headerInsertItem = executedQueries.find(q => q.includes('INSERT INTO header_nav_items') && q.includes("link_url, link_label) VALUES ('seed_header_0_") && q.includes(", 1, 1, 'custom', false, '/', 'Главная')"))
    assert.ok(headerInsertItem, 'Should insert header nav items')

    const footerInsertGlobal = executedQueries.find(q => q.includes('INSERT INTO footer (id) VALUES (1)'))
    assert.ok(footerInsertGlobal, 'Should insert footer global')

    const footerDeleteItems = executedQueries.find(q => q.includes('DELETE FROM footer_nav_items WHERE _parent_id = 1'))
    assert.ok(footerDeleteItems, 'Should delete footer nav items')

    const footerInsertItem = executedQueries.find(q => q.includes('INSERT INTO footer_nav_items') && q.includes("link_url, link_label) VALUES ('seed_footer_0_") && q.includes(", 1, 1, 'custom', false, '/about', 'О нас')"))
    assert.ok(footerInsertItem, 'Should insert footer nav items')
  })
})

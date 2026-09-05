import { describe, it, mock } from 'node:test'
import * as assert from 'node:assert/strict'

import { seedGlobals } from '../../src/endpoints/seed-globals/index.js'
import type { Payload, PayloadRequest } from 'payload'

describe('seedGlobals', () => {
  it('seeds legal-info, header, and footer via updateGlobal', async () => {
    const infoMock = mock.fn()
    const updateGlobalMock = mock.fn(async () => ({}))

    const mockPayload = {
      logger: { info: infoMock },
      updateGlobal: updateGlobalMock,
    } as unknown as Payload

    const mockReq = {} as PayloadRequest

    const result = await seedGlobals({ payload: mockPayload, req: mockReq })

    assert.deepEqual(result, { header: 6, footer: 6 })

    assert.equal(infoMock.mock.calls.length, 2)
    assert.equal(
      infoMock.mock.calls[0].arguments[0],
      '[seed-globals] updating header & footer & legal-info…',
    )
    assert.equal(infoMock.mock.calls[1].arguments[0], '[seed-globals] done')

    assert.equal(updateGlobalMock.mock.calls.length, 3)

    const legalCall = updateGlobalMock.mock.calls[0].arguments[0] as any
    assert.equal(legalCall.slug, 'legal-info')
    assert.equal(legalCall.req, mockReq)
    assert.equal(legalCall.data.displayName, 'Realty')

    const headerCall = updateGlobalMock.mock.calls[1].arguments[0] as any
    assert.equal(headerCall.slug, 'header')
    assert.equal(headerCall.locale, 'ru')
    assert.equal(headerCall.data.navItems.length, 6)
    assert.deepEqual(headerCall.data.navItems[0].link, {
      type: 'custom',
      newTab: false,
      url: '/',
      label: 'Главная',
    })

    const footerCall = updateGlobalMock.mock.calls[2].arguments[0] as any
    assert.equal(footerCall.slug, 'footer')
    assert.equal(footerCall.locale, 'ru')
    assert.equal(footerCall.data.navItems.length, 6)
    assert.deepEqual(footerCall.data.navItems[0].link, {
      type: 'custom',
      newTab: false,
      url: '/about',
      label: 'О нас',
    })
  })
})

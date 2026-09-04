import { test, mock, describe } from 'node:test'
import * as assert from 'node:assert/strict'

import { notifyLeadWebhook } from '../../src/lib/leadWebhook.js'

describe('notifyLeadWebhook', () => {
  test('does nothing when LEAD_WEBHOOK_URL is not set', async () => {
    delete process.env.LEAD_WEBHOOK_URL
    const fetchMock = mock.fn()
    mock.method(global, 'fetch', fetchMock)

    await notifyLeadWebhook({
      id: 1,
      phone: '+70000000000',
      channel: 'callback',
      createdAt: '2026-09-04T00:00:00.000Z',
    })

    assert.equal(fetchMock.mock.calls.length, 0)
    mock.restoreAll()
  })

  test('POSTs the lead payload with a Bearer secret when configured', async () => {
    process.env.LEAD_WEBHOOK_URL = 'https://bot.example.com/hooks/lead'
    process.env.LEAD_WEBHOOK_SECRET = 'shh'
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://megadomic.ru'

    let capturedUrl: string | undefined
    let capturedInit: RequestInit | undefined
    mock.method(global, 'fetch', async (url: string, init: RequestInit) => {
      capturedUrl = url
      capturedInit = init
      return { ok: true, status: 200, statusText: 'OK' } as Response
    })

    await notifyLeadWebhook({
      id: 42,
      phone: '+79991234567',
      name: 'Иван',
      channel: 'telegram',
      contactHandle: 'ivan_tg',
      propertyCollection: 'flats',
      propertyId: '7',
      propertyTitle: 'Квартира на Невском',
      createdAt: '2026-09-04T12:00:00.000Z',
    })

    assert.equal(capturedUrl, 'https://bot.example.com/hooks/lead')
    assert.equal(capturedInit?.method, 'POST')
    const headers = capturedInit?.headers as Record<string, string>
    assert.equal(headers['Authorization'], 'Bearer shh')
    assert.equal(headers['Content-Type'], 'application/json')

    const body = JSON.parse(capturedInit?.body as string)
    assert.equal(body.id, 42)
    assert.equal(body.phone, '+79991234567')
    assert.equal(body.channel, 'telegram')
    assert.equal(body.adminUrl, 'https://megadomic.ru/admin/collections/leads/42')

    mock.restoreAll()
    delete process.env.LEAD_WEBHOOK_URL
    delete process.env.LEAD_WEBHOOK_SECRET
  })

  test('does not throw when the webhook request fails', async () => {
    process.env.LEAD_WEBHOOK_URL = 'https://bot.example.com/hooks/lead'
    mock.method(global, 'fetch', async () => {
      throw new Error('network down')
    })

    await assert.doesNotReject(
      notifyLeadWebhook({
        id: 1,
        phone: '+70000000000',
        channel: 'callback',
        createdAt: '2026-09-04T00:00:00.000Z',
      }),
    )

    mock.restoreAll()
    delete process.env.LEAD_WEBHOOK_URL
  })
})

import test from 'node:test'
import assert from 'node:assert/strict'
import { createPlaywrightProvider } from '../../src/lib/listings-parser/providers/playwright-skeleton'

test('playwright-skeleton normalize()', async (t) => {
  const provider = createPlaywrightProvider({
    source: 'avito',
    label: 'Avito',
    targetUrl: '',
    selectors: { cardItem: '', title: '', price: '', address: '' },
  })

  await t.test('parses normal listing', () => {
    const raw = {
      source: 'avito' as const,
      externalId: '12345',
      capturedAt: new Date().toISOString(),
      data: {
        title: 'Уютная квартира',
        price: 'от 5 450 000 ₽',
        address: 'Москва, Тверская улица, д. 1',
        rooms: '2',
        area: '45 м²',
      },
    }

    const normalized = await provider.normalize(raw)

    assert.equal(normalized.collection, 'flats')
    assert.equal(normalized.payload.price, 5450000)
    assert.equal(normalized.payload.title, 'Уютная квартира')
    assert.equal((normalized.payload as any).location.city, 'Москва')
    assert.equal((normalized.payload as any).location.district, 'Тверская улица')
    assert.equal((normalized.payload as any).location.address, 'Москва, Тверская улица, д. 1')
    assert.equal((normalized.payload as any).rooms, '2')
    assert.equal((normalized.payload as any).area.total, 45)
  })
})

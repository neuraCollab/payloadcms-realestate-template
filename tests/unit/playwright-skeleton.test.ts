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

  // normalize() is intentionally minimal — it's a reference skeleton, not a
  // finished parser (see the file's own header). It classifies the
  // collection, parses price/transactionType from title+price text, and
  // geocodes the address; it does not split address into city/district or
  // extract rooms/area from raw.data — that's real per-site parsing work a
  // production scraper would still need to add.
  await t.test('parses normal listing', async () => {
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
    assert.equal((normalized.payload as any).transactionType, 'sale')
    assert.equal((normalized.payload as any).propertyCategory, 'apartment')
    assert.ok((normalized.payload as any).location.address.length > 0)
  })

  await t.test('classifies commercial and land listings by title keywords', async () => {
    const commercial = await provider.normalize({
      source: 'avito',
      externalId: '1',
      capturedAt: new Date().toISOString(),
      data: { title: 'Офисное помещение', price: '100000 ₽/мес', address: '' },
    })
    assert.equal(commercial.collection, 'commercial')
    assert.equal((commercial.payload as any).transactionType, 'rent')

    const land = await provider.normalize({
      source: 'avito',
      externalId: '2',
      capturedAt: new Date().toISOString(),
      data: { title: 'Участок 10 соток ИЖС', price: '2 000 000 ₽', address: '' },
    })
    assert.equal(land.collection, 'lands')
    assert.equal((land.payload as any).purpose, 'ижс')
  })
})

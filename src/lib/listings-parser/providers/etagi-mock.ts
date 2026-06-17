/**
 * Mock provider that produces 5 Etagi-style listings — a mix of property types:
 * 3 commercial spaces + 2 land plots (since Etagi tends to feature these
 * alongside flats; flats are already covered by the Avito mock).
 *
 * NOT a real etagi.com scraper. ToS forbids automated access.
 */

import type { ListingsProvider, RawListing, NormalizedListing } from '../types'
import {
  MOSCOW_DISTRICTS,
  STREETS_MSK,
  COMMERCIAL_TITLES,
  LAND_TITLES,
  pick,
  slugify,
} from '../mock-data'

const COMMERCIAL_TYPES = [
  'office', 'retail', 'warehouse', 'free-purpose', 'restaurant',
] as const

const LAND_PURPOSES = ['ijs', 'snt', 'commercial', 'agricultural'] as const

export const etagiMockProvider: ListingsProvider = {
  id: 'etagi',
  label: 'Этажи (mock)',

  async fetch(limit) {
    const now = new Date().toISOString()
    const out: RawListing[] = []

    // Aim for ~60% commercial, ~40% land.
    const commercialCount = Math.ceil(limit * 0.6)
    const landCount = limit - commercialCount

    for (let i = 0; i < commercialCount; i++) {
      const district = pick(MOSCOW_DISTRICTS, i + 9)
      const street = pick(STREETS_MSK, i + 6)
      const house = ((i * 13) % 80) + 5
      const type = pick(COMMERCIAL_TYPES, i)
      const area = 40 + i * 25
      const pricePerSqm = 1200 + i * 200
      const total = area * pricePerSqm * 12 // approx yearly equivalent for sale

      out.push({
        source: 'etagi',
        externalId: `etagi-com-${district.name}-${i}`,
        capturedAt: now,
        data: {
          kind: 'commercial',
          title: pick(COMMERCIAL_TITLES, i),
          city: 'Москва',
          district: district.name,
          street,
          house,
          lat: district.lat + (i * 0.0009),
          lng: district.lng + (i * 0.0009),
          commercialType: type,
          areaTotal: area,
          pricePerSqm,
          totalPrice: total,
          transactionType: 'rent',
        },
      })
    }

    for (let i = 0; i < landCount; i++) {
      const district = pick(MOSCOW_DISTRICTS, i + 3)
      const area = 6 + i * 4 // соток
      const purpose = pick(LAND_PURPOSES, i)
      const price = area * 350_000

      out.push({
        source: 'etagi',
        externalId: `etagi-land-${district.name}-${i + commercialCount}`,
        capturedAt: now,
        data: {
          kind: 'lands',
          title: pick(LAND_TITLES, i),
          city: 'Подмосковье',
          district: `${district.name}-район`,
          address: `СНТ Берёзка, уч. ${i + 1}`,
          area,
          price,
          purpose,
        },
      })
    }

    return out
  },

  normalize(raw) {
    const d = raw.data as Record<string, any>
    const title = String(d.title)
    const slug = slugify(`${title}-${raw.externalId}`)

    if (d.kind === 'commercial') {
      const streetAddress = `ул. ${d.street}, ${d.house}`
      const fullAddress = `${d.city}, ${streetAddress}`
      return {
        source: raw.source,
        externalId: raw.externalId,
        collection: 'commercial',
        payload: {
          title,
          slug,
          commercialType: d.commercialType,
          transactionType: d.transactionType,
          location: {
            city: d.city,
            district: d.district,
            address: streetAddress,
          },
          coordinates: {
            lat: d.lat,
            lng: d.lng,
            formattedAddress: fullAddress,
          },
          area: { total: d.areaTotal },
          price: d.totalPrice,
          priceType: 'total',
          currency: 'RUB',
          status: 'active',
        },
      } satisfies NormalizedListing
    }

    // Land
    return {
      source: raw.source,
      externalId: raw.externalId,
      collection: 'lands',
      payload: {
        title,
        slug,
        purpose: d.purpose,
        area: d.area,
        price: d.price,
        location: {
          city: d.city,
          district: d.district,
          address: d.address,
        },
        status: 'active',
      },
    } satisfies NormalizedListing
  },
}

/**
 * Mock provider that produces 5 Sutochno-style daily-rental flat listings.
 *
 * NOT a real Sutochno scraper — sutochno.ru's ToS forbids automated access.
 * See ./playwright-skeleton.ts for the architecture of a real scraper.
 */

import type { ListingsProvider, RawListing, NormalizedListing } from '../types'
import {
  SPB_DISTRICTS,
  MOSCOW_DISTRICTS,
  STREETS_SPB,
  STREETS_MSK,
  RENTAL_TITLES,
  AMENITIES,
  pick,
  slugify,
} from '../mock-data'

const lexicalParagraph = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          { type: 'text', mode: 'normal', text, format: 0, detail: 0, style: '', version: 1 },
        ],
      },
    ],
  },
})

export const sutochnoMockProvider: ListingsProvider = {
  id: 'sutochno',
  label: 'Sutochno (mock)',

  async fetch(limit) {
    const now = new Date().toISOString()
    const out: RawListing[] = []
    for (let i = 0; i < limit; i++) {
      // Daily rentals split between Moscow and St. Petersburg.
      const isSpb = i % 2 === 0
      const district = isSpb
        ? pick(SPB_DISTRICTS, i)
        : pick(MOSCOW_DISTRICTS, i + 1)
      const street = isSpb ? pick(STREETS_SPB, i) : pick(STREETS_MSK, i + 4)
      const house = ((i * 11) % 70) + 2
      const rooms = pick(['studio', '1', '2'] as const, i)
      const area = rooms === 'studio' ? 26 + i * 2 : 38 + i * 6
      const floor = ((i * 5) % 8) + 2
      const totalFloors = floor + 4
      const pricePerNight = rooms === 'studio' ? 2_800 + i * 300 : 4_500 + i * 600

      out.push({
        source: 'sutochno',
        externalId: `sutochno-${isSpb ? 'spb' : 'msk'}-${district.name}-${house}-${i}`,
        capturedAt: now,
        data: {
          title: pick(RENTAL_TITLES, i),
          city: isSpb ? 'Санкт-Петербург' : 'Москва',
          district: district.name,
          street,
          house,
          metro: district.metro,
          metroTime: district.metroTime,
          lat: district.lat + (i * 0.0005),
          lng: district.lng + (i * 0.0005),
          rooms,
          areaTotal: area,
          floor,
          totalFloors,
          pricePerNight,
          transactionType: 'daily',
          amenities: [
            'Wi-Fi',
            pick(AMENITIES, i + 1),
            pick(AMENITIES, i + 3),
            pick(AMENITIES, i + 5),
          ],
        },
      })
    }
    return out
  },

  normalize(raw) {
    const d = raw.data as Record<string, any>
    const title = String(d.title)
    const streetAddress = `${d.street}, ${d.house}`
    const fullAddress = `${d.city}, ${streetAddress}`
    const slug = slugify(`${title}-${raw.externalId}`)

    return {
      source: raw.source,
      externalId: raw.externalId,
      collection: 'flats',
      payload: {
        title,
        slug,
        propertyCategory: d.rooms === 'studio' ? 'studio' : 'apartment',
        transactionType: d.transactionType, // 'daily'
        location: {
          city: d.city,
          district: d.district,
          address: streetAddress,
          metro: d.metro,
          metroTime: d.metroTime,
        },
        coordinates: {
          lat: d.lat,
          lng: d.lng,
          formattedAddress: fullAddress,
        },
        rooms: d.rooms,
        area: { total: d.areaTotal },
        floorInfo: { floor: d.floor, totalFloors: d.totalFloors },
        price: d.pricePerNight,
        currency: 'RUB',
        description: lexicalParagraph(
          `Посуточная аренда в ${d.city}, район ${d.district}. ` +
            `Удобства: ${(d.amenities as string[]).join(', ')}.`,
        ),
        amenities: (d.amenities as string[]).map((a) => ({ amenity: a })),
        status: 'active',
      },
    } satisfies NormalizedListing
  },
}

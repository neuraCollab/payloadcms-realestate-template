/**
 * Mock provider that produces 5 Avito-style flat listings.
 *
 * This is NOT a real Avito scraper. avito.ru's terms of service prohibit
 * automated scraping; bypassing their bot protections requires rotating
 * residential proxies + CAPTCHA solving + risk of legal action.
 *
 * See ./playwright-skeleton.ts for the architecture of a real scraper and
 * a list of prerequisites for using it lawfully.
 */

import type { ListingsProvider, RawListing, NormalizedListing } from '../types'
import {
  MOSCOW_DISTRICTS,
  STREETS_MSK,
  APARTMENT_TITLES,
  DESCRIPTIONS,
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
          {
            type: 'text',
            mode: 'normal',
            text,
            format: 0,
            detail: 0,
            style: '',
            version: 1,
          },
        ],
      },
    ],
  },
})

export const avitoMockProvider: ListingsProvider = {
  id: 'avito',
  label: 'Avito (mock)',

  async fetch(limit) {
    const now = new Date().toISOString()
    const out: RawListing[] = []
    for (let i = 0; i < limit; i++) {
      const district = pick(MOSCOW_DISTRICTS, i + 17)
      const street = pick(STREETS_MSK, i + 3)
      const house = ((i * 7) % 90) + 1
      const rooms = pick(['1', '2', '3', 'studio'] as const, i + 1)
      const area = rooms === 'studio' ? 28 + i : 45 + i * 8
      const floor = ((i * 3) % 12) + 2
      const totalFloors = floor + 3 + (i % 5)
      const price = (rooms === 'studio' ? 11_000_000 : 18_000_000 + i * 4_500_000)

      out.push({
        source: 'avito',
        externalId: `avito-msk-${district.name}-${house}-${i}`,
        capturedAt: now,
        data: {
          title: pick(APARTMENT_TITLES, i + 5),
          rooms,
          city: 'Москва',
          district: district.name,
          street,
          house,
          metro: district.metro,
          metroTime: district.metroTime,
          lat: district.lat + (i * 0.0007),
          lng: district.lng + (i * 0.0007),
          areaTotal: area,
          areaLiving: Math.round(area * 0.65),
          areaKitchen: Math.round(area * 0.18),
          floor,
          totalFloors,
          price,
          transactionType: 'sale',
          buildingType: pick(['brick', 'panel', 'monolithic'] as const, i + 2),
          yearBuilt: 1990 + ((i * 5) % 30),
          description: pick(DESCRIPTIONS, i + 1),
          amenities: [
            pick(AMENITIES, i),
            pick(AMENITIES, i + 2),
            pick(AMENITIES, i + 4),
          ],
        },
      })
    }
    return out
  },

  normalize(raw) {
    const d = raw.data as Record<string, any>
    const title = String(d.title)
    const streetAddress = `ул. ${d.street}, ${d.house}`
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
        transactionType: d.transactionType,
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
        area: {
          total: d.areaTotal,
          living: d.areaLiving,
          kitchen: d.areaKitchen,
        },
        floorInfo: {
          floor: d.floor,
          totalFloors: d.totalFloors,
        },
        price: d.price,
        currency: 'RUB',
        buildingType: d.buildingType,
        yearBuilt: d.yearBuilt,
        description: lexicalParagraph(d.description),
        amenities: (d.amenities as string[]).map((a) => ({ amenity: a })),
        status: 'active',
      },
    } satisfies NormalizedListing
  },
}

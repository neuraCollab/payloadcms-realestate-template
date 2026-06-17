/**
 * Standard real-estate feed import — the legal alternative to scraping.
 *
 * Agencies export their own listing database as an XML/YML feed (the same
 * format they already feed to Yandex.Realty or Avito) and we parse it
 * directly, instead of crawling third-party sites. Supports:
 *
 *   - Yandex.Realty YML  (`<realty-feed><offer>…</offer></realty-feed>`)
 *   - Avito XML          (`<Ads><Ad>…</Ad></Ads>`)
 *
 * Each offer/ad is normalized into a `(collection, data)` pair ready for
 * `payload.create()`, reusing the same target collections as the mock
 * ingest pipeline (`./ingest.ts`). Residential complexes aren't a target —
 * both feed formats describe individual units, not whole complexes.
 *
 * Dedup key: feeds get re-uploaded over and over as agencies refresh their
 * database, so listings are slugged deterministically from
 * `source + externalId` (see `feedSlug`) rather than from the title — that
 * way re-importing the same feed updates nothing twice, regardless of how
 * the title text changes between runs.
 */

import { XMLParser } from 'fast-xml-parser'
import { slugifyRu } from '@/collections/Cities'

export type FeedFormat = 'yandex' | 'avito'

/** Same as `PayloadCollection` from `./types`, plus `houses` (feeds describe houses too). */
export type FeedCollection = 'flats' | 'houses' | 'commercial' | 'lands'

export interface FeedListing {
  externalId: string
  collection: FeedCollection
  data: Record<string, unknown>
}

export interface FeedSkip {
  externalId: string
  reason: string
}

export interface ParsedFeed {
  format: FeedFormat
  listings: FeedListing[]
  skipped: FeedSkip[]
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
})

const arr = <T,>(v: T | T[] | undefined | null): T[] => (v == null ? [] : Array.isArray(v) ? v : [v])

const num = (v: unknown): number | undefined => {
  if (v == null) return undefined
  if (typeof v === 'object') return num((v as Record<string, unknown>)['#text'])
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(/[\s,]/g, '.'))
  return Number.isFinite(n) ? n : undefined
}

const text = (v: unknown): string | undefined => {
  if (v == null) return undefined
  if (typeof v === 'object') {
    const t = (v as Record<string, unknown>)['#text']
    return t != null ? String(t).trim() : undefined
  }
  const s = String(v).trim()
  return s || undefined
}

/** Deterministic slug for re-import idempotency: same source+id → same slug, every time. */
export const feedSlug = (source: string, externalId: string): string =>
  `feed-${slugifyRu(source) || source}-${slugifyRu(externalId) || externalId}`

const buildLocation = (city: string | undefined, district: string | undefined, address: string | undefined) => ({
  city: city?.trim() || 'Не указан',
  district: district?.trim() || 'Центр',
  address: address?.trim() || city?.trim() || 'Не указан',
})

type NormalizeResult = { collection: FeedCollection; data: Record<string, unknown> } | { skip: string }

/* ------------------------------- Yandex YML ------------------------------ */

const normalizeYandexOffer = (offer: Record<string, unknown>): NormalizeResult => {
  const category = (text(offer.category) ?? '').toLowerCase()
  const propertyType = (text(offer['property-type']) ?? '').toLowerCase()
  const dealType = (text(offer.type) ?? 'продажа').toLowerCase()
  const transactionType = dealType.includes('сутк') ? 'daily' : dealType.includes('аренд') ? 'rent' : 'sale'

  const loc = (offer.location as Record<string, unknown>) ?? {}
  const city = text(loc['locality-name']) ?? text(loc.region)
  const address = text(loc.address)

  const price = num(offer.price)
  const area = num(offer.area)
  const title =
    text(offer.title) || `${text(offer.category) ?? 'Объект'}${city ? ` в ${city}` : ''}`

  if (!price || price <= 0) return { skip: 'нет цены (price)' }

  let collection: FeedCollection
  if (category.includes('участок')) collection = 'lands'
  else if (category.includes('дом') || category.includes('коттедж') || category.includes('таунхаус'))
    collection = 'houses'
  else if (
    propertyType.includes('коммерч') ||
    ['офис', 'торговая площадь', 'склад', 'гараж', 'своб'].some((c) => category.includes(c))
  )
    collection = 'commercial'
  else collection = 'flats'

  const currency = text((offer.price as Record<string, unknown>)?.currency) || 'RUB'
  const yearBuilt = num(offer['built-year'])

  if (collection === 'lands') {
    return {
      collection,
      data: {
        title: title || 'Земельный участок',
        area: area ?? 1,
        price,
        location: buildLocation(city, undefined, address),
        status: 'active',
      },
    }
  }

  if (collection === 'houses') {
    if (!area) return { skip: 'нет площади (area) для дома' }
    return {
      collection,
      data: {
        title,
        transactionType,
        location: buildLocation(city, undefined, address),
        area: { total: area },
        price,
        currency,
        yearBuilt,
        status: 'active',
      },
    }
  }

  if (collection === 'commercial') {
    if (!area) return { skip: 'нет площади (area) для коммерческого объекта' }
    return {
      collection,
      data: {
        title,
        commercialType: 'free-purpose',
        transactionType: transactionType === 'daily' ? 'rent' : transactionType,
        location: buildLocation(city, undefined, address),
        area: { total: area },
        price,
        currency,
        status: 'active',
      },
    }
  }

  // flats
  const roomsNum = num(offer.rooms)
  const rooms = category.includes('студия')
    ? 'studio'
    : roomsNum
      ? roomsNum >= 5
        ? '5plus'
        : String(roomsNum)
      : '1'

  return {
    collection: 'flats',
    data: {
      title,
      propertyCategory: category.includes('студия') ? 'studio' : 'apartment',
      transactionType,
      location: buildLocation(city, undefined, address),
      rooms,
      area: {
        total: area ?? 30,
        living: num(offer['living-space']),
        kitchen: num(offer['kitchen-space']),
      },
      floorInfo: { floor: num(offer.floor), totalFloors: num(offer['floors-total']) },
      price,
      currency,
      yearBuilt,
      status: 'active',
    },
  }
}

/* --------------------------------- Avito ---------------------------------- */

const AVITO_CATEGORY_TO_COLLECTION: Array<[string, FeedCollection]> = [
  ['дома, дачи, коттеджи', 'houses'],
  ['земельные участки', 'lands'],
  ['коммерческая недвижимость', 'commercial'],
  ['гаражи и машиноместа', 'commercial'],
  ['квартиры', 'flats'],
  ['комнаты', 'flats'],
]

const normalizeAvitoAd = (ad: Record<string, unknown>): NormalizeResult => {
  const category = (text(ad.Category) ?? '').toLowerCase()
  const adType = (text(ad.AdType) ?? '').toLowerCase() // Продам | Сдам
  const transactionType = adType.includes('сда') ? 'rent' : 'sale'

  const price = num(ad.Price)
  const area = num(ad.Square)
  const address = text(ad.Address)
  const city = address?.split(',')[0]?.trim()
  const title = text(ad.Title) || 'Объект из фида Avito'

  if (!price || price <= 0) return { skip: 'нет цены (Price)' }

  let collection: FeedCollection = 'flats'
  for (const [key, target] of AVITO_CATEGORY_TO_COLLECTION) {
    if (category.includes(key)) {
      collection = target
      break
    }
  }

  if (collection === 'lands') {
    return {
      collection,
      data: {
        title,
        area: area ?? 1,
        price,
        location: buildLocation(city, undefined, address),
        status: 'active',
      },
    }
  }

  if (collection === 'houses') {
    if (!area) return { skip: 'нет площади (Square) для дома' }
    return {
      collection,
      data: {
        title,
        transactionType,
        location: buildLocation(city, undefined, address),
        area: { total: area },
        price,
        currency: 'RUB',
        status: 'active',
      },
    }
  }

  if (collection === 'commercial') {
    if (!area) return { skip: 'нет площади (Square) для коммерческого объекта' }
    return {
      collection,
      data: {
        title,
        commercialType: 'free-purpose',
        transactionType,
        location: buildLocation(city, undefined, address),
        area: { total: area },
        price,
        currency: 'RUB',
        status: 'active',
      },
    }
  }

  const roomsNum = num(ad.RoomsCount)
  const rooms = roomsNum ? (roomsNum >= 5 ? '5plus' : String(roomsNum)) : '1'

  return {
    collection: 'flats',
    data: {
      title,
      propertyCategory: 'apartment',
      transactionType,
      location: buildLocation(city, undefined, address),
      rooms,
      area: { total: area ?? 30 },
      floorInfo: { floor: num(ad.Floor), totalFloors: num(ad.Floors) },
      price,
      currency: 'RUB',
      status: 'active',
    },
  }
}

/* --------------------------------- Parse ---------------------------------- */

/**
 * Parses a feed XML string (Yandex.Realty YML or Avito XML) into normalized
 * listings ready for `payload.create()`. Throws if the root element matches
 * neither known format.
 */
export const parseFeed = (xml: string): ParsedFeed => {
  const json = parser.parse(xml) as Record<string, unknown>

  if (json['realty-feed']) {
    const root = json['realty-feed'] as Record<string, unknown>
    const offers = arr(root.offer as Record<string, unknown> | Record<string, unknown>[])
    const listings: FeedListing[] = []
    const skipped: FeedSkip[] = []
    offers.forEach((offer, i) => {
      const externalId = text(offer['@_internal-id']) || text(offer.id) || `offer-${i}`
      const res = normalizeYandexOffer(offer)
      if ('skip' in res) skipped.push({ externalId, reason: res.skip })
      else
        listings.push({
          externalId,
          collection: res.collection,
          data: { ...res.data, slug: feedSlug('yandex', externalId) },
        })
    })
    return { format: 'yandex', listings, skipped }
  }

  if (json.Ads) {
    const root = json.Ads as Record<string, unknown>
    const ads = arr(root.Ad as Record<string, unknown> | Record<string, unknown>[])
    const listings: FeedListing[] = []
    const skipped: FeedSkip[] = []
    ads.forEach((ad, i) => {
      const externalId = text(ad.Id) || `ad-${i}`
      const res = normalizeAvitoAd(ad)
      if ('skip' in res) skipped.push({ externalId, reason: res.skip })
      else
        listings.push({
          externalId,
          collection: res.collection,
          data: { ...res.data, slug: feedSlug('avito', externalId) },
        })
    })
    return { format: 'avito', listings, skipped }
  }

  throw new Error(
    'Неизвестный формат фида: ожидается корневой элемент <realty-feed> (Яндекс.Недвижимость) или <Ads> (Avito)',
  )
}

/**
 * REAL-SCRAPER SKELETON — disabled by default, do not enable without reading
 * the legal + technical prerequisites at the bottom of this file.
 *
 * This module shows the structural shape of a production Playwright-based
 * scraper for one of the three target sites. It is intentionally written so
 * it CANNOT be invoked without explicit edits, because:
 *
 *   1. Each site's Terms of Service prohibits automated scraping. Running
 *      this against the live site without prior agreement (partner contract,
 *      explicit permission, fair-use research scope) is at your legal risk.
 *
 *   2. Each site is protected by Cloudflare and/or behavioural bot detection.
 *      Without rotating residential proxies and CAPTCHA-solving infrastructure
 *      it will be blocked within ~10–30 requests.
 *
 *   3. The CSS selectors below are placeholders. Real selectors must be
 *      reverse-engineered against the live site, and they change frequently.
 *
 * Use this file as a reference for the architecture of a real scraper. To
 * use it in practice you will need:
 *
 *   - A subscription to a rotating-residential-proxy service
 *     (Bright Data, Smartproxy, Oxylabs — ≈ $50–200/mo).
 *   - A CAPTCHA-solving service (2captcha, anti-captcha — ≈ $1 / 1k captchas).
 *   - A legal review of your scraping use-case for the target site.
 *   - To enable the call site, manually flip ENABLED to true AND provide
 *     real selectors and a real `targetUrl`.
 */

import type { ListingsProvider, RawListing, NormalizedListing } from '../types'
import { slugify } from '../mock-data'

const ENABLED = false

interface PlaywrightSkeletonConfig {
  source: 'avito' | 'sutochno' | 'etagi'
  label: string
  targetUrl: string
  selectors: {
    cardItem: string
    title: string
    price: string
    address: string
    rooms?: string
    area?: string
  }
  proxy?: {
    server: string // 'http://username:password@proxy.example.com:8000'
  }
}

/**
 * Build a Playwright-based provider. NOT runnable until ENABLED is flipped
 * AND the selectors / target URL match a real page.
 */
export const createPlaywrightProvider = (
  config: PlaywrightSkeletonConfig,
): ListingsProvider => {
  return {
    id: config.source,
    label: `${config.label} (playwright)`,

    async fetch(limit) {
      if (!ENABLED) {
        throw new Error(
          'Playwright scraper is disabled. Read the legal and technical ' +
            'prerequisites in playwright-skeleton.ts before enabling.',
        )
      }

      // The following lines are reference architecture only. They will not
      // execute as written: `playwright` is not imported and ENABLED is false.

      /*
      const { chromium } = await import('playwright')

      const browser = await chromium.launch({
        headless: true,
        proxy: config.proxy,
      })
      const context = await browser.newContext({
        userAgent: pickRandomUA(),
        locale: 'ru-RU',
        viewport: { width: 1366, height: 768 },
      })
      const page = await context.newPage()

      const raw: RawListing[] = []
      try {
        await page.goto(config.targetUrl, { waitUntil: 'networkidle', timeout: 60_000 })
        // Wait for human-ish pause to defeat naive timing-based bot detection.
        await page.waitForTimeout(1500 + Math.random() * 2500)

        const cards = await page.locator(config.selectors.cardItem).all()
        for (let i = 0; i < Math.min(cards.length, limit); i++) {
          const card = cards[i]
          const title = (await card.locator(config.selectors.title).textContent())?.trim() ?? ''
          const price = (await card.locator(config.selectors.price).textContent())?.trim() ?? ''
          const address = (await card.locator(config.selectors.address).textContent())?.trim() ?? ''
          raw.push({
            source: config.source,
            externalId: `${config.source}-${Date.now()}-${i}`,
            capturedAt: new Date().toISOString(),
            data: { title, price, address },
          })
        }
      } finally {
        await context.close()
        await browser.close()
      }
      return raw
      */

      // Stop TypeScript from complaining about unreachable code.
      void limit
      return [] as RawListing[]
    },

    normalize(raw): NormalizedListing {
      const d = raw.data as Record<string, string>
      const title = d.title || 'Без названия'

      // Parse `data.price` into an integer
      // Strip currency, spaces, non-breaking spaces, text like "от" or "/мес"
      const rawPrice = d.price || '0'
      const numericPriceString = rawPrice.replace(/[^0-9]/g, '')
      const price = parseInt(numericPriceString, 10) || 0

      // Split `data.address` to try parsing out a city, fallback if needed
      // Format usually like: "Москва, улица Тверская, 1"
      const rawAddress = d.address || ''
      const addressParts = rawAddress.split(',').map((p) => p.trim())
      const city = addressParts.length > 0 ? addressParts[0] : 'Неизвестно'
      const district = addressParts.length > 1 ? addressParts[1] : 'Неизвестно'

      const slug = slugify(`${title}-${raw.externalId}`)

      // The beforeChange hook in collections/Flat/index.ts handles actual
      // geocoding of the `location.address` via utilities/geocode.ts.
      // We map source-specific fields onto the Payload schema for flats here.
      return {
        source: raw.source,
        externalId: raw.externalId,
        collection: 'flats',
        payload: {
          title,
          slug,
          propertyCategory: 'apartment',
          transactionType: 'sale',
          location: {
            city,
            district,
            address: rawAddress,
          },
          rooms: d.rooms || '1',
          area: {
            total: parseFloat((d.area || '0').replace(/[^0-9.,]/g, '').replace(',', '.')) || 40,
          },
          price,
          currency: 'RUB',
          status: 'active',
        },
      }
    },
  }
}

/**
 * Example configs for each target. URLs intentionally truncated.
 * DO NOT use these as-is — selectors change frequently and each site
 * has different anti-bot countermeasures.
 */
export const EXAMPLE_CONFIGS: Record<'avito' | 'sutochno' | 'etagi', PlaywrightSkeletonConfig> = {
  avito: {
    source: 'avito',
    label: 'Avito',
    targetUrl: 'https://www.avito.ru/moskva/kvartiry/prodam-ASgBAgICAUSSA8YQ',
    selectors: {
      cardItem: '[data-marker="item"]',
      title: '[itemprop="name"]',
      price: '[itemprop="price"]',
      address: '[data-marker="item-address"]',
      rooms: '[data-marker="item-specific-params"]',
      area: '[data-marker="item-specific-params"]',
    },
  },
  sutochno: {
    source: 'sutochno',
    label: 'Sutochno',
    targetUrl: 'https://sutochno.ru/moskva',
    selectors: {
      cardItem: '.search-item-card',
      title: '.search-item-card__title',
      price: '.search-item-card__price',
      address: '.search-item-card__address',
    },
  },
  etagi: {
    source: 'etagi',
    label: 'Этажи',
    targetUrl: 'https://www.etagi.com/realty_out/',
    selectors: {
      cardItem: '[data-test="object-list-item"]',
      title: '[data-test="object-title"]',
      price: '[data-test="object-price"]',
      address: '[data-test="object-address"]',
    },
  },
}

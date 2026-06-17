// Self-service XML/YML feed import — agencies point us at their own
// Yandex.Realty YML or Avito XML export and we create/update listings from
// it. This is the legal alternative to scraping: the agency controls and
// hosts the feed, we just consume it like Yandex/Avito themselves do.
//
//   POST /api/admin/import-feed              → import & persist
//   POST /api/admin/import-feed?dryRun=true  → parse + validate, no writes
//
// Auth: any logged-in Payload user (admin or realtor — same as the Payload
// admin panel itself, see `access.admin: authenticated` on Users). Listings
// created by a realtor are tagged with `realtor: user.id` on collections
// that support it (flats, houses) so "Мои объекты" stays correct.
//
// Body: one of
//   - multipart/form-data with a `file` field (raw XML/YML)
//   - application/json `{ "url": "https://agency.example/feed.yml" }`
//   - raw XML text body (e.g. `Content-Type: application/xml`)

import { getPayload, createLocalReq } from 'payload'
import config from '@/payload.config'
import { parseFeed, type FeedCollection } from '@/lib/listings-parser/feed-import'
import { upsertCity } from '@/lib/listings-parser/city-upsert'

interface RowResult {
  externalId: string
  collection?: FeedCollection
  status: 'created' | 'skipped' | 'error'
  reason?: string
}

const MAX_FEED_BYTES = 25 * 1024 * 1024 // 25 MB
const FETCH_TIMEOUT_MS = 15_000

// Collections whose schema has a `realtor` relationship field.
const REALTOR_ATTRIBUTABLE = new Set<FeedCollection>(['flats', 'houses'])

const isPrivateHost = (hostname: string): boolean => {
  const h = hostname.toLowerCase()
  if (h === 'localhost' || h === '0.0.0.0' || h === '::1') return true
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true
  if (h === '169.254.169.254') return true
  return false
}

const fetchFeed = async (url: string): Promise<string> => {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error('Некорректный URL фида')
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('URL фида должен начинаться с http(s)://')
  }
  if (isPrivateHost(parsed.hostname)) {
    throw new Error('URL фида указывает на внутренний/локальный адрес — запрещено')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(parsed.toString(), { signal: controller.signal })
    if (!res.ok) throw new Error(`Фид ответил ${res.status} ${res.statusText}`)
    const text = await res.text()
    if (text.length > MAX_FEED_BYTES) throw new Error('Фид слишком большой (>25 МБ)')
    return text
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const payload = await getPayload({ config })
    const auth = await payload.auth({ headers: req.headers })
    if (!auth?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { user } = auth

    const url = new URL(req.url)
    const dryRun = url.searchParams.get('dryRun') === 'true'

    const ct = req.headers.get('content-type') ?? ''
    let xml: string
    try {
      if (ct.includes('multipart/form-data')) {
        const form = await req.formData()
        const file = form.get('file')
        const feedUrl = form.get('url')
        if (file instanceof File) {
          xml = await file.text()
        } else if (typeof feedUrl === 'string' && feedUrl.trim()) {
          xml = await fetchFeed(feedUrl.trim())
        } else {
          return Response.json(
            { error: 'Прикрепите XML/YML-файл в поле "file" или укажите "url"' },
            { status: 400 },
          )
        }
      } else if (ct.includes('application/json')) {
        const body = await req.json().catch(() => null)
        if (!body?.url || typeof body.url !== 'string') {
          return Response.json({ error: 'Укажите "url" фида в теле запроса' }, { status: 400 })
        }
        xml = await fetchFeed(body.url.trim())
      } else {
        xml = await req.text()
        if (!xml.trim()) {
          return Response.json(
            { error: 'Пустое тело запроса — пришлите XML/YML или JSON {"url": "..."}' },
            { status: 400 },
          )
        }
      }
    } catch (e) {
      return Response.json(
        { error: e instanceof Error ? e.message : 'Не удалось получить фид' },
        { status: 400 },
      )
    }

    let parsed: ReturnType<typeof parseFeed>
    try {
      parsed = parseFeed(xml)
    } catch (e) {
      return Response.json(
        { error: e instanceof Error ? e.message : 'Не удалось разобрать фид' },
        { status: 400 },
      )
    }

    const results: RowResult[] = parsed.skipped.map((s) => ({
      externalId: s.externalId,
      status: 'error',
      reason: s.reason,
    }))
    let created = 0
    let skipped = 0
    let errored = parsed.skipped.length

    const localReq = await createLocalReq({}, payload)

    for (const listing of parsed.listings) {
      try {
        const data: Record<string, unknown> = { ...listing.data }
        if (user.role === 'realtor' && REALTOR_ATTRIBUTABLE.has(listing.collection)) {
          data.realtor = user.id
        }

        const existing = await payload.find({
          collection: listing.collection,
          where: { slug: { equals: data.slug } },
          limit: 1,
          depth: 0,
          req: localReq,
        })
        if (existing.docs[0]) {
          results.push({ externalId: listing.externalId, collection: listing.collection, status: 'skipped', reason: 'уже импортирован (slug совпадает)' })
          skipped++
          continue
        }

        if (dryRun) {
          results.push({ externalId: listing.externalId, collection: listing.collection, status: 'created', reason: '(dry-run)' })
          created++
          continue
        }

        const cityName = (data.location as Record<string, unknown> | undefined)?.city
        if (typeof cityName === 'string' && cityName) {
          await upsertCity({ payload, req: localReq, name: cityName })
        }

        await payload.create({ collection: listing.collection, data: data as any, req: localReq })
        results.push({ externalId: listing.externalId, collection: listing.collection, status: 'created' })
        created++
      } catch (e) {
        results.push({
          externalId: listing.externalId,
          collection: listing.collection,
          status: 'error',
          reason: e instanceof Error ? e.message : String(e),
        })
        errored++
      }
    }

    return Response.json({
      success: true,
      dryRun,
      format: parsed.format,
      totals: {
        offers: parsed.listings.length + parsed.skipped.length,
        created,
        skipped,
        errored,
      },
      results: results.slice(0, 200), // cap to avoid huge responses
    })
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : 'Импорт не удался' },
      { status: 500 },
    )
  }
}

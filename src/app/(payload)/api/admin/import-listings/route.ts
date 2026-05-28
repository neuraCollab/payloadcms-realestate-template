// Admin CSV import for the Flats collection.
//
//   POST /api/admin/import-listings              → import & persist
//   POST /api/admin/import-listings?dryRun=true  → parse + validate, no writes
//
// Auth: requires a logged-in Payload user with role=admin.
//
// Expected columns (header row, case-insensitive):
//   title*, address*, city*, district, price*, rooms, area, transactionType,
//   propertyCategory, buildingType, yearBuilt, floor, totalFloors, slug
//
// `transactionType` is one of: sale | rent | daily (default: sale).
// `propertyCategory` is one of: apartment | apartments | studio | townhouse |
//   penthouse | house-part (default: apartment).
// `rooms` is one of: studio | 1 | 2 | 3 | 4 | 5plus (auto-derived if number).

import { getPayload } from 'payload'
import config from '@/payload.config'
import { parseCsv, type CsvRow } from '@/lib/csv'
import { upsertCity } from '@/lib/listings-parser/city-upsert'
import { slugifyRu } from '@/collections/Cities'

interface RowResult {
  index: number
  title?: string
  status: 'created' | 'skipped' | 'error'
  reason?: string
}

const truthy = (v: string | undefined): boolean =>
  !!v && !['0', 'false', 'no', 'нет'].includes(v.toLowerCase())

const num = (v: string | undefined): number | undefined => {
  if (!v) return undefined
  const n = parseFloat(v.replace(/[\s,]/g, '.'))
  return Number.isFinite(n) ? n : undefined
}

const normalizeRooms = (v: string | undefined): string | undefined => {
  if (!v) return undefined
  const t = v.toLowerCase()
  if (['studio', 'студия'].includes(t)) return 'studio'
  if (/^5\+?|5plus|5\s*и/.test(t)) return '5plus'
  const n = parseInt(t, 10)
  if (n >= 1 && n <= 4) return String(n)
  return undefined
}

const VALID_TRANSACTION = new Set(['sale', 'rent', 'daily'])
const VALID_CATEGORY = new Set([
  'apartment',
  'apartments',
  'studio',
  'townhouse',
  'penthouse',
  'house-part',
])
const VALID_BUILDING = new Set(['panel', 'brick', 'monolithic', 'block', 'wood'])

const rowToFlat = (row: CsvRow): { ok: true; data: any } | { ok: false; reason: string } => {
  const title = row.title?.trim()
  const address = row.address?.trim()
  const city = row.city?.trim()
  const price = num(row.price)

  if (!title) return { ok: false, reason: 'missing title' }
  if (!address) return { ok: false, reason: 'missing address' }
  if (!city) return { ok: false, reason: 'missing city' }
  if (!price || price <= 0) return { ok: false, reason: 'missing or non-positive price' }

  const transactionType =
    row.transactiontype && VALID_TRANSACTION.has(row.transactiontype)
      ? row.transactiontype
      : 'sale'

  const propertyCategory =
    row.propertycategory && VALID_CATEGORY.has(row.propertycategory)
      ? row.propertycategory
      : 'apartment'

  const buildingType = VALID_BUILDING.has(row.buildingtype) ? row.buildingtype : undefined
  const rooms = normalizeRooms(row.rooms)
  const area = num(row.area)
  const floor = num(row.floor)
  const totalFloors = num(row.totalfloors)
  const yearBuilt = num(row.yearbuilt)

  const slug = row.slug?.trim() || slugifyRu(`${title} ${address}`)

  return {
    ok: true,
    data: {
      title,
      slug,
      propertyCategory,
      transactionType,
      location: {
        city,
        district: row.district?.trim() || 'Центр',
        address,
      },
      ...(rooms ? { rooms } : {}),
      ...(area
        ? { area: { total: area } }
        : { area: { total: 30 } }),
      ...(floor || totalFloors
        ? { floorInfo: { ...(floor ? { floor } : {}), ...(totalFloors ? { totalFloors } : {}) } }
        : {}),
      price,
      currency: 'RUB',
      ...(buildingType ? { buildingType } : {}),
      ...(yearBuilt ? { yearBuilt } : {}),
      status: 'active',
      isFeatured: truthy(row.isfeatured),
    },
  }
}

const requireAdmin = async (req: Request) => {
  const payload = await getPayload({ config })
  const auth = await payload.auth({ headers: req.headers })
  if (!auth?.user) {
    return { error: Response.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  if (auth.user.role !== 'admin') {
    return { error: Response.json({ error: 'Только администратор' }, { status: 403 }) }
  }
  return { payload, user: auth.user }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const auth = await requireAdmin(req)
    if ('error' in auth) return auth.error
    const { payload } = auth

    const url = new URL(req.url)
    const dryRun = url.searchParams.get('dryRun') === 'true'

    const ct = req.headers.get('content-type') ?? ''
    let csvText: string
    if (ct.includes('multipart/form-data')) {
      const form = await req.formData()
      const file = form.get('file')
      if (!(file instanceof File)) {
        return Response.json({ error: 'Прикрепите CSV-файл в поле "file"' }, { status: 400 })
      }
      csvText = await file.text()
    } else {
      csvText = await req.text()
    }

    const rows = parseCsv(csvText)
    if (rows.length === 0) {
      return Response.json({ error: 'CSV пустой или нет строк после заголовка' }, { status: 400 })
    }

    const results: RowResult[] = []
    let created = 0
    let skipped = 0
    let errored = 0

    // Use payload-local req so hooks have a proper context.
    const localReq = await import('payload').then(({ createLocalReq }) =>
      createLocalReq({}, payload),
    )

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i]
      const out = rowToFlat(r)
      if (!out.ok) {
        results.push({ index: i, title: r.title, status: 'error', reason: out.reason })
        errored++
        continue
      }

      // Dedup by slug.
      const existing = await payload.find({
        collection: 'flats',
        where: { slug: { equals: out.data.slug } },
        limit: 1,
        depth: 0,
        req: localReq,
      })
      if (existing.docs[0]) {
        results.push({ index: i, title: out.data.title, status: 'skipped', reason: 'slug exists' })
        skipped++
        continue
      }

      if (dryRun) {
        results.push({ index: i, title: out.data.title, status: 'created', reason: '(dry-run)' })
        created++
        continue
      }

      try {
        await upsertCity({ payload, req: localReq, name: out.data.location.city })
        await payload.create({ collection: 'flats', data: out.data, req: localReq })
        results.push({ index: i, title: out.data.title, status: 'created' })
        created++
      } catch (e) {
        results.push({
          index: i,
          title: out.data.title,
          status: 'error',
          reason: e instanceof Error ? e.message : String(e),
        })
        errored++
      }
    }

    return Response.json({
      success: true,
      dryRun,
      totals: { rows: rows.length, created, skipped, errored },
      results: results.slice(0, 100), // cap to avoid huge response
    })
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : 'Import failed' },
      { status: 500 },
    )
  }
}

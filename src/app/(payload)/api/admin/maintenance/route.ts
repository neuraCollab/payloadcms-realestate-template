// Periodic maintenance for the Flats collection.
//
//   POST /api/admin/maintenance?action=expire&days=90    — unpublish stale
//   POST /api/admin/maintenance?action=dedup             — unpublish duplicates
//   POST /api/admin/maintenance?action=all               — both, sequentially
//   ?dryRun=true                                          — preview, no writes
//
// Auth: admin user OR Bearer CRON_SECRET (so it can be invoked from cron).

import { getPayload, createLocalReq, type PayloadRequest } from 'payload'
import config from '@/payload.config'
import { secureCompare } from '@/utilities/secureCompare'

const DEFAULT_DAYS = 90

// Normalises a string for fuzzy comparison: lower-case, strip diacritics &
// punctuation, collapse spaces. Used for address-based dedup.
const norm = (s: string | undefined | null): string => {
  if (!s) return ''
  return s
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

interface ExpireSummary {
  evaluated: number
  unpublished: number
  ids: Array<string | number>
}

const expireStale = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  req: PayloadRequest,
  days: number,
  dryRun: boolean,
): Promise<ExpireSummary> => {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
  const result = await payload.find({
    collection: 'flats',
    where: {
      and: [
        { status: { equals: 'active' } },
        { createdAt: { less_than: cutoff } },
      ],
    },
    limit: 1000,
    depth: 0,
    pagination: false,
    req,
  })

  const summary: ExpireSummary = {
    evaluated: result.totalDocs,
    unpublished: 0,
    ids: [],
  }

  for (const doc of result.docs) {
    summary.ids.push(doc.id)
    summary.unpublished++
    if (dryRun) continue
    await payload.update({
      collection: 'flats',
      id: doc.id,
      data: { status: 'unpublished' as any },
      req,
    })
  }
  return summary
}

interface DedupSummary {
  groups: number
  unpublished: number
  details: Array<{
    keep: string | number
    drop: Array<string | number>
    sample: string
  }>
}

const dedupListings = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  req: PayloadRequest,
  dryRun: boolean,
): Promise<DedupSummary> => {
  // Pull all active flats. For a real production system this should page
  // through results, but the worktree volume is in the thousands at worst.
  const all = await payload.find({
    collection: 'flats',
    where: { status: { equals: 'active' } },
    limit: 5000,
    pagination: false,
    depth: 0,
    req,
  })

  // Group by normalized (title + address) key.
  const groups = new Map<string, any[]>()
  for (const doc of all.docs as any[]) {
    const key = `${norm(doc.title)}::${norm(doc.location?.address)}`
    if (!key.includes('::')) continue
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(doc)
  }

  const summary: DedupSummary = { groups: 0, unpublished: 0, details: [] }

  for (const [key, docs] of groups) {
    if (docs.length < 2) continue
    summary.groups++

    // Keep the most recent, drop the rest.
    docs.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
    const [keep, ...drop] = docs
    const dropIds = drop.map((d) => d.id)
    summary.unpublished += dropIds.length
    summary.details.push({ keep: keep.id, drop: dropIds, sample: key })

    if (dryRun) continue
    for (const d of drop) {
      await payload.update({
        collection: 'flats',
        id: d.id,
        data: { status: 'unpublished' as any },
        req,
      })
    }
  }
  return summary
}

const authorize = async (
  req: Request,
): Promise<{ payload: Awaited<ReturnType<typeof getPayload>>; req: PayloadRequest } | Response> => {
  const payload = await getPayload({ config })

  // Cron secret bypass (allows Vercel/GitHub-Action style scheduling).
  const authHeader = req.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (expected && authHeader && secureCompare(authHeader, `Bearer ${expected}`)) {
    return { payload, req: await createLocalReq({}, payload) }
  }

  const auth = await payload.auth({ headers: req.headers })
  if (!auth?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (auth.user.role !== 'admin') {
    return Response.json({ error: 'Только администратор' }, { status: 403 })
  }
  return { payload, req: await createLocalReq({}, payload) }
}

export async function POST(request: Request): Promise<Response> {
  const auth = await authorize(request)
  if (auth instanceof Response) return auth
  const { payload, req } = auth

  const url = new URL(request.url)
  const action = url.searchParams.get('action') ?? 'all'
  const dryRun = url.searchParams.get('dryRun') === 'true'
  const days = Math.max(1, parseInt(url.searchParams.get('days') ?? String(DEFAULT_DAYS), 10) || DEFAULT_DAYS)

  const out: Record<string, unknown> = { dryRun }

  if (action === 'expire' || action === 'all') {
    out.expire = await expireStale(payload, req, days, dryRun)
  }
  if (action === 'dedup' || action === 'all') {
    out.dedup = await dedupListings(payload, req, dryRun)
  }

  if (!('expire' in out) && !('dedup' in out)) {
    return Response.json(
      { error: 'Unknown action. Use action=expire | dedup | all' },
      { status: 400 },
    )
  }

  return Response.json({ success: true, ...out })
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { rateLimitOk, HONEYPOT_FIELD, looksLikeBot } from '@/lib/rateLimit'
import { cookies } from 'next/headers'

/**
 * POST /api/saved-searches
 *   Создать сохранённый поиск. Если email в cookie (realty_email) —
 *   берём оттуда, иначе требуем явно. Без верификации (юзер сам
 *   подписывается на свой адрес).
 *
 * GET /api/saved-searches
 *   Список поисков по email из cookie. Только свои.
 *
 * DELETE /api/saved-searches?id=N
 *   Удалить свой поиск.
 */

const isValidEmail = (s: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

async function getEmailFromCookie(): Promise<string | null> {
  const c = await cookies()
  const v = c.get('realty_email')?.value
  return v ? decodeURIComponent(v).toLowerCase() : null
}

export async function POST(req: NextRequest): Promise<Response> {
  const rl = rateLimitOk(req, {
    key: 'saved-search-create',
    limit: 10,
    windowMs: 600_000,
  })
  if (!rl.ok) return rl.response

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }
  if (looksLikeBot(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true })
  }

  const cookieEmail = await getEmailFromCookie()
  const email = String(body.email ?? cookieEmail ?? '')
    .trim()
    .toLowerCase()
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'email_invalid' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim().slice(0, 120)
  if (!name) {
    return NextResponse.json({ error: 'name_required' }, { status: 400 })
  }

  const filters = body.filters
  if (!filters || typeof filters !== 'object') {
    return NextResponse.json({ error: 'filters_required' }, { status: 400 })
  }

  const frequency: 'instant' | 'daily' | 'weekly' =
    body.frequency === 'instant' || body.frequency === 'weekly'
      ? body.frequency
      : 'daily'

  const payload = await getPayload({ config })
  try {
    const doc = await payload.create({
      collection: 'saved-searches',
      data: {
        email,
        name,
        filters,
        frequency,
        isActive: true,
      } as any,
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, id: doc.id })
  } catch (err: any) {
    console.error('[saved-searches] create', err?.message ?? err)
    return NextResponse.json({ error: 'create_failed' }, { status: 500 })
  }
}

export async function GET(req: NextRequest): Promise<Response> {
  const cookieEmail = await getEmailFromCookie()
  if (!cookieEmail) {
    return NextResponse.json({ docs: [] })
  }
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'saved-searches',
    where: { email: { equals: cookieEmail } },
    sort: '-createdAt',
    limit: 50,
    depth: 0,
    overrideAccess: true,
  })
  return NextResponse.json({ docs: result.docs })
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id_required' }, { status: 400 })

  const cookieEmail = await getEmailFromCookie()
  if (!cookieEmail) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const found = await payload.findByID({
    collection: 'saved-searches',
    id,
    overrideAccess: true,
  })
  if (!found || (found as any).email !== cookieEmail) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  await payload.delete({
    collection: 'saved-searches',
    id,
    overrideAccess: true,
  })
  return NextResponse.json({ ok: true })
}

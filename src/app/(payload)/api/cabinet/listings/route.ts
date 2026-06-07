import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@/payload.config'
import { rateLimitOk, HONEYPOT_FIELD, looksLikeBot } from '@/lib/rateLimit'
import {
  validateDraft,
  isListingCollection,
  type ListingCollection,
} from '@/lib/cabinet/listingValidator'

/**
 * GET /api/cabinet/listings
 *   Список МОИХ объявлений из ВСЕХ 4 коллекций (по cookie email).
 *   Каждый док дополнен полем `collection`.
 *
 * POST /api/cabinet/listings
 *   Body: { collection: 'flats'|'houses'|'commercial'|'lands', ...fields }
 *   Создаёт draft. status='draft' принудительно, contactEmail из cookie.
 *
 * Verifications:
 *   • cookie realty_email
 *   • rate-limit 5/час per (email, collection)
 *   • honeypot
 *   • per-collection field validation
 *   • anti-dup (тот же title за 24ч)
 */

const ALL_COLLECTIONS: ListingCollection[] = ['flats', 'houses', 'commercial', 'lands']

async function getEmailFromCookie(): Promise<string | null> {
  const c = await cookies()
  const v = c.get('realty_email')?.value
  return v ? decodeURIComponent(v).toLowerCase() : null
}

export async function GET(): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ docs: [] })

  const payload = await getPayload({ config })
  // 4 параллельных запроса. Для UGC юзера обычно 1-10 шт. суммарно —
  // дёшево. depth=1 чтобы images подтянуть.
  const results = await Promise.all(
    ALL_COLLECTIONS.map((c) =>
      payload
        .find({
          collection: c as any,
          where: { contactEmail: { equals: email } },
          sort: '-createdAt',
          limit: 50,
          depth: 1,
          overrideAccess: true,
        })
        .then((r) => r.docs.map((d: any) => ({ ...d, collection: c })))
        .catch(() => []),
    ),
  )

  const merged = ([] as any[])
    .concat(...results)
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))

  return NextResponse.json({ docs: merged })
}

export async function POST(req: NextRequest): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) {
    return NextResponse.json(
      { error: 'unauthorized', message: 'Войдите в кабинет через email-ссылку' },
      { status: 401 },
    )
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  if (looksLikeBot(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true, id: 0 })
  }

  const collection = (body.collection ?? 'flats') as string
  if (!isListingCollection(collection)) {
    return NextResponse.json(
      { error: 'bad_collection', message: 'Неподдерживаемый тип объявления' },
      { status: 400 },
    )
  }

  const rl = rateLimitOk(req, {
    key: `listing-create:${collection}:${email}`,
    limit: 5,
    windowMs: 60 * 60_000,
  })
  if (!rl.ok) return rl.response

  const v = validateDraft(collection, body)
  if (!v.ok) {
    return NextResponse.json(
      { error: 'validation_failed', errors: v.errors },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config })

  const dayAgo = new Date(Date.now() - 24 * 60 * 60_000).toISOString()
  const dup = await payload.find({
    collection: collection as any,
    where: {
      and: [
        { contactEmail: { equals: email } },
        { title: { equals: v.data.title } },
        { createdAt: { greater_than: dayAgo } },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (dup.totalDocs > 0) {
    return NextResponse.json(
      {
        error: 'duplicate',
        message: 'Похожее объявление уже создано за последние 24 часа.',
        existingId: dup.docs[0]?.id,
        collection,
      },
      { status: 409 },
    )
  }

  try {
    const created = await payload.create({
      collection: collection as any,
      data: {
        ...v.data,
        status: 'draft',
        contactEmail: email,
      } as any,
      overrideAccess: true,
    })
    return NextResponse.json({
      ok: true,
      id: created.id,
      slug: (created as any).slug,
      collection,
    })
  } catch (err: any) {
    payload.logger.error(
      { err: err?.message ?? err, email, collection },
      '[cabinet/listings] create failed',
    )
    return NextResponse.json(
      { error: 'create_failed', message: err?.message ?? 'unknown' },
      { status: 500 },
    )
  }
}

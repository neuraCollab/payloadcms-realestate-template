import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@/payload.config'
import { rateLimitOk, HONEYPOT_FIELD, looksLikeBot } from '@/lib/rateLimit'
import { validateFlatDraft } from '@/lib/cabinet/listingValidator'

/**
 * GET /api/cabinet/listings — список моих объявлений (по cookie email).
 *
 * POST /api/cabinet/listings — создать draft.
 *   Body: { ...DraftFlatInput, website? (honeypot) }
 *   Verifications:
 *     • auth: realty_email cookie (ставится magic-link verify)
 *     • rate-limit: 5 за час по IP
 *     • honeypot: silent skip если заполнен
 *     • валидация полей (см. listingValidator)
 *     • anti-dup: не больше 1 объявления с тем же title за 24ч у юзера
 *     • статус принудительно 'draft' — никаких active из публичного API
 */

async function getEmailFromCookie(): Promise<string | null> {
  const c = await cookies()
  const v = c.get('realty_email')?.value
  return v ? decodeURIComponent(v).toLowerCase() : null
}

export async function GET(): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) {
    return NextResponse.json({ docs: [] })
  }
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'flats',
    where: { contactEmail: { equals: email } },
    sort: '-createdAt',
    limit: 50,
    depth: 1,
    overrideAccess: true,
  })
  return NextResponse.json({ docs: res.docs })
}

export async function POST(req: NextRequest): Promise<Response> {
  // 1. Auth
  const email = await getEmailFromCookie()
  if (!email) {
    return NextResponse.json(
      { error: 'unauthorized', message: 'Войдите в кабинет через email-ссылку' },
      { status: 401 },
    )
  }

  // 2. Rate-limit (5/час по IP + email)
  const rl = rateLimitOk(req, {
    key: `listing-create:${email}`,
    limit: 5,
    windowMs: 60 * 60_000,
  })
  if (!rl.ok) return rl.response

  // 3. Parse body
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  // 4. Honeypot
  if (looksLikeBot(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true, id: 0 }) // фейк-ok боту
  }

  // 5. Field validation
  const v = validateFlatDraft(body)
  if (!v.ok) {
    return NextResponse.json(
      { error: 'validation_failed', errors: v.errors },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config })

  // 6. Anti-duplicate: тот же email + тот же title за 24ч.
  const dayAgo = new Date(Date.now() - 24 * 60 * 60_000).toISOString()
  const dup = await payload.find({
    collection: 'flats',
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
      },
      { status: 409 },
    )
  }

  // 7. Create as draft. status='draft' принудительно — не позволяем
  // подсунуть 'active' через body.
  try {
    const created = await payload.create({
      collection: 'flats',
      data: {
        ...v.data,
        status: 'draft',
        contactEmail: email,
      } as any,
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, id: created.id, slug: created.slug })
  } catch (err: any) {
    payload.logger.error(
      { err: err?.message ?? err, email },
      '[cabinet/listings] create failed',
    )
    return NextResponse.json(
      { error: 'create_failed', message: err?.message ?? 'unknown' },
      { status: 500 },
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@/payload.config'
import { validateFlatDraft } from '@/lib/cabinet/listingValidator'

/**
 * Per-listing API:
 *   GET    /api/cabinet/listings/[id]      — get my listing (owner check)
 *   PATCH  /api/cabinet/listings/[id]      — update draft (validation)
 *   DELETE /api/cabinet/listings/[id]      — delete draft (owner check)
 *
 * Все требуют realty_email cookie и проверяют contactEmail === cookie.
 * Опубликованные (status='active') нельзя редактировать/удалять —
 * это уже под модерацией; menjа admin.
 */

async function getEmailFromCookie(): Promise<string | null> {
  const c = await cookies()
  const v = c.get('realty_email')?.value
  return v ? decodeURIComponent(v).toLowerCase() : null
}

async function loadOwned(id: string, email: string): Promise<any> {
  const payload = await getPayload({ config })
  try {
    const doc = await payload.findByID({
      collection: 'flats',
      id,
      depth: 1,
      overrideAccess: true,
    })
    if (!doc) return null
    if ((doc as any).contactEmail !== email) return null
    return doc
  } catch {
    return null
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const doc = await loadOwned(id, email)
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json({ doc })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const doc = await loadOwned(id, email)
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  // active/sold/pending_review нельзя редактировать через кабинет —
  // только модератор. draft — можно.
  if (doc.status !== 'draft') {
    return NextResponse.json(
      { error: 'not_editable', message: 'Можно редактировать только черновики.' },
      { status: 403 },
    )
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'bad_json' }, { status: 400 })

  const v = validateFlatDraft(body)
  if (!v.ok) {
    return NextResponse.json(
      { error: 'validation_failed', errors: v.errors },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config })
  try {
    const updated = await payload.update({
      collection: 'flats',
      id,
      data: {
        ...v.data,
        // status и contactEmail не позволяем менять через UPDATE.
        status: 'draft' as any,
        contactEmail: email,
      } as any,
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, doc: updated })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'update_failed', message: err?.message ?? 'unknown' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const doc = await loadOwned(id, email)
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  // Аналогично PATCH — только draft.
  if (doc.status !== 'draft') {
    return NextResponse.json(
      { error: 'not_deletable', message: 'Можно удалять только черновики.' },
      { status: 403 },
    )
  }

  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'flats',
    id,
    overrideAccess: true,
  })
  return NextResponse.json({ ok: true })
}

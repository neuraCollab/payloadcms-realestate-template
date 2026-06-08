import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@/payload.config'
import {
  validateDraft,
  isListingCollection,
  type ListingCollection,
} from '@/lib/cabinet/listingValidator'

/**
 * Per-listing API. `?collection=` query param (default 'flats').
 */

async function getEmailFromCookie(): Promise<string | null> {
  const c = await cookies()
  const v = c.get('realty_email')?.value
  return v ? decodeURIComponent(v).toLowerCase() : null
}

function getCollection(req: NextRequest): ListingCollection | null {
  const c = new URL(req.url).searchParams.get('collection') ?? 'flats'
  return isListingCollection(c) ? c : null
}

async function loadOwned(
  collection: ListingCollection,
  id: string,
  email: string,
): Promise<any> {
  const payload = await getPayload({ config })
  try {
    const doc = await payload.findByID({
      collection: collection as any,
      id,
      depth: 1,
      overrideAccess: true,
    })
    if (!doc || (doc as any).contactEmail !== email) return null
    return doc
  } catch {
    return null
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const collection = getCollection(req)
  if (!collection) return NextResponse.json({ error: 'bad_collection' }, { status: 400 })

  const { id } = await params
  const doc = await loadOwned(collection, id, email)
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json({ doc, collection })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const collection = getCollection(req)
  if (!collection) return NextResponse.json({ error: 'bad_collection' }, { status: 400 })

  const { id } = await params
  const doc = await loadOwned(collection, id, email)
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  if (doc.status !== 'draft') {
    return NextResponse.json(
      { error: 'not_editable', message: 'Можно редактировать только черновики.' },
      { status: 403 },
    )
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'bad_json' }, { status: 400 })

  const v = validateDraft(collection, body)
  if (!v.ok) {
    return NextResponse.json(
      { error: 'validation_failed', errors: v.errors },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config })
  try {
    const updated = await payload.update({
      collection: collection as any,
      id,
      data: {
        ...v.data,
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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const collection = getCollection(req)
  if (!collection) return NextResponse.json({ error: 'bad_collection' }, { status: 400 })

  const { id } = await params
  const doc = await loadOwned(collection, id, email)
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  if (doc.status !== 'draft') {
    return NextResponse.json(
      { error: 'not_deletable', message: 'Можно удалять только черновики.' },
      { status: 403 },
    )
  }

  const payload = await getPayload({ config })
  await payload.delete({
    collection: collection as any,
    id,
    overrideAccess: true,
  })
  return NextResponse.json({ ok: true })
}

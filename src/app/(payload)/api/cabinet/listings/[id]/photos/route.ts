import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@/payload.config'

/**
 * POST /api/cabinet/listings/[id]/photos
 *   FormData с полем `file` (или несколькими). Загружает в media,
 *   привязывает к flats.images.
 *
 * DELETE /api/cabinet/listings/[id]/photos?mediaId=N
 *   Отвязать (и удалить) фото у объявления.
 *
 * Verifications:
 *   • cookie realty_email + owner check
 *   • не больше 10 фото на объявление
 *   • размер ≤ 5MB
 *   • MIME image/jpeg|png|webp|avif
 *   • status='draft' (опубликованное не редактируется через кабинет)
 */

const MAX_PHOTOS = 10
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
])

async function getEmailFromCookie(): Promise<string | null> {
  const c = await cookies()
  const v = c.get('realty_email')?.value
  return v ? decodeURIComponent(v).toLowerCase() : null
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const payload = await getPayload({ config })

  let listing: any
  try {
    listing = await payload.findByID({
      collection: 'flats',
      id,
      depth: 1,
      overrideAccess: true,
    })
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  if (!listing || listing.contactEmail !== email) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  if (listing.status !== 'draft') {
    return NextResponse.json(
      { error: 'not_editable', message: 'Фото можно менять только в черновике.' },
      { status: 403 },
    )
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'bad_form' }, { status: 400 })
  }

  const files = formData.getAll('file').filter((f): f is File => f instanceof File)
  if (files.length === 0) {
    return NextResponse.json({ error: 'no_files' }, { status: 400 })
  }

  // Текущее число + новые ≤ MAX_PHOTOS
  const currentCount = Array.isArray(listing.images) ? listing.images.length : 0
  if (currentCount + files.length > MAX_PHOTOS) {
    return NextResponse.json(
      {
        error: 'too_many',
        message: `Максимум ${MAX_PHOTOS} фото на объявление. Сейчас: ${currentCount}.`,
      },
      { status: 400 },
    )
  }

  // Лимит размера/типа.
  for (const f of files) {
    if (f.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'file_too_large', message: `Файл ${f.name}: больше 5 МБ.` },
        { status: 400 },
      )
    }
    if (!ALLOWED_MIME.has(f.type)) {
      return NextResponse.json(
        {
          error: 'bad_mime',
          message: `Файл ${f.name}: только JPG/PNG/WEBP/AVIF.`,
        },
        { status: 400 },
      )
    }
  }

  const createdMediaIds: number[] = []
  for (const f of files) {
    try {
      const buf = Buffer.from(await f.arrayBuffer())
      const media: any = await payload.create({
        collection: 'media',
        data: { alt: listing.title ? `Фото — ${listing.title}` : 'Фото объявления' } as any,
        file: {
          data: buf,
          mimetype: f.type,
          name: f.name,
          size: f.size,
        },
        overrideAccess: true,
      })
      createdMediaIds.push(media.id)
    } catch (err: any) {
      payload.logger.error(
        { err: err?.message },
        '[cabinet/photos] upload failed',
      )
      return NextResponse.json(
        { error: 'upload_failed', message: err?.message ?? 'unknown' },
        { status: 500 },
      )
    }
  }

  // Привязываем к flats.images.
  const newImages = [
    ...(Array.isArray(listing.images) ? listing.images : []),
    ...createdMediaIds.map((mid) => ({ image: mid })),
  ]
  await payload.update({
    collection: 'flats',
    id,
    data: { images: newImages } as any,
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true, addedIds: createdMediaIds })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const email = await getEmailFromCookie()
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const mediaId = new URL(req.url).searchParams.get('mediaId')
  if (!mediaId) {
    return NextResponse.json({ error: 'mediaId_required' }, { status: 400 })
  }

  const payload = await getPayload({ config })
  const listing: any = await payload
    .findByID({
      collection: 'flats',
      id,
      depth: 1,
      overrideAccess: true,
    })
    .catch(() => null)
  if (!listing || listing.contactEmail !== email) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  if (listing.status !== 'draft') {
    return NextResponse.json({ error: 'not_editable' }, { status: 403 })
  }

  const filtered = (listing.images ?? []).filter(
    (item: any) =>
      String(item?.image?.id ?? item?.image) !== String(mediaId),
  )
  await payload.update({
    collection: 'flats',
    id,
    data: { images: filtered } as any,
    overrideAccess: true,
  })

  // Удаляем media (если не используется в других объявлениях — best-effort)
  try {
    await payload.delete({
      collection: 'media',
      id: mediaId,
      overrideAccess: true,
    })
  } catch {
    /* media может быть прикреплена ещё где-то; не критично */
  }

  return NextResponse.json({ ok: true })
}

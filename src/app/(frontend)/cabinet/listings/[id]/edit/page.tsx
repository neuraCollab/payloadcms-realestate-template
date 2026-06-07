import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { ChevronLeft, Eye } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ListingForm } from '../../ListingForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Редактирование объявления — MegaDomic',
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditListingPage({ params }: Props) {
  const { id } = await params
  const c = await cookies()
  const email = c.get('realty_email')?.value
    ? decodeURIComponent(c.get('realty_email')!.value).toLowerCase()
    : null

  if (!email) redirect('/cabinet/login')

  const payload = await getPayload({ config })
  let doc: any = null
  try {
    doc = await payload.findByID({
      collection: 'flats',
      id,
      depth: 1,
      overrideAccess: true,
    })
  } catch {
    /* not found */
  }
  if (!doc || doc.contactEmail !== email) notFound()

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/cabinet/listings"
          className="inline-flex items-center gap-1 text-body-sm text-on-surface-variant hover:text-on-surface"
        >
          <ChevronLeft className="w-4 h-4" />К моим объявлениям
        </Link>
        <Link
          href={`/cabinet/listings/${id}/preview`}
          className="inline-flex items-center gap-1 h-10 px-4 rounded-full border border-border text-body-sm text-on-surface hover:bg-surface-container"
        >
          <Eye className="w-4 h-4" />
          Превью
        </Link>
      </div>
      <div className="bg-card rounded-md shadow-e1 p-6">
        <h1 className="text-headline text-on-surface">Редактирование объявления</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Статус: <b>{doc.status === 'draft' ? 'Черновик' : doc.status}</b>.
          {doc.status !== 'draft'
            ? ' Объявление уже отправлено или опубликовано — редактирование через кабинет недоступно. Свяжитесь с модератором.'
            : ' Все изменения сохранятся как черновик.'}
        </p>
      </div>
      {doc.status === 'draft' ? (
        <ListingForm initial={doc} listingId={id} />
      ) : null}
    </div>
  )
}

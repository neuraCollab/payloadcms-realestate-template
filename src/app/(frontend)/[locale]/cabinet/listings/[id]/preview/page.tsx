import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { ChevronLeft, Edit } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyDetailPage } from '@/components/PropertyDetailPage'
import { SubmitButton } from './SubmitButton'
import {
  isListingCollection,
  type ListingCollection,
} from '@/lib/cabinet/listingValidator'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Превью объявления — Demo Realty',
  robots: { index: false, follow: false },
}

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ collection?: string }>
}

/**
 * Превью UGC-объявления. Рендерит ровно как публичная детальная
 * через PropertyDetailPage(doc, previewMode). PropertyDetailPage
 * поддерживает только 4 типа из PropertyType — для lands/houses/
 * commercial используем тот же компонент, для houses — fallback
 * на 'flats' UI (минимум, что есть для UGC).
 */
export default async function PreviewListingPage({ params, searchParams }: Props) {
  const { id } = await params
  const sp = await searchParams
  const collectionParam = sp.collection ?? 'flats'
  if (!isListingCollection(collectionParam)) notFound()
  const collection: ListingCollection = collectionParam

  const c = await cookies()
  const email = c.get('realty_email')?.value
    ? decodeURIComponent(c.get('realty_email')!.value).toLowerCase()
    : null
  if (!email) redirect('/cabinet/login')

  const payload = await getPayload({ config })
  let doc: any = null
  try {
    doc = await payload.findByID({
      collection: collection as any,
      id,
      depth: 2,
      overrideAccess: true,
    })
  } catch {
    /* notFound */
  }
  if (!doc || doc.contactEmail !== email) notFound()

  // PropertyDetailPage поддерживает 4 типа: flats/commercial/lands/
  // residential-complexes. Houses — мапим в flats (UI квартиры — самый
  // полный, для UGC-просмотра достаточно общего layout). Когда
  // появится отдельный HouseDetailPage — заменить.
  const previewType =
    collection === 'houses' ? 'flats' : (collection as 'flats' | 'commercial' | 'lands')

  return (
    <div className="space-y-4">
      <div className="max-w-3xl">
        <Link
          href="/cabinet/listings"
          className="inline-flex items-center gap-1 text-body-sm text-on-surface-variant hover:text-on-surface"
        >
          <ChevronLeft className="w-4 h-4" />К моим объявлениям
        </Link>
      </div>

      <div className="rounded-md bg-amber-50 border border-amber-200 p-3 flex flex-col sm:flex-row sm:items-center gap-3 text-body-sm text-amber-900">
        <span className="flex-1">
          <b>Это превью</b> — так объявление выглядит у пользователей.
          Статус: <b>{statusLabel(doc.status)}</b>.
        </span>
        {doc.status === 'draft' ? (
          <div className="flex items-center gap-2">
            <Link
              href={`/cabinet/listings/${id}/edit?collection=${collection}`}
              className="inline-flex items-center gap-1 h-9 px-3 rounded-full border border-amber-300 text-amber-900 text-body-sm bg-white hover:bg-amber-100"
            >
              <Edit className="w-4 h-4" />
              Редактировать
            </Link>
            <SubmitButton listingId={id} collection={collection} />
          </div>
        ) : null}
      </div>

      <PropertyDetailPage type={previewType as any} slug={doc.slug} doc={doc} previewMode />
    </div>
  )
}

function statusLabel(s: string): string {
  return (
    {
      draft: 'Черновик',
      pending_review: 'На модерации',
      active: 'Опубликовано',
      sold: 'Продано',
      unpublished: 'Снято',
    }[s] ?? s
  )
}

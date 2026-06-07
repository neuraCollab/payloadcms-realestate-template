import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { ChevronLeft, Edit, Send } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyDetailPage } from '@/components/PropertyDetailPage'
import { SubmitButton } from './SubmitButton'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Превью объявления — MegaDomic',
  robots: { index: false, follow: false },
}

interface Props {
  params: Promise<{ id: string }>
}

/**
 * Preview существующего объявления (любого статуса). Рендерит ровно
 * как публичная детальная — для этого PropertyDetailPage умеет
 * принимать готовый `doc` через prop, не дёргая БД повторно.
 *
 * Шапка превью + кнопки «Редактировать» и «Отправить на модерацию» —
 * только для status='draft'.
 */
export default async function PreviewListingPage({ params }: Props) {
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
      depth: 2,
      overrideAccess: true,
    })
  } catch {
    /* notFound */
  }
  if (!doc || doc.contactEmail !== email) notFound()

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
              href={`/cabinet/listings/${id}/edit`}
              className="inline-flex items-center gap-1 h-9 px-3 rounded-full border border-amber-300 text-amber-900 text-body-sm bg-white hover:bg-amber-100"
            >
              <Edit className="w-4 h-4" />
              Редактировать
            </Link>
            <SubmitButton listingId={id} />
          </div>
        ) : null}
      </div>

      {/* Сам рендер детальной — переиспользуем компонент. */}
      <PropertyDetailPage type="flats" slug={doc.slug} doc={doc} previewMode />
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

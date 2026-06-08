import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { ListingForm } from '../../ListingForm'
import {
  isListingCollection,
  COLLECTION_LABELS,
  type ListingCollection,
} from '@/lib/cabinet/listingValidator'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ collection: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params
  const label = isListingCollection(collection)
    ? COLLECTION_LABELS[collection as ListingCollection]
    : 'Объявление'
  return { title: `Новое: ${label} — MegaDomic` }
}

export default async function NewListingByTypePage({ params }: Props) {
  const { collection } = await params
  if (!isListingCollection(collection)) notFound()

  return (
    <div className="max-w-7xl space-y-4">
      <div className="flex items-center gap-3">
        <Link
          href="/cabinet/listings/new"
          className="inline-flex items-center gap-1 text-body-sm text-on-surface-variant hover:text-on-surface"
        >
          <ChevronLeft className="w-4 h-4" />Сменить тип
        </Link>
      </div>
      <div className="bg-card rounded-md shadow-e1 p-6">
        <h1 className="text-headline text-on-surface">
          Новое объявление: {COLLECTION_LABELS[collection as ListingCollection]}
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Заполните основные данные. {collection !== 'lands'
            ? 'Фото добавите на следующем шаге.'
            : ''}{' '}
          После «Отправить на модерацию» объявление проверит наш модератор в течение 24 часов.
        </p>
      </div>
      <ListingForm collection={collection as ListingCollection} />
    </div>
  )
}

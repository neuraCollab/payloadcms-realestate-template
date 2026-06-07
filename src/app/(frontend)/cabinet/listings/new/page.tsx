import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ListingForm } from '../ListingForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Новое объявление — MegaDomic',
}

export default function NewListingPage() {
  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <Link
          href="/cabinet/listings"
          className="inline-flex items-center gap-1 text-body-sm text-on-surface-variant hover:text-on-surface"
        >
          <ChevronLeft className="w-4 h-4" />К моим объявлениям
        </Link>
      </div>
      <div className="bg-card rounded-md shadow-e1 p-6">
        <h1 className="text-headline text-on-surface">Новое объявление</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Заполните основные данные. Фото добавите на следующем шаге.
          После «Отправить на модерацию» объявление проверит наш модератор
          в течение 24 часов.
        </p>
      </div>
      <ListingForm />
    </div>
  )
}

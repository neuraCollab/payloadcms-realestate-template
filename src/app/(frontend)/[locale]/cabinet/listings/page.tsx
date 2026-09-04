import type { Metadata } from 'next'
import React from 'react'
import { Plus, Home as HomeIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { ListingsList } from './ListingsList'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Мои объявления — Demo Realty',
  description: 'Управление вашими объявлениями: черновики, на модерации, опубликованные.',
}

export default function CabinetListingsPage() {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="bg-card rounded-md shadow-e1 p-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-headline text-on-surface flex items-center gap-2">
            <HomeIcon className="w-6 h-6 text-primary" />
            Мои объявления
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Черновики, ожидающие модерации и опубликованные объекты.
          </p>
        </div>
        <Link
          href="/cabinet/listings/new"
          className="shrink-0 inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Новое
        </Link>
      </div>

      <ListingsList />
    </div>
  )
}

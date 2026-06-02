import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Bookmark, Search } from 'lucide-react'

export default function SavedSearchesPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-card rounded-md shadow-e1 p-6">
        <h1 className="text-headline text-on-surface flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-primary" />
          Сохранённые поиски
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-2">
          Скоро вы сможете сохранять любые комбинации фильтров (например, «3-комн.
          до 12 М ₽ в Тверском районе») и получать уведомления, когда появится
          новый матч.
        </p>
      </div>

      <div className="bg-card rounded-md shadow-e1 p-6 space-y-3">
        <h2 className="text-title-lg text-on-surface">Что уже работает</h2>
        <p className="text-body-sm text-on-surface-variant">
          URL любой страницы поиска — это сохранённый фильтр. Скопируйте его в
          закладки, и фильтр всегда будет под рукой. Когда появится модуль
          alerts, эти URL&apos;ы автоматически подключатся к нему.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
        >
          <Search className="w-4 h-4" />
          Начать новый поиск
        </Link>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Сохранённые поиски — Realty',
}

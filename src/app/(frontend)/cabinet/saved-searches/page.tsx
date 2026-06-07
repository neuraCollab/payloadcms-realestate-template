import type { Metadata } from 'next'
import React from 'react'
import { Bookmark } from 'lucide-react'
import { SavedSearchesList } from './SavedSearchesList'

export const dynamic = 'force-dynamic'

export default function SavedSearchesPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-card rounded-md shadow-e1 p-6">
        <h1 className="text-headline text-on-surface flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-primary" />
          Сохранённые поиски
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-2">
          Подписки на новые объекты по вашим фильтрам. Когда появится
          новый матч — придёт письмо.
        </p>
      </div>

      <SavedSearchesList />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Сохранённые поиски — MegaDomic',
  description:
    'Сохранённые комбинации фильтров. Один клик — повторяете поиск ' +
    'без ручного ввода параметров.',
}

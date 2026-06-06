'use client'

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { SlidersHorizontal, X } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { PropertyFilters } from './index'
import { FILTER_SCHEMAS, type PropertyType } from './schemas'

interface Props {
  type: PropertyType
  totalDocs: number
}

/**
 * Мобильный bottom-sheet с фильтрами: на телефоне фильтры открываются
 * полноэкранной панелью «снизу», не загромождая выдачу. Внутри —
 * стандартная форма PropertyFilters (embedded), кнопка применения
 * показывает количество результатов.
 */
export const PropertyFiltersSheet: React.FC<Props> = ({ type, totalDocs }) => {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Подсчёт активных фильтров — для пилюли на trigger-кнопке.
  const activeCount = React.useMemo(() => {
    const schema = FILTER_SCHEMAS[type]
    let n = 0
    for (const f of schema) {
      const v = searchParams.get(f.key)
      if (!v) continue
      if (f.type === 'select' && v === 'all') continue
      n++
    }
    return n
  }, [type, searchParams])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-card text-body-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Фильтры
          {activeCount > 0 ? (
            <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-primary text-primary-foreground text-label">
              {activeCount}
            </span>
          ) : null}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/35 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          // Bottom sheet: занимает почти весь экран, выезжает снизу.
          className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] rounded-t-xl bg-card shadow-e3 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Dialog.Title className="text-title-lg text-on-surface">
              Фильтры
            </Dialog.Title>
            <Dialog.Close
              aria-label="Закрыть фильтры"
              className="inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <PropertyFilters
              type={type}
              totalDocs={totalDocs}
              embedded
              onApplied={() => setOpen(false)}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

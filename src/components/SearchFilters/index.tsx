'use client'
import React from 'react'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

// Unified cross-collection search filters.
// Used by /search. Keeps URL as the source of truth.

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Все типы' },
  { value: 'flats', label: 'Квартиры' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'lands', label: 'Земля' },
  { value: 'residential-complexes', label: 'Жилые комплексы' },
] as const

const TRANSACTION_OPTIONS = [
  { value: 'all', label: 'Любая' },
  { value: 'sale', label: 'Продажа' },
  { value: 'rent', label: 'Аренда' },
] as const

type DraftKey =
  | 'q'
  | 'category'
  | 'city'
  | 'transactionType'
  | 'minPrice'
  | 'maxPrice'

const KEYS: DraftKey[] = ['q', 'category', 'city', 'transactionType', 'minPrice', 'maxPrice']

export const SearchFilters: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const readDraft = React.useCallback(() => {
    const next: Record<DraftKey, string> = {
      q: searchParams.get('q') ?? '',
      category: searchParams.get('category') ?? 'all',
      city: searchParams.get('city') ?? '',
      transactionType: searchParams.get('transactionType') ?? 'all',
      minPrice: searchParams.get('minPrice') ?? '',
      maxPrice: searchParams.get('maxPrice') ?? '',
    }
    return next
  }, [searchParams])

  const [draft, setDraft] = React.useState(readDraft)

  React.useEffect(() => {
    setDraft(readDraft())
  }, [readDraft])

  const showTransaction =
    draft.category === 'all' || draft.category === 'flats' || draft.category === 'commercial'

  const update = (key: DraftKey, value: string) => setDraft((d) => ({ ...d, [key]: value }))

  const apply = () => {
    const params = new URLSearchParams()
    for (const k of KEYS) {
      const v = draft[k]
      if (!v) continue
      if ((k === 'category' || k === 'transactionType') && v === 'all') continue
      params.set(k, v)
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  const reset = () => {
    setDraft({
      q: '',
      category: 'all',
      city: '',
      transactionType: 'all',
      minPrice: '',
      maxPrice: '',
    })
    router.push(pathname)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        apply()
      }}
      className="bg-card rounded-md shadow-e1 p-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      <label className="flex flex-col gap-1 min-w-0 sm:col-span-2 lg:col-span-3">
        <span className="text-label text-on-surface-variant uppercase">Поиск</span>
        <input
          type="text"
          placeholder="Название, адрес, район…"
          value={draft.q}
          onChange={(e) => update('q', e.target.value)}
          className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <label className="flex flex-col gap-1 min-w-0">
        <span className="text-label text-on-surface-variant uppercase">Тип объекта</span>
        <select
          value={draft.category}
          onChange={(e) => update('category', e.target.value)}
          className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 min-w-0">
        <span className="text-label text-on-surface-variant uppercase">Город</span>
        <input
          type="text"
          placeholder="Москва"
          value={draft.city}
          onChange={(e) => update('city', e.target.value)}
          className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      {showTransaction ? (
        <label className="flex flex-col gap-1 min-w-0">
          <span className="text-label text-on-surface-variant uppercase">Сделка</span>
          <select
            value={draft.transactionType}
            onChange={(e) => update('transactionType', e.target.value)}
            className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {TRANSACTION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="flex flex-col gap-1 min-w-0">
        <span className="text-label text-on-surface-variant uppercase">Цена от, ₽</span>
        <input
          type="number"
          inputMode="numeric"
          placeholder="0"
          value={draft.minPrice}
          onChange={(e) => update('minPrice', e.target.value)}
          className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <label className="flex flex-col gap-1 min-w-0">
        <span className="text-label text-on-surface-variant uppercase">Цена до, ₽</span>
        <input
          type="number"
          inputMode="numeric"
          placeholder="∞"
          value={draft.maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
          className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap gap-2 justify-end">
        <Button type="button" variant="outline" onClick={reset}>
          Сбросить
        </Button>
        <Button type="submit">Найти</Button>
      </div>
    </form>
  )
}

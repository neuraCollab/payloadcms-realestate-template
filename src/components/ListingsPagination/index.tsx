'use client'
import React from 'react'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface Props {
  page: number
  totalPages: number
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1)

/** Compact page list with ellipsis: 1 … 4 5 [6] 7 8 … 12 */
const buildPages = (current: number, total: number): Array<number | 'ellipsis'> => {
  if (total <= 7) return range(total)
  const out: Array<number | 'ellipsis'> = [1]
  if (current > 3) out.push('ellipsis')
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    out.push(p)
  }
  if (current < total - 2) out.push('ellipsis')
  out.push(total)
  return out
}

/**
 * Pagination for listing pages — keeps current query string intact, only
 * updates the `page` param.
 */
export const ListingsPagination: React.FC<Props> = ({ page, totalPages }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const goto = (p: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (p === 1) params.delete('page')
    else params.set('page', String(p))
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: true })
  }

  const items = buildPages(page, totalPages)

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 pt-4 flex-wrap"
    >
      <button
        type="button"
        onClick={() => goto(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Предыдущая страница"
        className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-on-surface hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {items.map((it, i) =>
        it === 'ellipsis' ? (
          <span
            key={`e-${i}`}
            className="inline-flex items-center justify-center w-9 h-9 text-on-surface-variant"
          >
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            onClick={() => goto(it)}
            aria-current={it === page ? 'page' : undefined}
            className={cn(
              'inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-md text-body-sm font-medium transition-colors',
              it === page
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-on-surface hover:bg-surface-container',
            )}
          >
            {it}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => goto(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="Следующая страница"
        className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-on-surface hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}

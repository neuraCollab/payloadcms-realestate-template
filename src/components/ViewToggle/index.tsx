'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { List, Map as MapIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

export type ViewMode = 'list' | 'map'

// Reads/writes ?view= in URL. Default is 'list'. Used on listing pages
// to switch between grid and map presentations of the same filtered set.
export const ViewToggle: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const current: ViewMode = searchParams.get('view') === 'map' ? 'map' : 'list'

  const setMode = (mode: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString())
    if (mode === 'list') params.delete('view')
    else params.set('view', 'map')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const baseBtn =
    'inline-flex items-center gap-1.5 h-9 px-3 text-body-sm rounded-md transition-colors'

  return (
    <div
      role="tablist"
      aria-label="Режим просмотра"
      className="inline-flex p-0.5 bg-surface-container rounded-md"
    >
      <button
        role="tab"
        type="button"
        aria-selected={current === 'list'}
        onClick={() => setMode('list')}
        className={cn(
          baseBtn,
          current === 'list'
            ? 'bg-card text-on-surface shadow-e1'
            : 'text-on-surface-variant hover:text-on-surface',
        )}
      >
        <List className="w-4 h-4" />
        Список
      </button>
      <button
        role="tab"
        type="button"
        aria-selected={current === 'map'}
        onClick={() => setMode('map')}
        className={cn(
          baseBtn,
          current === 'map'
            ? 'bg-card text-on-surface shadow-e1'
            : 'text-on-surface-variant hover:text-on-surface',
        )}
      >
        <MapIcon className="w-4 h-4" />
        Карта
      </button>
    </div>
  )
}

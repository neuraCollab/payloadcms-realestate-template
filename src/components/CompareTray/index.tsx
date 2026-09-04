'use client'
import React from 'react'
import { Link } from '@/i18n/navigation'
import { Scale, X } from 'lucide-react'
import { useCompare, clearCompare } from '@/lib/compare'

/**
 * Плавающий пилл «Сравнить N объектов» внизу справа. Появляется когда
 * в стеке ≥1 объект, скрывается когда пусто.
 *
 * Скрыт на странице /compare (там сами объекты).
 */
export const CompareTray: React.FC = () => {
  const items = useCompare()
  const [pathname, setPathname] = React.useState('')

  React.useEffect(() => {
    setPathname(window.location.pathname)
    const refresh = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', refresh)
    return () => window.removeEventListener('popstate', refresh)
  }, [])

  if (items.length === 0) return null
  if (pathname === '/compare') return null

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div className="flex items-center gap-1 bg-card rounded-full shadow-e3 border border-border pl-1 pr-2 py-1">
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 h-10 pl-3 pr-4 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
        >
          <Scale className="w-4 h-4" />
          Сравнить {items.length}
        </Link>
        <button
          type="button"
          onClick={clearCompare}
          aria-label="Очистить сравнение"
          className="w-8 h-8 rounded-full inline-flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/utilities/ui'

const LOCALE_LABELS: Record<string, string> = {
  ru: 'RU',
  kz: 'KZ',
}

/**
 * RU/KZ toggle — links to the same page in the other locale, preserving
 * the current path and query string (e.g. active catalog filters).
 * Translation itself hasn't shipped yet (see CLAUDE.md's i18n section),
 * so switching to `kz` today shows the same Russian copy at a `/kz/...`
 * URL — the switch is real, the content isn't translated yet.
 */
export const LocaleSwitcher: React.FC = () => {
  const activeLocale = useLocale()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  return (
    <div
      role="group"
      aria-label="Язык сайта"
      className="inline-flex items-center rounded-full border border-border p-0.5 text-body-sm flex-shrink-0"
    >
      {routing.locales.map((loc) => {
        const isActive = loc === activeLocale
        return (
          <Link
            key={loc}
            href={{ pathname, query }}
            locale={loc}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'px-2.5 h-8 flex items-center rounded-full font-medium transition-colors',
              isActive
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container',
            )}
          >
            {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}

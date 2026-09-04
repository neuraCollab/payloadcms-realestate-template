'use client'
import React from 'react'
import { Link } from '@/i18n/navigation'
import { X, Cookie } from 'lucide-react'

const STORAGE_KEY = 'realty_cookie_consent_v1'

/**
 * Sticky bottom banner asking for cookie consent (152-ФЗ / GDPR-style).
 * Stored decision in localStorage so it only shows once per browser.
 */
export const CookieConsent: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        // Small delay so the banner doesn't slam over content the instant
        // a page loads — gives the first paint a beat to be seen clean.
        const t = setTimeout(() => setOpen(true), 1200)
        return () => clearTimeout(t)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookie"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4"
    >
      <div className="mx-auto max-w-4xl bg-card rounded-md shadow-e3 border border-border px-4 py-3 flex flex-wrap sm:flex-nowrap items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <Cookie className="w-4 h-4" />
        </div>
        <p className="text-body-sm text-on-surface-variant flex-1 min-w-[200px]">
          Используем cookie.{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Подробнее
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <button
            type="button"
            onClick={accept}
            className="inline-flex h-9 px-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
          >
            Принять
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть"
            className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

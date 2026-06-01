'use client'
import React from 'react'
import Link from 'next/link'
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
      if (!window.localStorage.getItem(STORAGE_KEY)) setOpen(true)
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
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40"
    >
      <div className="bg-card rounded-md shadow-e3 border border-border p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-title text-on-surface text-sm">Мы используем cookie</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Файлы cookie помогают сайту работать — запоминают избранное, фильтры и
              переписки. Продолжая, вы соглашаетесь с{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                политикой обработки данных
              </Link>
              .
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={accept}
                className="inline-flex h-9 px-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
              >
                Принять
              </button>
              <Link
                href="/privacy"
                className="inline-flex h-9 px-4 items-center justify-center rounded-full border border-border text-body-sm text-on-surface hover:bg-surface-container"
              >
                Подробнее
              </Link>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть"
            className="p-1 -m-1 rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

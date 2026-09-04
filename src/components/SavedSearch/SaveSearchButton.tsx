'use client'
import React from 'react'
import { Link } from '@/i18n/navigation'
import { Bell, Check } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface Props {
  /** Тип каталога — flats / commercial / lands / residential-complexes. */
  collection: string
  /** Текущие фильтры. По умолчанию читаем window.location.search. */
  filters?: Record<string, any>
}

/**
 * Кнопка «Получать новые объекты на email» — на каталоге.
 *
 * 1. Спрашивает email (или подхватывает из cookie realty_email).
 * 2. POST /api/saved-searches с filters + collection.
 * 3. Показывает успех + ссылку в кабинет управлять подписками.
 */
export const SaveSearchButton: React.FC<Props> = ({ collection, filters }) => {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [freq, setFreq] = React.useState<'instant' | 'daily' | 'weekly'>('daily')
  const [submitting, setSubmitting] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Подсасываем email из cookie если он там есть.
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    const cookie = document.cookie
      .split('; ')
      .find((c) => c.startsWith('realty_email='))
    if (cookie) setEmail(decodeURIComponent(cookie.split('=')[1] ?? ''))
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      // Если filters не переданы — берём из текущего URL.
      const params = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
      )
      const urlFilters: Record<string, any> = {}
      params.forEach((v, k) => {
        urlFilters[k] = v
      })
      const finalFilters = {
        collection,
        ...(filters ?? urlFilters),
      }
      const res = await fetch('/api/saved-searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || `${collection}: ${Object.keys(finalFilters).filter((k) => k !== 'collection').join(', ') || 'все объекты'}`,
          frequency: freq,
          filters: finalFilters,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(
          data?.error === 'email_invalid'
            ? 'Введите корректный email.'
            : 'Не удалось сохранить.',
        )
        setSubmitting(false)
        return
      }
      trackEvent('saved_search_created', { collection, frequency: freq })
      setSent(true)
    } catch {
      setError('Сеть недоступна.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 px-4 items-center gap-2 rounded-full border border-primary text-primary text-body-sm font-medium hover:bg-primary/5"
      >
        <Bell className="w-4 h-4" />
        Получать новые объекты на email
      </button>
    )
  }

  if (sent) {
    return (
      <div className="inline-flex h-10 px-4 items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-body-sm">
        <Check className="w-4 h-4" />
        Подписка оформлена · <Link href="/cabinet/saved-searches" className="underline">мои подписки</Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="inline-flex items-center gap-2 bg-card border border-border rounded-md p-2 shadow-e1"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="email"
        className="h-9 px-3 rounded-md border border-border bg-card text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-48"
      />
      <select
        value={freq}
        onChange={(e) => setFreq(e.target.value as any)}
        className="h-9 px-2 rounded-md border border-border bg-card text-body-sm"
      >
        <option value="instant">сразу</option>
        <option value="daily">раз в день</option>
        <option value="weekly">раз в неделю</option>
      </select>
      <button
        type="submit"
        disabled={submitting}
        className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? '…' : 'Подписаться'}
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-body-sm text-on-surface-variant px-2"
      >
        ×
      </button>
      {error ? (
        <span className="text-body-sm text-red-600">{error}</span>
      ) : null}
    </form>
  )
}

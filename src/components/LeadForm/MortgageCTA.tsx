'use client'
import React from 'react'
import { Landmark } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { formatPrice } from '@/utilities/formatPrice'


interface Props {
  propertyCollection: string
  propertyId: string | number
  propertyTitle: string
  /** Параметры калькулятора передаются в комментарий заявки. */
  calc: {
    price: number
    downPayment: number
    years: number
    monthly: number
    rate: number
  }
}

/**
 * CTA «Получить одобрение по этой ипотеке» под калькулятором.
 *
 * Открывает inline-форму (имя + телефон), отправляет в /api/leads
 * с предсчитанными параметрами в `message`. Менеджер банка-партнёра
 * получает уже квалифицированный лид: цена объекта, взнос, срок,
 * ставка — не надо переспрашивать.
 *
 * channel='callback' — стандартный обратный звонок, в админке отличим
 * по префиксу «Ипотека:» в комментарии. Это сознательный шорткат:
 * отдельный enum-канал потребовал бы миграции и перебилда схемы.
 */

export const MortgageCTA: React.FC<Props> = ({
  propertyCollection,
  propertyId,
  propertyTitle,
  calc,
}) => {
  const [open, setOpen] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [name, setName] = React.useState('')
  const [website, setWebsite] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const summary =
        `Ипотека: цена ${formatPrice(calc.price)}, взнос ${formatPrice(calc.downPayment)}, ` +
        `срок ${calc.years} лет, ставка ${calc.rate.toFixed(1)}%, ` +
        `ежемес. ${formatPrice(calc.monthly)}.`
      const url = typeof window !== 'undefined' ? window.location.href : ''
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          name,
          channel: 'callback',
          message: summary,
          propertyCollection,
          propertyId,
          propertyTitle: `Ипотека по объекту: ${propertyTitle}`,
          pageUrl: url,
          website,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(
          data?.error === 'phone_invalid'
            ? 'Введите корректный телефон.'
            : data?.error === 'rate_limited'
              ? 'Слишком много заявок с этого устройства. Попробуйте позже.'
              : 'Не удалось отправить. Попробуйте ещё раз.',
        )
        setSubmitting(false)
        return
      }
      trackEvent('mortgage_application', {
        collection: propertyCollection,
        id: String(propertyId),
        principal: Math.round(calc.price - calc.downPayment),
        years: calc.years,
      })
      setSent(true)
    } catch {
      setError('Сетевая ошибка. Проверьте интернет.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-md bg-emerald-50 border border-emerald-200 p-4 text-body-sm text-emerald-900 flex items-start gap-2">
        <span className="text-lg leading-none">✓</span>
        <div>
          Заявка отправлена. Менеджер банка-партнёра свяжется в течение часа
          с предложениями по ставке.
        </div>
      </div>
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
      >
        <Landmark className="w-4 h-4" />
        Получить одобрение по этой ипотеке
      </button>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-md border border-border bg-surface-container p-4">
      <p className="text-body-sm text-on-surface">
        Менеджер банка-партнёра свяжется и подберёт программу под параметры
        выше. Условия точные, без обмана с «акционной ставкой».
      </p>

      <label className="block">
        <span className="text-label text-on-surface-variant">Имя</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как к вам обращаться"
          className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <label className="block">
        <span className="text-label text-on-surface-variant">Телефон *</span>
        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 999 000-00-00"
          required
          className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px"
      />

      {error ? <p className="text-body-sm text-red-600">{error}</p> : null}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 inline-flex h-11 items-center justify-center rounded-full border border-border text-body-sm text-on-surface"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 inline-flex h-11 items-center justify-center rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 disabled:opacity-60"
        >
          {submitting ? 'Отправка…' : 'Отправить'}
        </button>
      </div>
    </form>
  )
}

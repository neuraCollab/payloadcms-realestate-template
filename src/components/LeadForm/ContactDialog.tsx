'use client'
import React from 'react'
import { Link } from '@/i18n/navigation'
import { Phone, Send, MessageCircle } from 'lucide-react'
import { Instagram } from '@/components/icons/BrandIcons'
import { trackEvent } from '@/lib/analytics'

type Channel = 'callback' | 'telegram' | 'whatsapp' | 'instagram'

interface Props {
  open: boolean
  onClose: () => void
  realtorId?: string | number
  propertyCollection: string
  propertyId: string | number
  propertyTitle: string
}

const TABS: Array<{ key: Channel; label: string; Icon: React.ElementType }> = [
  { key: 'callback', label: 'Звонок', Icon: Phone },
  { key: 'telegram', label: 'Telegram', Icon: Send },
  { key: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
]

const CHANNEL_HINT: Record<Channel, string> = {
  callback: 'Перезвоним в течение 10 минут.',
  telegram: 'Напишем в Telegram. Ник без @, например `ivan_realtor`.',
  whatsapp: 'Свяжемся через WhatsApp по номеру.',
  instagram: 'Напишем в Direct. Ник без @, например `ivan.realtor`.',
}

/**
 * Универсальная контактная форма для детальной страницы объекта.
 * 4 канала на выбор: обратный звонок, TG, WhatsApp, Instagram.
 *
 * Для callback и WA нужен телефон, для TG/IG — ник или телефон.
 * UTM-параметры из URL прокидываются как есть, чтобы маркетинг
 * мог считать ROI отдельных каналов.
 */
export const ContactDialog: React.FC<Props> = ({
  open,
  onClose,
  realtorId,
  propertyCollection,
  propertyId,
  propertyTitle,
}) => {
  const [channel, setChannel] = React.useState<Channel>('callback')
  const [phone, setPhone] = React.useState('')
  const [handle, setHandle] = React.useState('')
  const [name, setName] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [website, setWebsite] = React.useState('') // honeypot
  const [submitting, setSubmitting] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) {
      // Сброс при закрытии.
      setSent(false)
      setError(null)
      setSubmitting(false)
    }
  }, [open])

  if (!open) return null

  const needsHandle = channel === 'telegram' || channel === 'instagram'
  const needsPhone = channel === 'callback' || channel === 'whatsapp'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const url = typeof window !== 'undefined' ? window.location.href : ''
      const params = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
      )
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          name,
          channel,
          contactHandle: handle,
          message,
          propertyCollection,
          propertyId,
          propertyTitle,
          realtorId,
          pageUrl: url,
          utmSource: params.get('utm_source') ?? undefined,
          utmCampaign: params.get('utm_campaign') ?? undefined,
          website, // honeypot
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(
          data?.error === 'phone_invalid'
            ? 'Введите корректный телефон.'
            : data?.error === 'handle_or_phone_required'
              ? 'Укажите ник или телефон.'
              : data?.error === 'rate_limited'
                ? 'Слишком много заявок с этого устройства. Попробуйте позже.'
                : 'Не удалось отправить. Попробуйте ещё раз.',
        )
        setSubmitting(false)
        return
      }
      trackEvent('lead_callback', {
        channel,
        collection: propertyCollection,
        id: String(propertyId),
      })
      setSent(true)
    } catch {
      setError('Сетевая ошибка. Проверьте интернет.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Связаться по объекту"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/40 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-md shadow-e3 w-full sm:max-w-md max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 grid place-items-center mb-3">
              ✓
            </div>
            <h3 className="text-title text-on-surface">Заявка отправлена</h3>
            <p className="text-body-sm text-on-surface-variant mt-2">
              {channel === 'callback'
                ? 'Риэлтор перезвонит в течение 10 минут.'
                : 'Риэлтор напишет в течение часа.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex h-10 px-5 items-center rounded-full bg-primary text-primary-foreground text-body-sm font-medium"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-title text-on-surface">Связаться по объекту</h3>
              <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-1">
                {propertyTitle}
              </p>
            </div>

            {/* Каналы */}
            <div
              className="grid grid-cols-4 gap-2"
              role="tablist"
              aria-label="Канал связи"
            >
              {TABS.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={channel === key}
                  onClick={() => setChannel(key)}
                  className={`flex flex-col items-center justify-center gap-1 h-16 rounded-md border text-label transition-colors ${
                    channel === key
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                  {label}
                </button>
              ))}
            </div>

            <p className="text-body-sm text-on-surface-variant -mt-1">
              {CHANNEL_HINT[channel]}
            </p>

            {/* Поля */}
            {needsPhone ? (
              <label className="block">
                <span className="text-label text-on-surface-variant">
                  Телефон{needsPhone ? ' *' : ''}
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 999 000-00-00"
                  required={needsPhone}
                  className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
            ) : null}

            {needsHandle ? (
              <label className="block">
                <span className="text-label text-on-surface-variant">
                  Ник в {channel === 'telegram' ? 'Telegram' : 'Instagram'}
                  {' '}*
                </span>
                <div className="mt-1 flex items-center rounded-md border border-border bg-card overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                  <span className="pl-3 pr-1 text-on-surface-variant">@</span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.replace(/^@/, ''))}
                    placeholder={channel === 'telegram' ? 'ivan_realtor' : 'ivan.realtor'}
                    required={needsHandle}
                    className="flex-1 h-11 pr-3 bg-transparent text-body focus:outline-none"
                  />
                </div>
                <span className="text-label text-on-surface-variant mt-1 block">
                  Можно дополнительно указать телефон ниже.
                </span>
              </label>
            ) : null}

            {needsHandle ? (
              <label className="block">
                <span className="text-label text-on-surface-variant">
                  Телефон (необязательно)
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 999 000-00-00"
                  className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
            ) : null}

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
              <span className="text-label text-on-surface-variant">
                Комментарий
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="Например: интересуют торги, удобно вечером"
                className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>

            {/* Honeypot — скрыт от пользователя, виден ботам */}
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

            {error ? (
              <p className="text-body-sm text-red-600">{error}</p>
            ) : null}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
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

            <p className="text-label text-on-surface-variant text-center">
              Отправляя форму, вы соглашаетесь с обработкой персональных
              данных согласно{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                политике
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

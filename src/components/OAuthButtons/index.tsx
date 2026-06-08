'use client'
import React from 'react'

interface Props {
  /** Куда вернуть после успешного логина. Default /cabinet/chats. */
  next?: string
  /** Только эти провайдеры (по умолчанию все 3). */
  providers?: Array<'google' | 'yandex' | 'mailru'>
  className?: string
}

const PROVIDER_META: Record<
  string,
  { label: string; icon: React.ReactNode; bg: string; text: string; border?: string }
> = {
  google: {
    label: 'Google',
    bg: '#fff',
    text: '#1f1f1f',
    border: '#dadce0',
    icon: (
      <svg viewBox="0 0 18 18" className="w-4 h-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.583-5.036-3.71H.957v2.332C2.438 15.983 5.482 18 9 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        />
      </svg>
    ),
  },
  yandex: {
    label: 'Yandex',
    bg: '#fc3f1d',
    text: '#fff',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M2.04 0 9.7 22.2h-2.1L3.45 9.7H.97L2.04 0Zm12.8 0H9.7l1.97 5.7h-1.4l3.16 9.16-1.69 7.34h5.16L23 0h-5.5l-2.66 9.16L14.84 0Z"
        />
      </svg>
    ),
  },
  mailru: {
    label: 'Mail.ru',
    bg: '#005ff9',
    text: '#fff',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12c1.66 0 3.32-.34 4.88-1l-.8-1.66c-1.28.54-2.66.82-4.08.82-5.4 0-9.84-4.44-9.84-9.84C2.16 6.76 6.6 2.32 12 2.32S21.84 6.76 21.84 12c0 1.04-.34 1.96-.96 1.96-.96 0-1.16-1.16-1.16-2.32V7.36h-2v.94C16.92 7.5 15.6 7 14.18 7c-2.96 0-5.4 2.42-5.4 5.4 0 2.96 2.42 5.4 5.4 5.4 1.42 0 2.78-.56 3.78-1.5.7 1 1.8 1.5 3.04 1.5 2.34 0 4.16-2.16 4.16-4.8.04-6.6-5.36-12-11.96-12Zm2.18 16.5c-2.04 0-3.66-1.62-3.66-3.66s1.62-3.66 3.66-3.66 3.66 1.62 3.66 3.66-1.62 3.66-3.66 3.66Z"
        />
      </svg>
    ),
  },
}

/**
 * 3 кнопки OAuth-входа: Google, Yandex, Mail.ru.
 *
 * Каждая ведёт на /api/auth/oauth/<provider>/start?next=<...>.
 * Реальные client_id/secret — в .env (см. docs/AUTH-OAUTH-SETUP.md).
 * Без них endpoint вернёт 503, юзер увидит ошибку — но сами кнопки
 * всё равно показываются (чтобы было видно куда нажать когда станет
 * настроено).
 */
export const OAuthButtons: React.FC<Props> = ({
  next = '/cabinet/chats',
  providers = ['google', 'yandex', 'mailru'],
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 ${className}`}>
      {providers.map((id) => {
        const meta = PROVIDER_META[id]
        if (!meta) return null
        return (
          <a
            key={id}
            href={`/api/auth/oauth/${id}/start?next=${encodeURIComponent(next)}`}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md border text-body-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: meta.bg, color: meta.text, borderColor: meta.border ?? meta.bg }}
            rel="nofollow"
          >
            {meta.icon}
            {meta.label}
          </a>
        )
      })}
    </div>
  )
}

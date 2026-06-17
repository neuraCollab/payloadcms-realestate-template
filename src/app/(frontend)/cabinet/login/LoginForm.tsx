'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ConsentCheckbox } from '@/components/ConsentCheckbox'
import { OAuthButtons } from '@/components/OAuthButtons'

/**
 * Magic-link логин. Поток:
 *   1. Вводим email → POST /api/auth/magic-link.
 *   2. Сервер всегда отвечает {ok:true} (чтобы не палить какие email
 *      зарегистрированы). Если email валиден — летит письмо со
 *      ссылкой /api/auth/verify?token=...
 *   3. Клик по ссылке проставляет cookie и редиректит в /cabinet/chats.
 *
 * URL-параметр ?error=expired/invalid — ловим если verify не прошёл.
 */

const ERROR_LABELS: Record<string, string> = {
  expired: 'Ссылка истекла или уже использована. Запросите новую.',
  invalid: 'Невалидная ссылка. Запросите новую.',
  // OAuth-ошибки. Названия как `oauth_<code>` в callback'е.
  oauth_cancelled: 'Авторизация отменена.',
  oauth_state_mismatch: 'Сессия истекла. Попробуйте войти ещё раз.',
  oauth_missing_code: 'Авторизация прервана. Попробуйте снова.',
  oauth_token_exchange: 'Не удалось получить токен. Попробуйте снова.',
  oauth_no_token: 'Не удалось получить токен. Попробуйте снова.',
  oauth_token_network: 'Сетевая ошибка при авторизации.',
  oauth_userinfo: 'Не удалось получить ваш email от провайдера.',
  oauth_userinfo_network: 'Сетевая ошибка при получении профиля.',
  oauth_no_email: 'Провайдер не вернул email. Используйте магик-линк.',
  oauth_not_configured: 'Этот провайдер пока не настроен.',
  oauth_unknown_provider: 'Неизвестный провайдер.',
}

interface Props {
  /** Настроенные провайдеры (есть client_id/secret) — вычисляется на сервере. */
  providers?: Array<'google' | 'yandex' | 'mailru'>
}

export const LoginForm: React.FC<Props> = ({ providers = [] }) => {
  const searchParams = useSearchParams()
  const initialError = searchParams.get('error')

  const [email, setEmail] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const [error, setError] = React.useState<string | null>(
    initialError ? ERROR_LABELS[initialError] ?? 'Ошибка входа.' : null,
  )
  const [consent, setConsent] = React.useState(false)
  const [website, setWebsite] = React.useState('') // honeypot

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website }),
      })
      if (!res.ok) {
        setError('Не удалось отправить ссылку. Попробуйте ещё раз.')
        return
      }
      // Эндпоинт всегда отвечает ok=true → показываем «letter sent»
      // вне зависимости от того существовал email или нет.
      setSent(true)
    } catch {
      setError('Сеть недоступна.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="space-y-3 text-left">
        <div className="rounded-md bg-emerald-50 border border-emerald-200 p-4">
          <h3 className="text-title text-emerald-900">Письмо отправлено</h3>
          <p className="text-body-sm text-emerald-900 mt-1">
            Откройте почту <b>{email}</b> и перейдите по ссылке.
            Письмо обычно приходит за минуту, посмотрите спам если
            не видно.
          </p>
          <p className="text-label text-emerald-800 mt-3">
            Ссылка действительна 15 минут.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-body-sm text-primary hover:underline"
        >
          Использовать другой email
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 text-left">
      {error ? (
        <div className="text-body-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md p-3">
          {error}
        </div>
      ) : null}

      {providers.length > 0 ? (
        <>
          {/* Быстрый вход через провайдеров — только настроенные (есть client_id/secret).
              Один клик — никакой почты ждать не надо. */}
          <div>
            <p className="text-label text-on-surface-variant mb-2">Войти через</p>
            <OAuthButtons providers={providers} />
          </div>

          <div className="flex items-center gap-3 text-label text-on-surface-variant">
            <span className="h-px bg-border flex-1" />
            или по email
            <span className="h-px bg-border flex-1" />
          </div>
        </>
      ) : null}

      <form onSubmit={submit} className="space-y-3">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ivan@example.com"
        required
        autoFocus
      />
      {/* Honeypot — скрыт от пользователя */}
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
      <ConsentCheckbox
        checked={consent}
        onChange={setConsent}
        id="login-consent"
        prefix="Входя в кабинет,"
        termsUrl="/terms"
      />
      <Button type="submit" disabled={submitting || !consent} className="w-full">
        {submitting ? 'Отправляем…' : 'Получить ссылку на email'}
      </Button>
      <p className="text-label text-on-surface-variant">
        Отправим письмо со ссылкой для входа. Без паролей — открываете
        ссылку из почты, и кабинет ваш.
      </p>
      </form>
    </div>
  )
}

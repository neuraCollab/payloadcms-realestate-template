'use client'
import React from 'react'
import { X, Sparkles } from 'lucide-react'
import { OAuthButtons } from '@/components/OAuthButtons'

interface Props {
  /** Настроенные провайдеры (есть client_id/secret) — вычисляется на сервере. */
  providers?: Array<'google' | 'yandex' | 'mailru'>
}

const DISMISS_KEY = 'realty_login_nudge_v1'
const SHOW_DELAY_MS = 4000
const COOKIE = 'realty_email='

/**
 * Плавающее уведомление справа сверху: «Войдите через Google /
 * Yandex / Mail». Показывается:
 *   • ОДИН РАЗ за время жизни браузера (флаг в localStorage)
 *   • только если в realty_email cookie ещё пусто (юзер не залогинен)
 *   • с задержкой 4с после загрузки страницы — чтобы не перетягивать
 *     внимание с основного контента
 *   • можно закрыть крестиком, тогда флаг ставится навсегда
 *
 * Для уважения 152-ФЗ — никаких пермишенов на pre-fill email мы не
 * запрашиваем. Просто кнопки OAuth.
 */
export const LoginNudge: React.FC<Props> = ({ providers = [] }) => {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    // Проверки на стороне клиента — никаких SSR-сюрпризов.
    try {
      // Юзер уже залогинен — не показываем.
      if (document.cookie.includes(COOKIE)) return
      // Уже закрывали или авторизовались — не показываем.
      if (window.localStorage.getItem(DISMISS_KEY)) return
    } catch {
      /* localStorage отключён → просто не показываем */
      return
    }
    const t = setTimeout(() => setShow(true), SHOW_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Войти быстро"
      className="fixed top-4 right-4 z-40 w-[340px] max-w-[calc(100vw-2rem)] animate-slideInRight"
    >
      <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)]">
        <div className="flex items-start gap-3">
          <span className="shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-title text-on-surface">Войти за секунду</h3>
            <p className="text-body-sm text-on-surface-variant mt-0.5">
              Сохраняйте избранное, ведите переписку с риэлторами и
              получайте уведомления о новых матчах.
            </p>
            {providers.length > 0 ? (
              <div className="mt-3">
                <OAuthButtons next="/" providers={providers} />
              </div>
            ) : null}
            <a
              href="/cabinet/login"
              className="block mt-2 text-label text-on-surface-variant hover:text-on-surface"
            >
              Или по email →
            </a>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Закрыть"
            className="shrink-0 p-1 -m-1 rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

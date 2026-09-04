/**
 * Универсальный трекер событий. Один вызов — оба пиксела (YM + GA4).
 *
 * Использование:
 *   import { trackEvent } from '@/lib/analytics'
 *   trackEvent('phone_reveal', { collection: 'flats', id: 42 })
 *
 * Безопасен в SSR — все window-обращения через guard. До принятия
 * cookie-консента и до загрузки скриптов вызов превращается в no-op,
 * без ошибок в консоли.
 */

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...args: any[]) => void
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

const YM_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID

/**
 * Отправить именованное событие. params попадут как goal-parameters
 * (Метрика) и event-parameters (GA4). Имя события используется как
 * goal id в Метрике и event name в GA4 — называйте snake_case.
 */
export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === 'undefined') return

  // Yandex Metrika
  if (YM_ID && window.ym) {
    try {
      window.ym(Number(YM_ID), 'reachGoal', name, params)
    } catch {
      /* swallow — analytics не должна валить пользовательский поток */
    }
  }

  // GA4 (gtag)
  if (GA4_ID && window.gtag) {
    try {
      window.gtag('event', name, params)
    } catch {
      /* ignore */
    }
  }
}

/**
 * Отдельная функция для отслеживания страничных переходов в SPA-нав.
 * Next App Router сам шлёт автоматические page_view'ы — это резерв
 * для случаев когда нужен явный pageview из клиентского кода.
 */
export function trackPageView(url: string): void {
  if (typeof window === 'undefined') return
  if (YM_ID && window.ym) {
    try {
      window.ym(Number(YM_ID), 'hit', url)
    } catch {
      /* ignore */
    }
  }
  if (GA4_ID && window.gtag) {
    try {
      window.gtag('event', 'page_view', { page_location: url })
    } catch {
      /* ignore */
    }
  }
}

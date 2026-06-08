/**
 * Конфигурация OAuth-провайдеров.
 *
 * Каждый провайдер — те же 4 операции:
 *   1. Сгенерить URL для редиректа на consent screen
 *   2. Обменять `code` на access_token (POST на /token)
 *   3. Запросить userinfo (GET с access_token)
 *   4. Извлечь email из ответа
 *
 * Различия — host'ы и формат заголовка авторизации.
 */

export type ProviderId = 'google' | 'yandex' | 'mailru'

interface ProviderConfig {
  id: ProviderId
  /** Человекочитаемое имя для UI. */
  label: string
  authUrl: string
  tokenUrl: string
  userinfoUrl: string
  scope: string
  /**
   * Способ передачи токена в userinfo-запросе. Yandex использует
   * нестандартный header «OAuth <token>», остальные — Bearer.
   */
  userinfoAuthScheme: 'Bearer' | 'OAuth'
  /** Имя env-переменных для client_id и client_secret. */
  envClientId: string
  envClientSecret: string
  /** Поле в userinfo response, откуда брать email. */
  emailField: string
}

export const PROVIDERS: Record<ProviderId, ProviderConfig> = {
  google: {
    id: 'google',
    label: 'Google',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userinfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    scope: 'openid email profile',
    userinfoAuthScheme: 'Bearer',
    envClientId: 'GOOGLE_CLIENT_ID',
    envClientSecret: 'GOOGLE_CLIENT_SECRET',
    emailField: 'email',
  },
  yandex: {
    id: 'yandex',
    label: 'Yandex',
    authUrl: 'https://oauth.yandex.ru/authorize',
    tokenUrl: 'https://oauth.yandex.ru/token',
    userinfoUrl: 'https://login.yandex.ru/info?format=json',
    scope: 'login:email login:info',
    userinfoAuthScheme: 'OAuth',
    envClientId: 'YANDEX_CLIENT_ID',
    envClientSecret: 'YANDEX_CLIENT_SECRET',
    emailField: 'default_email',
  },
  mailru: {
    id: 'mailru',
    label: 'Mail.ru',
    authUrl: 'https://oauth.mail.ru/login',
    tokenUrl: 'https://oauth.mail.ru/token',
    userinfoUrl: 'https://oauth.mail.ru/userinfo',
    scope: 'userinfo',
    userinfoAuthScheme: 'Bearer',
    envClientId: 'MAILRU_CLIENT_ID',
    envClientSecret: 'MAILRU_CLIENT_SECRET',
    emailField: 'email',
  },
}

export const PROVIDER_IDS: ProviderId[] = ['google', 'yandex', 'mailru']

export function isProviderId(s: string): s is ProviderId {
  return s === 'google' || s === 'yandex' || s === 'mailru'
}

export function providerConfigured(id: ProviderId): boolean {
  const cfg = PROVIDERS[id]
  return Boolean(process.env[cfg.envClientId] && process.env[cfg.envClientSecret])
}

export function getProvider(id: ProviderId): ProviderConfig {
  return PROVIDERS[id]
}

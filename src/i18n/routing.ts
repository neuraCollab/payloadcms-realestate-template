import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ru', 'kz'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed',
  // Cookie/Accept-Language based auto-detection is off for now: browsers
  // send "kk" for Kazakh, not "kz" (our market code — see LOCALE_TO_BCP47
  // below), so detection can't correctly serve Kazakh speakers anyway, and
  // leaving it on would make "/" vary its response by cookie (a CDN/caching
  // concern) ahead of Phase 3's real language switcher and translated
  // content.
  localeDetection: false,
})

// `kz` is our URL/market locale code (Kazakhstan), not a linguistic one —
// it is deliberately not the ISO-639 Kazakh code and must stay `kz`
// everywhere else (routing, file paths). This mapping exists solely to
// produce a valid BCP-47 value for the HTML `lang` attribute, where `kz`
// itself is not a valid language tag (`kk` is Kazakh's actual ISO-639 code).
export const LOCALE_TO_BCP47: Record<string, string> = { ru: 'ru', kz: 'kk' }

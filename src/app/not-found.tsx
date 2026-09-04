import Link from 'next/link'

// Root-level 404, rendered OUTSIDE any locale-aware layout.
//
// `[locale]/not-found.tsx` handles the common case (a bad slug inside a
// valid locale, e.g. /flats/does-not-exist) and is rendered inside
// `[locale]/layout.tsx`, so it has the full Header/Footer/Providers chrome
// and can use `@/i18n/navigation`.
//
// This file exists for the other case: when `[locale]/layout.tsx` itself
// calls `notFound()` because the `locale` route param isn't `ru`/`kz` at
// all (see `hasLocale()` check there). At that point there's no locale to
// render a layout for, so Next falls back to the nearest not-found.tsx
// above it in the tree — this one — which therefore can't rely on
// next-intl (no active locale) and must carry its own minimal <html>/<body>
// per next-intl's documented pattern for this case.
export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '4rem 1rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Страница не найдена</h1>
          <p style={{ color: '#666', margin: 0 }}>404 — запрошенная страница не существует.</p>
          <Link href="/" style={{ color: '#1D4ED8' }}>
            На главную
          </Link>
        </div>
      </body>
    </html>
  )
}

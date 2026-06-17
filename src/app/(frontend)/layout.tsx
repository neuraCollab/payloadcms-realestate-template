import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter } from 'next/font/google'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { CookieConsent } from '@/components/CookieConsent'
import { Analytics } from '@/components/Analytics'
import { CompareTray } from '@/components/CompareTray'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Inter ограничен 4-мя весами (400/500/600/700) — это всё что
// используют наши tailwind-классы (font-normal/medium/semibold/bold).
// Без ограничения next/font тянул весь variable-фонт (~80 KiB
// в свежей prod-сборке). С weights — Next генерирует subset под
// конкретные значения, woff2 становится ощутимо меньше.
//
// preload=true (default) + display=swap = FCP не блокируется, при
// этом критичный woff2 уходит в <link rel="preload"> автоматически.
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(inter.variable)} lang="ru" suppressHydrationWarning>
      <head>
        <InitTheme />
        {/* MegaDomic icon set — см. /public/site.webmanifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/svg+xml" href="/icon-mark.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1D4ED8" />
        <meta name="apple-mobile-web-app-title" content="MegaDomic" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <CookieConsent />
          <CompareTray />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'MegaDomic — недвижимость',
    template: '%s — MegaDomic',
  },
  description:
    'MegaDomic — поиск и покупка недвижимости: квартиры, дома, земля, коммерческая.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}

import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Phone, Mail, MapPin, Building2 } from 'lucide-react'

import type { Footer as FooterType } from '@/payload-types'

import { ThemeToggle } from '@/components/ThemeToggle'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

// LegalInfo isn't in the auto-generated payload-types yet (added in M1),
// so we use a manual shape here. Re-generate via `pnpm generate:types`.
interface LegalInfoShape {
  displayName?: string
  legalForm?: 'ooo' | 'ip' | 'self-employed' | 'ao' | 'pao'
  fullName?: string
  ogrn?: string
  inn?: string
  kpp?: string
  legalAddress?: string
  actualAddress?: string
  phone?: string
  email?: string
  workingHours?: string
  privacyPolicyUrl?: string
  termsUrl?: string
}

const LEGAL_FORM_LABEL: Record<NonNullable<LegalInfoShape['legalForm']>, string> = {
  ooo: 'ООО',
  ip: 'ИП',
  'self-employed': 'Самозанятый',
  ao: 'АО',
  pao: 'ПАО',
}

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType
  const legal = (await getCachedGlobal('legal-info', 1)()) as LegalInfoShape
  const navItems = footerData?.navItems || []

  const displayName = legal?.displayName ?? 'Demo Realty'
  const privacyUrl = legal?.privacyPolicyUrl ?? '/privacy'
  const termsUrl = legal?.termsUrl ?? '/terms'

  return (
    <footer className="mt-16 border-t border-border bg-surface-container">
      <div className="container py-10 flex flex-col gap-8">
        {/* Top row — logo + nav */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <nav className="flex flex-wrap gap-1">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                className="px-3 py-2 text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              />
            ))}
          </nav>
        </div>

        {/* Реквизиты компании — 149-ФЗ обязывает их публиковать */}
        {legal?.fullName ? (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border text-body-sm">
            <div className="space-y-2 min-w-0">
              <h3 className="text-label text-on-surface-variant uppercase flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Реквизиты
              </h3>
              <p className="text-on-surface font-medium">{legal.fullName}</p>
              {legal.ogrn ? (
                <p className="text-on-surface-variant">ОГРН: {legal.ogrn}</p>
              ) : null}
              {legal.inn ? (
                <p className="text-on-surface-variant">
                  ИНН: {legal.inn}
                  {legal.kpp ? ` / КПП: ${legal.kpp}` : ''}
                </p>
              ) : null}
            </div>

            <div className="space-y-2 min-w-0">
              <h3 className="text-label text-on-surface-variant uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Адрес
              </h3>
              {legal.legalAddress ? (
                <p className="text-on-surface-variant whitespace-pre-line">
                  {legal.legalAddress}
                </p>
              ) : null}
              {legal.actualAddress && legal.actualAddress !== legal.legalAddress ? (
                <p className="text-on-surface-variant whitespace-pre-line">
                  <span className="text-label uppercase">Фактический:</span>{' '}
                  {legal.actualAddress}
                </p>
              ) : null}
            </div>

            <div className="space-y-2 min-w-0">
              <h3 className="text-label text-on-surface-variant uppercase">
                Связь
              </h3>
              {legal.phone ? (
                <p className="text-on-surface flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-on-surface-variant" />
                  <a href={`tel:${legal.phone.replace(/\s/g, '')}`} className="hover:text-primary">
                    {legal.phone}
                  </a>
                </p>
              ) : null}
              {legal.email ? (
                <p className="text-on-surface flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-on-surface-variant" />
                  <a href={`mailto:${legal.email}`} className="hover:text-primary">
                    {legal.email}
                  </a>
                </p>
              ) : null}
              {legal.workingHours ? (
                <p className="text-on-surface-variant">{legal.workingHours}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* Bottom row — copyright + legal links + theme */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 border-t border-border">
          <p className="text-body-sm text-on-surface-variant">
            © {new Date().getFullYear()} {displayName}. Все права защищены.
          </p>
          <nav className="flex flex-wrap gap-x-3 gap-y-1 text-body-sm">
            <Link
              href={privacyUrl}
              className="text-on-surface-variant hover:text-on-surface"
            >
              Политика обработки ПДн
            </Link>
            <span className="text-on-surface-variant/40">·</span>
            <Link
              href={termsUrl}
              className="text-on-surface-variant hover:text-on-surface"
            >
              Пользовательское соглашение
            </Link>
            <span className="text-on-surface-variant/40">·</span>
            <Link
              href="/contact"
              className="text-on-surface-variant hover:text-on-surface"
            >
              Контакты
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}

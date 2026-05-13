import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeToggle } from '@/components/ThemeToggle'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-16 border-t border-border bg-surface-container">
      <div className="container py-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 border-t border-border">
          <p className="text-body-sm text-on-surface-variant">© {new Date().getFullYear()} Realty</p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}

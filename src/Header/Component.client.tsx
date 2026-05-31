'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CabinetLink } from './CabinetLink'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="container h-16 flex items-center justify-between gap-4">
        <Link href="/" aria-label="Home" className="flex-shrink-0">
          <Logo loading="eager" priority="high" className="text-primary" />
        </Link>
        <div className="hidden md:block">
          <HeaderNav data={data} />
        </div>
        <div className="flex items-center gap-1">
          <CabinetLink />
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}

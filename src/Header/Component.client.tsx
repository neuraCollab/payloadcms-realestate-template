'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CabinetLink } from './CabinetLink'
import { AiHelperButton } from '@/components/AiHelperButton'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  // overflow-x: clip страхует от горизонтального скролла при повороте.
  // Навигация появляется только с lg (1024px). На 768–1023 пунктов
  // 5–6 шт. не помещаются вместе с лого + иконками → бургер.
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border overflow-x-clip">
      <div className="container h-16 flex items-center justify-between gap-3 min-w-0">
        <Link href="/" aria-label="Home" className="flex-shrink-0 min-w-0">
          <Logo loading="eager" priority="high" className="text-primary" />
        </Link>
        <div className="hidden lg:flex min-w-0 flex-1 justify-center">
          <HeaderNav data={data} />
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* AI-помощник — иконка-спаркл. Сам ограничит доступ
              (модалка покажет auth-gate если cookie пуст). */}
          <AiHelperButton variant="icon" label="AI-помощник" />
          <CabinetLink />
          <ThemeToggle />
          <div className="lg:hidden">
            <MobileNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}

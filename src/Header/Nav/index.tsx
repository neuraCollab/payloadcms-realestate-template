'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

import type { Header as HeaderType, Page, Post } from '@/payload-types'

const resolveHref = (link: any): string => {
  if (link?.url) return link.url
  if (link?.type === 'reference' && typeof link.reference?.value === 'object') {
    const value = link.reference.value as Page | Post
    const slug = (value as any).slug
    if (slug) {
      return link.reference.relationTo === 'pages' ? `/${slug}` : `/${link.reference.relationTo}/${slug}`
    }
  }
  return '/'
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ link }, i) => {
        const href = resolveHref(link)
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={i}
            href={href}
            className={cn(
              'px-3 py-2 text-body-sm font-medium rounded-full hover:bg-surface-container-low transition-colors',
              isActive ? 'text-primary' : 'text-on-surface-variant',
            )}
          >
            {(link as any).label}
          </Link>
        )
      })}
      <Link
        href="/search"
        aria-label="Search"
        className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
      >
        <SearchIcon className="w-5 h-5" />
      </Link>
    </nav>
  )
}

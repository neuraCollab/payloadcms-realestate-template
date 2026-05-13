'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

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

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Открыть меню">
          <Menu className="h-5 w-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-surface-container-low p-6 shadow-e3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-title-lg">Меню</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Закрыть меню">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map(({ link }, i) => {
              const href = resolveHref(link)
              return (
                <Link
                  key={i}
                  href={href}
                  className={cn(
                    'px-3 py-3 text-body font-medium rounded-md hover:bg-surface-container transition-colors',
                    'text-on-surface',
                  )}
                >
                  {(link as any).label}
                </Link>
              )
            })}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

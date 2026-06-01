'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  User,
  MessageSquare,
  Heart,
  Clock,
  Bookmark,
  LogOut,
  LogIn,
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useFavorites } from '@/lib/favorites'
import { useRecentlyViewed } from '@/lib/recentlyViewed'

interface Props {
  email: string | null
  children: React.ReactNode
}

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  /** Optional badge count. Render only when > 0. */
  count?: number
  /** Show even when logged out. */
  guest?: boolean
}

/**
 * Personal cabinet shell — sidebar nav + main content slot. Used as a layout
 * for every /cabinet/* page. Renders a slim public navigation when there's
 * no session cookie (favorites + recent are local anyway, so they still work).
 */
export const CabinetShell: React.FC<Props> = ({ email, children }) => {
  const pathname = usePathname()
  const favs = useFavorites()
  const recent = useRecentlyViewed()

  const items: NavItem[] = [
    { href: '/cabinet/profile', label: 'Профиль', icon: User },
    { href: '/cabinet/chats', label: 'Сообщения', icon: MessageSquare },
    {
      href: '/cabinet/favorites',
      label: 'Избранное',
      icon: Heart,
      count: favs.length,
      guest: true,
    },
    {
      href: '/cabinet/recent',
      label: 'Просмотренные',
      icon: Clock,
      count: recent.length,
      guest: true,
    },
    { href: '/cabinet/saved-searches', label: 'Сохранённые поиски', icon: Bookmark },
  ]

  const visibleItems = items.filter((it) => email || it.guest)

  const logout = async () => {
    await fetch('/api/cabinet/session', { method: 'DELETE' })
    window.location.href = '/'
  }

  const isActive = (href: string) => {
    if (href === '/cabinet/chats') return pathname.startsWith('/cabinet/chats')
    return pathname === href
  }

  return (
    <div className="container max-w-6xl pt-24 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-card rounded-md shadow-e1 p-3 h-fit lg:sticky lg:top-24">
          <div className="px-3 py-2 border-b border-border mb-2">
            <div className="text-label text-on-surface-variant uppercase">Кабинет</div>
            <div className="text-body-sm text-on-surface line-clamp-1">
              {email ?? 'Гость'}
            </div>
          </div>

          <nav className="space-y-0.5">
            {visibleItems.map((it) => {
              const Icon = it.icon
              const active = isActive(it.href)
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-body-sm transition-colors',
                    active
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-on-surface hover:bg-surface-container',
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{it.label}</span>
                  {typeof it.count === 'number' && it.count > 0 ? (
                    <span
                      className={cn(
                        'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-semibold',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-surface-container-high text-on-surface-variant',
                      )}
                    >
                      {it.count}
                    </span>
                  ) : null}
                </Link>
              )
            })}
          </nav>

          <div className="mt-3 pt-3 border-t border-border">
            {email ? (
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-body-sm text-on-surface-variant hover:bg-surface-container"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            ) : (
              <Link
                href="/cabinet/login"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-body-sm text-primary hover:bg-surface-container"
              >
                <LogIn className="w-4 h-4" />
                Войти
              </Link>
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}

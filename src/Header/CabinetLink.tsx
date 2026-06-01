'use client'
import React from 'react'
import Link from 'next/link'
import { MessageSquare, Heart } from 'lucide-react'
import { useFavorites } from '@/lib/favorites'

const COOKIE = 'realty_email'

const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * Shows favorites + cabinet shortcuts in the header.
 *
 * - Heart link is always shown when there's at least one favorite.
 * - "Кабинет" link is shown when a `realty_email` cookie is present
 *   (i.e. the visitor has sent a message or signed in).
 */
export const CabinetLink: React.FC = () => {
  const [hasSession, setHasSession] = React.useState(false)
  const favs = useFavorites()

  React.useEffect(() => {
    setHasSession(!!readCookie(COOKIE))
  }, [])

  return (
    <>
      {favs.length > 0 ? (
        <Link
          href="/cabinet/favorites"
          aria-label="Избранное"
          className="relative inline-flex h-9 px-3 items-center gap-1.5 rounded-full text-body-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span className="hidden lg:inline">Избранное</span>
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-semibold">
            {favs.length}
          </span>
        </Link>
      ) : null}
      {hasSession ? (
        <Link
          href="/cabinet/chats"
          aria-label="Личный кабинет"
          className="inline-flex h-9 px-3 items-center gap-1.5 rounded-full text-body-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden lg:inline">Кабинет</span>
        </Link>
      ) : null}
    </>
  )
}

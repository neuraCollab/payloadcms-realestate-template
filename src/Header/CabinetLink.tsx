'use client'
import React from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

const COOKIE = 'realty_email'

const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * Shows a cabinet shortcut in the header whenever the visitor has a
 * `realty_email` cookie set (i.e. they've sent at least one message or
 * signed into /cabinet/login). Hidden otherwise to avoid noise for fresh
 * visitors.
 */
export const CabinetLink: React.FC = () => {
  const [hasSession, setHasSession] = React.useState(false)

  React.useEffect(() => {
    setHasSession(!!readCookie(COOKIE))
  }, [])

  if (!hasSession) return null

  return (
    <Link
      href="/cabinet/chats"
      aria-label="Личный кабинет"
      className="inline-flex h-9 px-3 items-center gap-1.5 rounded-full text-body-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
    >
      <MessageSquare className="w-4 h-4" />
      <span className="hidden lg:inline">Кабинет</span>
    </Link>
  )
}

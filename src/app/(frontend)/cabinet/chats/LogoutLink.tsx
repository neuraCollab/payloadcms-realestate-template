'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export const LogoutLink: React.FC = () => {
  const router = useRouter()
  const [busy, setBusy] = React.useState(false)

  const logout = async () => {
    setBusy(true)
    await fetch('/api/cabinet/session', { method: 'DELETE' })
    router.push('/')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className="inline-flex h-9 px-3 items-center gap-1.5 rounded-full border border-border text-body-sm text-on-surface-variant hover:bg-surface-container disabled:opacity-50"
    >
      <LogOut className="w-3.5 h-3.5" />
      Выйти
    </button>
  )
}

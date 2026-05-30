'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [warning, setWarning] = React.useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setWarning(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/cabinet/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || 'Не удалось войти.')
        return
      }
      if (!data.hasThreads) {
        setWarning(
          'Под этим email нет ни одной переписки. Зайдите всё равно, или отправьте сообщение риэлтору с любой страницы объекта.',
        )
      }
      router.push('/cabinet/chats')
      router.refresh()
    } catch {
      setError('Сеть недоступна.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 text-left">
      {error ? (
        <div className="text-body-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md p-3">
          {error}
        </div>
      ) : null}
      {warning ? (
        <div className="text-body-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md p-3">
          {warning}
        </div>
      ) : null}
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ivan@example.com"
        required
        autoFocus
      />
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Вход…' : 'Открыть кабинет'}
      </Button>
      <p className="text-label text-on-surface-variant">
        Без пароля — просто запоминаем email в браузере на 90 дней. Безопасности это не
        даёт, но позволяет вернуться к перепискам с того же устройства.
      </p>
    </form>
  )
}

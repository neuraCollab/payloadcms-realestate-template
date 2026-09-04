'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'

interface Props {
  threadId: string
  realtorId: string
  realtorName: string
  userName: string
  userEmail: string
}

export const ReplyForm: React.FC<Props> = ({
  threadId,
  realtorId,
  realtorName,
  userName,
  userEmail,
}) => {
  const router = useRouter()
  const [text, setText] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    setError(null)
    setSubmitting(true)

    const form = new FormData()
    form.set('realtorId', realtorId)
    form.set('subject', `Ответ в беседе ${threadId}`)
    form.set('name', userName || 'Гость')
    form.set('email', userEmail)
    form.set('message', text.trim())

    try {
      const res = await fetch('/api/messages', { method: 'POST', body: form })
      if (res.ok) {
        setText('')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Не удалось отправить.')
      }
    } catch {
      setError('Сеть недоступна.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className="border border-border rounded-md bg-card focus-within:ring-2 focus-within:ring-ring transition-shadow"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Написать ${realtorName}…`}
        rows={3}
        className="w-full resize-none bg-transparent px-3 py-2.5 text-body-sm focus:outline-none"
      />
      <div className="flex items-center justify-between px-2 py-1.5 border-t border-border gap-2">
        {error ? (
          <span className="text-label text-rose-700 flex-1 line-clamp-1">{error}</span>
        ) : (
          <span className="text-label text-on-surface-variant">
            Enter — перенос строки. Кнопка отправит сообщение.
          </span>
        )}
        <button
          type="submit"
          disabled={submitting || !text.trim()}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-label font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Отправка…' : 'Отправить'}
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  )
}

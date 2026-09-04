'use client'
import React from 'react'
import { useRouter } from '@/i18n/navigation'
import { Send } from 'lucide-react'

interface Props {
  listingId: string
  collection: 'flats' | 'houses' | 'commercial' | 'lands'
}

export const SubmitButton: React.FC<Props> = ({ listingId, collection }) => {
  const router = useRouter()
  const [submitting, setSubmitting] = React.useState(false)

  const onClick = async () => {
    if (!confirm('Отправить на модерацию? После этого редактирование в кабинете будет недоступно.')) return
    setSubmitting(true)
    try {
      const res = await fetch(
        `/api/cabinet/listings/${listingId}/submit?collection=${collection}`,
        { method: 'POST' },
      )
      const data = await res.json()
      if (!res.ok) {
        if (data.errors) {
          alert('Не хватает данных:\n' + Object.values(data.errors).join('\n'))
        } else {
          alert(data.message ?? 'Не удалось отправить.')
        }
        return
      }
      router.push('/cabinet/listings')
      router.refresh()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={submitting}
      className="inline-flex items-center gap-1 h-9 px-3 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 disabled:opacity-60"
    >
      <Send className="w-4 h-4" />
      {submitting ? '…' : 'Отправить на модерацию'}
    </button>
  )
}

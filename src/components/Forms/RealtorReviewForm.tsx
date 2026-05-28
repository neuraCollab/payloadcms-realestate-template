'use client'
import { useState } from 'react'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { StarRating } from '@/components/ui/star-rating'
import { Textarea } from '@/components/ui/textarea'

export function RealtorReviewForm({ realtorId }: { realtorId: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !comment.trim() || rating < 1 || rating > 5) {
      setError('Пожалуйста, заполните все обязательные поля корректно.')
      return
    }

    setSubmitting(true)

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        realtorId,
        authorName: name.trim(),
        authorEmail: email.trim() || undefined,
        rating: Number(rating),
        comment: comment.trim(),
      }),
    })

    if (res.ok) {
      setSuccess(true)
      setName('')
      setEmail('')
      setComment('')
      setRating(5)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Не удалось отправить отзыв. Попробуйте позже.')
    }
    setSubmitting(false)
  }

  if (success) {
    return (
      <Alert variant="success" title="Отзыв отправлен">
        Он будет опубликован после модерации.
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? <Alert variant="error">{error}</Alert> : null}

      <FormField label="Ваше имя" htmlFor="review-name" required>
        <Input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Иван Иванов"
          required
        />
      </FormField>

      <FormField label="Email" htmlFor="review-email" hint="Не публикуется">
        <Input
          id="review-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ivan@example.com"
        />
      </FormField>

      <FormField label="Оценка" required>
        <StarRating value={rating} onChange={setRating} />
      </FormField>

      <FormField label="Ваш отзыв" htmlFor="review-comment" required>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Расскажите о своём опыте работы с риелтором..."
          rows={4}
          required
        />
      </FormField>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Отправка…' : 'Отправить отзыв'}
      </Button>
    </form>
  )
}

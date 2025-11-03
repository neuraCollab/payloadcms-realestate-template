// components/RealtorReviewForm.tsx
'use client'

import { useState } from 'react'

export function RealtorReviewForm({ realtorId }: { realtorId: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim() || rating < 1 || rating > 5) {
      alert('Пожалуйста, заполните все обязательные поля корректно.')
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
      // Опционально: сбросить форму
      setName('')
      setEmail('')
      setComment('')
      setRating(5)
    } else {
      const data = await res.json()
      alert(data.error || 'Не удалось отправить отзыв. Попробуйте позже.')
    }
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200">
        Спасибо за ваш отзыв! Он будет опубликован после модерации.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Оставить отзыв о риелторе</h3>

      {/* Имя */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Ваше имя *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Иван Иванов"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email (не публикуется)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          placeholder="ivan@example.com"
        />
      </div>

      {/* Оценка */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Оценка *</label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                rating >= star ? 'bg-yellow-400 text-yellow-800' : 'bg-gray-200 text-gray-600'
              }`}
              aria-label={`Оценить ${star} звездой`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-gray-600">{rating} из 5</span>
        </div>
      </div>

      {/* Отзыв */}
      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Ваш отзыв *
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Расскажите о своём опыте работы с риелтором..."
          rows={4}
          required
        />
      </div>

      {/* Кнопка */}
      <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
        {submitting ? 'Отправка...' : 'Отправить отзыв'}
      </button>
    </form>
  )
}

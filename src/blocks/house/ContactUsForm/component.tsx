'use client'

import React from 'react'
import { Form } from '@/payload-types'

export type ContactUsFormBlockType = {
  blockType: 'contact-us-form'
  label: string
  title: string
  form: Form
}

const SUBJECT_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'Buy Property', label: 'Купить недвижимость' },
  { value: 'Rent Property', label: 'Снять недвижимость' },
  { value: 'Sell Property', label: 'Продать / сдать объект' },
  { value: 'Other', label: 'Другое' },
]

export const ContactUsFormBlock: React.FC<ContactUsFormBlockType> = ({ label, title, form }) => {
  const [formData, setFormData] = React.useState({
    subject: 'Buy Property',
    fullName: '',
    phone: '',
    email: '',
    message: '',
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.id,
          submissionData: formData,
        }),
      })

      if (response.ok) {
        setFormData({
          subject: 'Buy Property',
          fullName: '',
          phone: '',
          email: '',
          message: '',
        })
        setSubmitted(true)
      } else {
        throw new Error('Не удалось отправить форму. Попробуйте позже.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить форму.')
    } finally {
      setSubmitting(false)
    }
  }

  // Шапка с поддержкой mixed-language шаблона: если в title есть «get in touch»,
  // подсвечивает; иначе подсвечивает «свяжемся».
  const renderTitle = () => {
    if (title.toLowerCase().includes('get in touch')) {
      return title.split(/get in touch/i).map((part, i, arr) => (
        <React.Fragment key={i}>
          {part}
          {i < arr.length - 1 ? <span className="text-primary">свяжемся</span> : null}
        </React.Fragment>
      ))
    }
    return title
  }

  return (
    <section className="py-12 md:py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="text-sm text-primary mb-2">{label}</div>
          <h2 className="text-headline">{renderTitle()}</h2>
        </div>

        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-6 text-center">
              <h3 className="text-title text-emerald-900 mb-1">Спасибо!</h3>
              <p className="text-body-sm text-emerald-800">
                Ваша заявка отправлена. Мы свяжемся в ближайшее время.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 inline-flex items-center gap-1 text-body-sm text-primary hover:underline"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error ? (
                <div className="text-body-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md p-3">
                  {error}
                </div>
              ) : null}

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Тема обращения*</span>
                </label>
                <select
                  className="flex h-11 w-full rounded-md border border-border bg-card px-4 py-2 text-sm shadow-e1 focus-within:shadow-e2 focus-visible:shadow-e2 hover:shadow-e2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-primary"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Ваше имя*</span>
                </label>
                <input
                  type="text"
                  className="flex h-11 w-full rounded-md border border-border bg-card px-4 py-2 text-sm shadow-e1 focus-within:shadow-e2 focus-visible:shadow-e2 hover:shadow-e2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-primary"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Иван Иванов"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Телефон*</span>
                </label>
                <input
                  type="tel"
                  className="flex h-11 w-full rounded-md border border-border bg-card px-4 py-2 text-sm shadow-e1 focus-within:shadow-e2 focus-visible:shadow-e2 hover:shadow-e2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-primary"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email*</span>
                </label>
                <input
                  type="email"
                  className="flex h-11 w-full rounded-md border border-border bg-card px-4 py-2 text-sm shadow-e1 focus-within:shadow-e2 focus-visible:shadow-e2 hover:shadow-e2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ivan@example.com"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Сообщение*</span>
                </label>
                <textarea
                  className="flex min-h-32 w-full rounded-md border border-border bg-card px-4 py-3 text-sm shadow-e1 focus-within:shadow-e2 hover:shadow-e2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-primary"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Расскажите подробнее, что вас интересует…"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Отправка…' : 'Отправить заявку'}
              </button>

              <p className="text-label text-on-surface-variant text-center">
                Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

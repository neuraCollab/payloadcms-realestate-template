'use client'
import React from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { X, Paperclip, Send, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  open: boolean
  onClose: () => void
  realtorId: string
  realtorName: string
  propertyTitle?: string
}

const MAX_BYTES = 10 * 1024 * 1024 // 10MB

// Slide-in right panel in ВК style: contact fields, expanding textarea with a
// paperclip + small inline Send button. Single optional file attachment.
export const MessagePopup: React.FC<Props> = ({
  open,
  onClose,
  realtorId,
  realtorName,
  propertyTitle,
}) => {
  const router = useRouter()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [file, setFile] = React.useState<File | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll while open + close on Escape
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  // Auto-grow textarea
  React.useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 240) + 'px'
  }, [message])

  const reset = () => {
    setName('')
    setEmail('')
    setPhone('')
    setMessage('')
    setFile(null)
    setSuccess(false)
    setError(null)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > MAX_BYTES) {
      setError(`Файл слишком большой (макс. ${MAX_BYTES / 1024 / 1024} МБ)`)
      return
    }
    setError(null)
    setFile(f)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Заполните имя, email и текст сообщения.')
      return
    }
    setSubmitting(true)

    const form = new FormData()
    form.set('realtorId', realtorId)
    form.set(
      'subject',
      propertyTitle ? `Объект: ${propertyTitle}` : `Сообщение для ${realtorName}`,
    )
    form.set('name', name.trim())
    form.set('email', email.trim())
    if (phone.trim()) form.set('phone', phone.trim())
    form.set('message', message.trim())
    if (propertyTitle) form.set('property', propertyTitle)
    if (file) form.set('attachment', file)
    // Honeypot: always empty for real users; bots tend to fill every input.
    form.set('website', '')

    try {
      const res = await fetch('/api/messages', { method: 'POST', body: form })
      if (res.ok) {
        const data = await res.json().catch(() => ({}))
        setSuccess(true)
        setMessage('')
        setFile(null)
        // Auto-redirect to the chat thread after a short pause.
        const chatUrl = data?.chatUrl
        if (chatUrl) {
          setTimeout(() => router.push(chatUrl), 1200)
        }
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Не удалось отправить. Попробуйте позже.')
      }
    } catch {
      setError('Сеть недоступна. Попробуйте позже.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open || !mounted) return null

  const panel = (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        aria-hidden
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Написать ${realtorName}`}
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <header className="flex items-center justify-between gap-3 p-4 border-b border-border">
          <div className="min-w-0">
            <div className="text-title text-on-surface line-clamp-1">Написать риэлтору</div>
            <div className="text-body-sm text-on-surface-variant line-clamp-1">
              {realtorName}
              {propertyTitle ? ` · ${propertyTitle}` : ''}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Закрыть"
            className="p-2 -m-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
        </header>

        {/* Body */}
        {success ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Send className="w-5 h-5" />
            </div>
            <h3 className="text-title text-on-surface mb-1">Отправлено</h3>
            <p className="text-body-sm text-on-surface-variant max-w-xs">
              Риэлтор получит ваше сообщение и свяжется в ближайшее время.
            </p>
            <Button onClick={handleClose} variant="outline" className="mt-6">
              Закрыть
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* honeypot — hidden from real users */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] w-px h-px opacity-0 pointer-events-none"
              onChange={() => {/* ignored */}}
            />
            {error ? (
              <div className="text-body-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md p-3">
                {error}
              </div>
            ) : null}

            <Input
              type="text"
              placeholder="Ваше имя *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Телефон (не обязательно)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* ВК-style editor: textarea with paperclip + inline send button */}
            <div className="border border-border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring transition-shadow">
              <textarea
                ref={textareaRef}
                placeholder="Напишите сообщение…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                required
                className="w-full resize-none bg-transparent px-3 py-2.5 text-body-sm focus:outline-none"
              />

              {/* Attachment chip */}
              {file ? (
                <div className="px-3 pb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-container rounded-md text-label text-on-surface max-w-full">
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="ml-1 text-on-surface-variant hover:text-on-surface"
                      aria-label="Убрать вложение"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                </div>
              ) : null}

              {/* Editor toolbar */}
              <div className="flex items-center justify-between px-2 py-1.5 border-t border-border">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                  aria-label="Прикрепить файл"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFile}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  aria-label="Отправить"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-label font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    'Отправка…'
                  ) : (
                    <>
                      Отправить
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-label text-on-surface-variant">
              Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
            </p>
          </form>
        )}
      </aside>
    </>
  )

  return createPortal(panel, document.body)
}

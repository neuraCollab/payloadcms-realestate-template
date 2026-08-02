'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { MessageSquare, X, Paperclip } from 'lucide-react'

interface Props {
  realtorId: string
  realtorName: string
  propertyTitle?: string
}

export function RichMessageForm({ realtorId, realtorName, propertyTitle }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [subject, setSubject] = useState(propertyTitle ? `Вопрос по объекту: ${propertyTitle}` : '')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
    ],
    content: '<p>Напишите ваше сообщение...</p>',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!editor?.getHTML() || !name || !email) {
      setError('Заполните все обязательные поля.')
      return
    }

    setSubmitting(true)

    let fileId: string | null = null
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const mediaRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (mediaRes.ok) {
        const media = await mediaRes.json()
        fileId = media.id
      }
    }

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        realtorId,
        subject,
        name,
        email,
        message: editor.getHTML(),
        property: propertyTitle,
        attachment: fileId,
      }),
    })

    if (res.ok) {
      setSuccess(true)
      editor.commands.setContent('<p></p>')
    } else {
      setError('Не удалось отправить сообщение. Попробуйте позже.')
    }
    setSubmitting(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* The Widget / Form */}
      {isOpen && (
        <div className="mb-4 w-[380px] max-w-[calc(100vw-3rem)] rounded-xl border border-border bg-background shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-semibold">Связаться с риелтором</h3>
              <p className="text-primary-foreground/80 text-sm">{realtorName}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 p-2 rounded-full transition-colors"
              aria-label="Закрыть чат"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto">
            {success ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground">Сообщение отправлено</h4>
                  <p className="text-muted-foreground mt-1">Риелтор скоро ответит вам.</p>
                </div>
                <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full mt-4">
                  Закрыть
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error ? <Alert variant="error">{error}</Alert> : null}

                <FormField label="Тема" htmlFor="message-subject" required>
                  <Input
                    id="message-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Тема сообщения"
                    required
                  />
                </FormField>

                <div className="space-y-4">
                  <FormField label="Ваше имя" htmlFor="message-name" required>
                    <Input
                      id="message-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Иванов"
                      required
                    />
                  </FormField>
                  <FormField label="Email" htmlFor="message-email" required>
                    <Input
                      id="message-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ivan@example.com"
                      required
                    />
                  </FormField>
                </div>

                <FormField label="Сообщение" required>
                  {editor ? (
                    <div className="rounded-md border border-border bg-background min-h-[150px] p-3 text-body focus-within:ring-2 focus-within:ring-ring transition-shadow">
                      <EditorContent editor={editor} />
                    </div>
                  ) : (
                    <div className="rounded-md border border-border bg-surface-container-low min-h-[150px] p-3 text-body-sm text-on-surface-variant flex items-center justify-center">
                      Загрузка редактора…
                    </div>
                  )}
                </FormField>

                <FormField label="Прикрепить файл" hint="Изображения, PDF или DOC. Опционально.">
                  <div className="relative group">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      accept="image/*,.pdf,.doc,.docx"
                      className="sr-only"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 w-full cursor-pointer rounded-md border border-dashed border-border bg-surface-container-low hover:bg-surface-container hover:border-primary/50 transition-colors px-4 py-3 text-sm text-on-surface-variant group-focus-within:ring-2 group-focus-within:ring-ring"
                    >
                      <Paperclip size={18} className="shrink-0 text-muted-foreground" />
                      <span className="truncate flex-1">
                        {file ? file.name : 'Выберите файл или перетащите сюда'}
                      </span>
                      {file && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            setFile(null)
                            const el = document.getElementById('file-upload') as HTMLInputElement
                            if (el) el.value = ''
                          }}
                          className="shrink-0 p-1 rounded hover:bg-background/50 hover:text-destructive text-muted-foreground"
                          aria-label="Удалить файл"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </label>
                  </div>
                </FormField>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? 'Отправка…' : 'Отправить'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-transform hover:scale-105 active:scale-95"
          aria-label="Написать сообщение"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  )
}

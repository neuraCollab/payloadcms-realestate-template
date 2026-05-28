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

interface Props {
  realtorId: string
  realtorName: string
  propertyTitle?: string
}

export function RichMessageForm({ realtorId, realtorName, propertyTitle }: Props) {
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

  if (success) {
    return (
      <Alert variant="success" title="Сообщение отправлено">
        Риелтор {realtorName} скоро ответит.
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="rounded-md border border-border bg-background min-h-[200px] p-3 text-body focus-within:ring-2 focus-within:ring-ring transition-shadow">
            <EditorContent editor={editor} />
          </div>
        ) : (
          <div className="rounded-md border border-border bg-surface-container-low min-h-[200px] p-3 text-body-sm text-on-surface-variant">
            Загрузка редактора…
          </div>
        )}
      </FormField>

      <FormField label="Прикрепить файл" hint="Изображения, PDF или DOC. Опционально.">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
          className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary-container file:text-on-primary-container file:px-3 file:py-1 file:text-body-sm file:font-medium hover:file:bg-primary-container/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </FormField>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Отправка…' : 'Отправить'}
      </Button>
    </form>
  )
}

// components/RichMessageForm.tsx
'use client'

import { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

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
    if (!editor?.getHTML() || !name || !email) {
      alert('Заполните обязательные поля')
      return
    }

    setSubmitting(true)

    // 1. Загружаем файл (если есть) в Payload Media
    let fileId = null
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const mediaRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (mediaRes.ok) {
        const media = await mediaRes.json()
        fileId = media.id
      }
    }

    // 2. Отправляем сообщение
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        realtorId,
        subject,
        name,
        email,
        message: editor.getHTML(), // HTML-контент
        property: propertyTitle,
        attachment: fileId, // ID файла из media
      }),
    })

    if (res.ok) {
      setSuccess(true)
      editor.commands.setContent('<p>Сообщение отправлено!</p>')
    } else {
      alert('Ошибка отправки')
    }
    setSubmitting(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 p-4 rounded-lg text-green-800">
        Сообщение отправлено! Риелтор {realtorName} скоро ответит.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold">Написать риелтору</h3>

      <div>
        <label className="block text-sm mb-1">Тема *</label>
        <input
            placeholder="Тема *"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Ваше имя *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered"
          required
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered"
          required
        />
      </div>

      {/* Rich Text Editor */}
      <div>
        <label className="block text-sm mb-1">Сообщение *</label>
        {editor ? (
          <div className="border border-gray-300 rounded p-2 min-h-[200px]">
            <EditorContent editor={editor} />
          </div>
        ) : (
          <div className="border border-gray-300 rounded p-2 min-h-[200px] bg-gray-50">
            Загрузка редактора...
          </div>
        )}
        {/* Панель инструментов можно добавить отдельно */}
      </div>

      {/* Загрузка файла */}
      <div>
        <label className="block text-sm mb-1">Прикрепить файл (опционально)</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
          className="file-input file-input-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
        {submitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  )
}

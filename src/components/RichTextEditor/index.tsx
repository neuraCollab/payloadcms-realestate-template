'use client'
import React from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
} from 'lucide-react'

interface Props {
  /** HTML строка. */
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

/**
 * Тонкая обёртка над Tiptap StarterKit с тулбаром, идентичным по логике
 * Lexical-редактору в админке Payload (bold/italic/h2/h3/lists/link).
 *
 * Возвращает HTML строку через onChange. При save форма конвертирует
 * её в Lexical JSON через htmlToLexical(), что подходит под формат
 * хранения description в Payload.
 */
export const RichTextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Отключим лишнее. Оставим только то, что есть в админке.
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
        // StarterKit 3.x бандлит Link сам — отключаем встроенный,
        // иначе Tiptap ругается на дублирующееся расширение и
        // применяет последний зарегистрированный конфиг непредсказуемо.
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[160px] px-3 py-2 focus:outline-none text-on-surface',
        'data-placeholder': placeholder ?? '',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  // Sync extern value when initial loads (edit mode).
  React.useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (value && value !== current) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <div className="rounded-md border border-border bg-card focus-within:ring-2 focus-within:ring-ring overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const setLink = () => {
    const previous = editor.getAttributes('link').href
    const url = window.prompt('Введите URL', previous ?? '')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-surface-container px-2 py-1.5">
      <TBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Жирный">
        <Bold className="w-4 h-4" />
      </TBtn>
      <TBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Курсив">
        <Italic className="w-4 h-4" />
      </TBtn>
      <div className="w-px h-5 bg-border mx-1" />
      <TBtn
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Заголовок"
      >
        <Heading2 className="w-4 h-4" />
      </TBtn>
      <TBtn
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Подзаголовок"
      >
        <Heading3 className="w-4 h-4" />
      </TBtn>
      <div className="w-px h-5 bg-border mx-1" />
      <TBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Маркированный список">
        <List className="w-4 h-4" />
      </TBtn>
      <TBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Нумерованный список">
        <ListOrdered className="w-4 h-4" />
      </TBtn>
      <div className="w-px h-5 bg-border mx-1" />
      <TBtn active={editor.isActive('link')} onClick={setLink} title="Ссылка">
        <LinkIcon className="w-4 h-4" />
      </TBtn>
      <div className="flex-1" />
      <TBtn onClick={() => editor.chain().focus().undo().run()} title="Отменить">
        <Undo className="w-4 h-4" />
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().redo().run()} title="Повторить">
        <Redo className="w-4 h-4" />
      </TBtn>
    </div>
  )
}

const TBtn: React.FC<{
  onClick: () => void
  active?: boolean
  title?: string
  children: React.ReactNode
}> = ({ onClick, active, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-pressed={active}
    className={
      active
        ? 'inline-flex w-8 h-8 items-center justify-center rounded bg-primary/10 text-primary'
        : 'inline-flex w-8 h-8 items-center justify-center rounded text-on-surface-variant hover:bg-surface-container-low'
    }
  >
    {children}
  </button>
)

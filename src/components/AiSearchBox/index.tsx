'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react'

/**
 * Большой textarea + кнопка для AI-поиска по NL-запросу.
 * При сабмите редиректит на /search?ai=1&q=<promt> — там
 * результаты подтягиваются из /api/ai-search.
 */
export const AiSearchBox: React.FC<{
  /** Дефолтный текст в placeholder. */
  placeholder?: string
  /** Куда редиректить с готовым запросом. */
  redirectTo?: string
}> = ({
  placeholder = 'Опиши что ищешь: «двушка в Москве рядом с метро до 15 млн, светлая, недалеко от парка»',
  redirectTo = '/search',
}) => {
  const router = useRouter()
  const [q, setQ] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  // Open-Core: Hide AI search if disabled
  const isAiEnabled = process.env.NEXT_PUBLIC_ENABLE_AI === 'true'

  if (!isAiEnabled) {
    return (
      <div className="bg-card rounded-2xl shadow-e3 p-4 border border-border flex flex-col items-center justify-center text-center">
        <Sparkles className="w-6 h-6 text-muted-foreground mb-2" />
        <h3 className="text-body font-medium mb-1">AI-поиск недоступен</h3>
        <p className="text-body-sm text-on-surface-variant max-w-sm">
          Функциональность поиска по естественному языку доступна в Pro-версии платформы.
        </p>
      </div>
    )
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text) return
    setSubmitting(true)
    const p = new URLSearchParams()
    p.set('ai', '1')
    p.set('q', text)
    router.push(`${redirectTo}?${p.toString()}`)
  }

  return (
    <form
      onSubmit={submit}
      className="bg-card rounded-2xl shadow-e3 p-3 md:p-4 border border-border"
    >
      <label className="flex items-center gap-1.5 text-label text-on-surface-variant mb-2">
        <Sparkles className="w-4 h-4 text-primary" />
        AI-поиск — спроси на своём языке
      </label>
      <textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit(e as any)
        }}
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-label text-on-surface-variant hidden sm:inline">
          ⌘/Ctrl + Enter — отправить
        </span>
        <button
          type="submit"
          disabled={submitting || !q.trim()}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Найти умно
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}

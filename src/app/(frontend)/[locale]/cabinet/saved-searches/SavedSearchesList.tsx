'use client'
import React from 'react'
import Link from 'next/link'
import { Trash2, Search } from 'lucide-react'

interface SavedSearch {
  id: number
  name: string
  email: string
  filters: Record<string, any>
  frequency: 'instant' | 'daily' | 'weekly'
  isActive: boolean
  lastRunAt?: string
  lastMatchCount?: number
}

const FREQ_LABEL: Record<string, string> = {
  instant: 'сразу',
  daily: 'раз в день',
  weekly: 'раз в неделю',
}

export const SavedSearchesList: React.FC = () => {
  const [items, setItems] = React.useState<SavedSearch[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const refresh = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/saved-searches')
      const data = await res.json()
      setItems(data.docs ?? [])
    } catch {
      setError('Не удалось загрузить.')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    refresh()
  }, [refresh])

  const remove = async (id: number) => {
    if (!confirm('Удалить эту подписку?')) return
    await fetch(`/api/saved-searches?id=${id}`, { method: 'DELETE' })
    setItems((it) => it.filter((x) => x.id !== id))
  }

  if (loading) {
    return (
      <div className="bg-card rounded-md shadow-e1 p-6">
        <p className="text-body-sm text-on-surface-variant">Загрузка…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-card rounded-md shadow-e1 p-6 text-body-sm text-rose-700">
        {error}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-card rounded-md shadow-e1 p-6 space-y-3">
        <p className="text-body text-on-surface-variant">
          У вас пока нет сохранённых поисков. Откройте каталог и нажмите
          «Получать новые объекты на email» рядом с фильтрами.
        </p>
        <Link
          href="/flats"
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
        >
          <Search className="w-4 h-4" />
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-md shadow-e1 divide-y divide-border">
      {items.map((s) => {
        const collection = (s.filters?.collection as string) ?? 'flats'
        const qs = new URLSearchParams()
        Object.entries(s.filters ?? {}).forEach(([k, v]) => {
          if (k === 'collection') return
          if (v != null && v !== '') qs.set(k, String(v))
        })
        const openUrl = `/${collection}${qs.toString() ? '?' + qs.toString() : ''}`

        return (
          <div key={s.id} className="p-5 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link
                href={openUrl}
                className="text-title text-on-surface hover:text-primary block line-clamp-2"
              >
                {s.name}
              </Link>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Частота: <b>{FREQ_LABEL[s.frequency] ?? s.frequency}</b>
                {' · '}
                Email: {s.email}
                {s.lastRunAt ? (
                  <>
                    {' · '}
                    Последний дайджест:{' '}
                    {new Date(s.lastRunAt).toLocaleString('ru-RU')}
                    {' ('}
                    {s.lastMatchCount ?? 0} матч.
                    {')'}
                  </>
                ) : null}
              </p>
            </div>
            <button
              type="button"
              onClick={() => remove(s.id)}
              aria-label="Удалить"
              className="shrink-0 inline-flex w-9 h-9 items-center justify-center rounded-full text-rose-600 hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

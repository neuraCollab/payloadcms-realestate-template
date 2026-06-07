'use client'
import React from 'react'
import Link from 'next/link'
import { Eye, Edit, Trash2, Send } from 'lucide-react'

interface Listing {
  id: number
  title: string
  status: string
  price?: number
  location?: { city?: string }
  submittedAt?: string
  moderationNote?: string
  createdAt?: string
  images?: any[]
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  draft: { label: 'Черновик', color: 'bg-amber-100 text-amber-900' },
  pending_review: { label: 'На модерации', color: 'bg-blue-100 text-blue-900' },
  active: { label: 'Опубликовано', color: 'bg-emerald-100 text-emerald-900' },
  sold: { label: 'Продано', color: 'bg-zinc-200 text-zinc-700' },
  unpublished: { label: 'Снято', color: 'bg-rose-100 text-rose-900' },
}

const formatPrice = (n?: number) =>
  typeof n === 'number' ? n.toLocaleString('ru-RU') + ' ₽' : '—'

export const ListingsList: React.FC = () => {
  const [items, setItems] = React.useState<Listing[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('/api/cabinet/listings')
      .then((r) => r.json())
      .then((d) => setItems(d.docs ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const onDelete = async (id: number) => {
    if (!confirm('Удалить черновик?')) return
    const res = await fetch(`/api/cabinet/listings/${id}`, { method: 'DELETE' })
    if (res.ok) setItems((it) => it.filter((x) => x.id !== id))
  }

  const onSubmit = async (id: number) => {
    if (!confirm('Отправить на модерацию? После этого нельзя будет редактировать в кабинете.')) return
    const res = await fetch(`/api/cabinet/listings/${id}/submit`, {
      method: 'POST',
    })
    const data = await res.json()
    if (!res.ok) {
      if (data.errors) {
        alert(
          'Не хватает данных:\n' +
            Object.values(data.errors).join('\n') +
            '\n\nДоредактируйте черновик.',
        )
      } else {
        alert(data.message || 'Не удалось отправить.')
      }
      return
    }
    // Обновим список локально.
    setItems((it) =>
      it.map((x) => (x.id === id ? { ...x, status: 'pending_review' } : x)),
    )
  }

  if (loading) {
    return (
      <div className="bg-card rounded-md shadow-e1 p-6">
        <p className="text-body-sm text-on-surface-variant">Загрузка…</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-card rounded-md shadow-e1 p-6 space-y-3 text-center">
        <p className="text-body text-on-surface-variant">
          У вас пока нет объявлений. Создайте первое — мы проведём вас по всем шагам.
        </p>
        <Link
          href="/cabinet/listings/new"
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
        >
          Создать объявление
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-md shadow-e1 divide-y divide-border">
      {items.map((l) => {
        const status = STATUS_LABEL[l.status] ?? STATUS_LABEL.draft
        return (
          <div key={l.id} className="p-5 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex h-6 px-2 items-center rounded-full text-label font-medium ${status?.color}`}
                >
                  {status?.label}
                </span>
              </div>
              <Link
                href={`/cabinet/listings/${l.id}/preview`}
                className="block text-title text-on-surface hover:text-primary mt-1.5 line-clamp-2"
              >
                {l.title || '(без заголовка)'}
              </Link>
              <p className="text-body-sm text-on-surface-variant mt-1">
                {l.location?.city ?? '—'} · {formatPrice(l.price)}
                {' · '}фото: {Array.isArray(l.images) ? l.images.length : 0}
              </p>
              {l.moderationNote && l.status !== 'active' ? (
                <p className="text-body-sm text-rose-700 mt-2 bg-rose-50 border border-rose-200 rounded p-2">
                  <b>Замечание модератора:</b> {l.moderationNote}
                </p>
              ) : null}
            </div>
            <div className="shrink-0 flex flex-col gap-1.5">
              <Link
                href={`/cabinet/listings/${l.id}/preview`}
                title="Превью"
                className="inline-flex w-9 h-9 items-center justify-center rounded-full text-on-surface hover:bg-surface-container"
              >
                <Eye className="w-4 h-4" />
              </Link>
              {l.status === 'draft' ? (
                <>
                  <Link
                    href={`/cabinet/listings/${l.id}/edit`}
                    title="Редактировать"
                    className="inline-flex w-9 h-9 items-center justify-center rounded-full text-on-surface hover:bg-surface-container"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onSubmit(l.id)}
                    title="Отправить на модерацию"
                    className="inline-flex w-9 h-9 items-center justify-center rounded-full text-primary hover:bg-primary/5"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(l.id)}
                    title="Удалить"
                    className="inline-flex w-9 h-9 items-center justify-center rounded-full text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useCompare, toggleCompare, clearCompare } from '@/lib/compare'
import { formatPrice } from '@/utilities/formatPrice'



const ROWS: Array<{
  label: string
  get: (d: any) => string | number | null | undefined
}> = [
  { label: 'Цена', get: (d) => formatPrice(d.price) },
  { label: 'Город', get: (d) => d.location?.city ?? '—' },
  { label: 'Район', get: (d) => d.location?.district ?? '—' },
  { label: 'Адрес', get: (d) => d.location?.address ?? '—' },
  { label: 'Тип сделки', get: (d) => txLabel(d.transactionType) },
  { label: 'Комнат', get: (d) => roomsLabel(d.rooms) },
  { label: 'Площадь общая', get: (d) => d.area?.total ? `${d.area.total} м²` : '—' },
  { label: 'Жилая площадь', get: (d) => d.area?.living ? `${d.area.living} м²` : '—' },
  { label: 'Этаж', get: (d) => d.floorInfo?.floor ? `${d.floorInfo.floor} из ${d.floorInfo.totalFloors ?? '—'}` : '—' },
  { label: 'Год постройки', get: (d) => d.yearBuilt ?? '—' },
  { label: 'Материал', get: (d) => buildingTypeLabel(d.buildingType) },
  { label: 'От собственника', get: (d) => (d.fromOwner ? 'Да' : 'Нет') },
  { label: 'Без комиссии', get: (d) => (d.noCommission ? 'Да' : 'Нет') },
]

function txLabel(v: string | undefined): string {
  if (v === 'sale') return 'Продажа'
  if (v === 'rent') return 'Аренда'
  if (v === 'daily') return 'Посуточно'
  return '—'
}

function roomsLabel(v: string | undefined): string {
  if (!v) return '—'
  if (v === 'studio') return 'Студия'
  if (v === '5plus') return '5+'
  return v
}

function buildingTypeLabel(v: string | undefined): string {
  const map: Record<string, string> = {
    panel: 'Панель',
    brick: 'Кирпич',
    monolithic: 'Монолит',
    block: 'Блок',
    wood: 'Дерево',
  }
  return v ? map[v] ?? v : '—'
}

interface Loaded {
  ref: { collection: string; id: string | number }
  doc: any
}

export const CompareClient: React.FC = () => {
  const items = useCompare()
  const [loaded, setLoaded] = React.useState<Loaded[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    const fetchAll = async () => {
      if (items.length === 0) {
        setLoaded([])
        return
      }
      setLoading(true)
      setError(null)
      try {
        const results = await Promise.all(
          items.map(async (it) => {
            // Payload REST API: GET /api/<collection>/<id>?depth=1
            const res = await fetch(`/api/${it.collection}/${it.id}?depth=1`)
            if (!res.ok) throw new Error(`fetch ${it.collection}/${it.id}: ${res.status}`)
            const doc = await res.json()
            return { ref: it, doc }
          }),
        )
        if (!cancelled) setLoaded(results)
      } catch (e) {
        if (!cancelled) setError((e as Error).message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchAll()
    return () => {
      cancelled = true
    }
  }, [items])

  if (items.length === 0) {
    return (
      <section className="rounded-md border border-border bg-card p-8 text-center">
        <p className="text-body text-on-surface-variant">
          Пока ничего не выбрано для сравнения. На карточке объекта в каталоге
          нажмите <span className="text-primary">«Сравнить»</span> — здесь
          появится таблица бок о бок.
        </p>
        <Link
          href="/flats"
          className="mt-4 inline-flex h-11 px-5 items-center rounded-full bg-primary text-primary-foreground text-body-sm font-medium"
        >
          Перейти к каталогу
        </Link>
      </section>
    )
  }

  if (loading && loaded.length === 0) {
    return <p className="text-body text-on-surface-variant">Загрузка объектов…</p>
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 text-red-900 p-4">
        Ошибка загрузки данных: {error}
      </div>
    )
  }

  // Минимальная ширина колонки 240px — горизонтальный scroll на узких
  // экранах, чтобы не схлопывать таблицу.
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-body-sm text-on-surface-variant">
          В сравнении: {loaded.length} объект{loaded.length === 1 ? '' : loaded.length < 5 ? 'а' : 'ов'}
        </p>
        <button
          type="button"
          onClick={clearCompare}
          className="inline-flex h-9 px-3 items-center rounded-full border border-border text-body-sm text-on-surface hover:bg-surface-container"
        >
          Очистить
        </button>
      </div>

      <div className="overflow-x-auto rounded-md border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-card border-b border-border p-3 text-left text-label text-on-surface-variant uppercase w-48">
                Параметр
              </th>
              {loaded.map(({ ref, doc }) => (
                <th
                  key={`${ref.collection}-${ref.id}`}
                  className="border-b border-border p-3 align-top min-w-[240px]"
                >
                  <div className="space-y-2">
                    <div className="relative aspect-[16/10] bg-surface-container rounded-md overflow-hidden">
                      {doc.images?.[0]?.image?.url ? (
                        <Image
                          src={doc.images[0].image.url}
                          alt={doc.title}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      ) : null}
                      <button
                        type="button"
                        onClick={() =>
                          toggleCompare({
                            collection: ref.collection as any,
                            id: ref.id,
                          })
                        }
                        aria-label="Убрать из сравнения"
                        className="absolute top-1 right-1 w-7 h-7 inline-flex items-center justify-center rounded-full bg-card/95 text-on-surface shadow-e1 hover:bg-card"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <Link
                      href={`/${ref.collection}/${doc.slug}`}
                      className="block text-body-sm font-medium text-on-surface hover:text-primary line-clamp-2"
                    >
                      {doc.title}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-b-0">
                <td className="sticky left-0 z-10 bg-card p-3 text-body-sm text-on-surface-variant">
                  {row.label}
                </td>
                {loaded.map(({ ref, doc }) => (
                  <td
                    key={`${ref.collection}-${ref.id}-${row.label}`}
                    className="p-3 text-body-sm text-on-surface"
                  >
                    {String(row.get(doc) ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

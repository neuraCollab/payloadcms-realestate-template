'use client'
import React from 'react'
import { Scale, Check } from 'lucide-react'
import {
  toggleCompare,
  useCompare,
  type CompareCollection,
} from '@/lib/compare'

interface Props {
  collection: CompareCollection
  id: string | number
  /** Кнопка-иконка для overlay на карточке (32×32). */
  variant?: 'icon' | 'inline'
}

/**
 * Toggle-кнопка «Сравнить». Хранит выбор в localStorage через
 * useCompare/toggleCompare (см. src/lib/compare.ts).
 *
 * При попытке добавить объект другого типа или превысить лимит —
 * мягкое уведомление через alert (без зависимостей вроде sonner).
 */
export const CompareButton: React.FC<Props> = ({ collection, id, variant = 'icon' }) => {
  const items = useCompare()
  const active = items.some(
    (it) => it.collection === collection && String(it.id) === String(id),
  )

  const onClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const result = toggleCompare({ collection, id })
    if (result === 'mismatch') {
      alert(
        'В сравнении уже есть объекты другого типа. Очистите сравнение или ' +
          'добавьте объект того же типа.',
      )
    } else if (result === 'limit') {
      alert('Можно сравнивать не более 4 объектов одновременно.')
    }
  }

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={
          active
            ? 'inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-primary text-primary-foreground text-body-sm font-medium'
            : 'inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border text-body-sm text-on-surface hover:bg-surface-container'
        }
      >
        {active ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
        {active ? 'В сравнении' : 'Сравнить'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? 'Убрать из сравнения' : 'Добавить к сравнению'}
      aria-pressed={active}
      className={
        active
          ? 'inline-flex w-8 h-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-e1'
          : 'inline-flex w-8 h-8 items-center justify-center rounded-full bg-card/95 text-on-surface shadow-e1 hover:bg-card'
      }
    >
      <Scale className="w-4 h-4" />
    </button>
  )
}

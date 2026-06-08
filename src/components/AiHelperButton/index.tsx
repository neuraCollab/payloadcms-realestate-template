'use client'
import React from 'react'
import { Sparkles } from 'lucide-react'
import { RecommendModal } from '@/components/RecommendModal'

interface Props {
  /** Стиль: icon-only (для хедера) или с подписью. */
  variant?: 'icon' | 'button'
  /** Дополнительная подпись для button-варианта. */
  label?: string
  className?: string
}

/**
 * Универсальный триггер AI-помощника. Открывает RecommendModal.
 *
 * Используется в трёх местах:
 *   • хедер — variant='icon'
 *   • /search — variant='button' label='Подобрать с AI'
 *   • Hero — встроен прямо в поисковую панель (отдельный wrapper)
 */
export const AiHelperButton: React.FC<Props> = ({
  variant = 'icon',
  label = 'AI-помощник',
  className = '',
}) => {
  const [open, setOpen] = React.useState(false)

  if (variant === 'icon') {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={label}
          title={label}
          className={`inline-flex w-10 h-10 items-center justify-center rounded-full text-primary hover:bg-primary/10 transition ${className}`}
        >
          <Sparkles className="w-5 h-5" />
        </button>
        <RecommendModal open={open} onClose={() => setOpen(false)} />
      </>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 transition ${className}`}
      >
        <Sparkles className="w-4 h-4" />
        {label}
      </button>
      <RecommendModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

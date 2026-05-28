'use client'
import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface StarRatingProps {
  value: number
  onChange?: (v: number) => void
  max?: number
  readOnly?: boolean
  ariaLabel?: string
  className?: string
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  max = 5,
  readOnly = false,
  ariaLabel,
  className,
}) => {
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  return (
    <div
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={ariaLabel || `${value} из ${max}`}
      className={cn('inline-flex items-center gap-1', className)}
    >
      {stars.map((n) => {
        const active = value >= n
        const Comp = readOnly ? 'span' : 'button'
        return (
          <Comp
            key={n}
            {...(readOnly
              ? {}
              : {
                  type: 'button' as const,
                  role: 'radio' as const,
                  'aria-checked': active,
                  onClick: () => onChange?.(n),
                  'aria-label': `Оценить ${n} ${n === 1 ? 'звездой' : 'звёздами'}`,
                })}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors',
              !readOnly && 'hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              active ? 'text-primary' : 'text-on-surface-variant/40',
            )}
          >
            <Star className="h-5 w-5" fill={active ? 'currentColor' : 'none'} />
          </Comp>
        )
      })}
      {!readOnly && (
        <span className="ml-2 text-body-sm text-on-surface-variant">
          {value} из {max}
        </span>
      )}
    </div>
  )
}

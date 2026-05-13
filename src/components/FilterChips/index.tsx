'use client'
import React from 'react'
import { cn } from '@/utilities/ui'

export interface ChipOption {
  value: string
  label: string
}

interface FilterChipsProps {
  options: ChipOption[]
  value: string
  onChange: (v: string) => void
  className?: string
  ariaLabel?: string
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  options,
  value,
  onChange,
  className,
  ariaLabel,
}) => {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn('flex flex-wrap gap-2', className)}>
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'px-4 py-1.5 rounded-full text-body-sm font-medium transition-colors border',
              active
                ? 'bg-primary-container text-on-primary-container border-transparent'
                : 'bg-card text-on-surface-variant border-border hover:bg-surface-container-low',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

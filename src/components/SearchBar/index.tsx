'use client'
import React from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  onSubmit?: (v: string) => void
  className?: string
  submitLabel?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Поиск',
  value,
  onChange,
  onSubmit,
  className,
  submitLabel = 'Найти',
}) => {
  const [internal, setInternal] = React.useState(value ?? '')
  const current = value ?? internal

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(current)
      }}
      className={cn(
        'flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-e1 focus-within:shadow-e2 transition-shadow',
        className,
      )}
    >
      <Search className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={current}
        onChange={(e) => {
          setInternal(e.target.value)
          onChange?.(e.target.value)
        }}
        className="flex-1 bg-transparent border-0 outline-none text-body text-on-surface placeholder:text-on-surface-variant min-w-0"
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground rounded-full px-5 py-1.5 text-body-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
      >
        {submitLabel}
      </button>
    </form>
  )
}

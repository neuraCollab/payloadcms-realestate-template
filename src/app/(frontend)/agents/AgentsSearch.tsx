'use client'
import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'

interface Props {
  initialQ: string
}

export const AgentsSearch: React.FC<Props> = ({ initialQ }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = React.useState(initialQ)

  const submit = (q: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (q.trim()) params.set('q', q.trim())
    else params.delete('q')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit(value)
      }}
      className="mx-auto max-w-2xl bg-card rounded-full shadow-e2 px-2 py-2 flex items-center gap-2"
    >
      <SearchIcon className="w-5 h-5 text-on-surface-variant ml-3 shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Имя или специализация…"
        className="flex-1 bg-transparent border-none outline-none text-body-sm placeholder-on-surface-variant"
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            setValue('')
            submit('')
          }}
          aria-label="Очистить"
          className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      ) : null}
      <button
        type="submit"
        className="h-10 px-5 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Найти
      </button>
    </form>
  )
}

'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ArrowUpDown } from 'lucide-react'

export interface SortOption {
  value: string
  label: string
}

interface Props {
  options: SortOption[]
  /** Param name in URL. Default `sort`. */
  paramName?: string
  /** Default value when URL param is absent. */
  defaultValue?: string
}

export const SortSelect: React.FC<Props> = ({
  options,
  paramName = 'sort',
  defaultValue,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const current =
    searchParams.get(paramName) ?? defaultValue ?? options[0]?.value ?? ''

  const onChange = (next: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next && next !== defaultValue) params.set(paramName, next)
    else params.delete(paramName)
    // Reset to page 1 when sort changes — otherwise we'd land on an out-of-range page.
    params.delete('page')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <label className="inline-flex items-center gap-2 text-body-sm">
      <ArrowUpDown className="w-4 h-4 text-on-surface-variant" />
      <span className="text-on-surface-variant">Сортировка:</span>
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border border-border bg-background px-2 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

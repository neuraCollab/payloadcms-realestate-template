'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FILTER_SCHEMAS, type PropertyType } from './schemas'
import { Button } from '@/components/ui/button'

export const PropertyFilters: React.FC<{ type: PropertyType }> = ({ type }) => {
  const schema = FILTER_SCHEMAS[type]
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [draft, setDraft] = React.useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    for (const f of schema) init[f.key] = searchParams.get(f.key) ?? (f.type === 'select' ? 'all' : '')
    return init
  })

  React.useEffect(() => {
    const next: Record<string, string> = {}
    for (const f of schema) next[f.key] = searchParams.get(f.key) ?? (f.type === 'select' ? 'all' : '')
    setDraft(next)
  }, [searchParams, schema])

  const apply = () => {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(draft)) {
      if (v && v !== 'all') params.set(k, v)
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); apply() }}
      className="bg-card rounded-md shadow-e1 p-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))_auto] lg:items-end"
    >
      {schema.map((f) => (
        <label key={f.key} className="flex flex-col gap-1 min-w-0">
          <span className="text-label text-on-surface-variant uppercase">{f.label}</span>
          {f.type === 'select' ? (
            <select
              value={draft[f.key] ?? 'all'}
              onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
              className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {f.options!.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={f.type === 'number' ? 'number' : 'text'}
              placeholder={f.placeholder}
              value={draft[f.key] ?? ''}
              onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
              className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          )}
        </label>
      ))}
      <Button type="submit" className="sm:col-span-2 lg:col-span-1">Найти</Button>
    </form>
  )
}

'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FILTER_SCHEMAS, type FilterField, type PropertyType } from './schemas'
import { Button } from '@/components/ui/button'

const renderField = (
  f: FilterField,
  value: string,
  onChange: (v: string) => void,
) => {
  if (f.type === 'checkbox') {
    return (
      <label
        key={f.key}
        className="flex items-center gap-2 min-w-0 self-end h-10 px-3 rounded-md border border-border bg-background cursor-pointer hover:bg-surface-container transition-colors"
      >
        <input
          type="checkbox"
          checked={value === 'true'}
          onChange={(e) => onChange(e.target.checked ? 'true' : '')}
          className="w-4 h-4 accent-primary"
        />
        <span className="text-body-sm text-on-surface">{f.label}</span>
      </label>
    )
  }

  return (
    <label key={f.key} className="flex flex-col gap-1 min-w-0">
      <span className="text-label text-on-surface-variant uppercase">{f.label}</span>
      {f.type === 'select' ? (
        <select
          value={value || 'all'}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {f.options!.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={f.type === 'number' ? 'number' : 'text'}
          placeholder={f.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      )}
    </label>
  )
}

export const PropertyFilters: React.FC<{ type: PropertyType }> = ({ type }) => {
  const schema = FILTER_SCHEMAS[type]
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const basicFields = schema.filter((f) => !f.advanced)
  const advancedFields = schema.filter((f) => f.advanced)
  const hasAdvanced = advancedFields.length > 0

  // Auto-expand if any advanced field has a value set in URL.
  const initiallyExpanded = React.useMemo(
    () => advancedFields.some((f) => {
      const v = searchParams.get(f.key)
      return v && v !== 'all'
    }),
    [advancedFields, searchParams],
  )

  const [expanded, setExpanded] = React.useState(initiallyExpanded)

  const readDraft = React.useCallback(() => {
    const next: Record<string, string> = {}
    for (const f of schema) {
      next[f.key] = searchParams.get(f.key) ?? (f.type === 'select' ? 'all' : '')
    }
    return next
  }, [schema, searchParams])

  const [draft, setDraft] = React.useState<Record<string, string>>(readDraft)

  React.useEffect(() => {
    setDraft(readDraft())
  }, [readDraft])

  const apply = () => {
    const params = new URLSearchParams()
    // Preserve unrelated params like ?view=map
    const preserveKeys = new Set(['view'])
    const filterKeys = new Set(schema.map((f) => f.key))
    for (const [k, v] of searchParams.entries()) {
      if (preserveKeys.has(k) && !filterKeys.has(k)) params.set(k, v)
    }
    for (const [k, v] of Object.entries(draft)) {
      if (v && v !== 'all') params.set(k, v)
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  const reset = () => {
    const cleared: Record<string, string> = {}
    for (const f of schema) cleared[f.key] = f.type === 'select' ? 'all' : ''
    setDraft(cleared)
    // Preserve view param on reset
    const view = searchParams.get('view')
    router.push(view ? `${pathname}?view=${view}` : pathname)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        apply()
      }}
      className="bg-card rounded-md shadow-e1 p-4 space-y-4"
    >
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {basicFields.map((f) =>
          renderField(f, draft[f.key] ?? '', (v) => setDraft({ ...draft, [f.key]: v })),
        )}
      </div>

      {hasAdvanced && expanded ? (
        <div className="pt-3 border-t border-border grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {advancedFields.map((f) =>
            renderField(f, draft[f.key] ?? '', (v) => setDraft({ ...draft, [f.key]: v })),
          )}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        {hasAdvanced ? (
          <button
            type="button"
            onClick={() => setExpanded((x) => !x)}
            className="inline-flex items-center gap-1 text-body-sm text-primary hover:underline"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Скрыть расширенные
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Расширенные фильтры
              </>
            )}
          </button>
        ) : (
          <span />
        )}

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={reset}>
            Сбросить
          </Button>
          <Button type="submit">Найти</Button>
        </div>
      </div>
    </form>
  )
}

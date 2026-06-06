'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronDown, ChevronUp, RotateCcw, Loader2 } from 'lucide-react'
import { FILTER_SCHEMAS, type FilterField, type PropertyType } from './schemas'
import { Button } from '@/components/ui/button'

interface Props {
  type: PropertyType
  /** Серверный начальный count для SSR. Перерасчёт идёт клиентским
   *  debounced-fetch'ом при каждом изменении формы. */
  totalDocs?: number
  /** Если true — рендерим без внешней карточки (для bottom-sheet). */
  embedded?: boolean
  /** Колбэк после успешного apply (закрыть sheet). */
  onApplied?: () => void
}

// Мэппинг draft-ключа → поле и оператор в Payload REST API.
// Большая часть полей — equals; диапазоны и поиск по тексту особенные.
type WhereOp = 'equals' | 'like' | 'greater_than_equal' | 'less_than_equal'
type WhereMap = Record<string, { field: string; op: WhereOp }>

const FLATS_WHERE: WhereMap = {
  city: { field: 'location.city', op: 'like' },
  district: { field: 'location.district', op: 'like' },
  rooms: { field: 'rooms', op: 'equals' },
  transactionType: { field: 'transactionType', op: 'equals' },
  minPrice: { field: 'price', op: 'greater_than_equal' },
  maxPrice: { field: 'price', op: 'less_than_equal' },
  areaMin: { field: 'area.total', op: 'greater_than_equal' },
  areaMax: { field: 'area.total', op: 'less_than_equal' },
  floorMin: { field: 'floorInfo.floor', op: 'greater_than_equal' },
  floorMax: { field: 'floorInfo.floor', op: 'less_than_equal' },
  yearBuiltMin: { field: 'yearBuilt', op: 'greater_than_equal' },
  propertyCategory: { field: 'propertyCategory', op: 'equals' },
  buildingType: { field: 'buildingType', op: 'equals' },
  rentalSubtype: { field: 'rentalSubtype', op: 'equals' },
  fromOwner: { field: 'fromOwner', op: 'equals' },
  noCommission: { field: 'noCommission', op: 'equals' },
}

const COMMERCIAL_WHERE: WhereMap = {
  city: { field: 'location.city', op: 'like' },
  district: { field: 'location.district', op: 'like' },
  transactionType: { field: 'transactionType', op: 'equals' },
  commercialType: { field: 'commercialType', op: 'equals' },
  minPrice: { field: 'price', op: 'greater_than_equal' },
  maxPrice: { field: 'price', op: 'less_than_equal' },
  areaMin: { field: 'area.total', op: 'greater_than_equal' },
  areaMax: { field: 'area.total', op: 'less_than_equal' },
  fromOwner: { field: 'fromOwner', op: 'equals' },
  noCommission: { field: 'noCommission', op: 'equals' },
}

const LANDS_WHERE: WhereMap = {
  city: { field: 'location.city', op: 'like' },
  district: { field: 'location.district', op: 'like' },
  purpose: { field: 'purpose', op: 'equals' },
  minPrice: { field: 'price', op: 'greater_than_equal' },
  maxPrice: { field: 'price', op: 'less_than_equal' },
  // Lands: `area` — плоский Number, не группа.
  areaMin: { field: 'area', op: 'greater_than_equal' },
  areaMax: { field: 'area', op: 'less_than_equal' },
}

const RC_WHERE: WhereMap = {
  status: { field: 'status', op: 'equals' },
  type: { field: 'type', op: 'equals' },
}

const WHERE_BY_TYPE: Record<PropertyType, WhereMap> = {
  flats: FLATS_WHERE,
  commercial: COMMERCIAL_WHERE,
  lands: LANDS_WHERE,
  'residential-complexes': RC_WHERE,
}

const buildQueryString = (
  type: PropertyType,
  draft: Record<string, string>,
): string => {
  const map = WHERE_BY_TYPE[type]
  const params = new URLSearchParams()
  for (const [key, val] of Object.entries(draft)) {
    if (!val || val === 'all') continue
    const m = map[key]
    if (!m) continue
    params.append(`where[${m.field}][${m.op}]`, val)
  }
  // Подмешиваем status=active для коллекций кроме RC — как в server-side buildWhere.
  if (type !== 'residential-complexes') {
    params.append('where[status][equals]', 'active')
  }
  // limit=0 → только count, тело документов не нужно.
  params.set('limit', '0')
  params.set('depth', '0')
  return params.toString()
}

// Хук: debounced fetch количества результатов для текущего draft.
const usePreviewCount = (
  type: PropertyType,
  draft: Record<string, string>,
  initial: number | undefined,
) => {
  const [count, setCount] = React.useState<number | undefined>(initial)
  const [loading, setLoading] = React.useState(false)
  const reqIdRef = React.useRef(0)

  // Стабильный ключ для useEffect — иначе ref-объект каждый раз новый.
  const draftKey = React.useMemo(() => JSON.stringify(draft), [draft])

  React.useEffect(() => {
    const id = ++reqIdRef.current
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const qs = buildQueryString(type, draft)
        const res = await fetch(`/api/${type}?${qs}`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        // Игнорируем устаревший ответ.
        if (id !== reqIdRef.current) return
        if (typeof data?.totalDocs === 'number') setCount(data.totalDocs)
      } catch {
        // Сетевая ошибка — оставляем прошлый count, не паникуем UI.
      } finally {
        if (id === reqIdRef.current) setLoading(false)
      }
    }, 350)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey, type])

  return { count, loading }
}

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

export const PropertyFilters: React.FC<Props> = ({
  type,
  totalDocs,
  embedded = false,
  onApplied,
}) => {
  const schema = FILTER_SCHEMAS[type]
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const basicFields = schema.filter((f) => !f.advanced)
  const advancedFields = schema.filter((f) => f.advanced)
  const hasAdvanced = advancedFields.length > 0

  // Открываем «Дополнительно» автоматически, если в URL уже есть значения
  // из advanced-набора.
  const initiallyExpanded = React.useMemo(
    () =>
      advancedFields.some((f) => {
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

  // Live-предпросмотр количества: при изменении любого поля через
  // 350мс делаем запрос /api/<collection>?...&limit=0 — обновляем
  // счётчик в кнопке. Это даёт ощущение «фильтр работает прямо сейчас».
  const { count: liveCount, loading: countLoading } = usePreviewCount(
    type,
    draft,
    totalDocs,
  )

  // Активные фильтры (для пилюли-счётчика).
  const activeCount = React.useMemo(() => {
    let n = 0
    for (const f of schema) {
      const v = draft[f.key]
      if (!v) continue
      if (f.type === 'select' && v === 'all') continue
      n++
    }
    return n
  }, [draft, schema])

  const apply = () => {
    const params = new URLSearchParams()
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
    onApplied?.()
  }

  const reset = () => {
    const cleared: Record<string, string> = {}
    for (const f of schema) cleared[f.key] = f.type === 'select' ? 'all' : ''
    setDraft(cleared)
    const view = searchParams.get('view')
    router.push(view ? `${pathname}?view=${view}` : pathname)
  }

  // Кнопка submit: показываем live-count если знаем, иначе fallback.
  const submitLabel =
    liveCount !== undefined
      ? `Показать ${liveCount.toLocaleString('ru-RU')} ${pluralize(liveCount)}`
      : 'Применить'

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        apply()
      }}
      className={
        embedded
          ? 'space-y-4'
          : 'bg-card rounded-md shadow-e1 p-4 space-y-4'
      }
    >
      {/* --- Группа: Основные --- */}
      <section>
        <h3 className="text-label text-on-surface-variant uppercase mb-2">
          Основные
        </h3>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {basicFields.map((f) =>
            renderField(f, draft[f.key] ?? '', (v) =>
              setDraft({ ...draft, [f.key]: v }),
            ),
          )}
        </div>
      </section>

      {/* --- Группа: Дополнительно --- */}
      {hasAdvanced ? (
        <section className="pt-3 border-t border-border">
          <button
            type="button"
            onClick={() => setExpanded((x) => !x)}
            aria-expanded={expanded}
            className="w-full flex items-center justify-between text-label text-on-surface-variant uppercase hover:text-on-surface transition-colors"
          >
            <span>Дополнительно</span>
            <span className="inline-flex items-center gap-1 text-primary normal-case">
              {expanded ? (
                <>
                  Скрыть <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Развернуть <ChevronDown className="w-4 h-4" />
                </>
              )}
            </span>
          </button>

          {expanded ? (
            <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {advancedFields.map((f) =>
                renderField(f, draft[f.key] ?? '', (v) =>
                  setDraft({ ...draft, [f.key]: v }),
                ),
              )}
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={reset}
          disabled={activeCount === 0}
          className="inline-flex items-center gap-1.5 text-body-sm text-on-surface-variant hover:text-on-surface disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" />
          Сбросить
          {activeCount > 0 ? (
            <span className="ml-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-primary/10 text-primary text-label">
              {activeCount}
            </span>
          ) : null}
        </button>

        <Button type="submit" className="px-5 gap-1.5" disabled={liveCount === 0}>
          {countLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

const pluralize = (n: number) => {
  const last = n % 10
  const lastTwo = n % 100
  if (lastTwo >= 11 && lastTwo <= 14) return 'объектов'
  if (last === 1) return 'объект'
  if (last >= 2 && last <= 4) return 'объекта'
  return 'объектов'
}

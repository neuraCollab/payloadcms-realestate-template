'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { RecommendModal } from '@/components/RecommendModal'

const CATEGORIES = [
  { value: 'all', label: 'Любой тип' },
  { value: 'flats', label: 'Квартиры' },
  { value: 'residential-complexes', label: 'Дома' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'lands', label: 'Земля' },
] as const

// Popup-список частых городов под полем «Город» — быстрый выбор без
// печати на мобильном, где маленькая клавиатура и узкое поле.
const POPULAR_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Кимры',
] as const

/**
 * Hero Demo Realty — единая строка поиска.
 *
 * Главный input — большой NL/AI-запрос. Под ним компактная панель
 * фильтров (тип, город, аренда/покупка), которые работают и в AI-,
 * и в обычном режиме.
 *
 * Логика сабмита:
 *   • есть текст → /search?ai=1&q=…  + (опционально) фильтры
 *   • нет текста → /search?…       — обычный keyword + фильтры
 *
 * Один яркий синий CTA «Найти» — никаких дубликатов, никаких
 * отдельных AI- и обычной форм. Меньше шума, больше ясности.
 */
interface HeroProps {
  /** H1 из глобала home-seo. Дефолт — если global пуст. */
  h1?: string
  subtitle?: string
  /**
   * Город по IP пользователя (SSR-определение). Подставляется как
   * initial value поля «Город» в hero-фильтре, юзер может стереть.
   */
  defaultCity?: string
}

export const Hero: React.FC<HeroProps> = ({ h1, subtitle, defaultCity }) => {
  const router = useRouter()
  const [q, setQ] = React.useState('')
  const [category, setCategory] = React.useState<string>('all')
  const [city, setCity] = React.useState(defaultCity ?? '')
  const [tx, setTx] = React.useState<'rent' | 'sale' | 'any'>('any')
  const [focused, setFocused] = React.useState(false)
  const [cityOpen, setCityOpen] = React.useState(false)

  // Suggestions state.
  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [hlIdx, setHlIdx] = React.useState(-1) // подсвеченная позиция (для arrow keys)
  const fetchTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchSuggestions = React.useCallback((text: string) => {
    fetch(`/api/search/suggestions?q=${encodeURIComponent(text)}`)
      .then((r) => r.json())
      .then((d) => {
        setSuggestions(Array.isArray(d?.suggestions) ? d.suggestions : [])
        setHlIdx(-1)
      })
      .catch(() => setSuggestions([]))
  }, [])

  // Debounce: лимит — 1 запрос в 180мс.
  React.useEffect(() => {
    if (!showDropdown) return
    if (fetchTimer.current) clearTimeout(fetchTimer.current)
    fetchTimer.current = setTimeout(() => fetchSuggestions(q), 180)
    return () => {
      if (fetchTimer.current) clearTimeout(fetchTimer.current)
    }
  }, [q, showDropdown, fetchSuggestions])

  const pickSuggestion = (s: string) => {
    setQ(s)
    setShowDropdown(false)
    setHlIdx(-1)
  }

  // AI-помощник (модалка с recommend engine).
  const [aiOpen, setAiOpen] = React.useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    const p = new URLSearchParams()
    if (text) {
      p.set('ai', '1')
      p.set('q', text)
    }
    if (category !== 'all') p.set('category', category)
    if (city.trim()) p.set('city', city.trim())
    if (tx !== 'any') p.set('transactionType', tx)
    router.push(`/search?${p.toString()}`)
  }

  // ⌘/Ctrl + Enter — быстрая отправка из любого поля.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit(e as any)
  }

  // Клавиатура в инпуте подсказок: arrow up/down, enter, esc.
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHlIdx((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHlIdx((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Enter' && hlIdx >= 0) {
      e.preventDefault()
      pickSuggestion(suggestions[hlIdx]!)
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  return (
    <section className="relative px-4 pt-10 pb-12 md:pt-14 md:pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-surface-container-low to-background"
      />
      <div className="max-w-4xl mx-auto text-center space-y-5">
        <h1
          className="text-display text-on-surface md-reveal"
          style={{ animationDelay: '0ms' }}
        >
          {h1 || 'Недвижимость, которой доверяют'}
        </h1>
        <p
          className="text-body md:text-title text-on-surface-variant max-w-2xl mx-auto md-reveal"
          style={{ animationDelay: '80ms' }}
        >
          {subtitle || 'Прозрачные сделки, проверенные объявления, удобный кабинет.'}
        </p>

        <form
          onSubmit={submit}
          onKeyDown={onKeyDown}
          className="md-reveal mt-6 bg-card rounded-2xl shadow-e3 border border-border overflow-hidden text-left"
          style={{ animationDelay: '160ms' }}
        >
          {/* — Главная строка: ключевые слова (опциональны) — */}
          <div className="relative">
            <label
              htmlFor="hero-q"
              className={`flex items-center gap-3 p-3 md:p-4 transition-colors ${
                focused ? 'bg-surface-container-low/40' : ''
              }`}
            >
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-md bg-primary/10 text-primary flex-shrink-0">
                <Search className="w-4 h-4" />
              </span>
              <input
                id="hero-q"
                type="text"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => {
                  setFocused(true)
                  setShowDropdown(true)
                  // Сразу запросим топ-подсказки, не дожидаясь debounce —
                  // иначе пустой инпут открывается без саджестов.
                  fetchSuggestions(q)
                }}
                onBlur={() => {
                  setFocused(false)
                  // Задержка чтобы успел сработать клик по подсказке.
                  setTimeout(() => setShowDropdown(false), 150)
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Ключевые слова: новостройка, у парка, с балконом (необязательно)"
                aria-autocomplete="list"
                aria-controls="hero-suggestions"
                aria-expanded={showDropdown && suggestions.length > 0}
                role="combobox"
                className="flex-1 min-w-0 bg-transparent text-body md:text-title text-on-surface placeholder:text-on-surface-variant/70 focus-visible:outline-none py-1.5"
              />
            </label>

            {/* Dropdown с подсказками. Открывается на фокус, пропадает на blur. */}
            {showDropdown && suggestions.length > 0 ? (
              <ul
                id="hero-suggestions"
                role="listbox"
                className="absolute left-0 right-0 top-full mt-1 z-20 bg-card border border-border rounded-md shadow-e3 overflow-hidden max-h-72 overflow-y-auto"
              >
                {!q.trim() ? (
                  <li className="px-4 pt-2 pb-1 text-label text-on-surface-variant uppercase">
                    Часто ищут
                  </li>
                ) : null}
                {suggestions.map((s, i) => (
                  <li key={s + i} role="option" aria-selected={i === hlIdx}>
                    <button
                      type="button"
                      // Используем onMouseDown а не onClick — onBlur у input
                      // срабатывает быстрее чем onClick и закрывает dropdown.
                      onMouseDown={(e) => {
                        e.preventDefault()
                        pickSuggestion(s)
                      }}
                      onMouseEnter={() => setHlIdx(i)}
                      className={`w-full text-left px-4 py-2.5 text-body-sm flex items-center gap-2 ${
                        i === hlIdx ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <Search className="w-3.5 h-3.5 opacity-50 shrink-0" />
                      <span className="line-clamp-1">{s}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* — Полоса-разделитель — */}
          <div className="h-px bg-border" />

          {/* — Фильтры + CTA. На mobile стэком, на md+ всё в одну строку — */}
          <div className="p-2 md:p-2 flex flex-col md:flex-row md:items-center gap-2">
            {/* Тип + Город — пара в одной строке на mobile (md:contents
                распускает обёртку, и на md+ они становятся отдельными
                флекс-айтемами как раньше). */}
            <div className="flex gap-2 md:contents">
              {/* Тип */}
              <div className="relative flex-1 min-w-0">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Тип объекта"
                  className="appearance-none w-full h-10 pl-3 pr-8 rounded-md hover:bg-surface-container-low transition-colors bg-transparent text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-3 w-4 h-4 text-on-surface-variant" />
              </div>

              {/* Разделитель */}
              <div className="hidden md:block w-px h-6 bg-border" />

              {/* Город — текстовый ввод + popup частых городов */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onFocus={() => setCityOpen(true)}
                  onBlur={() => setTimeout(() => setCityOpen(false), 150)}
                  placeholder="Город"
                  aria-label="Город"
                  aria-autocomplete="list"
                  aria-controls="hero-city-suggestions"
                  aria-expanded={cityOpen}
                  role="combobox"
                  className="w-full h-10 px-3 rounded-md hover:bg-surface-container-low transition-colors bg-transparent text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                {cityOpen ? (
                  <ul
                    id="hero-city-suggestions"
                    role="listbox"
                    className="absolute left-0 right-0 top-full mt-1 z-20 bg-card border border-border rounded-md shadow-e3 overflow-hidden max-h-60 overflow-y-auto"
                  >
                    {POPULAR_CITIES.filter((c) =>
                      c.toLowerCase().includes(city.trim().toLowerCase()),
                    ).map((c) => (
                      <li key={c} role="option">
                        <button
                          type="button"
                          // onMouseDown а не onClick — иначе onBlur инпута
                          // закроет список раньше, чем сработает клик.
                          onMouseDown={(e) => {
                            e.preventDefault()
                            setCity(c)
                            setCityOpen(false)
                          }}
                          className="w-full text-left px-3 py-2 text-body-sm text-on-surface hover:bg-surface-container-low"
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            {/* Разделитель */}
            <div className="hidden md:block w-px h-6 bg-border" />

            {/* Тумблер Аренда/Покупка/Любая */}
            <div
              role="tablist"
              aria-label="Тип сделки"
              className="inline-flex h-10 p-0.5 rounded-md bg-surface-container border border-border self-stretch"
            >
              {(
                [
                  { v: 'any', label: 'Любая' },
                  { v: 'rent', label: 'Аренда' },
                  { v: 'sale', label: 'Покупка' },
                ] as const
              ).map(({ v, label }) => {
                const active = tx === v
                return (
                  <button
                    key={v}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTx(v)}
                    className={`px-3 rounded-[5px] text-body-sm font-medium transition-colors ${
                      active
                        ? 'bg-card text-primary shadow-e1'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* AI mode — открывает помощника с учётом предпочтений */}
            <button
              type="button"
              onClick={() => setAiOpen(true)}
              aria-label="AI-помощник"
              title="AI-помощник учитывает прошлые поиски и предпочтения"
              className="self-start md:self-auto inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-md border border-primary/30 text-primary text-body-sm font-medium hover:bg-primary/5 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              AI
            </button>

            {/* CTA — главный синий */}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Найти
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <RecommendModal open={aiOpen} onClose={() => setAiOpen(false)} />
      </div>
    </section>
  )
}

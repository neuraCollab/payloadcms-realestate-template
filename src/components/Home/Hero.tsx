'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, ChevronDown } from 'lucide-react'

const CATEGORIES = [
  { value: 'all', label: 'Любой тип' },
  { value: 'flats', label: 'Квартиры' },
  { value: 'residential-complexes', label: 'Дома' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'lands', label: 'Земля' },
] as const

/**
 * Hero MegaDomic — единая строка поиска.
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
}

export const Hero: React.FC<HeroProps> = ({ h1, subtitle }) => {
  const router = useRouter()
  const [q, setQ] = React.useState('')
  const [category, setCategory] = React.useState<string>('all')
  const [city, setCity] = React.useState('')
  const [tx, setTx] = React.useState<'rent' | 'sale' | 'any'>('any')
  const [focused, setFocused] = React.useState(false)

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
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Ключевые слова: новостройка, у парка, с балконом (необязательно)"
              className="flex-1 min-w-0 bg-transparent text-body md:text-title text-on-surface placeholder:text-on-surface-variant/70 focus-visible:outline-none py-1.5"
            />
          </label>

          {/* — Полоса-разделитель — */}
          <div className="h-px bg-border" />

          {/* — Фильтры + CTA. На mobile стэком, на md+ всё в одну строку — */}
          <div className="p-2 md:p-2 flex flex-col md:flex-row md:items-center gap-2">
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

            {/* Город */}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Город"
              aria-label="Город"
              className="flex-1 min-w-0 h-10 px-3 rounded-md hover:bg-surface-container-low transition-colors bg-transparent text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

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
      </div>
    </section>
  )
}

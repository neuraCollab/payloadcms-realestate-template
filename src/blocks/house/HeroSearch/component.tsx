'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, ChevronDown } from 'lucide-react'

export type HeroSearchBlockType = {
  blockType: 'hero-search'
  badge?: string
  headline: string
  subheadline?: string
  image?: { url?: string } | string | null
}

const CATEGORIES = [
  { value: 'all', label: 'Все типы' },
  { value: 'flats', label: 'Квартиры' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'lands', label: 'Земля' },
  { value: 'residential-complexes', label: 'Жилые комплексы' },
] as const

const TRANSACTION = [
  { value: 'all', label: 'Любая' },
  { value: 'sale', label: 'Продажа' },
  { value: 'rent', label: 'Аренда' },
] as const

export const HeroSearch: React.FC<HeroSearchBlockType> = ({
  badge,
  headline,
  subheadline,
  image,
}) => {
  const router = useRouter()
  const [category, setCategory] = React.useState<string>('all')
  const [transactionType, setTransactionType] = React.useState<string>('all')
  const [city, setCity] = React.useState('')
  const [q, setQ] = React.useState('')

  const imageUrl =
    typeof image === 'object' && image && 'url' in image && image.url
      ? image.url
      : typeof image === 'string'
      ? image
      : null

  const submit = () => {
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (category !== 'all') params.set('category', category)
    if (transactionType !== 'all') params.set('transactionType', transactionType)
    if (city.trim()) params.set('city', city.trim())
    const qs = params.toString()
    router.push(`/search${qs ? `?${qs}` : ''}`)
  }

  return (
    <section className="relative px-4 py-16 md:py-24">
      {imageUrl ? (
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-surface-container to-background" />
      )}

      <div className="max-w-5xl mx-auto text-center space-y-6">
        {badge ? (
          <span className="inline-block px-4 py-1.5 bg-card/90 text-primary rounded-full text-label font-medium backdrop-blur">
            {badge}
          </span>
        ) : null}
        <h1
          className={`text-display ${imageUrl ? 'text-white' : 'text-on-surface'} leading-tight`}
        >
          {headline}
        </h1>
        {subheadline ? (
          <p
            className={`text-body md:text-title ${
              imageUrl ? 'text-white/90' : 'text-on-surface-variant'
            } max-w-2xl mx-auto`}
          >
            {subheadline}
          </p>
        ) : null}

        {/* Search panel */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="mt-8 bg-card rounded-2xl shadow-e3 p-3 md:p-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 md:gap-3 max-w-4xl mx-auto"
        >
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Тип объекта"
              className="appearance-none w-full h-11 pl-3 pr-8 rounded-md border border-border bg-background text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-3.5 w-4 h-4 text-on-surface-variant" />
          </div>

          <div className="relative">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              aria-label="Сделка"
              className="appearance-none w-full h-11 pl-3 pr-8 rounded-md border border-border bg-background text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {TRANSACTION.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-3.5 w-4 h-4 text-on-surface-variant" />
          </div>

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Город"
            aria-label="Город"
            className="h-11 px-3 rounded-md border border-border bg-background text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />

          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Название, адрес, район…"
            aria-label="Поиск"
            className="h-11 px-3 rounded-md border border-border bg-background text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-md bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <SearchIcon className="w-4 h-4" />
            Найти
          </button>
        </form>

        <p className={`text-label ${imageUrl ? 'text-white/70' : 'text-on-surface-variant'}`}>
          Поиск по всей базе — квартиры, коммерция, земля и новостройки в одном окне.
        </p>
      </div>
    </section>
  )
}

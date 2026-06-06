'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react'

const CATEGORIES = [
  { value: 'all', label: 'Выберите недвижимость' },
  { value: 'flats', label: 'Квартиры' },
  { value: 'residential-complexes', label: 'Дома' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'lands', label: 'Земля' },
] as const

// Hero «как у конкурентов»: одна строка-пилюля — тип, город, тумблер,
// кнопка «Найти». Кнопка ВСЕГДА в той же линии что и поля начиная
// с md (768px). На телефоне поля стэком, кнопка тоже в линию с
// тумблером, чтобы доверие+удобство: ничего не съезжает.
export const Hero: React.FC = () => {
  const router = useRouter()
  const [category, setCategory] = React.useState<string>('all')
  const [city, setCity] = React.useState('')
  const [tx, setTx] = React.useState<'rent' | 'sale'>('sale')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (category !== 'all') p.set('category', category)
    if (city.trim()) p.set('city', city.trim())
    p.set('transactionType', tx)
    router.push(`/search?${p.toString()}`)
  }

  return (
    <section className="relative px-4 pt-10 pb-10 md:pt-14 md:pb-14">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-surface-container-low to-background"
      />
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <h1
          className="text-display text-on-surface md-reveal"
          style={{ animationDelay: '0ms' }}
        >
          Недвижимость, которой&nbsp;доверяют
        </h1>
        <p
          className="text-body md:text-title text-on-surface-variant max-w-2xl mx-auto md-reveal"
          style={{ animationDelay: '80ms' }}
        >
          Прозрачные сделки, проверенные объявления, удобный кабинет.
        </p>

        <form
          onSubmit={submit}
          className="mt-6 bg-card rounded-2xl shadow-e3 p-2 md:p-2.5 md-reveal"
          style={{ animationDelay: '160ms' }}
        >
          {/* Одна строка с md+:
              [select Тип] [input Город] [tabs Аренда/Покупка] [CTA Найти]
              Тип и Город растягиваются по 1fr, тумблер и кнопка — auto.
              На <md — переносим в столбик. */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-2 items-stretch">
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Тип объекта"
                className="appearance-none w-full h-11 pl-3 pr-9 rounded-md border border-border bg-background text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
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

            <div
              role="tablist"
              aria-label="Тип сделки"
              className="inline-flex h-11 p-0.5 rounded-md bg-surface-container border border-border self-stretch"
            >
              {(
                [
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
                    className={`px-3 rounded-[6px] text-body-sm font-medium transition-colors ${
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

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-md bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Найти
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

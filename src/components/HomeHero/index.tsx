'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { SearchBar } from '@/components/SearchBar'
import { FilterChips } from '@/components/FilterChips'

const SECTION_OPTIONS = [
  { value: 'flats', label: 'Квартиры' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'lands', label: 'Участки' },
  { value: 'residential-complexes', label: 'ЖК' },
]

export const HomeHero: React.FC = () => {
  const router = useRouter()
  const [section, setSection] = React.useState('flats')
  const [query, setQuery] = React.useState('')

  const submit = () => {
    const qs = query ? `?city=${encodeURIComponent(query)}` : ''
    router.push(`/${section}${qs}`)
  }

  return (
    <section className="space-y-4">
      <h1 className="text-display text-on-surface">Найдите свою недвижимость</h1>
      <SearchBar
        placeholder="Город, район, ЖК…"
        value={query}
        onChange={setQuery}
        onSubmit={submit}
      />
      <FilterChips
        ariaLabel="Раздел"
        options={SECTION_OPTIONS}
        value={section}
        onChange={setSection}
      />
    </section>
  )
}

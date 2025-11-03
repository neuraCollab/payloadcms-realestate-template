// components/FlatFilters.tsx
'use client'

import { useRouter } from 'next/navigation'

export function FlatFilters({ searchParams }: { searchParams: any }) {
  const router = useRouter()

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    router.push(`/flats?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Комнаты */}
        <select 
          value={searchParams.rooms || ''}
          onChange={(e) => updateFilters('rooms', e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Все комнаты</option>
          <option value="studio">Студия</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5plus">5+</option>
        </select>

        {/* Тип сделки */}
        <select 
          value={searchParams.transactionType || ''}
          onChange={(e) => updateFilters('transactionType', e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Все типы</option>
          <option value="sale">Продажа</option>
          <option value="rent">Аренда</option>
        </select>

        {/* Цена от */}
        <input
          type="number"
          placeholder="Цена от"
          value={searchParams.minPrice || ''}
          onChange={(e) => updateFilters('minPrice', e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        {/* Цена до */}
        <input
          type="number"
          placeholder="Цена до"
          value={searchParams.maxPrice || ''}
          onChange={(e) => updateFilters('maxPrice', e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>
    </div>
  )
}
// app/components/UnifiedFilter.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const typeToPath: Record<string, string> = {
  flats: '/flats',
  'residential-complexes': '/residential-complexes',
  commercials: '/commercials',
  lands: '/lands',
}

const typeLabels: Record<string, string> = {
  flats: 'Квартиры',
  'residential-complexes': 'Жилые комплексы',
  commercials: 'Коммерческая',
  lands: 'Земля',
}

export function UnifiedFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedType, setSelectedType] = useState<string>('flats')
  const [city, setCity] = useState<string>('')
  const [district, setDistrict] = useState<string>('')

  // Синхронизация с URL при монтировании (опционально)
  useEffect(() => {
    const initialType = searchParams.get('type') || 'flats'
    const initialCity = searchParams.get('city') || ''
    const initialDistrict = searchParams.get('district') || ''

    setSelectedType(initialType)
    setCity(initialCity)
    setDistrict(initialDistrict)
  }, [])

  const handleSearch = () => {
    const targetPath = typeToPath[selectedType]
    if (!targetPath) return

    const url = new URL(targetPath, window.location.origin)

    // Передаём только те параметры, которые поддерживаются целевой страницей
    if (city) url.searchParams.set('city', city)
    if (district) url.searchParams.set('district', district)

    // Дополнительно: можно передать transactionType, если выбран flats/commercials
    // Но пока ограничимся location

    router.push(url.toString())
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Поиск недвижимости</h2>

      <div className="space-y-4">
        {/* Тип недвижимости */}
        <div>
          <label className="block text-sm opacity-70 mb-1">Тип</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="select select-bordered w-full"
          >
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Город */}
        <div>
          <label className="block text-sm opacity-70 mb-1">Город</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Например, Москва"
            className="input input-bordered w-full"
          />
        </div>

        {/* Район */}
        <div>
          <label className="block text-sm opacity-70 mb-1">Район</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Например, Центральный"
            className="input input-bordered w-full"
          />
        </div>

        {/* Кнопка */}
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Найти
        </button>
      </div>
    </div>
  )
}
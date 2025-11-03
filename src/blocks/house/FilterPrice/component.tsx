'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

// Example filter config for a tab
// You can add new filter configs in this format
export type FilterFieldConfig = {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'checkbox'
  options?: { label: string; value: string }[]
  placeholder?: string
}

export type TabConfig = {
  id: string
  label: string
  collection: string
  filterFields: FilterFieldConfig[]
}

// Example config array (add your own tabs/fields as needed)
export const tabsConfig: TabConfig[] = [
  {
    id: 'apartments',
    label: 'Квартиры',
    collection: 'flats',
    filterFields: [
      {
        name: 'type',
        label: 'Тип',
        type: 'select',
        options: [
          { label: 'Квартира', value: 'flat' },
          { label: 'Апартаменты', value: 'apartment' },
          { label: 'Таунхаус', value: 'townhouse' },
        ],
      },
      {
        name: 'category',
        label: 'Категория',
        type: 'select',
        options: [
          { label: 'Купить', value: 'buy' },
          { label: 'Снять', value: 'rent' },
        ],
      },
      {
        name: 'rooms',
        label: 'Комнат',
        type: 'select',
        options: [
          { label: 'Студия', value: 'studio' },
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4+', value: '4+' },
        ],
      },
      { name: 'priceFrom', label: 'Цена от', type: 'number', placeholder: 'Цена от' },
      { name: 'priceTo', label: 'до', type: 'number', placeholder: 'до' },
      { name: 'areaFrom', label: 'Площадь от', type: 'number', placeholder: 'Площадь от' },
      { name: 'areaTo', label: 'до', type: 'number', placeholder: 'до' },
      { name: 'city', label: 'Город', type: 'text', placeholder: 'Город' },
      { name: 'district', label: 'Район', type: 'text', placeholder: 'Район' },
      { name: 'address', label: 'Адрес', type: 'text', placeholder: 'Адрес' },
    ],
  },
  // Добавьте другие табы по аналогии
]

function FilterForm({
  fields,
  onFilter,
}: {
  fields: FilterFieldConfig[]
  onFilter: (query: string) => void
}) {
  const { register, watch, handleSubmit } = useForm()
  const watched = watch()

  React.useEffect(() => {
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(watched)) {
      if (value !== '' && value !== undefined) {
        query.append(key, String(value))
      }
    }
    onFilter(query.toString())
  }, [watched])

  return (
    <form onSubmit={handleSubmit(() => {})} className="flex flex-wrap gap-4">
      {fields.map((field) => {
        if (field.type === 'select') {
          return (
            <select
              key={field.name}
              {...register(field.name)}
              className="px-3 py-2 border rounded min-w-[150px]"
            >
              <option value="">{field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )
        }
        if (field.type === 'checkbox') {
          return (
            <label key={field.name} className="flex items-center gap-2">
              <input type="checkbox" {...register(field.name)} /> {field.label}
            </label>
          )
        }
        return (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder || field.label}
            {...register(field.name)}
            className="px-3 py-2 border rounded min-w-[150px]"
          />
        )
      })}
    </form>
  )
}

function UnifiedCard({ data, tab }: { data: any; tab: TabConfig }) {
  // Универсальная карточка, можно расширять под нужды
  return (
    <Link href={`/${tab.collection}/${data.id}`} className="block">
      <div className="rounded-xl overflow-hidden shadow-md border bg-white max-w-[320px] hover:shadow-lg cursor-pointer transition p-4">
        <div className="font-bold text-lg mb-2">
          {data.title || data.name || data.address || 'Объект'}
        </div>
        <div className="text-sm text-gray-600">ID: {data.id}</div>
        {/* Можно добавить больше полей по желанию */}
      </div>
    </Link>
  )
}

export const RealEstateFilterBlock = () => {
  const [activeTab, setActiveTab] = useState(tabsConfig[0])
  const [results, setResults] = useState<any[]>([])

  const handleFilter = async (query: string) => {
    const res = await fetch(`/api/${activeTab.collection}?${query}`, { cache: 'no-store' })
    const data = await res.json()
    setResults(data.docs || [])
  }

  return (
    <div className="p-4 border rounded-xl shadow space-y-4 max-w-full">
      <div className="tabs">
        dsad
        {tabsConfig.map((tab) => (
          <button
            key={tab.id}
            className={`tab tab-bordered ${activeTab.id === tab.id ? 'tab-active' : ''}`}
            onClick={() => {
              setActiveTab(tab)
              setResults([])
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <FilterForm fields={activeTab.filterFields} onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {results.map((item) => (
          <UnifiedCard key={item.id} data={item} tab={activeTab} />
        ))}
      </div>
    </div>
  )
}

'use client'
import React, { useState, useMemo } from 'react'
import { MapPin, Bed, Bath, Maximize, Search } from 'lucide-react'
import { Media, Property } from '@/payload-types'

type PropertyBlockType = {
  blockType: 'properties'
  title: string
  showAllLink?: string
  properties: Property[]
  layout: 'grid' | 'list'
  itemsPerPage: number
  enableFilters: boolean
  filters?: {
    priceRange: boolean
    propertyType: boolean
    bedrooms: boolean
    bathrooms: boolean
    area: boolean
  }
}

type Filters = {
  type: string
  priceRange: string
  bedrooms: string
  bathrooms: string
  area: string
  search: string
}

export const PropertiesBlock: React.FC<PropertyBlockType> = ({
  title,
  showAllLink,
  properties = [],
  layout = 'grid',
  itemsPerPage = 6,
  enableFilters,
  filters,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilters, setActiveFilters] = useState<Filters>({
    type: 'all',
    priceRange: 'all',
    bedrooms: 'all',
    bathrooms: 'all',
    area: 'all',
    search: '',
  })

  // Вычисляем уникальные значения для фильтров
  const filterOptions = useMemo(() => {
    return {
      bedrooms: [...new Set(properties.map((p) => p.bedrooms))].sort((a, b) => a - b),
      bathrooms: [...new Set(properties.map((p) => p.bathrooms))].sort((a, b) => a - b),
      area: [
        { label: 'Все', value: 'all' },
        { label: '< 100 м²', value: '0-100' },
        { label: '100-200 м²', value: '100-200' },
        { label: '200-300 м²', value: '200-300' },
        { label: '> 300 м²', value: '300+' },
      ],
      price: [
        { label: 'Все', value: 'all' },
        { label: '< 20 млн ₽', value: '0-20000000' },
        { label: '20-50 млн ₽', value: '20000000-50000000' },
        { label: '50-100 млн ₽', value: '50000000-100000000' },
        { label: '> 100 млн ₽', value: '100000000+' },
      ],
    }
  }, [properties])

  // Фильтрация свойств
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (!property?.title) return false

      // Поиск по названию
      if (
        activeFilters.search &&
        !property.title.toLowerCase().includes(activeFilters.search.toLowerCase())
      ) {
        return false
      }

      // Тип недвижимости
      if (activeFilters.type !== 'all' && property.type !== activeFilters.type) {
        return false
      }

      // Количество спален
      if (
        activeFilters.bedrooms !== 'all' &&
        property.bedrooms !== parseInt(activeFilters.bedrooms)
      ) {
        return false
      }

      // Количество ванных
      if (
        activeFilters.bathrooms !== 'all' &&
        property.bathrooms !== parseInt(activeFilters.bathrooms)
      ) {
        return false
      }

      // Площадь
      if (activeFilters.area !== 'all') {
        const parts = activeFilters.area.split('-')
        const minStr = parts[0]
        const maxStr = parts[1]

        if (minStr) {
          const min = parseInt(minStr)
          if (!isNaN(min)) {
            if (maxStr) {
              const max = parseInt(maxStr)
              if (!isNaN(max)) {
                if (property.area < min || property.area > max) return false
              }
            } else {
              if (property.area < min) return false
            }
          }
        }
      }

      // Ценовой диапазон
      if (activeFilters.priceRange !== 'all') {
        const parts = activeFilters.priceRange.split('-')
        const minStr = parts[0]
        const maxStr = parts[1]

        if (minStr) {
          const min = parseInt(minStr)
          if (!isNaN(min)) {
            if (maxStr) {
              const max = parseInt(maxStr)
              if (!isNaN(max)) {
                if (property.price < min || property.price > max) return false
              }
            } else {
              if (property.price < min) return false
            }
          }
        }
      }

      return true
    })
  }, [properties, activeFilters])

  // Пагинация
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedProperties = filteredProperties.slice(startIndex, endIndex)

  // Сброс фильтров
  const resetFilters = () => {
    setActiveFilters({
      type: 'all',
      priceRange: 'all',
      bedrooms: 'all',
      bathrooms: 'all',
      area: 'all',
      search: '',
    })
    setCurrentPage(1)
  }

  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div 
          className="flex justify-between items-center mb-8 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          {showAllLink && (
            <a href={showAllLink} className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium">
              Все объекты
            </a>
          )}
        </div>

        {enableFilters && (
          <div 
            className="mb-8 space-y-4 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            {/* Поиск */}
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск недвижимости..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200"
                value={activeFilters.search}
                onChange={(e) => setActiveFilters({ ...activeFilters, search: e.target.value })}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Фильтры */}
            <div className="flex flex-wrap gap-4">
              {/* Тип недвижимости */}
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                value={activeFilters.type}
                onChange={(e) => setActiveFilters({ ...activeFilters, type: e.target.value })}
              >
                <option value="all">Все типы</option>
                <option value="sale">Продажа</option>
                <option value="rent">Аренда</option>
              </select>

              {/* Спальни */}
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                value={activeFilters.bedrooms}
                onChange={(e) => setActiveFilters({ ...activeFilters, bedrooms: e.target.value })}
              >
                <option value="all">Все спальни</option>
                {filterOptions.bedrooms.map((num) => (
                  <option key={num} value={num}>
                    {num} спален
                  </option>
                ))}
              </select>

              {/* Ванные */}
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                value={activeFilters.bathrooms}
                onChange={(e) => setActiveFilters({ ...activeFilters, bathrooms: e.target.value })}
              >
                <option value="all">Все ванные</option>
                {filterOptions.bathrooms.map((num) => (
                  <option key={num} value={num}>
                    {num} ванных
                  </option>
                ))}
              </select>

              {/* Площадь */}
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                value={activeFilters.area}
                onChange={(e) => setActiveFilters({ ...activeFilters, area: e.target.value })}
              >
                {filterOptions.area.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Цена */}
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                value={activeFilters.priceRange}
                onChange={(e) => setActiveFilters({ ...activeFilters, priceRange: e.target.value })}
              >
                {filterOptions.price.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Кнопка сброса */}
              <button onClick={resetFilters} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
                Сбросить фильтры
              </button>
            </div>

            {/* Результаты поиска */}
            <div className="text-sm text-gray-600">
              Найдено {filteredProperties.length} объектов
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProperties.map((property, index) => (
            <div 
              key={property.id} 
              className="opacity-0 animate-fadeInUp"
              style={{ 
                animationDelay: `${0.5 + index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {filteredProperties.length > itemsPerPage && (
          <div 
            className="flex justify-center mt-8 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
          >
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(filteredProperties.length / itemsPerPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === index + 1 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {filteredProperties.length === 0 && (
          <div 
            className="text-center py-12 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Объекты не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить фильтры</p>
          </div>
        )}
      </div>
    </section>
  )
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <a href={`/properties/${property.slug}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-4px] overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={
              typeof property.images[0]?.image == 'object'
                ? property.images[0]?.image?.url?.toString()
                : '/placeholder.jpg'
            }
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                property.type === 'sale' ? 'bg-green-500' : 'bg-blue-500'
              }`}
            >
              {property.type === 'sale' ? 'Продажа' : 'Аренда'}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {property.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} спален</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} ванных</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{property.area} м²</span>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="text-xl font-bold text-primary">{formatPrice(property.price)}</span>
          </div>
        </div>
      </div>
    </a>
  )
}

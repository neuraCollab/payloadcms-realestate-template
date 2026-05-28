'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { MapPin, Bed, Bath, Maximize, Search } from 'lucide-react'

// Типы
export type UnifiedProperty = {
  id: string
  slug: string
  title: string
  price: number
  area: number
  bedrooms: number | null
  bathrooms: number | null
  address?: string
  city?: string
  district?: string
  type: 'sale' | 'rent'
  images: {
    image: {
      url?: string
    } | string
  }[]
  location?: {
    city?: string
    district?: string
    address?: string
  }
  collection: 'flats' | 'lands' | 'commercial' | 'residential-complexes'
}

type PropertyBlockType = {
  blockType: 'properties'
  title: string
  showAllLink?: string
  properties: UnifiedProperty[]
  layout?: 'grid' | 'list'
  itemsPerPage?: number
  enableFilters?: boolean
  filters?: {
    priceRange?: boolean
    propertyType?: boolean
    bedrooms?: boolean
    bathrooms?: boolean
    area?: boolean
  }
}

// Справочники
const typeLabels: Record<string, string> = {
  flats: 'Квартиры',
  'residential-complexes': 'Жилые комплексы',
  commercial: 'Коммерческая',
  lands: 'Земля',
}

export const PropertiesBlock: React.FC<PropertyBlockType> = ({
  title,
  showAllLink,
  properties: propertiesProp = [],
  itemsPerPage = 6,
  enableFilters = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [fetched, setFetched] = useState<any[] | null>(null)

  // Если seed не передал properties — авто-подгрузка из API (последние 12 квартир)
  useEffect(() => {
    if (propertiesProp.length > 0) {
      setFetched(null)
      return
    }
    let cancelled = false
    fetch(`/api/flats?limit=12&depth=1&sort=-createdAt&where[status][equals]=active`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.docs) return
        const wrapped = data.docs.map((doc: any) => ({
          relationTo: 'flats',
          value: doc,
        }))
        setFetched(wrapped)
      })
      .catch(() => {
        /* silent fail — пустое состояние ниже подскажет, что нет данных */
      })
    return () => {
      cancelled = true
    }
  }, [propertiesProp.length])

  const properties = propertiesProp.length > 0 ? propertiesProp : fetched ?? []

  // Фильтры
  const [selectedType, setSelectedType] = useState<string>('all')
  const [city, setCity] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedType('all')
    setCity('')
    setDistrict('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Фильтрация недвижимости
const filteredProperties = useMemo(() => {
  return properties.filter((property) => {
    if (selectedType !== 'all' && property.relationTo !== selectedType) {
      return false
    }

    const cityVal = property.value.location?.city || ''
    if (city && !cityVal.toLowerCase().includes(city.toLowerCase())) {
      return false
    }

    const districtVal = property.value.location?.district || ''
    if (district && !districtVal.toLowerCase().includes(district.toLowerCase())) {
      return false
    }

    const searchLower = searchQuery.toLowerCase()
      if (
        searchLower &&
        !(
          property.value.title.toLowerCase().includes(searchLower) ||
          (property.value.location?.address && property.value.location.address.toLowerCase().includes(searchLower)) ||
          cityVal.toLowerCase().includes(searchLower) ||
          districtVal.toLowerCase().includes(searchLower)
        )
      ) {
        return false
      }

    return true
  })
}, [properties, selectedType, city, district, searchQuery])

  // Пагинация
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage)

  // Уникальные значения для ползунков (опционально)
  const hasBedrooms = properties.some(p => p.bedrooms != null && p.bedrooms > 0)
  const hasBathrooms = properties.some(p => p.bathrooms != null && p.bathrooms > 0)

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-headline md:text-display text-on-surface">{title}</h2>
          {showAllLink && (
            <a
              href={showAllLink}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-200 font-medium"
            >
              Все объекты
            </a>
          )}
        </div>

        {/* Встроенный фильтр (аналог UnifiedFilter, но для локальной фильтрации) */}
        {/* Красивый горизонтальный фильтр */}
        {enableFilters && (
          <div className="mb-8 p-4 bg-card rounded-full shadow-e1 max-w-5xl mx-auto flex items-center gap-4">
            {/* Тип */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={e => {
                  setSelectedType(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none bg-transparent border-none outline-none pr-8 text-sm font-medium cursor-pointer"
              >
                <option value="all">Тип</option>
                {Object.entries(typeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Город */}
            <div className="relative flex-1">
              <input
                type="text"
                value={city}
                onChange={e => {
                  setCity(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Город"
                className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-500"
              />
            </div>

            {/* Район */}
            <div className="relative flex-1">
              <input
                type="text"
                value={district}
                onChange={e => {
                  setDistrict(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Район"
                className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-500"
              />
            </div>

            {/* Поиск */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Поиск недвижимости..."
                className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-500"
              />
            </div>

            {/* Кнопка поиска */}
            <button
              onClick={() => {}}
              className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Кнопка сброса */}
            <button
              onClick={resetFilters}
              className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Результат */}
        <div className="text-sm text-on-surface-variant mb-4">
          Найдено: {filteredProperties.length} объектов
        </div>

        {displayedProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-on-surface-variant">Объекты не найдены. Попробуйте изменить фильтры.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {displayedProperties.map((property) => (
    <div key={property.value.id} className="opacity-0 animate-fadeInUp">
      <PropertyCard property={property} />
    </div>
  ))}
</div>

            {/* Пагинация */}
            {filteredProperties.length > itemsPerPage && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  {Array.from({
                    length: Math.ceil(filteredProperties.length / itemsPerPage),
                  }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

// Карточка
const PropertyCard: React.FC<{ property: any }> = ({ property: rawProperty }) => {
  // Если приходит ссылка — распаковываем
  const property = rawProperty.relationTo
    ? { ...rawProperty.value, collection: rawProperty.relationTo }
    : rawProperty;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);

  // Извлекаем площадь
  const areaValue = typeof property.area === 'object' && property.area !== null
    ? property.area.total || 0
    : (property.area as number) || 0;

  // Безопасное извлечение изображения
  const firstImage = property.images?.[0]?.image;
  let imageUrl = '/placeholder.jpg';
  if (firstImage) {
    if (typeof firstImage === 'object' && firstImage.url) {
      imageUrl = firstImage.url;
    } else if (typeof firstImage === 'string') {
      imageUrl = firstImage;
    }
  }

  const baseUrlMap: Record<string, string> = {
    flats: '/flats',
    'residential-complexes': '/residential-complexes',
    commercial: '/commercial',
    lands: '/lands',
  };

  const baseUrl = baseUrlMap[property.collection] || '/properties';

  return (
    <a href={`${baseUrl}/${property.slug}`} className="block group">
      <div className="bg-card border border-border rounded-md shadow-e1 hover:shadow-e2 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title || 'Недвижимость'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 text-xs font-medium text-primary-foreground rounded-full ${
                property.transactionType === 'sale' ? 'bg-green-600' : 'bg-primary'
              }`}
            >
              {property.transactionType === 'sale' ? 'Продажа' : 'Аренда'}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">
              {property.location?.district && `${property.location.district}, `}
              {property.location?.city || 'Город не указан'}
            </span>
          </div>
          <h3 className="text-base font-semibold text-on-surface mb-2 line-clamp-2 group-hover:text-primary">
            {property.title}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-on-surface-variant mb-3">
            {property.bedrooms != null && property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms != null && property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" />
              <span>{areaValue} м²</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-bold text-primary">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};
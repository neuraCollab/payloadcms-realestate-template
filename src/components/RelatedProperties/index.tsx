import React from 'react'
import { MapPin, Bed, Bath, Maximize } from 'lucide-react'
import { Property, Media } from '@/payload-types'

interface RelatedPropertiesProps {
  currentProperty: Property
  properties: Property[]
}

export const RelatedProperties: React.FC<RelatedPropertiesProps> = ({ 
  currentProperty, 
  properties 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Фильтрация похожих properties (исключаем текущую)
  const relatedProperties = properties
    .filter(property => property.id !== currentProperty.id)
    .filter(property => 
      property.type === currentProperty.type || 
      property.bedrooms === currentProperty.bedrooms ||
      Math.abs(property.price - currentProperty.price) < currentProperty.price * 0.3
    )
    .slice(0, 3)

  if (relatedProperties.length === 0) {
    return null
  }

  return (
    <section className="px-4 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div 
          className="text-center mb-12 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Похожие объекты
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Откройте для себя другие объекты, которые могут вас заинтересовать
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProperties.map((property, index) => (
            <div 
              key={property.id}
              className="opacity-0 animate-fadeInUp"
              style={{ 
                animationDelay: `${0.3 + index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div 
          className="text-center mt-8 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <a 
            href="/properties" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
          >
            Все объекты
          </a>
        </div>
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

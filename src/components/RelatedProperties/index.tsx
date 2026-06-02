import React from 'react'
import Link from 'next/link'
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
    <section className="px-4 py-16 bg-surface-container-low">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-headline text-on-surface mb-2">Похожие объекты</h2>
          <p className="text-body text-on-surface-variant max-w-2xl mx-auto">
            Откройте для себя другие объекты, которые могут вас заинтересовать
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/properties"
            className="inline-flex items-center h-10 px-6 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-body-sm font-medium"
          >
            Все объекты
          </Link>
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
      <div className="bg-card rounded-md shadow-e1 hover:shadow-e2 transition-all duration-300 transform hover:translate-y-[-4px] overflow-hidden">
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
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-label uppercase tracking-wide bg-card/95 text-primary backdrop-blur-sm">
              {property.type === 'sale' ? 'Продажа' : 'Аренда'}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          <h3 className="text-title text-on-surface mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {property.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-on-surface-variant mb-4">
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

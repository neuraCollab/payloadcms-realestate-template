'use client'

import React from 'react'
import { MapPin } from 'lucide-react'
import { Property } from '@/payload-types'

export type PropertyHeroBlockType = {
  blockType: 'property-hero'
  property: Property
}

export const PropertyHeroBlock: React.FC<PropertyHeroBlockType> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getImageUrl = (property: Property) => {
    if (!property.images?.[0]?.image || typeof property.images[0].image !== 'object') {
      return '/placeholder.jpg'
    }
    return property.images[0].image.url || '/placeholder.jpg'
  }

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Основное изображение */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(property)}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Информация о объекте */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{property.address}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
                {property.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
                <span className="text-3xl md:text-4xl font-bold">{formatPrice(property.price)}</span>
                <span
                  className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                    property.type === 'sale' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.7s_forwards]">
              <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Contact Agent
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 transform hover:scale-105 backdrop-blur-sm">
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

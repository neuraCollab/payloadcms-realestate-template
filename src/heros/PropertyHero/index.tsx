import React from 'react'
import { MapPin, Bed, Bath, Maximize, Calendar } from 'lucide-react'
import { formatDateTime } from 'src/utilities/formatDateTime'

import type { Property } from '@/payload-types'

import { Media } from '@/components/Media'

export const PropertyHero: React.FC<{
  property: Property
}> = ({ property }) => {
  const { title, address, price, type, bedrooms, bathrooms, area, images, status, createdAt } = property

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const heroImage = images && images.length > 0 ? images[0]?.image : null

  return (
    <div className="relative min-h-[100vh] flex items-end overflow-hidden">
      {/* Фоновое изображение */}
      {heroImage && typeof heroImage !== 'string' && (
        <div className="absolute inset-0 w-full h-full">
          <Media fill priority imgClassName="object-cover w-full h-full" resource={heroImage} />
        </div>
      )}
      
      {/* Градиент для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      
      {/* Контент */}
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8 pt-32">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                type === 'sale' ? 'bg-green-500' : 'bg-blue-500'
              }`}
            >
              {type === 'sale' ? 'Продажа' : 'Аренда'}
            </span>
            {status && (
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-500 text-white">
                {status === 'active' ? 'Активно' : status === 'sold' ? 'Продано' : status === 'draft' ? 'Черновик' : status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            )}
          </div>

          <div className="">
            <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">{title}</h1>
            <div className="flex items-center gap-2 text-lg mb-6">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span className="drop-shadow">{address}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Bed className="w-5 h-5" />
                <span className="text-lg">{bedrooms} спален</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Bath className="w-5 h-5" />
                <span className="text-lg">{bathrooms} ванных</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Maximize className="w-5 h-5" />
                <span className="text-lg">{area} м²</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            <div className="flex flex-col gap-1 bg-black/30 px-4 py-3 rounded-lg backdrop-blur-sm">
              <p className="text-sm opacity-80">Цена</p>
              <p className="text-2xl md:text-3xl font-bold">{formatPrice(price)}</p>
            </div>
            {createdAt && (
              <div className="flex flex-col gap-1 bg-black/30 px-4 py-3 rounded-lg backdrop-blur-sm">
                <p className="text-sm opacity-80">Размещено</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={createdAt}>{formatDateTime(createdAt)}</time>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 

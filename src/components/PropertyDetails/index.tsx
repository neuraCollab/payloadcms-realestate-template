import React from 'react'
import { Check, MapPin, Calendar, Home, Bed, Bath, Maximize } from 'lucide-react'
import { Property } from '@/payload-types'
import RichText from '@/components/RichText'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface PropertyDetailsProps {
  property: Property
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const { description, features, bedrooms, bathrooms, area, status, createdAt, updatedAt, address } = property

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const propertyStats = [
    { icon: Bed, label: 'Спальни', value: bedrooms },
    { icon: Bath, label: 'Ванные', value: bathrooms },
    { icon: Maximize, label: 'Площадь', value: `${area} м²` },
    { icon: Home, label: 'Статус', value: status === 'active' ? 'Активно' : status === 'sold' ? 'Продано' : status === 'draft' ? 'Черновик' : 'Активно' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          {description && (
            <div 
              className="opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              <h2 className="text-title-lg text-on-surface mb-4">О недвижимости</h2>
              <div className="prose prose-lg max-w-none">
                <RichText className='text-black' data={description} enableGutter={false} />
              </div>
            </div>
          )}

          {/* Features */}
          {features && features.length > 0 && (
            <div 
              className="opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <h3 className="text-title-lg text-on-surface mb-4">Особенности и удобства</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={feature.id || index} 
                    className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg hover:bg-surface-container transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-on-surface">{feature.feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Stats Grid */}
          <div 
            className="opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            <h3 className="text-title-lg text-on-surface mb-4">Характеристики объекта</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {propertyStats.map((stat, index) => (
                <div key={stat.label} className="bg-card rounded-md shadow-e1 p-4 text-center hover:shadow-md transition-shadow duration-200">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-title-lg text-on-surface mb-1">{stat.value}</div>
                  <div className="text-sm text-on-surface-variant">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div 
            className="sticky top-8 space-y-6 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            {/* Price Card */}
            <div className="bg-card rounded-md shadow-e1 p-6">
              <div className="text-headline text-primary mb-4">
                {formatPrice(property.price)}
              </div>
              <div className="space-y-3 text-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Размещено {formatDateTime(createdAt)}</span>
                </div>
                {updatedAt !== createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Обновлено {formatDateTime(updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-md shadow-e1 p-6">
              <h3 className="text-title-lg text-on-surface mb-4">Связаться с агентом</h3>
              <form className="space-y-3">
                <Input type="text" placeholder="Ваше имя" />
                <Input type="email" placeholder="Ваш email" />
                <Input type="tel" placeholder="Ваш телефон" />
                <Textarea
                  placeholder="Сообщение"
                  rows={4}
                  defaultValue={`Меня интересует ${property.title}`}
                />
                <Button type="submit" className="w-full">Отправить сообщение</Button>
              </form>
            </div>

            {/* Quick Stats */}
            <div className="bg-surface-container-low rounded-lg p-6">
              <h3 className="text-lg font-bold text-on-surface mb-4">Краткая информация</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Тип недвижимости</span>
                  <span className="font-medium">{property.type === 'sale' ? 'Продажа' : 'Аренда'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Спальни</span>
                  <span className="font-medium">{bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Ванные</span>
                  <span className="font-medium">{bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Площадь</span>
                  <span className="font-medium">{area} м²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Цена за м²</span>
                  <span className="font-medium">{Math.round(property.price / area).toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 

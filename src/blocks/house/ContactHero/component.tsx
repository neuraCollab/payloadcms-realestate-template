'use client'

import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export type ContactHeroBlockType = {
  blockType: 'contact-hero'
  label: string
  title: string
  image: {
    url: string
  }
  email: string
  phone: string
  location: string
}

export const ContactHeroBlock: React.FC<ContactHeroBlockType> = ({
  label,
  title,
  image,
  email,
  phone,
  location,
}) => {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 space-y-4">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {label}
          </span>
          <h2 className="text-headline md:text-display text-on-surface leading-tight">
            {title.split('assistance').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i === 0 && <span className="text-primary">assistance</span>}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* Основной контент */}
        <div className="relative rounded-2xl overflow-hidden shadow-e2 hover:shadow-e3 transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
          {/* Изображение */}
          <div className="aspect-[16/9] md:aspect-[21/9] group">
            <img
              src={image?.url || '/placeholder.jpg'}
              alt="Contact"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Контактная информация */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center text-primary-foreground">
              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 hover:text-primary transition-all duration-200 transform hover:scale-105 p-2 rounded-md hover:bg-card/10 backdrop-blur-sm"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{email}</span>
              </a>

              {/* Телефон */}
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 hover:text-primary transition-all duration-200 transform hover:scale-105 p-2 rounded-md hover:bg-card/10 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{phone}</span>
              </a>

              {/* Локация */}
              <div className="flex items-center gap-3 p-2 rounded-md">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

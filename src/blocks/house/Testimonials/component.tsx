'use client'

import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

export type TestimonialsBlockType = {
  blockType: 'testimonials'
  label: string
  title: string
  testimonials: {
    id: string
    name: string
    location: string
    text: string
    rating: number
    image: {
      url: string
    }
  }[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlockType> = ({
  label,
  title,
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
          <div className="text-sm text-primary mb-2 font-medium">{label}</div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{title}</h2>
        </div>

        {/* Слайдер отзывов */}
        <div className="relative opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
          {/* Кнопки навигации */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Карточка отзыва */}
          <div className="bg-gradient-to-br from-primary to-primary/90 text-white rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Фото */}
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                  <img
                    src={testimonials[currentIndex]?.image?.url || '/placeholder.jpg'}
                    alt={testimonials[currentIndex]?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Контент */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex gap-1 justify-center md:justify-start mb-4">
                  {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl mb-6 leading-relaxed italic">
                  "{testimonials[currentIndex]?.text}"
                </blockquote>
                <div>
                  <div className="font-semibold text-lg">{testimonials[currentIndex]?.name}</div>
                  <div className="text-white/80 text-sm">
                    {testimonials[currentIndex]?.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

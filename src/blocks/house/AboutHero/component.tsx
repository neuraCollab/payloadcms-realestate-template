'use client'

import React from 'react'
import { Media } from '@/payload-types'

export type AboutHeroBlockType = {
  blockType: 'about-hero'
  label: string
  title: string
  images: {
    image: Media | string
  }[]
}

export const AboutHeroBlock: React.FC<AboutHeroBlockType> = ({ label, title, images }) => {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 space-y-4">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {label}
          </span>
          <h1 className="text-headline md:text-display max-w-4xl mx-auto text-on-surface leading-tight">
            {title.split('Real Estate').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i === 0 && <span className="text-primary">Real Estate</span>}
              </React.Fragment>
            ))}
          </h1>
        </div>

        {/* Сетка изображений */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Левое изображение */}
          <div className="lg:col-span-5 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-e1 hover:shadow-e2 transition-all duration-300 group">
              <img
                src={
                  typeof images[0]?.image === 'object' && images[0]?.image?.url
                    ? images[0].image.url
                    : '/placeholder.jpg'
                }
                alt="About us"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Правая колонка с двумя изображениями */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-e1 hover:shadow-e2 transition-all duration-300 group opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
              <img
                src={
                  typeof images[1]?.image === 'object' && images[1]?.image?.url
                    ? images[1].image.url
                    : '/placeholder.jpg'
                }
                alt="About us"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-e1 hover:shadow-e2 transition-all duration-300 group opacity-0 animate-[fadeInUp_0.6s_ease-out_0.7s_forwards]">
              <img
                src={
                  typeof images[2]?.image === 'object' && images[2]?.image?.url
                    ? images[2].image.url
                    : '/placeholder.jpg'
                }
                alt="About us"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

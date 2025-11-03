'use client'

import React from 'react'

export type CallToActionNewBlockType = {
  blockType: 'call-to-action-new'
  label: string
  title: string
  buttonText: string
  buttonLink: string
}

export const CallToActionNewBlock: React.FC<CallToActionNewBlockType> = ({
  label,
  title,
  buttonText,
  buttonLink,
}) => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-8 md:p-12 text-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
          {/* Метка */}
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
            {label}
          </div>

          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto mb-8 leading-tight opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
            {title}
          </h2>

          {/* Кнопка */}
          <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_0.7s_forwards]">
            <a
              href={buttonLink}
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

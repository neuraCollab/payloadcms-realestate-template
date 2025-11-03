'use client'
import React from 'react'
import { Search, Calendar, Handshake, Home, Key, Check, LucideIcon } from 'lucide-react'

type Step = {
  icon: string
  title: string
  description: string
}

export type HowItWorksBlockType = {
  blockType: 'how-it-works'
  label: string
  title: string
  steps: Step[]
}

// Захардкоженный список иконок
const ICONS = {
  '1': Search,
  '2': Calendar,
  '3': Handshake,
  '4': Home,
  '5': Key,
  '6': Check,
} as const

export const HowItWorksBlock: React.FC<HowItWorksBlockType> = ({ label, title, steps }) => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 space-y-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {label}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto text-gray-900 leading-tight">
            {title.split('advantages').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i === 0 && <span className="text-primary">advantages</span>}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* Шаги */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon as keyof typeof ICONS] || Search

            return (
              <div 
                key={index} 
                className="relative group opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >

                

                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:translate-y-[-4px]">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

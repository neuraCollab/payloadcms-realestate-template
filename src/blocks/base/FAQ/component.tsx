'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
}

export type FAQBlockType = {
  blockType: 'faq'
  label: string
  title: string
  items: FAQItem[]
}

export const FAQBlock: React.FC<FAQBlockType> = ({ label, title, items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
          {label && <div className="text-sm text-primary mb-2 font-medium">{label}</div>}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {title.split('Answered').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i === 0 && <span className="text-primary">Answered</span>}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* FAQ аккордеон */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => toggleItem(index)}
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

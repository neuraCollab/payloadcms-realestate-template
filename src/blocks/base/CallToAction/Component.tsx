import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
            <div 
              className="flex-1 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              {richText && (
                <div className="text-gray-900 max-w-2xl">
                  <RichText className="mb-0" data={richText} enableGutter={false} />
                </div>
              )}
            </div>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              {(links || []).map(({ link }, i) => {
                return (
                  <CMSLink 
                    key={i} 
                    size="lg" 
                    {...link} 
                    className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md text-center"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

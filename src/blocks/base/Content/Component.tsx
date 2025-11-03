import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-6 lg:gap-x-16">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn(
                    `col-span-4 lg:col-span-${colsSpanClasses[size!]} opacity-0 animate-fadeInUp`,
                    {
                      'md:col-span-2': size !== 'full',
                    }
                  )}
                  style={{ animationDelay: `${0.1 + index * 0.2}s`, animationFillMode: 'forwards' }}
                  key={index}
                >
                  <div className="text-gray-900">
                    {richText && <RichText data={richText} enableGutter={false} />}
                  </div>

                  {enableLink && (
                    <div className="mt-4">
                      <CMSLink 
                        {...link} 
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                      />
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

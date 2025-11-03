import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div 
      className={cn('mx-auto my-8 w-full opacity-0 animate-fadeInUp', className)}
      style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
    >
      <div
        className={cn('border rounded-lg py-4 px-6 flex items-center shadow-sm transition-all duration-200 hover:shadow-md', {
          'border-gray-200 bg-gray-50 text-gray-800': style === 'info',
          'border-red-200 bg-red-50 text-red-800': style === 'error',
          'border-green-200 bg-green-50 text-green-800': style === 'success',
          'border-yellow-200 bg-yellow-50 text-yellow-800': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}

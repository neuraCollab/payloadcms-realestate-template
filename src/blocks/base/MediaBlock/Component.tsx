import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        'px-4 py-8',
        {
          'max-w-7xl mx-auto': enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <div 
          className="opacity-0 animate-fadeInUp"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <Media
            imgClassName={cn(
              'rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] w-full h-auto object-cover',
              imgClassName
            )}
            resource={media}
            src={staticImage}
          />
        </div>
      )}
      {caption && (
        <div
          className={cn(
            'mt-6 opacity-0 animate-fadeInUp',
            {
              'max-w-4xl mx-auto': !disableInnerContainer,
            },
            captionClassName,
          )}
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          <div className="text-gray-600 text-center">
            <RichText data={caption} enableGutter={false} />
          </div>
        </div>
      )}
    </div>
  )
}

import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div 
                className={`opacity-0 animate-[fadeInUp_0.6s_ease-out_${0.1 + index * 0.1}s_forwards]`} 
                key={index}
              >
                <Card 
                  className="h-full hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]" 
                  doc={result} 
                  relationTo="posts" 
                  showCategories 
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

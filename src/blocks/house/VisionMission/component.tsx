'use client'

import React from 'react'

type Stat = {
  value: string
  label: string
}

export type VisionMissionBlockType = {
  blockType: 'vision-mission'
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
  stats: Stat[]
}

export const VisionMissionBlock: React.FC<VisionMissionBlockType> = ({
  title,
  description,
  buttonText,
  buttonLink,
  stats,
}) => {
  return (
    <section className="py-12 md:py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Верхняя часть - текст */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 className="text-headline mb-6">{title}</h2>
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
            {buttonText && buttonLink && (
              <a href={buttonLink} className="inline-flex items-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 mt-6">
                {buttonText}
              </a>
            )}
          </div>
        </div>

        {/* Нижняя часть - статистика */}
        <div className="bg-muted/40 rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center relative min-w-0">
                {/* Разделительная точка */}
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-2 h-2 rounded-full bg-primary/20 translate-x-full" />
                )}
                <div className="text-headline text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-body-sm break-words">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

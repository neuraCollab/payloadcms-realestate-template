import React from 'react'

type Item = {
  icon: string // можно будет заменить на иконку из phosphor-icons или media
  title: string
  description: string
}

export type VisionBlockType = {
  blockType: 'vision'
  title: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  items: Item[]
}

export const VisionBlock: React.FC<VisionBlockType> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  items,
}) => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Левая часть */}
        <div className="space-y-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          {subtitle && (
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <div className="w-2 h-2 rounded-full bg-primary" />
              {subtitle}
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-on-surface">
            {title}
          </h2>

          {buttonText && buttonLink && (
            <a 
              href={buttonLink} 
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-e1 hover:shadow-e1"
            >
              {buttonText}
            </a>
          )}
        </div>

                {/* Правая часть – список */}
        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-md hover:bg-surface-container-low hover:shadow-e1 transition-all duration-300 transform hover:translate-x-2 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold shadow-e1 hover:shadow-e1 transition-all duration-200">
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-on-surface">{item.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{item.description}</p>
                                  </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}

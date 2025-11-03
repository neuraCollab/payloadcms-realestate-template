import { Media } from '@/payload-types'

type Props = {
  badgeText?: string
  headline: string
  highlight?: string
  subheadline?: string
  image: Media
}

export const HeroBlock = ({
  badgeText,
  headline,
  highlight,
  subheadline,
  image,
}: Props) => {
  const [before, after] = highlight ? headline.split(highlight) : [headline, null]

  return (
    <section className="px-4 py-16 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Бейдж */}
        {badgeText && (
          <span 
            className="inline-block px-4 py-1 text-sm rounded-full border-2 bg-[rgb(246 246 246)] text-primary font-medium opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            {badgeText}
          </span>
        )}

        {/* Заголовок */}
        <h1 
          className="text-4xl md:text-5xl leading-tight font-bold text-gray-900 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          {before}
          {highlight && <span className="text-primary"> {highlight}</span>}
          {after}
        </h1>

        {/* Подзаголовок */}
        {subheadline && (
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            {subheadline}
          </p>
        )}
      </div>

      {/* Картинка */}
      {image?.url && (
        <div 
          className="mt-8 max-w-4xl mx-auto opacity-0 animate-fadeInUp"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <img 
            src={image.url} 
            alt={image.alt || 'Hero image'} 
            className="w-full h-auto object-cover rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg" 
          />
        </div>
      )}
    </section>
  )
}

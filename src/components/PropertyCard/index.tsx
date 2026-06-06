import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { FavoriteButton } from '@/components/FavoriteButton'
import type { FavCollection } from '@/lib/favorites'

export interface PropertyCardProps {
  href: string
  title: string
  address?: string
  imageUrl?: string | null
  badge?: string
  price?: number
  priceSuffix?: string
  meta?: Array<{ label: string }>
  className?: string
  /** Used by overlay FavoriteButton. If not passed, no fav button is shown. */
  favCollection?: FavCollection
  favId?: string | number
  /** 'compact' — для витрин/гридов где нужна плотная подача. */
  size?: 'default' | 'compact'
}

const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

export const PropertyCard: React.FC<PropertyCardProps> = ({
  href,
  title,
  address,
  imageUrl,
  badge,
  price,
  priceSuffix,
  meta,
  className,
  favCollection,
  favId,
  size = 'default',
}) => {
  const compact = size === 'compact'
  return (
    <Link
      href={href}
      className={cn(
        'group block bg-card rounded-md overflow-hidden shadow-e1 hover:shadow-e2 transition-shadow',
        className,
      )}
    >
      <div className="relative aspect-[16/10] bg-surface-container">
        {/* При отсутствии настоящего фото подставляем единый
            placeholder.jpg — карточка не выглядит пустой. */}
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={title}
          fill
          sizes={
            compact
              ? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
          className="object-cover"
        />
        {badge ? (
          <span
            className={cn(
              'absolute bg-card/95 text-primary rounded-full uppercase tracking-wide',
              compact
                ? 'top-2 left-2 text-[10px] px-2 py-0.5'
                : 'top-3 left-3 text-label px-2.5 py-1',
            )}
          >
            {badge}
          </span>
        ) : null}
        {favCollection && favId !== undefined ? (
          <div className={compact ? 'absolute top-2 right-2 z-10' : 'absolute top-3 right-3 z-10'}>
            <FavoriteButton collection={favCollection} id={favId} />
          </div>
        ) : null}
      </div>
      <div className={compact ? 'p-2.5' : 'p-4'}>
        <h3
          className={cn(
            'text-on-surface line-clamp-1',
            compact ? 'text-body-sm font-medium' : 'text-title',
          )}
        >
          {title}
        </h3>
        {address ? (
          <p
            className={cn(
              'text-on-surface-variant line-clamp-1',
              compact ? 'text-[11px] mt-0.5' : 'text-body-sm mt-0.5',
            )}
          >
            {address}
          </p>
        ) : null}
        {typeof price === 'number' ? (
          <p
            className={cn(
              'text-primary',
              compact ? 'text-body font-semibold mt-1' : 'text-title-lg mt-2',
            )}
          >
            {formatPrice(price)}
            {priceSuffix ? (
              <span
                className={cn(
                  'text-on-surface-variant font-normal',
                  compact ? 'text-[10px]' : 'text-body-sm',
                )}
              >
                {' '}
                {priceSuffix}
              </span>
            ) : null}
          </p>
        ) : null}
        {meta && meta.length > 0 ? (
          <ul
            className={cn(
              'flex flex-wrap text-on-surface-variant',
              compact ? 'mt-1 gap-2 text-[11px]' : 'mt-2 gap-3 text-body-sm',
            )}
          >
            {meta.map((m, i) => (
              <li key={i}>{m.label}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  )
}

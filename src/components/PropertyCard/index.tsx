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
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'group block bg-card rounded-md overflow-hidden shadow-e1 hover:shadow-e2 transition-shadow',
        className,
      )}
    >
      <div className="relative aspect-[16/10] bg-surface-container">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : null}
        {badge ? (
          <span className="absolute top-3 left-3 bg-card/95 text-primary text-label px-2.5 py-1 rounded-full uppercase tracking-wide">
            {badge}
          </span>
        ) : null}
        {favCollection && favId !== undefined ? (
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton collection={favCollection} id={favId} />
          </div>
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="text-title text-on-surface line-clamp-1">{title}</h3>
        {address ? (
          <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">{address}</p>
        ) : null}
        {typeof price === 'number' ? (
          <p className="text-title-lg text-primary mt-2">
            {formatPrice(price)}
            {priceSuffix ? (
              <span className="text-body-sm text-on-surface-variant font-normal"> {priceSuffix}</span>
            ) : null}
          </p>
        ) : null}
        {meta && meta.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-3 text-body-sm text-on-surface-variant">
            {meta.map((m, i) => (
              <li key={i}>{m.label}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  )
}

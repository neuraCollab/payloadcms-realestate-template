'use client'
import React, { useOptimistic, startTransition } from 'react'
import { Heart } from 'lucide-react'
import { isFavorite, toggleFavorite, type FavCollection } from '@/lib/favorites'
import { cn } from '@/utilities/ui'

interface Props {
  collection: FavCollection
  id: string | number
  /** 'icon' = small floating button overlay. 'full' = button with label. */
  variant?: 'icon' | 'full'
  className?: string
}

export const FavoriteButton: React.FC<Props> = ({
  collection,
  id,
  variant = 'icon',
  className,
}) => {
  const [mounted, setMounted] = React.useState(false)
  const [fav, setFav] = React.useState(false)
  const [optimisticFav, addOptimisticFav] = useOptimistic(
    fav,
    (state: boolean, newFav: boolean) => newFav
  )

  React.useEffect(() => {
    setMounted(true)
    setFav(isFavorite({ collection, id }))
    const refresh = () => setFav(isFavorite({ collection, id }))
    window.addEventListener('realty:favorites-changed', refresh)
    return () => window.removeEventListener('realty:favorites-changed', refresh)
  }, [collection, id])

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    startTransition(() => {
      addOptimisticFav(!fav)
    })
    const next = toggleFavorite({ collection, id })
    setFav(next)
  }

  if (!mounted) {
    // SSR placeholder to keep layout stable; hides flicker before hydration.
    return variant === 'icon' ? (
      <span aria-hidden className={cn('inline-block w-9 h-9', className)} />
    ) : null
  }

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={optimisticFav}
        className={cn(
          'inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-border text-body-sm font-medium transition-colors',
          optimisticFav
            ? 'bg-rose-50 text-rose-700 border-rose-200'
            : 'bg-card text-on-surface hover:bg-surface-container',
          className,
        )}
      >
        <Heart className={cn('w-4 h-4', optimisticFav && 'fill-rose-500 text-rose-500')} />
        {optimisticFav ? 'В избранном' : 'В избранное'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={optimisticFav}
      aria-label={optimisticFav ? 'Убрать из избранного' : 'В избранное'}
      className={cn(
        'inline-flex items-center justify-center w-9 h-9 rounded-full backdrop-blur bg-card/90 shadow-e1 hover:shadow-e2 transition-shadow',
        className,
      )}
    >
      <Heart
        className={cn(
          'w-4 h-4 transition-colors',
          optimisticFav ? 'fill-rose-500 text-rose-500' : 'text-on-surface-variant',
        )}
      />
    </button>
  )
}

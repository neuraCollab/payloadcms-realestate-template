'use client'
import React from 'react'
import { trackView } from '@/lib/recentlyViewed'
import type { PropertyType } from '@/components/PropertyFilters/schemas'

interface Props {
  collection: PropertyType
  id: string | number
}

/**
 * Side-effect-only client component. Mounted from PropertyDetailPage to
 * record the view in localStorage. Renders nothing.
 */
export const TrackView: React.FC<Props> = ({ collection, id }) => {
  React.useEffect(() => {
    trackView({ collection, id })
  }, [collection, id])
  return null
}

'use client'
import React, { useMemo } from 'react'
import type { Page } from '@/payload-types'
import { PropertyMap, type PropertyMapItem } from '@/components/PropertyMap'

type MapBlockProps = Extract<Page['layout'][0], { blockType: 'map' }>

export const MapBlock: React.FC<MapBlockProps & { disableInnerContainer?: boolean }> = (
  props,
) => {
  const { title, center, officeMarker } = props

  const computedCenter = useMemo(() => {
    if (center?.lat && center?.lng)
      return {
        lat: center.lat as number,
        lng: center.lng as number,
        zoom: Number(center.zoom || 12),
      }
    return undefined
  }, [center])

  const mapItems: PropertyMapItem[] = useMemo(() => {
    if (officeMarker?.label && computedCenter) {
      return [
        {
          id: 'office',
          title: officeMarker.label,
          address: officeMarker.address ?? undefined,
          slug: '',
          lat: computedCenter.lat,
          lng: computedCenter.lng,
        },
      ]
    }
    return []
  }, [officeMarker, computedCenter])

  return (
    <PropertyMap
      title={title || undefined}
      items={mapItems}
      center={computedCenter}
      className="container mx-auto"
    />
  )
}

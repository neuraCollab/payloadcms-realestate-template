import React from 'react'
import { MapPin, Calendar, Sparkles, TrendingDown, Star } from 'lucide-react'
import { PropertyMap } from '@/components/PropertyMap'
import { formatMapItems } from '@/lib/mapItems'

interface Props {
  data: any
  type: 'flats' | 'commercial' | 'lands' | 'residential-complexes'
}

const formatDate = (iso?: string) => {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return null
  }
}

const isFresh = (iso?: string) => {
  if (!iso) return false
  const t = Date.parse(iso)
  if (!Number.isFinite(t)) return false
  return Date.now() - t < 7 * 24 * 60 * 60 * 1000
}

interface Tag {
  label: string
  icon: React.ReactNode
  className: string
}

const collectTags = (data: any): Tag[] => {
  const tags: Tag[] = []
  if (data.isFeatured) {
    tags.push({
      label: 'Топовая недвижимость',
      icon: <Star className="w-3.5 h-3.5" />,
      className: 'bg-amber-100 text-amber-900',
    })
  }
  if (isFresh(data.createdAt)) {
    tags.push({
      label: 'Новое',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      className: 'bg-emerald-100 text-emerald-900',
    })
  }
  if (data.priceDropped) {
    tags.push({
      label: 'Снижение цены',
      icon: <TrendingDown className="w-3.5 h-3.5" />,
      className: 'bg-rose-100 text-rose-900',
    })
  }
  return tags
}

export const PropertyMetaBar: React.FC<Props> = ({ data, type }) => {
  const tags = collectTags(data)
  const publishedAt = formatDate(data.publishedAt) || formatDate(data.createdAt)
  const hasCoords =
    typeof data.coordinates?.lat === 'number' && typeof data.coordinates?.lng === 'number'

  return (
    <section className="bg-card rounded-md shadow-e1 p-4 space-y-3">
      {/* Tags row */}
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label font-medium ${t.className}`}
            >
              {t.icon}
              {t.label}
            </span>
          ))}
        </div>
      ) : null}

      {/* Address + publish date row */}
      <div className="flex flex-wrap items-start justify-between gap-2 text-body-sm">
        {data.location?.address ? (
          <div className="flex items-start gap-1.5 text-on-surface">
            <MapPin className="w-4 h-4 mt-0.5 text-on-surface-variant shrink-0" />
            <span>
              {data.location.city ? `${data.location.city}, ` : ''}
              {data.location.district ? `${data.location.district}, ` : ''}
              {data.location.address}
            </span>
          </div>
        ) : (
          <span />
        )}
        {publishedAt ? (
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <Calendar className="w-3.5 h-3.5" />
            Опубликовано: {publishedAt}
          </div>
        ) : null}
      </div>

      {/* Mini-map */}
      {hasCoords ? (
        <PropertyMap
          items={formatMapItems([data])}
          baseUrl={`/${type}`}
          height="220px"
          className="!px-0"
          center={{
            lat: data.coordinates.lat,
            lng: data.coordinates.lng,
            zoom: 15,
          }}
        />
      ) : null}
    </section>
  )
}

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { formatMapItems } from '@/lib/mapItems'
import type { PropertyType } from '@/components/PropertyFilters/schemas'

interface Props {
  type: PropertyType
  title: string
  searchParams: Record<string, string | undefined>
  mapBaseUrl: string
}

const COLLECTION_MAP: Record<PropertyType, string> = {
  flats: 'flats',
  commercial: 'commercial',
  lands: 'lands',
  'residential-complexes': 'residential-complexes',
}

const buildWhere = (type: PropertyType, sp: Record<string, string | undefined>) => {
  const where: any = {}
  if (type !== 'residential-complexes') {
    where.status = { equals: 'active' }
  }
  if (sp.city) where['location.city'] = { equals: sp.city }
  if (sp.district) where['location.district'] = { equals: sp.district }
  if (sp.rooms && sp.rooms !== 'all') where.rooms = { equals: sp.rooms }
  if (sp.transactionType && sp.transactionType !== 'all')
    where.transactionType = { equals: sp.transactionType }
  if (sp.minPrice) where.price = { ...(where.price || {}), greater_than_equal: parseInt(sp.minPrice, 10) }
  if (sp.maxPrice) where.price = { ...(where.price || {}), less_than_equal: parseInt(sp.maxPrice, 10) }
  if (sp.commercialType && sp.commercialType !== 'all') where.commercialType = { equals: sp.commercialType }
  if (sp.landType && sp.landType !== 'all') where.landType = { equals: sp.landType }
  if (sp.hasUtilities && sp.hasUtilities !== 'all') where.hasUtilities = { equals: sp.hasUtilities === 'yes' }
  if (type === 'residential-complexes') {
    if (sp.status && sp.status !== 'all') where.status = { equals: sp.status }
    if (sp.type && sp.type !== 'all') where.type = { equals: sp.type }
  }
  return where
}

const pickBadge = (doc: any, type: PropertyType): string | undefined => {
  if (type === 'residential-complexes') return undefined
  if (doc.transactionType === 'sale') return 'Продажа'
  if (doc.transactionType === 'rent') return 'Аренда'
  return undefined
}

const pickMeta = (doc: any, type: PropertyType) => {
  if (type === 'flats') {
    return [
      doc.rooms === 'studio' ? { label: 'Студия' } : doc.rooms ? { label: `${doc.rooms} комн.` } : null,
      doc.floorInfo?.floor ? { label: `${doc.floorInfo.floor}/${doc.floorInfo.totalFloors} эт.` } : null,
      doc.area?.total ? { label: `${doc.area.total} м²` } : null,
    ].filter(Boolean) as Array<{ label: string }>
  }
  if (type === 'lands') {
    return [doc.area?.total ? { label: `${doc.area.total} сот.` } : null].filter(Boolean) as Array<{ label: string }>
  }
  if (type === 'commercial') {
    return [
      doc.commercialType ? { label: String(doc.commercialType) } : null,
      doc.area?.total ? { label: `${doc.area.total} м²` } : null,
    ].filter(Boolean) as Array<{ label: string }>
  }
  return []
}

export const PropertyListingPage: React.FC<Props> = async ({ type, title, searchParams, mapBaseUrl }) => {
  const payload = await getPayload({ config })
  const where = buildWhere(type, searchParams)
  const result = await payload.find({
    collection: COLLECTION_MAP[type] as any,
    where,
    sort: '-createdAt',
    limit: 20,
    depth: 2,
  })

  const mapItems = formatMapItems(result.docs)

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-2">
        <h1 className="text-headline text-on-surface">{title}</h1>
        <p className="text-body-sm text-on-surface-variant">{result.totalDocs} объектов</p>
      </header>

      <PropertyFilters type={type} />

      {result.docs.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {result.docs.map((doc: any) => {
            const href = `/${type}/${doc.slug}`
            const imageUrl = doc.images?.[0]?.image?.url ?? null
            return (
              <PropertyCard
                key={doc.id}
                href={href}
                title={doc.title}
                address={doc.location?.address}
                imageUrl={imageUrl}
                badge={pickBadge(doc, type)}
                price={doc.price}
                priceSuffix={doc.transactionType === 'rent' ? '/ мес' : undefined}
                meta={pickMeta(doc, type)}
              />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-md shadow-e1">
          <p className="text-body text-on-surface-variant">Объекты не найдены</p>
        </div>
      )}

      {mapItems.length > 0 ? (
        <div className="bg-card rounded-md shadow-e1 p-4">
          <h2 className="text-title-lg text-on-surface mb-3">{title} на карте</h2>
          <PropertyMap title={`${title} на карте`} items={mapItems} baseUrl={mapBaseUrl} />
        </div>
      ) : null}
    </div>
  )
}

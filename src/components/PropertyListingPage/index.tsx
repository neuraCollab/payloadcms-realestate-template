import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { ViewToggle } from '@/components/ViewToggle'
import { ListingsPagination } from '@/components/ListingsPagination'
import { SortSelect, type SortOption } from '@/components/SortSelect'
import { formatMapItems } from '@/lib/mapItems'
import type { PropertyType } from '@/components/PropertyFilters/schemas'

const PAGE_SIZE = 20

const SORT_OPTIONS: SortOption[] = [
  { value: '-createdAt', label: 'Сначала новые' },
  { value: 'price', label: 'Сначала дешевле' },
  { value: '-price', label: 'Сначала дороже' },
  { value: '-area.total', label: 'Большая площадь' },
  { value: 'area.total', label: 'Малая площадь' },
]

const ALLOWED_SORTS = new Set(SORT_OPTIONS.map((o) => o.value))

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

const parseNum = (v: string | undefined): number | undefined => {
  if (!v) return undefined
  const n = parseInt(v, 10)
  return Number.isFinite(n) ? n : undefined
}

const buildWhere = (type: PropertyType, sp: Record<string, string | undefined>) => {
  const where: any = {}
  if (type !== 'residential-complexes') {
    where.status = { equals: 'active' }
  }

  // ---- Общие поля (where applicable per collection) ----
  if (sp.city) where['location.city'] = { like: sp.city }
  if (sp.district) where['location.district'] = { like: sp.district }
  if (sp.rooms && sp.rooms !== 'all') where.rooms = { equals: sp.rooms }
  if (sp.transactionType && sp.transactionType !== 'all')
    where.transactionType = { equals: sp.transactionType }

  const minPrice = parseNum(sp.minPrice)
  const maxPrice = parseNum(sp.maxPrice)
  if (minPrice !== undefined) where.price = { ...(where.price || {}), greater_than_equal: minPrice }
  if (maxPrice !== undefined) where.price = { ...(where.price || {}), less_than_equal: maxPrice }

  // ---- Per-type фильтры ----
  if (type === 'flats') {
    if (sp.propertyCategory && sp.propertyCategory !== 'all')
      where.propertyCategory = { equals: sp.propertyCategory }
    if (sp.buildingType && sp.buildingType !== 'all')
      where.buildingType = { equals: sp.buildingType }

    const areaMin = parseNum(sp.areaMin)
    const areaMax = parseNum(sp.areaMax)
    if (areaMin !== undefined)
      where['area.total'] = { ...(where['area.total'] || {}), greater_than_equal: areaMin }
    if (areaMax !== undefined)
      where['area.total'] = { ...(where['area.total'] || {}), less_than_equal: areaMax }

    const floorMin = parseNum(sp.floorMin)
    const floorMax = parseNum(sp.floorMax)
    if (floorMin !== undefined)
      where['floorInfo.floor'] = {
        ...(where['floorInfo.floor'] || {}),
        greater_than_equal: floorMin,
      }
    if (floorMax !== undefined)
      where['floorInfo.floor'] = {
        ...(where['floorInfo.floor'] || {}),
        less_than_equal: floorMax,
      }

    const yearBuiltMin = parseNum(sp.yearBuiltMin)
    if (yearBuiltMin !== undefined) where.yearBuilt = { greater_than_equal: yearBuiltMin }

    if (sp.rentalSubtype && sp.rentalSubtype !== 'all')
      where.rentalSubtype = { equals: sp.rentalSubtype }
    if (sp.fromOwner === 'true') where.fromOwner = { equals: true }
    if (sp.noCommission === 'true') where.noCommission = { equals: true }
  }

  if (type === 'commercial') {
    if (sp.commercialType && sp.commercialType !== 'all')
      where.commercialType = { equals: sp.commercialType }
    const areaMin = parseNum(sp.areaMin)
    const areaMax = parseNum(sp.areaMax)
    if (areaMin !== undefined)
      where['area.total'] = { ...(where['area.total'] || {}), greater_than_equal: areaMin }
    if (areaMax !== undefined)
      where['area.total'] = { ...(where['area.total'] || {}), less_than_equal: areaMax }
    if (sp.fromOwner === 'true') where.fromOwner = { equals: true }
    if (sp.noCommission === 'true') where.noCommission = { equals: true }
  }

  if (type === 'lands') {
    // `purpose` is the actual field in the Lands collection.
    if (sp.purpose && sp.purpose !== 'all') where.purpose = { equals: sp.purpose }
    // Lands.area is a flat number (sotka), not a group.
    const areaMin = parseNum(sp.areaMin)
    const areaMax = parseNum(sp.areaMax)
    if (areaMin !== undefined) where.area = { ...(where.area || {}), greater_than_equal: areaMin }
    if (areaMax !== undefined) where.area = { ...(where.area || {}), less_than_equal: areaMax }
  }

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

  // Sort + page from URL (validated against allowed set).
  const sortParam = searchParams.sort && ALLOWED_SORTS.has(searchParams.sort)
    ? searchParams.sort
    : '-createdAt'
  // Lands has flat `area` field, others have `area.total` — patch sort.
  const sort = type === 'lands' && sortParam.includes('area.total')
    ? sortParam.replace('area.total', 'area')
    : sortParam

  const pageParam = parseInt(searchParams.page ?? '1', 10) || 1
  const page = Math.max(1, pageParam)

  const result = await payload.find({
    collection: COLLECTION_MAP[type] as any,
    where,
    sort,
    limit: PAGE_SIZE,
    page,
    depth: 2,
  })

  const mapItems = formatMapItems(result.docs)
  const view: 'list' | 'map' = searchParams.view === 'map' ? 'map' : 'list'

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-headline text-on-surface">{title}</h1>
          <p className="text-body-sm text-on-surface-variant">{result.totalDocs} объектов</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <SortSelect options={SORT_OPTIONS} defaultValue="-createdAt" />
          <ViewToggle />
        </div>
      </header>

      <PropertyFilters type={type} />

      {view === 'map' ? (
        mapItems.length > 0 ? (
          <div className="bg-card rounded-md shadow-e1 p-4">
            <PropertyMap
              items={mapItems}
              baseUrl={mapBaseUrl}
              height="600px"
              className="!px-0"
            />
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-md shadow-e1">
            <p className="text-body text-on-surface-variant">
              Нет объектов с координатами для отображения на карте.
            </p>
          </div>
        )
      ) : result.docs.length > 0 ? (
        <>
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
                  favCollection={type}
                  favId={doc.id}
                />
              )
            })}
          </div>
          <ListingsPagination page={page} totalPages={result.totalPages ?? 1} />
        </>
      ) : (
        <div className="text-center py-16 bg-card rounded-md shadow-e1">
          <p className="text-body text-on-surface-variant">Объекты не найдены</p>
        </div>
      )}
    </div>
  )
}

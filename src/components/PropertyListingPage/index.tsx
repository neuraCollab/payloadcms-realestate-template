import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'
import { ListingsPagination } from '@/components/ListingsPagination'
import { SortSelect, type SortOption } from '@/components/SortSelect'
import { CatalogClient } from './CatalogClient'
import type { PropertyType } from '@/components/PropertyFilters/schemas'
import type { CatalogMapItem } from '@/components/CatalogMap'
import { buildBreadcrumbJsonLd, buildItemListJsonLd } from '@/utilities/seo'

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

  if (sp.city) where['location.city'] = { like: sp.city }
  if (sp.district) where['location.district'] = { like: sp.district }
  if (sp.rooms && sp.rooms !== 'all') where.rooms = { equals: sp.rooms }
  if (sp.transactionType && sp.transactionType !== 'all')
    where.transactionType = { equals: sp.transactionType }

  const minPrice = parseNum(sp.minPrice)
  const maxPrice = parseNum(sp.maxPrice)
  if (minPrice !== undefined) where.price = { ...(where.price || {}), greater_than_equal: minPrice }
  if (maxPrice !== undefined) where.price = { ...(where.price || {}), less_than_equal: maxPrice }

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
    if (sp.purpose && sp.purpose !== 'all') where.purpose = { equals: sp.purpose }
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

const pickMeta = (doc: any, type: PropertyType): Array<{ label: string }> => {
  if (type === 'flats') {
    return [
      doc.rooms === 'studio'
        ? { label: 'Студия' }
        : doc.rooms
        ? { label: `${doc.rooms} комн.` }
        : null,
      doc.floorInfo?.floor
        ? { label: `${doc.floorInfo.floor}/${doc.floorInfo.totalFloors} эт.` }
        : null,
      doc.area?.total ? { label: `${doc.area.total} м²` } : null,
    ].filter(Boolean) as Array<{ label: string }>
  }
  if (type === 'lands') {
    return [doc.area?.total ? { label: `${doc.area.total} сот.` } : null].filter(
      Boolean,
    ) as Array<{ label: string }>
  }
  if (type === 'commercial') {
    return [
      doc.commercialType ? { label: String(doc.commercialType) } : null,
      doc.area?.total ? { label: `${doc.area.total} м²` } : null,
    ].filter(Boolean) as Array<{ label: string }>
  }
  return []
}

// Координаты могут лежать на корне `coordinates` (старая схема) или
// внутри `location.coordinates` (новая) — разруливаем и то, и то.
const extractCoords = (doc: any): { lat: number; lng: number } | null => {
  const a = doc.coordinates
  if (typeof a?.lat === 'number' && typeof a?.lng === 'number') {
    return { lat: a.lat, lng: a.lng }
  }
  const b = doc.location?.coordinates
  if (typeof b?.lat === 'number' && typeof b?.lng === 'number') {
    return { lat: b.lat, lng: b.lng }
  }
  return null
}

export const PropertyListingPage: React.FC<Props> = async ({
  type,
  title,
  searchParams,
  mapBaseUrl,
}) => {
  const payload = await getPayload({ config })
  const where = buildWhere(type, searchParams)

  const sortParam =
    searchParams.sort && ALLOWED_SORTS.has(searchParams.sort)
      ? searchParams.sort
      : '-createdAt'
  const sort =
    type === 'lands' && sortParam.includes('area.total')
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

  // Карточки для списка и метки для карты — строим один раз на сервере.
  const cards = result.docs.map((doc: any) => ({
    id: String(doc.id),
    href: `/${type}/${doc.slug}`,
    title: doc.title,
    address: doc.location?.address,
    imageUrl: doc.images?.[0]?.image?.url ?? null,
    badge: pickBadge(doc, type),
    price: typeof doc.price === 'number' ? doc.price : undefined,
    priceSuffix: doc.transactionType === 'rent' ? '/ мес' : undefined,
    meta: pickMeta(doc, type),
  }))

  const mapItems: CatalogMapItem[] = result.docs
    .map((doc: any) => {
      const coords = extractCoords(doc)
      if (!coords) return null
      return {
        id: String(doc.id),
        title: doc.title,
        price: typeof doc.price === 'number' ? doc.price : undefined,
        address: doc.location?.address,
        lat: coords.lat,
        lng: coords.lng,
        slug: doc.slug,
      }
    })
    .filter(Boolean) as CatalogMapItem[]

  // Серверный фрагмент — обычный grid карточек + пагинация. На десктопе
  // CatalogClient рендерит его параллельно списку слева в split-view;
  // на мобильном (view=list) — это и есть основное содержимое.
  const resultsSlot = (
    <>
      {result.docs.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:hidden">
          {cards.map((c) => (
            <PropertyCard
              key={c.id}
              href={c.href}
              title={c.title}
              address={c.address}
              imageUrl={c.imageUrl}
              badge={c.badge}
              price={c.price}
              priceSuffix={c.priceSuffix}
              meta={c.meta}
              favCollection={type}
              favId={c.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-md shadow-e1 lg:hidden">
          <p className="text-body text-on-surface-variant">Объекты не найдены</p>
        </div>
      )}
      <ListingsPagination page={page} totalPages={result.totalPages ?? 1} />
    </>
  )

  // BreadcrumbList: Главная → {title} — даёт хлебные крошки в выдаче.
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: title, url: `/${type}` },
  ])

  // ItemList: первые 20 объектов с URL — даёт Google структуру каталога.
  const itemListJsonLd = buildItemListJsonLd(
    cards.slice(0, 20).map((c) => ({ name: c.title, url: c.href })),
  )

  return (
    <div className="space-y-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {cards.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      ) : null}
      <header className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-headline text-on-surface">{title}</h1>
          <p className="text-body-sm text-on-surface-variant">
            {result.totalDocs} {pluralize(result.totalDocs)}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <SortSelect options={SORT_OPTIONS} defaultValue="-createdAt" />
        </div>
      </header>

      {/* Десктоп: фильтры над split-view. Мобайл: открываются в bottom-sheet
          через PropertyFiltersSheet, который рендерит CatalogClient. */}
      <div className="hidden lg:block">
        <PropertyFilters type={type} totalDocs={result.totalDocs} />
      </div>

      <CatalogClient
        type={type}
        cards={cards}
        mapItems={mapItems}
        totalDocs={result.totalDocs}
        resultsSlot={resultsSlot}
        mapBaseUrl={mapBaseUrl}
      />
    </div>
  )
}

const pluralize = (n: number) => {
  const last = n % 10
  const lastTwo = n % 100
  if (lastTwo >= 11 && lastTwo <= 14) return 'объектов'
  if (last === 1) return 'объект'
  if (last >= 2 && last <= 4) return 'объекта'
  return 'объектов'
}

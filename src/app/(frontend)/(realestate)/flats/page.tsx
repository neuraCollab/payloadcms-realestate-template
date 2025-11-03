// app/(realestate)/flats/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { FlatFilters } from '@/components/FlatFilters'
import { RealtorReviewForm } from '@/components/Forms/RealtorReviewForm'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { formatMapItems } from '@/lib/mapItems'

interface Props {
  searchParams: {
    rooms?: string
    minPrice?: string
    maxPrice?: string
    minArea?: string
    maxArea?: string
    transactionType?: string
    city?: string
    district?: string
  }
}

export default async function FlatsPage({ searchParams }: Props) {
  // Асинхронно получаем значения
  const resolvedSearchParams = await searchParams

  const { rooms, transactionType, minPrice, maxPrice, city, district } = resolvedSearchParams

  const where: any = {}

  if (city) {
    where['location.city'] = { equals: city }
  }
  if (district) {
    where['location.district'] = { equals: district }
  }

  if (rooms && rooms !== 'all') {
    where.rooms = { equals: rooms }
  }

  if (transactionType) {
    where.transactionType = { equals: transactionType }
  }

  if (minPrice) {
    where.price = { greater_than_equal: parseInt(minPrice) }
  }

  if (maxPrice) {
    where.price = {
      ...where.price,
      less_than_equal: parseInt(maxPrice),
    }
  }
  const payload = await getPayload({ config })
  const flats = await payload.find({
    collection: 'flats',
    where,
    sort: '-createdAt',
    limit: 20,
    depth: 2,
  })
  //   console.log(flats.docs)

  const mapItems = formatMapItems(flats.docs)

  //   const reviews = await payload.find({
  //     collection: 'reviews',
  //     where: {
  //       realtor: { equals: data.realtor.id },
  //       status: { equals: 'approved' },
  //     },
  //     sort: '-createdAt',
  //   })

  //   console.log('Reviews:', reviews.docs)
  //   console.log('Flats flats:', flats)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Квартиры</h1>
        <span className="text-gray-600">{flats.totalDocs} объектов</span>
      </div>

      <FlatFilters searchParams={searchParams} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flats.docs.map((flat) => (
          <FlatCard key={flat.id} flat={flat} />
        ))}
      </div>

      {flats.docs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Объекты не найдены</p>
        </div>
      )}

      {mapItems.length > 0 && (
        <PropertyMap title="Все квартиры на карте" items={mapItems} baseUrl="/flats" />
      )}
    </div>
  )
}

function FlatCard({ flat }: { flat: any }) {
  return (
    <Link
      href={`/flats/${flat.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {flat.images && flat.images.length > 0 && (
        <img
          src={(flat.images[0].image as any).url}
          alt={flat.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg flex-1">{flat.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-2">
            {flat.transactionType === 'sale' ? 'Продажа' : 'Аренда'}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3">{flat.location?.address}</p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 font-bold text-xl">{flat.price.toLocaleString()} ₽</span>
          {flat.transactionType === 'rent' && (
            <span className="text-gray-500 text-sm">в месяц</span>
          )}
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{flat.rooms === 'studio' ? 'Студия' : `${flat.rooms} комн.`}</span>
          <span>{flat.area?.total} м²</span>
          <span>
            {flat.floorInfo?.floor}/{flat.floorInfo?.totalFloors} эт.
          </span>
        </div>
      </div>
    </Link>
  )
}

// Генерация статических параметров
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const flats = await payload.find({
    collection: 'flats',
    limit: 100,
    where: { status: { equals: 'active' } },
  })

  return flats.docs.map((flat) => ({
    slug: flat.slug,
  }))
}

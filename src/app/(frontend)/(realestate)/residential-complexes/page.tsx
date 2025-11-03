// app/(realestate)/residential-complexes/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { ResidentialComplexFilter } from '@/components/Filters/ResidentialComplexFilter'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { formatMapItems } from '@/lib/mapItems'

interface Props {
  searchParams: {
    status?: string
    type?: string
    city?: string
    district?: string
  }
}

export default async function ResidentialComplexesPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams
  const { status, type, city, district } = resolvedSearchParams

  const where: any = {}

  if (city) {
    where['location.city'] = { equals: city }
  }
  if (district) {
    where['location.district'] = { equals: district }
  }

  if (status && status !== 'all') {
    where.status = { equals: status }
  }

  if (type && type !== 'all') {
    where.type = { equals: type }
  }

  const payload = await getPayload({ config })
  const complexes = await payload.find({
    collection: 'residential-complexes',
    where,
    sort: '-createdAt',
    limit: 20,
  })

  const mapItems = formatMapItems(complexes.docs, {
    hasPrice: false,
    titleField: 'name',
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Жилые комплексы</h1>
        <span className="text-gray-600">{complexes.totalDocs} объектов</span>
      </div>

      <ResidentialComplexFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complexes.docs.map((complex) => (
          <ResidentialComplexCard key={complex.id} complex={complex} />
        ))}
      </div>

      {complexes.docs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Жилые комплексы не найдены</p>
        </div>
      )}

      <PropertyMap
        title="Жилые комплексы на карте"
        items={mapItems}
        baseUrl="/residential-complexes"
      />
    </div>
  )
}

function ResidentialComplexCard({ complex }: { complex: any }) {
  return (
    <Link
      href={`/residential-complexes/${complex.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {complex.images && complex.images.length > 0 && (
        <img
          src={complex.images[0].image.url}
          alt={complex.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{complex.name}</h3>

        <p className="text-gray-600 text-sm mb-3">
          {complex.location?.address || `${complex.location?.district}, ${complex.location?.city}`}
        </p>

        <div className="flex justify-between text-sm text-gray-500">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            {getStatusLabel(complex.status)}
          </span>
          <span>{getTypeLabel(complex.type)}</span>
        </div>

        {complex.developer && (
          <p className="text-gray-500 text-sm mt-2">Застройщик: {complex.developer}</p>
        )}
      </div>
    </Link>
  )
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    planning: 'Планируется',
    'under-construction': 'Строится',
    completed: 'Сдан',
  }
  return labels[status] || status
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    economy: 'Эконом',
    comfort: 'Комфорт',
    business: 'Бизнес',
    premium: 'Премиум',
  }
  return labels[type] || type
}

// Генерация статических путей
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const complexes = await payload.find({
    collection: 'residential-complexes',
    limit: 100,
  })

  return complexes.docs.map((complex) => ({
    slug: complex.slug,
  }))
}

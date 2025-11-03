// app/(realestate)/commercials/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { CommercialFilter } from '@/components/Filters/CommercialFilter'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { formatMapItems } from '@/lib/mapItems'

interface Props {
  searchParams: {
    transactionType?: string
    commercialType?: string
  }
}

export default async function CommercialsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams
  const { transactionType, commercialType, city, district } = resolvedSearchParams

  const where: any = {
    status: { equals: 'active' },
  }

  if (city) {
    where['location.city'] = { equals: city }
  }
  if (district) {
    where['location.district'] = { equals: district }
  }

  if (transactionType && transactionType !== 'all') {
    where.transactionType = { equals: transactionType }
  }

  if (commercialType && commercialType !== 'all') {
    where.commercialType = { equals: commercialType }
  }

  const payload = await getPayload({ config })
  const commercials = await payload.find({
    collection: 'commercial',
    where,
    sort: '-createdAt',
    limit: 20,
  })

  const mapItems = formatMapItems(commercials.docs) 

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Коммерческая недвижимость</h1>
        <span className="text-gray-600">{commercials.totalDocs} объектов</span>
      </div>

      <CommercialFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commercials.docs.map((item) => (
          <CommercialCard key={item.id} item={item} />
        ))}
      </div>

      {commercials.docs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Объекты не найдены</p>
        </div>
      )}

      <PropertyMap
        title="Коммерческая недвижимость на карте"
        items={mapItems}
        baseUrl="/commercials"
      />
    </div>
  )
}

function CommercialCard({ item }: { item: any }) {
  return (
    <Link
      href={`/commercial/${item.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {item.images && item.images.length > 0 && (
        <img src={item.images[0].image.url} alt={item.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg flex-1">{item.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-2">
            {item.transactionType === 'sale' ? 'Продажа' : 'Аренда'}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3">
          {item.location?.address || `${item.location?.district}, ${item.location?.city}`}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 font-bold text-xl">{item.price.toLocaleString()} ₽</span>
          {item.transactionType === 'rent' && (
            <span className="text-gray-500 text-sm">в месяц</span>
          )}
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{getCommercialTypeLabel(item.commercialType)}</span>
          <span>{item.area?.total} м²</span>
          {item.floor !== null && item.floor !== undefined && <span>{item.floor} эт.</span>}
        </div>
      </div>
    </Link>
  )
}

function getCommercialTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    office: 'Офис',
    retail: 'Торговая площадь',
    mall: 'Торговый центр',
    warehouse: 'Склад',
    manufacturing: 'Производство',
    'free-purpose': 'Своб. назначения',
    hotel: 'Гостиница',
    restaurant: 'Ресторан/кафе',
    'business-center': 'Бизнес-центр',
  }
  return labels[type] || type
}

// Генерация статических путей
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const commercials = await payload.find({
    collection: 'commercial',
    limit: 100,
    where: { status: { equals: 'active' } },
  })

  return commercials.docs.map((item) => ({
    slug: item.slug,
  }))
}

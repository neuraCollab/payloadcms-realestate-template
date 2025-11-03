// app/(realestate)/lands/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { LandFilter } from '@/components/Filters/LandFilter'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { formatMapItems } from '@/lib/mapItems'

interface Props {
  searchParams: {
    landType?: string
    hasUtilities?: string
    city?: string
    district?: string
  }
}

export default async function LandsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams
  const { landType, hasUtilities, city, district } = resolvedSearchParams

  const where: any = {}

  if (city) {
    where['location.city'] = { equals: city }
  }
  if (district) {
    where['location.district'] = { equals: district }
  }

  if (landType && landType !== 'all') {
    // В коллекции поле называется 'purpose', а не 'landType'
    where.purpose = { equals: landType }
  }

//   if (hasUtilities && hasUtilities !== 'all') {
    // В коллекции нет булева поля hasUtilities — только массив communications
    // Поэтому фильтрация по наличию коммуникаций: если hasUtilities === 'yes', то communications.length > 0
    // Но Payload не поддерживает прямой фильтр по длине массива в where.
    // Поэтому пока реализуем упрощённо: если фильтр "есть", то не фильтруем на сервере — отфильтруем на клиенте.
    // Однако для SSR это проблема. Лучше добавить булево поле hasUtilities в коллекцию.
    // Но раз вы уже используете такой фильтр — предположу, что в данных есть поле `hasUtilities`.
    // Если его нет — замените на логику ниже.

    // Альтернатива: если в коллекции нет `hasUtilities`, удалите этот блок.
//     where.hasUtilities = { equals: hasUtilities === 'yes' }
//   }

  const payload = await getPayload({ config })
  const lands = await payload.find({
    collection: 'lands',
    where,
    sort: '-createdAt',
    limit: 20,
  })

  const mapItems = formatMapItems(lands.docs) 


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Земельные участки</h1>
        <span className="text-gray-600">{lands.totalDocs} объектов</span>
      </div>

      <LandFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lands.docs.map((land) => (
          <LandCard key={land.id} land={land} />
        ))}
      </div>

      {lands.docs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Участки не найдены</p>
        </div>
      )}

      <PropertyMap
  title="Земельные участки на карте"
  items={mapItems}
  baseUrl="/lands"
/>
    </div>
  )
}

function LandCard({ land }: { land: any }) {
  return (
    <Link
      href={`/lands/${land.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {land.images && land.images.length > 0 && (
        <img src={land.images[0].image.url} alt={land.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{land.title}</h3>

        <p className="text-gray-600 text-sm mb-3">
          {land.location?.address || `${land.location?.district}, ${land.location?.city}`}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 font-bold text-xl">{land.price.toLocaleString()} ₽</span>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{getPurposeLabel(land.purpose)}</span>
          <span>{land.area} соток</span>
          {land.communications && land.communications.length > 0 && <span>Коммуникации</span>}
        </div>
      </div>
    </Link>
  )
}

function getPurposeLabel(purpose: string): string {
  const labels: Record<string, string> = {
    ijs: 'ИЖС',
    snt: 'СНТ/ДНП',
    lph: 'ЛПХ',
    commercial: 'Коммерческая',
    agricultural: 'Сельхоз',
  }
  return labels[purpose] || purpose
}

// Генерация статических путей
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const lands = await payload.find({
    collection: 'lands',
    limit: 100,
    where: { status: { equals: 'active' } },
  })

  return lands.docs.map((land) => ({
    slug: land.slug,
  }))
}

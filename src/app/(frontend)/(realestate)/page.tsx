// app/(realestate)/page.tsx
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { UnifiedFilter } from '@/components/Filters/UnifiedFilter'

export default async function RealEstateHomePage() {
  const payload = await getPayload({ config })

  // Получаем счетчики объектов
  const [flats, commercial, lands, complexes] = await Promise.all([
    payload.count({ collection: 'flats', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'commercial', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'lands', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'residential-complexes' }),
  ])

  const stats = [
    { name: 'Квартиры', count: flats.total, href: '/flats', color: 'bg-blue-500' },
    { name: 'Коммерческая', count: commercial.total, href: '/commercial', color: 'bg-green-500' },
    { name: 'Земельные участки', count: lands.total, href: '/lands', color: 'bg-orange-500' },
    { name: 'Жилые комплексы', count: complexes.total, href: '/complexes', color: 'bg-purple-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Недвижимость</h1>

      <UnifiedFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div
              className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <span className="text-white font-bold text-lg">{stat.count}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{stat.name}</h3>
            <p className="text-gray-600 text-sm">Посмотреть все предложения</p>
          </Link>
        ))}
      </div>

      {/* Последние добавленные объекты */}
      <RecentProperties />
    </div>
  )
}

async function RecentProperties() {
  const payload = await getPayload({ config })

  const recentFlats = await payload.find({
    collection: 'flats',
    limit: 4,
    where: { status: { equals: 'active' } },
    sort: '-createdAt',
  })

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Новые предложения</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentFlats.docs.map((flat) => (
          <Link
            key={flat.id}
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
              <h3 className="font-semibold mb-2">{flat.title}</h3>
              <p className="text-blue-600 font-bold text-lg">{flat.price.toLocaleString()} ₽</p>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{flat.rooms} комн.</span>
                <span>{flat.area?.total} м²</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { HomeHero } from '@/components/HomeHero'
import { RecentProperties } from '@/components/RecentProperties'

const STATS = [
  { key: 'flats',                     name: 'Квартиры',         href: '/flats' },
  { key: 'commercial',                name: 'Коммерческая',     href: '/commercial' },
  { key: 'lands',                     name: 'Земельные участки', href: '/lands' },
  { key: 'residential-complexes',     name: 'Жилые комплексы',  href: '/residential-complexes' },
]

export default async function RealEstateHomePage() {
  const payload = await getPayload({ config })
  const [flats, commercial, lands, complexes] = await Promise.all([
    payload.count({ collection: 'flats', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'commercial', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'lands', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'residential-complexes' }),
  ])
  const counts: Record<string, number> = {
    flats: flats.total,
    commercial: commercial.total,
    lands: lands.total,
    'residential-complexes': complexes.total,
  }

  return (
    <div className="space-y-10">
      <HomeHero />

      <section>
        <ul className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <li key={s.key}>
              <Link
                href={s.href}
                className="block bg-primary-container rounded-md p-4 hover:shadow-e2 transition-shadow"
              >
                <div className="text-title-lg text-on-primary-container">{counts[s.key] ?? 0}</div>
                <div className="text-body-sm text-on-primary-container/80 mt-1">{s.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RecentProperties />
    </div>
  )
}

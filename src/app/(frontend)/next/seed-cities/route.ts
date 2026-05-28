import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { slugifyRu } from '@/collections/Cities'

export const maxDuration = 60

// Initial big-cities seed. Idempotent — upserts by slug.
const SEED_CITIES = [
  { name: 'Москва', region: 'Москва', population: 12_678_000, lat: 55.7558, lng: 37.6173 },
  { name: 'Санкт-Петербург', region: 'Ленинградская обл.', population: 5_398_000, lat: 59.9343, lng: 30.3351 },
  { name: 'Новосибирск', region: 'Новосибирская обл.', population: 1_625_000, lat: 55.0084, lng: 82.9357 },
  { name: 'Екатеринбург', region: 'Свердловская обл.', population: 1_544_000, lat: 56.8389, lng: 60.6057 },
  { name: 'Казань', region: 'Татарстан', population: 1_257_000, lat: 55.8304, lng: 49.0661 },
  { name: 'Нижний Новгород', region: 'Нижегородская обл.', population: 1_220_000, lat: 56.2965, lng: 43.9361 },
  { name: 'Сочи', region: 'Краснодарский край', population: 466_000, lat: 43.6028, lng: 39.7342 },
  { name: 'Кимры', region: 'Тверская обл.', population: 45_000, lat: 56.8736, lng: 37.3522 },
]

export async function POST(): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Disabled outside of development.', { status: 403 })
  }

  const payload = await getPayload({ config })
  const req = await createLocalReq({}, payload)

  const created: string[] = []
  const skipped: string[] = []

  for (const c of SEED_CITIES) {
    const slug = slugifyRu(c.name)
    const existing = await payload.find({
      collection: 'cities',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      req,
    })
    if (existing.docs[0]) {
      skipped.push(c.name)
      continue
    }
    await payload.create({
      collection: 'cities',
      data: {
        name: c.name,
        slug,
        country: 'Россия',
        region: c.region,
        population: c.population,
        coordinates: { lat: c.lat, lng: c.lng },
        isActive: true,
        description: `Объекты недвижимости в городе ${c.name}.`,
      },
      req,
    })
    created.push(c.name)
  }

  return Response.json({ success: true, created, skipped })
}

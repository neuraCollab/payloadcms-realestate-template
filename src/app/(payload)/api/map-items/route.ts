// app/api/map-items/route.ts
import { getPayload } from 'payload'
import config from '@/payload.config'

const COLLECTION_MAP: Record<string, string> = {
  flats: 'flats',
  commercial: 'commercial',
  lands: 'lands',
  'residential-complexes': 'residential-complexes',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const collectionParam = searchParams.get('collection')
  const excludeSlug = searchParams.get('excludeSlug')

  if (!collectionParam || !COLLECTION_MAP[collectionParam]) {
    return Response.json({ items: [] })
  }

  const collection = COLLECTION_MAP[collectionParam]

  try {
    const payload = await getPayload({ config })

    const where: any = {
      'coordinates.lat': { exists: true },
      'coordinates.lng': { exists: true },
    }

    // Для всех, кроме ЖК, фильтруем по статусу
    if (collection !== 'residential-complexes') {
      where.status = { equals: 'active' }
    }

    // Исключаем текущий объект (на странице деталей)
    if (excludeSlug) {
      const current = await payload.find({
        collection,
        where: { slug: { equals: excludeSlug } },
        limit: 1,
      })
      if (current.docs.length > 0) {
        where.id = { not_equals: current.docs[0].id }
      }
    }

    const result = await payload.find({
      collection,
      where,
      limit: 30,
      depth: 0,
    })

    const items = result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title || doc.name || 'Без названия',
      price: doc.price,
      address: doc.location?.address,
      lat: doc.coordinates.lat,
      lng: doc.coordinates.lng,
      slug: doc.slug,
    }))

    return Response.json({ items })
  } catch (error) {
    console.error('Map items API error:', error)
    return Response.json({ items: [] })
  }
}
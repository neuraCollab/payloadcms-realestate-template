import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CategoryTileClient, type TilePreview, type TileIconKey } from './CategoryTileClient'

// Конфигурация 4 плиток.
// «Дома» → /residential-complexes в нашей модели.
//
// `fallbackImage` — тематическое фото, которое подменяется при hover
// если у самого свежего объекта в коллекции нет своего изображения.
// Так у ВСЕХ четырёх плиток всегда есть превью, не только у квартир.
type TileSpec = {
  label: string
  href: string
  collection: 'flats' | 'residential-complexes' | 'lands' | 'commercial'
  iconKey: TileIconKey
  fallbackImage: string
  /** Тематическая PNG-иллюстрация в правом нижнем углу карточки. */
  cornerIcon: string
}

const TILES: TileSpec[] = [
  {
    label: 'Квартиры',
    href: '/flats',
    collection: 'flats',
    iconKey: 'flats',
    fallbackImage: '/category-flats.jpg',
    cornerIcon: '/category-icon-flats.png',
  },
  {
    label: 'Дома',
    href: '/residential-complexes',
    collection: 'residential-complexes',
    iconKey: 'house',
    fallbackImage: '/category-houses.jpg',
    cornerIcon: '/category-icon-houses.png',
  },
  {
    label: 'Земля',
    href: '/lands',
    collection: 'lands',
    iconKey: 'land',
    fallbackImage: '/category-land.jpg',
    cornerIcon: '/category-icon-land.png',
  },
  {
    label: 'Коммерческая',
    href: '/commercial',
    collection: 'commercial',
    iconKey: 'commercial',
    fallbackImage: '/category-commercial.jpg',
    cornerIcon: '/category-icon-commercial.png',
  },
]

const fetchPreview = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  spec: TileSpec,
): Promise<TilePreview> => {
  const where: any =
    spec.collection === 'residential-complexes' ? {} : { status: { equals: 'active' } }

  try {
    const res = await payload.find({
      collection: spec.collection as any,
      where,
      sort: '-createdAt',
      limit: 1,
      depth: 1,
      pagination: false,
    })
    const doc: any = res.docs?.[0]
    const docImage: string | null = doc?.images?.[0]?.image?.url ?? null
    return {
      // ВАЖНО: если у документа есть своё фото — оно. Иначе всегда
      // отдаём тематический /public-фолбек, чтобы плитка не была
      // голой при hover'е.
      imageUrl: docImage ?? spec.fallbackImage,
      price: doc && typeof doc.price === 'number' ? doc.price : null,
      city: doc?.location?.city ?? null,
    }
  } catch {
    // Если БД упала — пусть всё равно будет фолбек, не пустой пиксель.
    return { imageUrl: spec.fallbackImage, price: null, city: null }
  }
}

export const CategoryTiles = async () => {
  const payload = await getPayload({ config: configPromise })
  const previews = await Promise.all(TILES.map((t) => fetchPreview(payload, t)))

  return (
    <section className="px-4 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <header className="mb-5 md:mb-6 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-headline text-on-surface">Выберите тип</h2>
            <p className="text-body-sm text-on-surface-variant mt-1">
              4 категории — от квартир до коммерции.
            </p>
          </div>
        </header>
        {/* 2 кол. на телефоне, 4 кол. с md (768) — чтобы плитки не
            раздувались на узких ноутбуках. */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {TILES.map((spec, i) => (
            <CategoryTileClient
              key={spec.collection}
              index={i}
              label={spec.label}
              href={spec.href}
              iconKey={spec.iconKey}
              cornerIcon={spec.cornerIcon}
              preview={previews[i]!}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

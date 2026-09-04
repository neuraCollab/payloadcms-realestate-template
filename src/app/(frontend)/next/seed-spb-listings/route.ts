import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { requireSeedAuth } from '@/utilities/seedAuth'

export const maxDuration = 60

/**
 * Дополнительные моковые квартиры по Санкт-Петербургу — для
 * заполнения городской лендинг-страницы /sankt-peterburg.
 * Идемпотентно: проверяет slug, повторный вызов ничего не сломает.
 */

const ITEMS = [
  {
    title: 'Светлая 2-комнатная у Невского',
    slug: 'svetlaya-2k-u-nevskogo-spb',
    propertyCategory: 'apartment',
    transactionType: 'sale',
    rooms: '2',
    price: 14500000,
    area: { total: 62, living: 38, kitchen: 11 },
    floorInfo: { floor: 4, totalFloors: 7 },
    buildingType: 'brick',
    yearBuilt: 1958,
    ceilingHeight: 3.2,
    location: {
      city: 'Санкт-Петербург',
      district: 'Центральный',
      address: 'Невский проспект, 78',
      metro: 'Маяковская',
      metroTime: 5,
    },
    description:
      'Уютная двушка в историческом доме рядом с Невским. Хороший ремонт, ' +
      'высокие потолки, тихий двор.',
    amenities: ['Балкон', 'Лифт', 'Парковка во дворе', 'Видео-домофон'],
    fromOwner: true,
    noCommission: true,
  },
  {
    title: '1-комнатная у Петропавловки',
    slug: '1k-u-petropavlovki-spb',
    propertyCategory: 'apartment',
    transactionType: 'sale',
    rooms: '1',
    price: 9800000,
    area: { total: 42, living: 22, kitchen: 9 },
    floorInfo: { floor: 6, totalFloors: 9 },
    buildingType: 'panel',
    yearBuilt: 1972,
    location: {
      city: 'Санкт-Петербург',
      district: 'Петроградский',
      address: 'Кронверкский проспект, 23',
      metro: 'Горьковская',
      metroTime: 7,
    },
    description:
      'Светлая однушка с видом на Петропавловскую крепость. Свежий ремонт, ' +
      'мебель и техника остаются.',
    amenities: ['Кондиционер', 'Стиральная машина', 'Интернет'],
  },
  {
    title: 'Студия у метро Чкаловская — посуточно',
    slug: 'studiya-chkalovskaya-sutochno-spb',
    propertyCategory: 'studio',
    transactionType: 'daily',
    rooms: 'studio',
    price: 4200,
    area: { total: 28, kitchen: 5 },
    floorInfo: { floor: 12, totalFloors: 16 },
    buildingType: 'monolithic',
    yearBuilt: 2018,
    location: {
      city: 'Санкт-Петербург',
      district: 'Петроградский',
      address: 'Большая Зеленина, 24',
      metro: 'Чкаловская',
      metroTime: 3,
    },
    description:
      'Современная студия в новом доме у метро. Заезд в любое время, ' +
      'самостоятельное заселение по коду.',
    amenities: ['Wi-Fi', 'Smart TV', 'Кофемашина', 'Полотенца, постельное'],
    fromOwner: true,
    noCommission: true,
  },
  {
    title: 'Трёшка на Васильевском острове',
    slug: '3k-na-vasilievskom-spb',
    propertyCategory: 'apartment',
    transactionType: 'rent',
    rooms: '3',
    price: 95000,
    area: { total: 88, living: 56, kitchen: 14 },
    floorInfo: { floor: 3, totalFloors: 5 },
    buildingType: 'brick',
    yearBuilt: 1908,
    ceilingHeight: 3.5,
    location: {
      city: 'Санкт-Петербург',
      district: 'Василеостровский',
      address: '6-я линия В.О., 15',
      metro: 'Василеостровская',
      metroTime: 4,
    },
    description:
      'Просторная трёхкомнатная в дореволюционном доме на Васильевском. ' +
      'Лепнина, паркет, дубовые двери — сохранены детали эпохи.',
    amenities: ['Камин', 'Гардеробная', 'Кладовая'],
  },
  {
    title: 'Однушка в Купчино рядом с парком',
    slug: '1k-v-kupchino-park-spb',
    propertyCategory: 'apartment',
    transactionType: 'sale',
    rooms: '1',
    price: 6900000,
    area: { total: 38, living: 19, kitchen: 8 },
    floorInfo: { floor: 7, totalFloors: 16 },
    buildingType: 'panel',
    yearBuilt: 1985,
    location: {
      city: 'Санкт-Петербург',
      district: 'Фрунзенский',
      address: 'Бухарестская, 122',
      metro: 'Купчино',
      metroTime: 9,
    },
    description:
      'Тихая однушка с окнами в зелёный двор. Рядом парк Интернационалистов, ' +
      'школа и детский сад.',
    amenities: ['Балкон застеклён', 'Кладовая'],
    fromOwner: true,
  },
  {
    title: 'Лофт-апартаменты на Лиговском',
    slug: 'loft-ligovskii-spb',
    propertyCategory: 'apartments',
    transactionType: 'sale',
    rooms: 'studio',
    price: 11200000,
    area: { total: 47, kitchen: 12 },
    floorInfo: { floor: 5, totalFloors: 6 },
    buildingType: 'brick',
    yearBuilt: 1900,
    ceilingHeight: 4.0,
    location: {
      city: 'Санкт-Петербург',
      district: 'Центральный',
      address: 'Лиговский проспект, 50',
      metro: 'Лиговский проспект',
      metroTime: 6,
    },
    description:
      'Стильный лофт в бывшей фабрике. Высокие потолки, кирпичные стены, ' +
      'панорамные окна. Подходит под жильё или офис.',
    amenities: ['Высокие потолки', 'Панорамные окна', 'Кирпич'],
    noCommission: true,
  },
  {
    title: '2-комнатная с видом на Фонтанку — посуточно',
    slug: '2k-fontanka-sutochno-spb',
    propertyCategory: 'apartment',
    transactionType: 'daily',
    rooms: '2',
    price: 7800,
    area: { total: 58, living: 36, kitchen: 9 },
    floorInfo: { floor: 2, totalFloors: 4 },
    buildingType: 'brick',
    yearBuilt: 1900,
    ceilingHeight: 3.4,
    location: {
      city: 'Санкт-Петербург',
      district: 'Центральный',
      address: 'Набережная реки Фонтанки, 56',
      metro: 'Гостиный двор',
      metroTime: 8,
    },
    description:
      'Двушка с видом на Фонтанку в самом сердце города. Идеально для ' +
      'выходных или короткой командировки. Заселение круглосуточно.',
    amenities: ['Вид на воду', 'Wi-Fi', 'Стиральная машина', 'Посудомойка'],
    fromOwner: true,
    noCommission: true,
  },
  {
    title: 'Семейная квартира в Озерках',
    slug: 'semeynaya-ozerki-spb',
    propertyCategory: 'apartment',
    transactionType: 'sale',
    rooms: '3',
    price: 13500000,
    area: { total: 78, living: 48, kitchen: 13 },
    floorInfo: { floor: 9, totalFloors: 25 },
    buildingType: 'monolithic',
    yearBuilt: 2019,
    location: {
      city: 'Санкт-Петербург',
      district: 'Выборгский',
      address: 'Выборгское шоссе, 17',
      metro: 'Озерки',
      metroTime: 11,
    },
    description:
      'Новостройка комфорт-класса. Закрытый двор, подземный паркинг, ' +
      'своя школа. Идеально для семьи с детьми.',
    amenities: [
      'Подземная парковка',
      'Закрытый двор',
      'Видеонаблюдение',
      'Колясочная',
    ],
  },
] as const

export async function POST(request: Request): Promise<Response> {
  const authErr = requireSeedAuth(request)
  if (authErr) return authErr

  const payload = await getPayload({ config })
  const req = await createLocalReq({}, payload)

  const created: string[] = []
  const skipped: string[] = []

  for (const item of ITEMS) {
    const existing = await payload.find({
      collection: 'flats',
      where: { slug: { equals: item.slug } },
      limit: 1,
      depth: 0,
      req,
    })
    if (existing.docs[0]) {
      skipped.push(item.slug)
      continue
    }

    await payload.create({
      collection: 'flats',
      data: {
        ...item,
        status: 'active',
        description: {
          // Минимальный валидный Lexical-документ
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: item.description,
                    format: 0,
                    style: '',
                    detail: 0,
                    mode: 'normal',
                  },
                ],
              },
            ],
          },
        },
        amenities: (item.amenities ?? []).map((a) => ({ amenity: a })),
      } as any,
      req,
    })
    created.push(item.slug)
  }

  return Response.json({ success: true, created, skipped })
}

/**
 * Валидация и санитизация payload'а user-generated объявления.
 *
 * Принцип: всё что приходит из формы кабинета — недоверенный input,
 * нормализуем + проверяем границы. Глубокая проверка XSS — strip
 * любые HTML-теги из text-полей (Lexical description строится
 * сервером, не клиентом).
 *
 * Возвращает { ok: true, data } | { ok: false, errors }.
 */

export interface DraftFlatInput {
  // Базовые
  title?: string
  propertyCategory?: string
  transactionType?: string
  rooms?: string
  // Location
  city?: string
  district?: string
  address?: string
  metro?: string
  // Цена/площадь
  price?: number | string
  currency?: string
  areaTotal?: number | string
  areaLiving?: number | string
  areaKitchen?: number | string
  floor?: number | string
  totalFloors?: number | string
  // Доп
  yearBuilt?: number | string
  buildingType?: string
  fromOwner?: boolean
  noCommission?: boolean
  rentalSubtype?: string
  description?: string
}

export interface ValidatedFlat {
  title: string
  slug: string
  propertyCategory: 'apartment' | 'apartments' | 'studio' | 'townhouse' | 'penthouse' | 'house-part'
  transactionType: 'sale' | 'rent' | 'daily'
  rooms: 'studio' | '1' | '2' | '3' | '4' | '5plus'
  location: { city: string; district: string; address: string; metro?: string }
  price: number
  currency: 'RUB' | 'USD' | 'EUR'
  area: { total: number; living?: number; kitchen?: number }
  floorInfo?: { floor?: number; totalFloors?: number }
  yearBuilt?: number
  buildingType?: 'panel' | 'brick' | 'monolithic' | 'block' | 'wood'
  fromOwner: boolean
  noCommission: boolean
  rentalSubtype?: 'whole' | 'room' | 'bed'
  description: Record<string, any>
}

export type ValidationResult =
  | { ok: true; data: ValidatedFlat }
  | { ok: false; errors: Record<string, string> }

const ENUMS = {
  propertyCategory: ['apartment', 'apartments', 'studio', 'townhouse', 'penthouse', 'house-part'],
  transactionType: ['sale', 'rent', 'daily'],
  rooms: ['studio', '1', '2', '3', '4', '5plus'],
  currency: ['RUB', 'USD', 'EUR'],
  buildingType: ['panel', 'brick', 'monolithic', 'block', 'wood'],
  rentalSubtype: ['whole', 'room', 'bed'],
} as const

const MAX_TITLE_LEN = 200
const MAX_TEXT_LEN = 5000
const MAX_PRICE = 1_000_000_000 // 1 млрд ₽ — sanity ceiling
const MIN_PRICE = 100
const MAX_AREA = 100_000 // м²
const MAX_FLOORS = 200

/**
 * Strip HTML/scripts из строки. Не использует DOM, regex-based —
 * не идеально, но для plain-text полей (title, address) хватает.
 */
const stripHtml = (s: string): string =>
  s
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim()

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || `listing-${Date.now()}`

const num = (v: any): number | null => {
  if (v === null || v === undefined || v === '') return null
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[\s,]/g, '.').replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : null
}

const cleanText = (v: any, max: number): string =>
  typeof v === 'string' ? stripHtml(v).slice(0, max) : ''

/** Lexical-doc из plain text. Используется для description. */
const textToLexical = (text: string): Record<string, any> => {
  const t = stripHtml(text).slice(0, MAX_TEXT_LEN)
  return {
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
              text: t,
              format: 0,
              style: '',
              detail: 0,
              mode: 'normal',
            },
          ],
        },
      ],
    },
  }
}

export function validateFlatDraft(input: DraftFlatInput): ValidationResult {
  const errors: Record<string, string> = {}

  const title = cleanText(input.title, MAX_TITLE_LEN)
  if (title.length < 10) errors.title = 'Заголовок: минимум 10 символов'

  const city = cleanText(input.city, 80)
  if (!city) errors.city = 'Город обязателен'

  const district = cleanText(input.district, 120)
  if (!district) errors.district = 'Район обязателен'

  const address = cleanText(input.address, 200)
  if (!address) errors.address = 'Адрес обязателен'

  const metro = input.metro ? cleanText(input.metro, 80) : undefined

  // Enum validation
  const propertyCategory = ENUMS.propertyCategory.includes(input.propertyCategory as any)
    ? (input.propertyCategory as ValidatedFlat['propertyCategory'])
    : ('apartment' as const)

  const transactionType = ENUMS.transactionType.includes(input.transactionType as any)
    ? (input.transactionType as ValidatedFlat['transactionType'])
    : null
  if (!transactionType) errors.transactionType = 'Выберите тип сделки'

  const rooms = ENUMS.rooms.includes(input.rooms as any)
    ? (input.rooms as ValidatedFlat['rooms'])
    : null
  if (!rooms) errors.rooms = 'Выберите количество комнат'

  const currency = ENUMS.currency.includes(input.currency as any)
    ? (input.currency as ValidatedFlat['currency'])
    : ('RUB' as const)

  const buildingType = input.buildingType && ENUMS.buildingType.includes(input.buildingType as any)
    ? (input.buildingType as ValidatedFlat['buildingType'])
    : undefined

  const rentalSubtype = input.rentalSubtype && ENUMS.rentalSubtype.includes(input.rentalSubtype as any)
    ? (input.rentalSubtype as ValidatedFlat['rentalSubtype'])
    : undefined

  // Numbers
  const price = num(input.price)
  if (price === null || price < MIN_PRICE) {
    errors.price = `Цена: минимум ${MIN_PRICE} ₽`
  } else if (price > MAX_PRICE) {
    errors.price = 'Цена слишком большая. Проверьте.'
  }

  const areaTotal = num(input.areaTotal)
  if (areaTotal === null || areaTotal < 5) {
    errors.areaTotal = 'Площадь: минимум 5 м²'
  } else if (areaTotal > MAX_AREA) {
    errors.areaTotal = 'Площадь слишком большая. Проверьте.'
  }
  const areaLiving = num(input.areaLiving) ?? undefined
  const areaKitchen = num(input.areaKitchen) ?? undefined
  if (areaLiving !== undefined && areaTotal && areaLiving > areaTotal) {
    errors.areaLiving = 'Жилая площадь не может быть больше общей'
  }

  const floor = num(input.floor) ?? undefined
  const totalFloors = num(input.totalFloors) ?? undefined
  if (floor !== undefined && floor < 0) errors.floor = 'Этаж не может быть отрицательным'
  if (totalFloors !== undefined && totalFloors > MAX_FLOORS) {
    errors.totalFloors = `Этажей в доме: максимум ${MAX_FLOORS}`
  }
  if (floor !== undefined && totalFloors !== undefined && floor > totalFloors) {
    errors.floor = 'Этаж объекта не может быть выше общего числа этажей'
  }

  const yearBuilt = num(input.yearBuilt) ?? undefined
  const thisYear = new Date().getFullYear()
  if (yearBuilt !== undefined && (yearBuilt < 1800 || yearBuilt > thisYear + 10)) {
    errors.yearBuilt = `Год: между 1800 и ${thisYear + 10}`
  }

  const descriptionText = cleanText(input.description, MAX_TEXT_LEN)
  // description опционален но желателен; не блокируем save при пустом

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  // Building the validated payload.
  const slug = slugify(title)

  const data: ValidatedFlat = {
    title,
    slug,
    propertyCategory,
    transactionType: transactionType!,
    rooms: rooms!,
    location: { city, district, address, ...(metro ? { metro } : {}) },
    price: price!,
    currency,
    area: {
      total: areaTotal!,
      ...(areaLiving !== undefined ? { living: areaLiving } : {}),
      ...(areaKitchen !== undefined ? { kitchen: areaKitchen } : {}),
    },
    ...(floor !== undefined || totalFloors !== undefined
      ? {
          floorInfo: {
            ...(floor !== undefined ? { floor } : {}),
            ...(totalFloors !== undefined ? { totalFloors } : {}),
          },
        }
      : {}),
    ...(yearBuilt !== undefined ? { yearBuilt } : {}),
    ...(buildingType ? { buildingType } : {}),
    fromOwner: Boolean(input.fromOwner),
    noCommission: Boolean(input.noCommission),
    ...(rentalSubtype ? { rentalSubtype } : {}),
    description: descriptionText ? textToLexical(descriptionText) : textToLexical(''),
  }

  return { ok: true, data }
}

/** Доступные опции для UI селектов — единый источник истины. */
export const FLAT_OPTIONS = {
  propertyCategory: [
    { value: 'apartment', label: 'Квартира' },
    { value: 'apartments', label: 'Апартаменты' },
    { value: 'studio', label: 'Студия' },
    { value: 'townhouse', label: 'Таунхаус' },
    { value: 'penthouse', label: 'Пентхаус' },
    { value: 'house-part', label: 'Часть дома' },
  ],
  transactionType: [
    { value: 'sale', label: 'Продажа' },
    { value: 'rent', label: 'Долгосрочная аренда' },
    { value: 'daily', label: 'Посуточно' },
  ],
  rooms: [
    { value: 'studio', label: 'Студия' },
    { value: '1', label: '1 комната' },
    { value: '2', label: '2 комнаты' },
    { value: '3', label: '3 комнаты' },
    { value: '4', label: '4 комнаты' },
    { value: '5plus', label: '5+' },
  ],
  buildingType: [
    { value: 'panel', label: 'Панель' },
    { value: 'brick', label: 'Кирпич' },
    { value: 'monolithic', label: 'Монолит' },
    { value: 'block', label: 'Блок' },
    { value: 'wood', label: 'Дерево' },
  ],
  rentalSubtype: [
    { value: 'whole', label: 'Целиком' },
    { value: 'room', label: 'Комната' },
    { value: 'bed', label: 'Койко-место' },
  ],
} as const

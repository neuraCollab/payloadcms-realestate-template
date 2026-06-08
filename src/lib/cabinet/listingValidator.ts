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

/**
 * Принимает description в любой форме:
 *   • string (plain text) → оборачивает в простой Lexical paragraph
 *   • object (Lexical doc от клиента tiptap → htmlToLexical) →
 *     light-валидация: whitelist node types, ограничение длины текста.
 *
 * Возвращает Lexical JSON.
 */
const normalizeDescription = (input: any): Record<string, any> => {
  if (input && typeof input === 'object' && (input as any).root) {
    return sanitizeLexical(input)
  }
  // Строка — старый путь.
  const text = cleanText(input, MAX_TEXT_LEN)
  return textToLexical(text)
}

const ALLOWED_NODE_TYPES = new Set([
  'root',
  'paragraph',
  'heading',
  'list',
  'listitem',
  'text',
  'link',
  'linebreak',
])

const MAX_TEXT_NODE_LEN = MAX_TEXT_LEN

/** Whitelisted-walk по Lexical-дереву. Дропает неизвестные node types. */
function sanitizeLexical(doc: any): Record<string, any> {
  const root = doc.root
  if (!root || typeof root !== 'object') {
    return textToLexical('')
  }
  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: walkChildren(root.children),
    },
  }
}

function walkChildren(nodes: any): any[] {
  if (!Array.isArray(nodes)) return []
  const out: any[] = []
  for (const n of nodes) {
    if (!n || typeof n !== 'object') continue
    if (!ALLOWED_NODE_TYPES.has(n.type)) continue
    if (n.type === 'text') {
      const text = typeof n.text === 'string' ? n.text.slice(0, MAX_TEXT_NODE_LEN) : ''
      if (!text) continue
      const format = Number(n.format) | 0
      out.push({
        type: 'text',
        version: 1,
        text,
        format,
        style: '',
        mode: 'normal',
        detail: 0,
      })
    } else if (n.type === 'linebreak') {
      out.push({ type: 'linebreak', version: 1 })
    } else if (n.type === 'link') {
      const url = typeof n.url === 'string' ? n.url : ''
      if (!url || /^(javascript|data|vbscript):/i.test(url.trim())) continue
      out.push({
        type: 'link',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        url,
        rel: 'noopener noreferrer',
        target: '_blank',
        children: walkChildren(n.children),
      })
    } else if (n.type === 'list') {
      const listType = n.listType === 'number' ? 'number' : 'bullet'
      out.push({
        type: 'list',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        listType,
        tag: listType === 'number' ? 'ol' : 'ul',
        start: 1,
        children: walkChildren(n.children),
      })
    } else if (n.type === 'listitem') {
      out.push({
        type: 'listitem',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        value: typeof n.value === 'number' ? n.value : 1,
        children: walkChildren(n.children),
      })
    } else if (n.type === 'heading') {
      const tag = n.tag === 'h3' ? 'h3' : 'h2'
      out.push({
        type: 'heading',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        tag,
        children: walkChildren(n.children),
      })
    } else if (n.type === 'paragraph') {
      out.push({
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: walkChildren(n.children),
      })
    }
  }
  return out
}

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

  const descriptionDoc = normalizeDescription(input.description)
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
    description: descriptionDoc,
  }

  return { ok: true, data }
}

// ─── House (частные дома) ────────────────────────────────────────────

export interface DraftHouseInput {
  title?: string
  houseType?: string
  transactionType?: string
  city?: string
  district?: string
  address?: string
  price?: number | string
  currency?: string
  areaTotal?: number | string
  areaLand?: number | string
  bedrooms?: number | string
  bathrooms?: number | string
  floors?: number | string
  yearBuilt?: number | string
  material?: string
  fromOwner?: boolean
  noCommission?: boolean
  description?: string
}

export interface ValidatedHouse {
  title: string
  slug: string
  houseType: 'cottage' | 'townhouse' | 'dacha' | 'detached'
  transactionType: 'sale' | 'rent' | 'daily'
  location: { city: string; district: string; address: string }
  price: number
  currency: 'RUB' | 'USD' | 'EUR'
  area: { total: number; land?: number }
  bedrooms?: number
  bathrooms?: number
  floors?: number
  yearBuilt?: number
  material?: 'brick' | 'wood' | 'frame' | 'aerocrete' | 'monolithic'
  fromOwner: boolean
  noCommission: boolean
  description: Record<string, any>
}

const HOUSE_ENUMS = {
  houseType: ['cottage', 'townhouse', 'dacha', 'detached'],
  transactionType: ['sale', 'rent', 'daily'],
  currency: ['RUB', 'USD', 'EUR'],
  material: ['brick', 'wood', 'frame', 'aerocrete', 'monolithic'],
} as const

export function validateHouseDraft(
  input: DraftHouseInput,
):
  | { ok: true; data: ValidatedHouse }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  const title = cleanText(input.title, MAX_TITLE_LEN)
  if (title.length < 10) errors.title = 'Заголовок: минимум 10 символов'
  const city = cleanText(input.city, 80)
  if (!city) errors.city = 'Город обязателен'
  const district = cleanText(input.district, 120)
  if (!district) errors.district = 'Район обязателен'
  const address = cleanText(input.address, 200)
  if (!address) errors.address = 'Адрес обязателен'

  const houseType = HOUSE_ENUMS.houseType.includes(input.houseType as any)
    ? (input.houseType as ValidatedHouse['houseType'])
    : ('cottage' as const)

  const transactionType = HOUSE_ENUMS.transactionType.includes(input.transactionType as any)
    ? (input.transactionType as ValidatedHouse['transactionType'])
    : null
  if (!transactionType) errors.transactionType = 'Выберите тип сделки'

  const currency = HOUSE_ENUMS.currency.includes(input.currency as any)
    ? (input.currency as ValidatedHouse['currency'])
    : ('RUB' as const)

  const material = input.material && HOUSE_ENUMS.material.includes(input.material as any)
    ? (input.material as ValidatedHouse['material'])
    : undefined

  const price = num(input.price)
  if (price === null || price < MIN_PRICE) errors.price = `Цена: минимум ${MIN_PRICE} ₽`
  else if (price > MAX_PRICE) errors.price = 'Цена слишком большая'

  const areaTotal = num(input.areaTotal)
  if (areaTotal === null || areaTotal < 10) errors.areaTotal = 'Площадь дома: минимум 10 м²'

  const areaLand = num(input.areaLand) ?? undefined
  if (areaLand !== undefined && (areaLand < 0 || areaLand > 100_000)) {
    errors.areaLand = 'Участок: от 0 до 100 000 соток'
  }

  const bedrooms = num(input.bedrooms) ?? undefined
  if (bedrooms !== undefined && (bedrooms < 0 || bedrooms > 50)) errors.bedrooms = 'Спальни: 0-50'
  const bathrooms = num(input.bathrooms) ?? undefined
  if (bathrooms !== undefined && (bathrooms < 0 || bathrooms > 50)) errors.bathrooms = 'Санузлы: 0-50'
  const floors = num(input.floors) ?? undefined
  if (floors !== undefined && (floors < 1 || floors > 10)) errors.floors = 'Этажей: 1-10'

  const yearBuilt = num(input.yearBuilt) ?? undefined
  const thisYear = new Date().getFullYear()
  if (yearBuilt !== undefined && (yearBuilt < 1800 || yearBuilt > thisYear + 10)) {
    errors.yearBuilt = `Год: 1800–${thisYear + 10}`
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const descriptionDoc = normalizeDescription(input.description)
  return {
    ok: true,
    data: {
      title,
      slug: slugify(title),
      houseType,
      transactionType: transactionType!,
      location: { city, district, address },
      price: price!,
      currency,
      area: { total: areaTotal!, ...(areaLand !== undefined ? { land: areaLand } : {}) },
      ...(bedrooms !== undefined ? { bedrooms } : {}),
      ...(bathrooms !== undefined ? { bathrooms } : {}),
      ...(floors !== undefined ? { floors } : {}),
      ...(yearBuilt !== undefined ? { yearBuilt } : {}),
      ...(material ? { material } : {}),
      fromOwner: Boolean(input.fromOwner),
      noCommission: Boolean(input.noCommission),
      description: descriptionDoc,
    },
  }
}

// ─── Commercial ──────────────────────────────────────────────────────

export interface DraftCommercialInput {
  title?: string
  commercialType?: string
  transactionType?: string
  city?: string
  district?: string
  address?: string
  price?: number | string
  currency?: string
  priceType?: string
  areaTotal?: number | string
  areaUsable?: number | string
  floor?: number | string
  description?: string
}

export interface ValidatedCommercial {
  title: string
  slug: string
  commercialType: 'office' | 'retail' | 'warehouse' | 'production' | 'restaurant' | 'free'
  transactionType: 'sale' | 'rent'
  location: { city: string; district: string; address: string }
  area: { total: number; usable?: number }
  price: number
  currency: 'RUB' | 'USD' | 'EUR'
  priceType?: 'total' | 'per_m'
  floor?: number
  description: Record<string, any>
}

const COMMERCIAL_ENUMS = {
  commercialType: ['office', 'retail', 'warehouse', 'production', 'restaurant', 'free'],
  transactionType: ['sale', 'rent'],
  currency: ['RUB', 'USD', 'EUR'],
  priceType: ['total', 'per_m'],
} as const

export function validateCommercialDraft(
  input: DraftCommercialInput,
):
  | { ok: true; data: ValidatedCommercial }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  const title = cleanText(input.title, MAX_TITLE_LEN)
  if (title.length < 10) errors.title = 'Заголовок: минимум 10 символов'
  const city = cleanText(input.city, 80)
  if (!city) errors.city = 'Город обязателен'
  const district = cleanText(input.district, 120)
  if (!district) errors.district = 'Район обязателен'
  const address = cleanText(input.address, 200)
  if (!address) errors.address = 'Адрес обязателен'

  const commercialType = COMMERCIAL_ENUMS.commercialType.includes(input.commercialType as any)
    ? (input.commercialType as ValidatedCommercial['commercialType'])
    : null
  if (!commercialType) errors.commercialType = 'Выберите тип помещения'

  const transactionType = COMMERCIAL_ENUMS.transactionType.includes(input.transactionType as any)
    ? (input.transactionType as ValidatedCommercial['transactionType'])
    : null
  if (!transactionType) errors.transactionType = 'Выберите тип сделки'

  const currency = COMMERCIAL_ENUMS.currency.includes(input.currency as any)
    ? (input.currency as ValidatedCommercial['currency'])
    : ('RUB' as const)
  const priceType = COMMERCIAL_ENUMS.priceType.includes(input.priceType as any)
    ? (input.priceType as ValidatedCommercial['priceType'])
    : ('total' as const)

  const price = num(input.price)
  if (price === null || price < MIN_PRICE) errors.price = `Цена: минимум ${MIN_PRICE} ₽`
  else if (price > MAX_PRICE) errors.price = 'Цена слишком большая'

  const areaTotal = num(input.areaTotal)
  if (areaTotal === null || areaTotal < 5) errors.areaTotal = 'Площадь: минимум 5 м²'
  const areaUsable = num(input.areaUsable) ?? undefined
  if (areaUsable !== undefined && areaTotal !== null && areaUsable > areaTotal) {
    errors.areaUsable = 'Полезная площадь не может быть больше общей'
  }

  const floor = num(input.floor) ?? undefined

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const descriptionDoc = normalizeDescription(input.description)
  return {
    ok: true,
    data: {
      title,
      slug: slugify(title),
      commercialType: commercialType!,
      transactionType: transactionType!,
      location: { city, district, address },
      area: { total: areaTotal!, ...(areaUsable !== undefined ? { usable: areaUsable } : {}) },
      price: price!,
      currency,
      priceType,
      ...(floor !== undefined ? { floor } : {}),
      description: descriptionDoc,
    },
  }
}

// ─── Lands ───────────────────────────────────────────────────────────

export interface DraftLandInput {
  title?: string
  purpose?: string
  city?: string
  district?: string
  address?: string
  area?: number | string
  price?: number | string
  description?: string
}

export interface ValidatedLand {
  title: string
  slug: string
  // Значения должны совпадать с enum_lands_purpose в БД
  // (см. initial migration: ijs, snt, lph, commercial, agricultural).
  purpose: 'ijs' | 'snt' | 'lph' | 'agricultural' | 'commercial'
  location: { city: string; district: string; address?: string }
  area: number // соток
  price: number
  description: Record<string, any>
}

const LAND_ENUMS = {
  purpose: ['ijs', 'snt', 'lph', 'agricultural', 'commercial'],
} as const

export function validateLandDraft(
  input: DraftLandInput,
):
  | { ok: true; data: ValidatedLand }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  const title = cleanText(input.title, MAX_TITLE_LEN)
  if (title.length < 10) errors.title = 'Заголовок: минимум 10 символов'
  const city = cleanText(input.city, 80)
  if (!city) errors.city = 'Город обязателен'
  const district = cleanText(input.district, 120)
  if (!district) errors.district = 'Район обязателен'
  const address = cleanText(input.address, 200)

  const purpose = LAND_ENUMS.purpose.includes(input.purpose as any)
    ? (input.purpose as ValidatedLand['purpose'])
    : null
  if (!purpose) errors.purpose = 'Выберите назначение участка'

  const price = num(input.price)
  if (price === null || price < MIN_PRICE) errors.price = `Цена: минимум ${MIN_PRICE} ₽`

  const area = num(input.area)
  if (area === null || area < 1) errors.area = 'Площадь: минимум 1 сотка'
  else if (area > 100_000) errors.area = 'Площадь слишком большая'

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const descriptionDoc = normalizeDescription(input.description)
  return {
    ok: true,
    data: {
      title,
      slug: slugify(title),
      purpose: purpose!,
      location: { city, district, ...(address ? { address } : {}) },
      area: area!,
      price: price!,
      description: descriptionDoc,
    },
  }
}

// ─── Generic router ──────────────────────────────────────────────────

export type ListingCollection = 'flats' | 'houses' | 'commercial' | 'lands'

export const isListingCollection = (s: any): s is ListingCollection =>
  s === 'flats' || s === 'houses' || s === 'commercial' || s === 'lands'

/** Один валидатор-фасад — берём collection, вызываем нужную проверку. */
export function validateDraft(
  collection: ListingCollection,
  input: any,
):
  | { ok: true; data: any }
  | { ok: false; errors: Record<string, string> } {
  switch (collection) {
    case 'flats':
      return validateFlatDraft(input)
    case 'houses':
      return validateHouseDraft(input)
    case 'commercial':
      return validateCommercialDraft(input)
    case 'lands':
      return validateLandDraft(input)
  }
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

export const HOUSE_OPTIONS = {
  houseType: [
    { value: 'cottage', label: 'Коттедж' },
    { value: 'townhouse', label: 'Таунхаус' },
    { value: 'dacha', label: 'Дача' },
    { value: 'detached', label: 'Отдельный дом' },
  ],
  transactionType: [
    { value: 'sale', label: 'Продажа' },
    { value: 'rent', label: 'Долгосрочная аренда' },
    { value: 'daily', label: 'Посуточно' },
  ],
  material: [
    { value: 'brick', label: 'Кирпич' },
    { value: 'wood', label: 'Дерево/бревно' },
    { value: 'frame', label: 'Каркас' },
    { value: 'aerocrete', label: 'Газобетон' },
    { value: 'monolithic', label: 'Монолит' },
  ],
} as const

export const COMMERCIAL_OPTIONS = {
  commercialType: [
    { value: 'office', label: 'Офис' },
    { value: 'retail', label: 'Торговое помещение' },
    { value: 'warehouse', label: 'Склад' },
    { value: 'production', label: 'Производство' },
    { value: 'restaurant', label: 'Общепит' },
    { value: 'free', label: 'Свободного назначения' },
  ],
  transactionType: [
    { value: 'sale', label: 'Продажа' },
    { value: 'rent', label: 'Аренда' },
  ],
  priceType: [
    { value: 'total', label: 'Полная цена' },
    { value: 'per_m', label: 'За м²' },
  ],
} as const

export const LAND_OPTIONS = {
  purpose: [
    { value: 'ijs', label: 'ИЖС' },
    { value: 'snt', label: 'СНТ/ДНП' },
    { value: 'lph', label: 'ЛПХ' },
    { value: 'agricultural', label: 'Сельхоз назначения' },
    { value: 'commercial', label: 'Коммерческая' },
  ],
} as const

/** Метки коллекций для UI / навигации. */
export const COLLECTION_LABELS: Record<ListingCollection, string> = {
  flats: 'Квартира',
  houses: 'Дом',
  commercial: 'Коммерческая',
  lands: 'Участок',
}

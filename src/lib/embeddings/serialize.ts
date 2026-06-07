import { createHash } from 'node:crypto'

/**
 * Серилизация документа недвижимости в человекочитаемый текст для
 * embedding. Один документ → одна короткая «карточка» из 3-7
 * предложений: title, тип, расположение, характеристики, описание,
 * удобства, цена.
 *
 * Текст потом векторизуется BGE-M3. Цель — максимум семантики при
 * минимуме токенов: не льём JSON, льём естественный язык.
 */

export type SupportedCollection =
  | 'flats'
  | 'commercial'
  | 'lands'
  | 'residential-complexes'

// ─── Лексический extractor ───
// Payload v3 использует Lexical JSON-ноды. Универсально проходим
// дерево и собираем все text-ноды. Работает и для Slate (старого
// формата) — там тоже есть text поля.
function extractRichText(node: unknown): string {
  if (node == null) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractRichText).join(' ')
  if (typeof node !== 'object') return ''
  const obj = node as Record<string, unknown>
  if (typeof obj.text === 'string') return obj.text as string
  // Lexical: children
  if (Array.isArray(obj.children)) return extractRichText(obj.children)
  // Root wrapper
  if (obj.root) return extractRichText(obj.root)
  return ''
}

// ─── Лейблы для select-полей ───
const ROOM: Record<string, string> = {
  studio: 'студия',
  '1': '1 комната',
  '2': '2 комнаты',
  '3': '3 комнаты',
  '4': '4 комнаты',
  '5plus': '5 и более комнат',
}
const TX: Record<string, string> = {
  sale: 'продажа',
  rent: 'долгосрочная аренда',
  daily: 'посуточная аренда',
}
const PROPERTY_CATEGORY: Record<string, string> = {
  apartment: 'квартира',
  apartments: 'апартаменты',
  studio: 'студия',
  townhouse: 'таунхаус',
  penthouse: 'пентхаус',
  'house-part': 'часть дома',
}
const BUILDING: Record<string, string> = {
  panel: 'панельный дом',
  brick: 'кирпичный дом',
  monolithic: 'монолитный дом',
  block: 'блочный дом',
  wood: 'деревянный дом',
}
const COMMERCIAL_TYPE: Record<string, string> = {
  office: 'офис',
  retail: 'торговое помещение',
  warehouse: 'склад',
  'free-purpose': 'помещение свободного назначения',
  catering: 'общепит',
}
const LAND_PURPOSE: Record<string, string> = {
  ijs: 'ИЖС',
  snt: 'СНТ',
  lph: 'ЛПХ',
  commercial: 'коммерческое назначение',
  agricultural: 'сельхоз назначение',
}

const fmtPrice = (n?: number): string | null => {
  if (typeof n !== 'number') return null
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽'
}

const join = (parts: Array<string | null | undefined>): string =>
  parts.filter((s): s is string => !!s && s.trim().length > 0).join('. ')

// ─── Per-collection serializers ───

function serializeFlat(doc: any): string {
  const parts: Array<string | null> = []
  parts.push(doc.title)

  const cat = PROPERTY_CATEGORY[doc.propertyCategory] ?? null
  const tx = TX[doc.transactionType] ?? null
  const rooms = ROOM[doc.rooms] ?? null
  const head = [cat, rooms].filter(Boolean).join(', ')
  if (head || tx) parts.push(`${head}${tx ? ` — ${tx}` : ''}`)

  const loc = doc.location ?? {}
  const locParts = [loc.city, loc.district, loc.address].filter(Boolean)
  if (locParts.length) parts.push(`Расположение: ${locParts.join(', ')}`)
  if (loc.metro)
    parts.push(`Метро ${loc.metro}${loc.metroTime ? `, ${loc.metroTime} мин` : ''}`)

  const area: string[] = []
  if (doc.area?.total) area.push(`${doc.area.total} м² общая`)
  if (doc.area?.living) area.push(`${doc.area.living} м² жилая`)
  if (doc.area?.kitchen) area.push(`${doc.area.kitchen} м² кухня`)
  if (area.length) parts.push(`Площадь: ${area.join(', ')}`)

  if (doc.floorInfo?.floor)
    parts.push(
      `Этаж ${doc.floorInfo.floor}` +
        (doc.floorInfo.totalFloors ? ` из ${doc.floorInfo.totalFloors}` : ''),
    )
  if (doc.buildingType && BUILDING[doc.buildingType])
    parts.push(BUILDING[doc.buildingType])
  if (doc.yearBuilt) parts.push(`Год постройки ${doc.yearBuilt}`)
  if (doc.ceilingHeight) parts.push(`Высота потолков ${doc.ceilingHeight} м`)

  const descText = extractRichText(doc.description).trim()
  if (descText) parts.push(descText.slice(0, 1500))

  const amenities = Array.isArray(doc.amenities)
    ? doc.amenities
        .map((a: any) => (typeof a === 'string' ? a : a?.amenity))
        .filter((s: unknown): s is string => typeof s === 'string')
    : []
  if (amenities.length) parts.push(`Удобства: ${amenities.join(', ')}`)

  const price = fmtPrice(doc.price)
  if (price) parts.push(`Цена ${price}`)
  if (doc.fromOwner) parts.push('от собственника')
  if (doc.noCommission) parts.push('без комиссии')

  return join(parts)
}

function serializeCommercial(doc: any): string {
  const parts: Array<string | null> = []
  parts.push(doc.title)
  const type = COMMERCIAL_TYPE[doc.commercialType] ?? null
  const tx = TX[doc.transactionType] ?? null
  if (type || tx) parts.push([type, tx].filter(Boolean).join(' — '))

  const loc = doc.location ?? {}
  const locParts = [loc.city, loc.district, loc.address].filter(Boolean)
  if (locParts.length) parts.push(`Расположение: ${locParts.join(', ')}`)

  if (doc.area?.total) parts.push(`Общая площадь ${doc.area.total} м²`)
  if (doc.area?.usable) parts.push(`Полезная площадь ${doc.area.usable} м²`)
  if (doc.area?.land) parts.push(`Площадь участка ${doc.area.land} сот.`)
  if (doc.floor) parts.push(`Этаж ${doc.floor}`)
  if (doc.ceilingHeight) parts.push(`Потолки ${doc.ceilingHeight} м`)
  if (doc.entranceType) parts.push(`Вход: ${doc.entranceType}`)
  if (doc.condition) parts.push(`Состояние: ${doc.condition}`)

  const desc = extractRichText(doc.description).trim()
  if (desc) parts.push(desc.slice(0, 1500))

  const price = fmtPrice(doc.price)
  if (price) parts.push(`Цена ${price}`)

  return join(parts)
}

function serializeLand(doc: any): string {
  const parts: Array<string | null> = []
  parts.push(doc.title)
  const purpose = LAND_PURPOSE[doc.purpose] ?? doc.purpose ?? null
  if (purpose) parts.push(`Назначение: ${purpose}`)

  const loc = doc.location ?? {}
  const locParts = [loc.city, loc.district, loc.address].filter(Boolean)
  if (locParts.length) parts.push(`Расположение: ${locParts.join(', ')}`)

  if (typeof doc.area === 'number') parts.push(`Площадь ${doc.area} сот.`)

  const desc = extractRichText(doc.description).trim()
  if (desc) parts.push(desc.slice(0, 1500))

  const price = fmtPrice(doc.price)
  if (price) parts.push(`Цена ${price}`)

  return join(parts)
}

function serializeResidentialComplex(doc: any): string {
  const parts: Array<string | null> = []
  parts.push(doc.title ?? doc.name)
  if (doc.type) parts.push(`Тип ЖК: ${doc.type}`)
  if (doc.status) parts.push(`Статус: ${doc.status}`)
  if (doc.developer) parts.push(`Застройщик: ${doc.developer}`)

  const loc = doc.location ?? {}
  const locParts = [loc.city, loc.district, loc.address].filter(Boolean)
  if (locParts.length) parts.push(`Расположение: ${locParts.join(', ')}`)

  if (doc.completionDate) parts.push(`Сдача: ${doc.completionDate}`)

  const desc = extractRichText(doc.description).trim()
  if (desc) parts.push(desc.slice(0, 1500))

  return join(parts)
}

const SERIALIZERS: Record<SupportedCollection, (doc: any) => string> = {
  flats: serializeFlat,
  commercial: serializeCommercial,
  lands: serializeLand,
  'residential-complexes': serializeResidentialComplex,
}

export function serializeDoc(
  collection: SupportedCollection,
  doc: any,
): string {
  const fn = SERIALIZERS[collection]
  if (!fn) throw new Error(`No serializer for ${collection}`)
  return fn(doc).slice(0, 4000) // safety cap
}

export function hashText(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

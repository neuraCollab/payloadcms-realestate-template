// Rule-based Russian description generator for the Flats collection.
// Takes a flat's structured fields and produces Lexical-rich-text suitable
// for direct insertion into `data.description`.
//
// The result has three paragraphs:
//   1. Lead — what's on offer, where, headline number.
//   2. Specifics — area, floor, building.
//   3. Amenities + closing line.

const ROOMS_LABEL: Record<string, string> = {
  studio: 'студия',
  '1': 'однокомнатная квартира',
  '2': 'двухкомнатная квартира',
  '3': 'трёхкомнатная квартира',
  '4': 'четырёхкомнатная квартира',
  '5plus': 'многокомнатная квартира',
}

const CATEGORY_LABEL: Record<string, string> = {
  apartment: 'квартира',
  apartments: 'апартаменты',
  studio: 'студия',
  townhouse: 'таунхаус',
  penthouse: 'пентхаус',
  'house-part': 'часть дома',
}

const BUILDING_LABEL: Record<string, string> = {
  panel: 'панельном',
  brick: 'кирпичном',
  monolithic: 'монолитном',
  block: 'блочном',
  wood: 'деревянном',
}

const TRANSACTION_LEAD: Record<string, string> = {
  sale: 'Предлагается к продаже',
  rent: 'Сдаётся в долгосрочную аренду',
  daily: 'Сдаётся посуточно',
}

const para = (text: string) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [
    {
      mode: 'normal',
      text,
      type: 'text',
      style: '',
      detail: 0,
      format: 0,
      version: 1,
    },
  ],
})

const lexicalDoc = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: paragraphs.filter((p) => p.length > 0).map(para),
  },
})

export interface FlatInputForDescription {
  title?: string
  propertyCategory?: string
  transactionType?: string
  rooms?: string
  area?: { total?: number; living?: number; kitchen?: number } | null
  floorInfo?: { floor?: number; totalFloors?: number } | null
  buildingType?: string
  yearBuilt?: number
  ceilingHeight?: number
  location?: {
    city?: string
    district?: string
    address?: string
    metro?: string
    metroTime?: number
  } | null
  amenities?: Array<{ amenity: string }>
}

export const describeFlat = (data: FlatInputForDescription) => {
  const lead = buildLead(data)
  const specs = buildSpecs(data)
  const closing = buildClosing(data)
  return lexicalDoc([lead, specs, closing])
}

const buildLead = (d: FlatInputForDescription): string => {
  const start = TRANSACTION_LEAD[d.transactionType ?? 'sale'] ?? 'Объявление'
  const subject =
    (d.rooms && ROOMS_LABEL[d.rooms]) ||
    (d.propertyCategory && CATEGORY_LABEL[d.propertyCategory]) ||
    'объект недвижимости'

  const where =
    d.location?.district && d.location?.city
      ? `в районе «${d.location.district}» города ${d.location.city}`
      : d.location?.city
      ? `в городе ${d.location.city}`
      : ''

  const tail = d.location?.address ? `. Точный адрес: ${d.location.address}.` : '.'
  return `${start} ${subject}${where ? ' ' + where : ''}${tail}`
}

const buildSpecs = (d: FlatInputForDescription): string => {
  const bits: string[] = []
  if (d.area?.total) bits.push(`Общая площадь — ${d.area.total} м²`)
  if (d.area?.living) bits.push(`жилая ${d.area.living} м²`)
  if (d.area?.kitchen) bits.push(`кухня ${d.area.kitchen} м²`)
  if (d.floorInfo?.floor && d.floorInfo?.totalFloors) {
    bits.push(`расположена на ${d.floorInfo.floor} этаже из ${d.floorInfo.totalFloors}`)
  } else if (d.floorInfo?.floor) {
    bits.push(`${d.floorInfo.floor} этаж`)
  }
  if (d.buildingType && BUILDING_LABEL[d.buildingType]) {
    bits.push(`в ${BUILDING_LABEL[d.buildingType]} доме`)
  }
  if (d.yearBuilt) bits.push(`${d.yearBuilt} года постройки`)
  if (d.ceilingHeight) bits.push(`высота потолков ${d.ceilingHeight} м`)

  if (bits.length === 0) return ''
  // Capitalize first letter, period at end.
  const sentence = bits[0] + (bits.length > 1 ? '; ' + bits.slice(1).join(', ') : '') + '.'
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}

const buildClosing = (d: FlatInputForDescription): string => {
  const parts: string[] = []
  const amenityList = (d.amenities ?? [])
    .map((a) => a.amenity?.trim())
    .filter((a): a is string => !!a)
  if (amenityList.length > 0) {
    parts.push(`В квартире: ${amenityList.join(', ').toLowerCase()}.`)
  }
  if (d.location?.metro) {
    const m = d.location.metroTime
      ? `${prettyMetroTime(d.location.metroTime)} от метро «${d.location.metro}»`
      : `рядом метро «${d.location.metro}»`
    parts.push(m.charAt(0).toUpperCase() + m.slice(1) + '.')
  }
  parts.push('Звоните, договоримся о просмотре в удобное для вас время.')
  return parts.join(' ')
}

const prettyMetroTime = (mins: number) => {
  if (mins <= 0) return 'у самого входа'
  if (mins < 5) return `${mins} минут пешком`
  if (mins < 15) return `${mins} минут пешком`
  if (mins < 30) return `${mins} минут (пешком/транспортом)`
  return `${mins} минут (транспортом)`
}

/**
 * Rule-based extractor: NL-запрос → структурные фильтры.
 *
 * Перед матчингом текст пропускаем через стеммер (см. ./stemmer) —
 * это нормализует все падежные и числовые окончания: «москве»→«москв»,
 * «двушками»→«двушк». Поэтому regex-ы пишем на корнях.
 *
 * Когда подключим LLM — заменим только эту функцию. Сигнатура
 * `(prompt: string, previous: Partial<ParsedQuery>) => ParsedQuery`
 * останется без изменений.
 */

import { stemRussianText } from './stemmer'

export type SupportedCollection =
  | 'flats'
  | 'commercial'
  | 'lands'
  | 'residential-complexes'

export interface ParsedQuery {
  city?: string
  district?: string
  rooms?: 'studio' | '1' | '2' | '3' | '4' | '5plus'
  transactionType?: 'sale' | 'rent' | 'daily'
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  collections?: SupportedCollection[]
}

// Unicode-aware boundary aliases. Кириллица не word-char для \b в JS.
const LB = '(?<![а-яёa-z0-9])'
const RB = '(?![а-яёa-z0-9])'
const re = (pattern: string): RegExp => new RegExp(pattern, 'iu')

// Все patterns теперь на «стемнутых» корнях — после `stemRussianText`
// «москве» становится «москв», «двушку» → «двушк». Pattern matches
// корень + опциональное гласное окончание (если стеммер пропустил
// — например, если суффикса нет в списке).
const CITY_ALIASES: Array<{ rx: RegExp; canonical: string }> = [
  { rx: re(`${LB}москв`), canonical: 'Москва' },
  { rx: re(`${LB}мск${RB}`), canonical: 'Москва' },
  { rx: re(`${LB}питер|${LB}спб${RB}|санкт-петербург|ленинград`), canonical: 'Санкт-Петербург' },
  { rx: re(`${LB}кимр`), canonical: 'Кимры' },
  { rx: re(`${LB}сочи${RB}`), canonical: 'Сочи' },
  { rx: re(`${LB}казан`), canonical: 'Казань' },
  { rx: re(`${LB}екатеринбург|${LB}екб${RB}`), canonical: 'Екатеринбург' },
  { rx: re(`${LB}новосибирск`), canonical: 'Новосибирск' },
  { rx: re(`${LB}нижний\\s+новгород`), canonical: 'Нижний Новгород' },
]

const ROOM_PATTERNS: Array<{ rx: RegExp; rooms: ParsedQuery['rooms'] }> = [
  { rx: re(`${LB}студи${RB}`), rooms: 'studio' },
  { rx: re(`${LB}однуш|${LB}однокомнат|${LB}одн\\s*комн`), rooms: '1' },
  { rx: re(`${LB}двух|${LB}двушк|${LB}двукомнат`), rooms: '2' },
  { rx: re(`${LB}трёх|${LB}трех|${LB}трёшк|${LB}трешк|${LB}трехкомнат|${LB}трёхкомнат`), rooms: '3' },
  { rx: re(`${LB}четырёх|${LB}четырех|${LB}четырёхкомнат|${LB}четырехкомнат`), rooms: '4' },
  // Числовые формы — цифра без падежных окончаний.
  { rx: re(`${LB}1\\s*(?:к|комн)`), rooms: '1' },
  { rx: re(`${LB}2\\s*(?:к|комн)`), rooms: '2' },
  { rx: re(`${LB}3\\s*(?:к|комн)`), rooms: '3' },
  { rx: re(`${LB}4\\s*(?:к|комн)`), rooms: '4' },
  { rx: re(`${LB}5\\s*(?:к|комн)|${LB}5\\+`), rooms: '5plus' },
]

function parseRooms(text: string): ParsedQuery['rooms'] | undefined {
  for (const { rx, rooms } of ROOM_PATTERNS) if (rx.test(text)) return rooms
  return undefined
}

function parseCity(text: string): string | undefined {
  for (const { rx, canonical } of CITY_ALIASES)
    if (rx.test(text)) return canonical
  return undefined
}

function parseTransaction(text: string): ParsedQuery['transactionType'] | undefined {
  // Корни: «посуточн», «сним», «снят», «арендова», «прод», «куп», «покуп».
  if (re(`${LB}посуточн|${LB}на\\s+сутк`).test(text)) return 'daily'
  if (re(`${LB}аренд|${LB}сним|${LB}снят|${LB}снима`).test(text)) return 'rent'
  if (re(`${LB}прод|${LB}куп|${LB}куплю|${LB}покуп`).test(text)) return 'sale'
  return undefined
}

function scaleMoney(numRaw: string, unit?: string): number {
  const n = parseFloat(numRaw.replace(',', '.'))
  switch ((unit ?? '').toLowerCase()) {
    case 'млн':
      return Math.round(n * 1_000_000)
    case 'млрд':
      return Math.round(n * 1_000_000_000)
    case 'тыс':
    case 'к':
      return Math.round(n * 1_000)
    default:
      return Math.round(n)
  }
}

const AREA_TAIL = '(?!\\s*(?:м²|м2|кв|сот))'

function parseMaxPrice(text: string): number | undefined {
  const m = text.match(
    re(`${LB}до\\s+(\\d+(?:[.,]\\d+)?)\\s*(млн|млрд|тыс|к)?${AREA_TAIL}`),
  )
  return m ? scaleMoney(m[1]!, m[2]) : undefined
}

function parseMinPrice(text: string): number | undefined {
  const m = text.match(
    re(`${LB}от\\s+(\\d+(?:[.,]\\d+)?)\\s*(млн|млрд|тыс|к)?${AREA_TAIL}`),
  )
  return m ? scaleMoney(m[1]!, m[2]) : undefined
}

function parseArea(text: string): { minArea?: number; maxArea?: number } {
  const out: { minArea?: number; maxArea?: number } = {}
  const min = text.match(re(`${LB}от\\s+(\\d+)\\s*(?:м2|м²|кв|сот)`))
  const max = text.match(re(`${LB}до\\s+(\\d+)\\s*(?:м2|м²|кв|сот)`))
  if (min) out.minArea = parseInt(min[1]!, 10)
  if (max) out.maxArea = parseInt(max[1]!, 10)
  return out
}

function parseCollections(text: string): SupportedCollection[] | undefined {
  const out = new Set<SupportedCollection>()
  if (re(`${LB}квартир|${LB}студи|${LB}двушк|${LB}трешк|${LB}трёшк|${LB}однушк`).test(text))
    out.add('flats')
  if (re(`${LB}дом${RB}|${LB}таунхаус|${LB}коттедж|${LB}новостро|${LB}жил\\s*комплекс|${LB}жк${RB}`).test(text))
    out.add('residential-complexes')
  if (re(`${LB}земл|${LB}участ|${LB}ИЖС${RB}|${LB}снт${RB}|${LB}дач`).test(text))
    out.add('lands')
  if (re(`${LB}коммер|${LB}офис|${LB}склад|${LB}ритейл|${LB}торгов|${LB}общепит`).test(text))
    out.add('commercial')
  return out.size > 0 ? Array.from(out) : undefined
}

export function parsePrompt(
  prompt: string,
  previous: Partial<ParsedQuery> = {},
): ParsedQuery {
  // Нормализация: lowercase + ё→е + стемминг.
  // Пробелы по краям для корректных lookbehind/lookahead на границах.
  const normalized = prompt.toLowerCase().replace(/ё/g, 'е')
  const text = ` ${stemRussianText(normalized)} `
  const q: ParsedQuery = { ...previous }

  const city = parseCity(text)
  if (city) q.city = city
  const rooms = parseRooms(text)
  if (rooms) q.rooms = rooms
  const tx = parseTransaction(text)
  if (tx) q.transactionType = tx

  const max = parseMaxPrice(text)
  if (max !== undefined) q.maxPrice = max
  const min = parseMinPrice(text)
  if (min !== undefined) q.minPrice = min

  const { minArea, maxArea } = parseArea(text)
  if (minArea !== undefined) q.minArea = minArea
  if (maxArea !== undefined) q.maxArea = maxArea

  const collections = parseCollections(text)
  if (collections) q.collections = collections

  // Уточнения «подешевле»/«подороже» — на оригинальном тексте,
  // потому что стеммер их подрезает до базы.
  if (/дешевл|подешевл/iu.test(normalized) && q.maxPrice)
    q.maxPrice = Math.round(q.maxPrice * 0.8)
  if (/подорож|подороже/iu.test(normalized) && q.minPrice)
    q.minPrice = Math.round(q.minPrice * 1.2)

  return q
}

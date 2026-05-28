// Parses Russian-style filter slugs that appear after a city slug in the URL.
//
//   /kimry/arenda-kvartir            → { transactionType: 'rent',  category: 'flats' }
//   /kimry/prodazha-kvartir          → { transactionType: 'sale',  category: 'flats' }
//   /kimry/prodazha-kommercheskoy    → { transactionType: 'sale',  category: 'commercial' }
//   /kimry/uchastki                  → {                            category: 'lands' }
//   /kimry/zhiloy-kompleks           → {                            category: 'residential-complexes' }
//
// Returns null if the slug doesn't match any known pattern.

import type { PropertyType } from '@/components/PropertyFilters/schemas'

export interface ParsedFilterSlug {
  category: PropertyType
  transactionType?: 'sale' | 'rent'
  label: string
}

// Each entry is matched literally against the URL segment.
const FILTER_SLUGS: Record<string, Omit<ParsedFilterSlug, never>> = {
  // Flats
  'arenda-kvartir': { category: 'flats', transactionType: 'rent', label: 'Аренда квартир' },
  'arenda-kvartiry': { category: 'flats', transactionType: 'rent', label: 'Аренда квартир' },
  'snyat-kvartiru': { category: 'flats', transactionType: 'rent', label: 'Снять квартиру' },
  'prodazha-kvartir': { category: 'flats', transactionType: 'sale', label: 'Продажа квартир' },
  'kupit-kvartiru': { category: 'flats', transactionType: 'sale', label: 'Купить квартиру' },
  'kvartiry': { category: 'flats', label: 'Квартиры' },
  // Commercial
  'prodazha-kommercheskoy': { category: 'commercial', transactionType: 'sale', label: 'Продажа коммерческой' },
  'arenda-kommercheskoy': { category: 'commercial', transactionType: 'rent', label: 'Аренда коммерческой' },
  'kommercheskaya': { category: 'commercial', label: 'Коммерческая недвижимость' },
  // Lands
  'uchastki': { category: 'lands', label: 'Земельные участки' },
  'zemlya': { category: 'lands', label: 'Земельные участки' },
  // ResidentialComplex
  'zhiloy-kompleks': { category: 'residential-complexes', label: 'Жилые комплексы' },
  'novostroyki': { category: 'residential-complexes', label: 'Новостройки' },
} as const

export const parseFilterSlug = (segment: string): ParsedFilterSlug | null => {
  const key = segment.toLowerCase().trim()
  const entry = FILTER_SLUGS[key]
  if (!entry) return null
  return { ...entry }
}

/** All supported filter-slug keys. Used for generateStaticParams. */
export const ALL_FILTER_SLUGS: string[] = Object.keys(FILTER_SLUGS)

/** Common SEO-friendly filter slugs to show as suggestions on a city landing page. */
export const POPULAR_FILTERS_FOR_CITY: string[] = [
  'arenda-kvartir',
  'prodazha-kvartir',
  'uchastki',
  'arenda-kommercheskoy',
  'novostroyki',
]

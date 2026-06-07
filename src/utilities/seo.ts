import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * Утилиты для SEO: динамические meta для каталогов, BreadcrumbList,
 * ItemList JSON-LD. Используются страницами /flats, /commercial и т.д.
 *
 * Принцип: title и description максимально специфичны под URL +
 * фильтры, чтобы каждый каталог + фильтр выглядел в выдаче как
 * отдельная (релевантная) посадочная.
 */

export type PropertyType =
  | 'flats'
  | 'commercial'
  | 'lands'
  | 'residential-complexes'

interface CatalogMetaConfig {
  /** Заголовочная форма (именительный падеж) — для title. */
  pluralNom: string
  /** Винительный падеж — для глагольных конструкций («купить … в Москве»). */
  pluralAcc: string
  /** Дефолтный description без фильтров. */
  defaultDescription: string
}

const CATALOG_META: Record<PropertyType, CatalogMetaConfig> = {
  flats: {
    pluralNom: 'квартиры',
    pluralAcc: 'квартиру',
    defaultDescription:
      'Поиск квартир: купить, снять или забронировать посуточно. ' +
      'Прямые контакты с собственниками, прозрачные цены, удобные фильтры.',
  },
  commercial: {
    pluralNom: 'коммерческая недвижимость',
    pluralAcc: 'коммерческую недвижимость',
    defaultDescription:
      'Офисы, торговые помещения, склады и общепит — аренда и продажа. ' +
      'Реальные характеристики, фото, удобный фильтр по площади и районам.',
  },
  lands: {
    pluralNom: 'земельные участки',
    pluralAcc: 'земельный участок',
    defaultDescription:
      'Участки ИЖС, СНТ, ЛПХ и сельхоз — продажа и аренда. ' +
      'Карта с координатами, характеристики участка, история цен.',
  },
  'residential-complexes': {
    pluralNom: 'жилые комплексы',
    pluralAcc: 'жилой комплекс',
    defaultDescription:
      'Каталог жилых комплексов и новостроек: статус сдачи, застройщики, ' +
      'цены квадратного метра, инфраструктура.',
  },
}

const TX_LABEL: Record<string, string> = {
  sale: 'продажа',
  rent: 'аренда',
  daily: 'посуточно',
}

const ROOMS_LABEL: Record<string, string> = {
  studio: 'студия',
  '1': '1-комнатные',
  '2': '2-комнатные',
  '3': '3-комнатные',
  '4': '4-комнатные',
  '5plus': '5+ комнатные',
}

/**
 * Динамические meta для страницы каталога. Учитывает фильтры в URL:
 * город, тип сделки, число комнат. Title и description адаптируются.
 *
 * Пример:
 *   /flats?city=Москва&transactionType=sale&rooms=2
 *   → title:    «2-комнатные квартиры в Москве — продажа | MegaDomic»
 *   → desc:     «Купить 2-комнатную квартиру в Москве. Прямые контакты…»
 */
export function buildCatalogMeta(
  type: PropertyType,
  searchParams: Record<string, string | undefined>,
): Metadata {
  const cfg = CATALOG_META[type]
  const base = getServerSideURL()

  const city = searchParams.city?.trim()
  const tx = searchParams.transactionType
  const rooms = searchParams.rooms

  // — Title (без « — MegaDomic», layout.tsx добавит сам через template) —
  const titleParts: string[] = []
  if (type === 'flats' && rooms && ROOMS_LABEL[rooms]) {
    titleParts.push(ROOMS_LABEL[rooms])
  }
  titleParts.push(cfg.pluralNom)
  if (city) titleParts.push(`в ${cityIn(city)}`)
  if (tx && TX_LABEL[tx]) titleParts.push(`— ${TX_LABEL[tx]}`)
  const title = capitalize(titleParts.join(' '))

  // — Description (винительный падеж после глагола: «Купить X в Y») —
  let desc: string
  if (city || tx || rooms) {
    const action = tx === 'sale' ? 'Купить' : tx === 'rent' ? 'Снять' : 'Найти'
    const what =
      type === 'flats' && rooms && ROOMS_LABEL[rooms]
        ? `${ROOMS_LABEL[rooms].toLowerCase().replace(/ные$/, 'ную')} ${cfg.pluralAcc}`
        : cfg.pluralAcc
    const where = city ? ` в ${cityIn(city)}` : ''
    desc =
      `${action} ${what}${where}. ` +
      `Прямые контакты с собственниками, проверенные объявления, ` +
      `карта и фильтры по характеристикам.`
  } else {
    desc = cfg.defaultDescription
  }

  // — Canonical (без UTM/pagination мусора) —
  const canonicalParams = new URLSearchParams()
  if (city) canonicalParams.set('city', city)
  if (tx) canonicalParams.set('transactionType', tx)
  if (rooms) canonicalParams.set('rooms', rooms)
  const qs = canonicalParams.toString()
  const canonical = `${base}/${type}${qs ? `?${qs}` : ''}`

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: { title, description: desc, url: canonical, type: 'website' },
  }
}

// ─── JSON-LD ───────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Schema.org BreadcrumbList. Помогает Google показать «хлебные крошки»
 * в выдаче вместо URL.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  const base = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${base}${item.url}`,
    })),
  }
}

/**
 * Schema.org ItemList для каталога — Google использует для понимания
 * структуры каталога. Без подробностей, просто список URL.
 */
export function buildItemListJsonLd(
  items: Array<{ name: string; url: string }>,
): object {
  const base = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${base}${item.url}`,
    })),
  }
}

// ─── Helpers ──────────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * Простая трансформация в предложный падеж. Покрывает топовые города.
 * Без морфоанализатора — для редких городов будет «в Город», что
 * грамматически кривовато, но не критично.
 */
export function cityIn(city: string): string {
  const map: Record<string, string> = {
    'Москва': 'Москве',
    'Санкт-Петербург': 'Санкт-Петербурге',
    'Новосибирск': 'Новосибирске',
    'Екатеринбург': 'Екатеринбурге',
    'Казань': 'Казани',
    'Нижний Новгород': 'Нижнем Новгороде',
    'Сочи': 'Сочи',
    'Кимры': 'Кимрах',
  }
  return map[city] ?? city
}

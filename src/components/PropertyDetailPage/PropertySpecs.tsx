'use client'
import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  data: any
  type: 'flats' | 'commercial' | 'lands' | 'residential-complexes'
}

type Row = { label: string; value: string | number }

// Static label maps for select fields (mirror the collection options).
const PROPERTY_CATEGORY: Record<string, string> = {
  apartment: 'Квартира',
  apartments: 'Апартаменты',
  studio: 'Студия',
  townhouse: 'Таунхаус',
  penthouse: 'Пентхаус',
  'house-part': 'Часть дома',
}

const BUILDING_TYPE: Record<string, string> = {
  panel: 'Панельный',
  brick: 'Кирпичный',
  monolithic: 'Монолитный',
  block: 'Блочный',
  wood: 'Деревянный',
}

const TRANSACTION: Record<string, string> = {
  sale: 'Продажа',
  rent: 'Долгосрочная аренда',
  daily: 'Посуточная аренда',
}

const ROOMS: Record<string, string> = {
  studio: 'Студия',
  '1': '1 комната',
  '2': '2 комнаты',
  '3': '3 комнаты',
  '4': '4 комнаты',
  '5plus': '5 и более',
}

const COMMERCIAL_TYPE: Record<string, string> = {
  office: 'Офис',
  retail: 'Торговое',
  warehouse: 'Склад',
  'free-purpose': 'Свободного назначения',
  catering: 'Общепит',
}

const LAND_PURPOSE: Record<string, string> = {
  ijs: 'ИЖС',
  snt: 'СНТ/ДНП',
  lph: 'ЛПХ',
  commercial: 'Коммерческое',
  agricultural: 'Сельхоз назначения',
}

const push = (rows: Row[], label: string, value: any) => {
  if (value === undefined || value === null || value === '') return
  rows.push({ label, value })
}

// Сборка строк по типу. ВАЖНО: порядок гарантирует, что «ключевые»
// характеристики (площадь, комнаты, этаж, тип сделки) идут первыми —
// см. PRIMARY_COUNT ниже, который их и отрезает.
const flatRows = (d: any): Row[] => {
  const rows: Row[] = []
  push(rows, 'Тип жилья', PROPERTY_CATEGORY[d.propertyCategory] ?? d.propertyCategory)
  push(rows, 'Сделка', TRANSACTION[d.transactionType] ?? d.transactionType)
  push(rows, 'Комнат', ROOMS[d.rooms] ?? d.rooms)
  if (d.area?.total) push(rows, 'Общая площадь', `${d.area.total} м²`)
  if (d.floorInfo?.floor && d.floorInfo?.totalFloors) {
    push(rows, 'Этаж', `${d.floorInfo.floor} из ${d.floorInfo.totalFloors}`)
  } else if (d.floorInfo?.floor) {
    push(rows, 'Этаж', d.floorInfo.floor)
  }
  // --- ниже идут «расширенные» характеристики ---
  if (d.area?.living) push(rows, 'Жилая площадь', `${d.area.living} м²`)
  if (d.area?.kitchen) push(rows, 'Площадь кухни', `${d.area.kitchen} м²`)
  push(rows, 'Тип дома', BUILDING_TYPE[d.buildingType] ?? d.buildingType)
  push(rows, 'Год постройки', d.yearBuilt)
  if (d.ceilingHeight) push(rows, 'Высота потолков', `${d.ceilingHeight} м`)
  push(rows, 'Метро', d.location?.metro)
  if (d.location?.metroTime) push(rows, 'До метро', `${d.location.metroTime} мин`)
  return rows
}

const commercialRows = (d: any): Row[] => {
  const rows: Row[] = []
  push(rows, 'Тип', COMMERCIAL_TYPE[d.commercialType] ?? d.commercialType)
  push(rows, 'Сделка', TRANSACTION[d.transactionType] ?? d.transactionType)
  if (d.area?.total) push(rows, 'Общая площадь', `${d.area.total} м²`)
  push(rows, 'Этаж', d.floor)
  // ---
  if (d.area?.usable) push(rows, 'Полезная площадь', `${d.area.usable} м²`)
  if (d.area?.land) push(rows, 'Площадь участка', `${d.area.land} сот.`)
  if (d.ceilingHeight) push(rows, 'Высота потолков', `${d.ceilingHeight} м`)
  push(rows, 'Тип входа', d.entranceType)
  push(rows, 'Состояние', d.condition)
  return rows
}

const landRows = (d: any): Row[] => {
  const rows: Row[] = []
  push(rows, 'Назначение', LAND_PURPOSE[d.purpose] ?? d.purpose)
  if (d.area) push(rows, 'Площадь', `${d.area} сот.`)
  return rows
}

const complexRows = (d: any): Row[] => {
  const rows: Row[] = []
  push(rows, 'Статус', d.status)
  push(rows, 'Тип', d.type)
  return rows
}

const buildRows = (data: any, type: Props['type']): Row[] => {
  switch (type) {
    case 'flats':
      return flatRows(data)
    case 'commercial':
      return commercialRows(data)
    case 'lands':
      return landRows(data)
    case 'residential-complexes':
      return complexRows(data)
  }
}

// Сколько строк показывать «в свёрнутом» виде — как на Авито: только
// самые ключевые, остальные раскрываются по кнопке.
const PRIMARY_COUNT: Record<Props['type'], number> = {
  flats: 5,
  commercial: 4,
  lands: 2,
  'residential-complexes': 2,
}

const Item: React.FC<{ row: Row }> = ({ row }) => (
  <div className="flex items-baseline justify-between gap-3 py-2.5 border-b border-border last:border-b-0">
    <dt className="text-body-sm text-on-surface-variant">{row.label}</dt>
    <dd className="text-body-sm text-on-surface font-medium text-right">
      {row.value}
    </dd>
  </div>
)

export const PropertySpecs: React.FC<Props> = ({ data, type }) => {
  const [expanded, setExpanded] = React.useState(false)

  const rows = buildRows(data, type)
  if (rows.length === 0) return null

  const primaryCount = PRIMARY_COUNT[type]
  const primary = rows.slice(0, primaryCount)
  const rest = rows.slice(primaryCount)
  const hasRest = rest.length > 0

  return (
    <section className="bg-card rounded-md shadow-e1 p-6">
      <h2 className="text-title-lg text-on-surface mb-4">Характеристики</h2>

      {/* Primary: ключевые поля — одна колонка на mobile,
          две колонки на sm+. */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {primary.map((row, i) => (
          <Item key={i} row={row} />
        ))}
      </dl>

      {hasRest ? (
        <>
          {/* Дополнительные характеристики в раскрывающемся блоке.
              Адаптивно: 2 колонки от sm, 1 на телефоне. */}
          <div
            className={
              expanded
                ? 'mt-2 pt-2 border-t border-border'
                : 'mt-2 pt-2 border-t border-border hidden'
            }
          >
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {rest.map((row, i) => (
                <Item key={i} row={row} />
              ))}
            </dl>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((x) => !x)}
            aria-expanded={expanded}
            className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:underline"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Скрыть характеристики
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Показать все характеристики
                <span className="text-on-surface-variant">({rest.length})</span>
              </>
            )}
          </button>
        </>
      ) : null}
    </section>
  )
}

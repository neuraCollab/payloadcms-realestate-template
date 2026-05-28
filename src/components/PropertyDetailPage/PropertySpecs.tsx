import React from 'react'

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

const flatRows = (d: any): Row[] => {
  const rows: Row[] = []
  push(rows, 'Тип жилья', PROPERTY_CATEGORY[d.propertyCategory] ?? d.propertyCategory)
  push(rows, 'Сделка', TRANSACTION[d.transactionType] ?? d.transactionType)
  push(rows, 'Комнат', ROOMS[d.rooms] ?? d.rooms)
  if (d.area?.total) push(rows, 'Общая площадь', `${d.area.total} м²`)
  if (d.area?.living) push(rows, 'Жилая площадь', `${d.area.living} м²`)
  if (d.area?.kitchen) push(rows, 'Площадь кухни', `${d.area.kitchen} м²`)
  if (d.floorInfo?.floor && d.floorInfo?.totalFloors) {
    push(rows, 'Этаж', `${d.floorInfo.floor} из ${d.floorInfo.totalFloors}`)
  } else if (d.floorInfo?.floor) {
    push(rows, 'Этаж', d.floorInfo.floor)
  }
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
  if (d.area?.usable) push(rows, 'Полезная площадь', `${d.area.usable} м²`)
  if (d.area?.land) push(rows, 'Площадь участка', `${d.area.land} сот.`)
  push(rows, 'Этаж', d.floor)
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

export const PropertySpecs: React.FC<Props> = ({ data, type }) => {
  const rows = buildRows(data, type)
  if (rows.length === 0) return null

  return (
    <section className="bg-card rounded-md shadow-e1 p-6">
      <h2 className="text-title-lg text-on-surface mb-4">Характеристики</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-baseline justify-between gap-2 py-2 border-b border-border last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
          >
            <dt className="text-body-sm text-on-surface-variant">{row.label}</dt>
            <dd className="text-body-sm text-on-surface font-medium text-right">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

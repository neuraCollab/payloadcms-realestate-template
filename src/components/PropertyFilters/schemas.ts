export type FilterFieldType = 'select' | 'number' | 'text' | 'checkbox'

export interface FilterField {
  key: string
  label: string
  type: FilterFieldType
  options?: Array<{ value: string; label: string }>
  placeholder?: string
  /** If true, hidden behind a "Расширенные фильтры" toggle. */
  advanced?: boolean
}

export type PropertyType = 'flats' | 'commercial' | 'lands' | 'residential-complexes'

// Reusable option groups
const TRANSACTION_OPTIONS = [
  { value: 'all', label: 'Любая' },
  { value: 'sale', label: 'Продажа' },
  { value: 'rent', label: 'Долгосрочная аренда' },
  { value: 'daily', label: 'Посуточная аренда' },
]

const ROOM_OPTIONS = [
  { value: 'all', label: 'Любое' },
  { value: 'studio', label: 'Студия' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5plus', label: '5+' },
]

export const FILTER_SCHEMAS: Record<PropertyType, FilterField[]> = {
  flats: [
    // Базовые
    { key: 'city', label: 'Город', type: 'text', placeholder: 'Москва' },
    { key: 'district', label: 'Район', type: 'text', placeholder: 'Любой' },
    { key: 'rooms', label: 'Комнаты', type: 'select', options: ROOM_OPTIONS },
    { key: 'transactionType', label: 'Сделка', type: 'select', options: TRANSACTION_OPTIONS },
    { key: 'minPrice', label: 'Цена от', type: 'number', placeholder: '₽' },
    { key: 'maxPrice', label: 'Цена до', type: 'number', placeholder: '₽' },
    // Расширенные
    { key: 'areaMin', label: 'Площадь от, м²', type: 'number', placeholder: '0', advanced: true },
    { key: 'areaMax', label: 'Площадь до, м²', type: 'number', placeholder: '∞', advanced: true },
    { key: 'floorMin', label: 'Этаж от', type: 'number', placeholder: '1', advanced: true },
    { key: 'floorMax', label: 'Этаж до', type: 'number', placeholder: '∞', advanced: true },
    {
      key: 'propertyCategory',
      label: 'Тип жилья',
      type: 'select',
      advanced: true,
      options: [
        { value: 'all', label: 'Любой' },
        { value: 'apartment', label: 'Квартира' },
        { value: 'apartments', label: 'Апартаменты' },
        { value: 'studio', label: 'Студия' },
        { value: 'townhouse', label: 'Таунхаус' },
        { value: 'penthouse', label: 'Пентхаус' },
        { value: 'house-part', label: 'Часть дома' },
      ],
    },
    {
      key: 'buildingType',
      label: 'Тип дома',
      type: 'select',
      advanced: true,
      options: [
        { value: 'all', label: 'Любой' },
        { value: 'panel', label: 'Панельный' },
        { value: 'brick', label: 'Кирпичный' },
        { value: 'monolithic', label: 'Монолит' },
        { value: 'block', label: 'Блочный' },
        { value: 'wood', label: 'Деревянный' },
      ],
    },
    { key: 'yearBuiltMin', label: 'Год постройки от', type: 'number', placeholder: '1950', advanced: true },
    {
      key: 'rentalSubtype', label: 'Что снимаем', type: 'select', advanced: true,
      options: [
        { value: 'all', label: 'Любое' },
        { value: 'whole', label: 'Квартира целиком' },
        { value: 'room', label: 'Комната' },
        { value: 'bed', label: 'Койко-место' },
      ],
    },
    { key: 'fromOwner', label: 'От собственника', type: 'checkbox', advanced: true },
    { key: 'noCommission', label: 'Без комиссии', type: 'checkbox', advanced: true },
  ],
  commercial: [
    // Базовые
    { key: 'city', label: 'Город', type: 'text', placeholder: 'Москва' },
    { key: 'transactionType', label: 'Сделка', type: 'select', options: TRANSACTION_OPTIONS },
    {
      key: 'commercialType', label: 'Тип', type: 'select',
      options: [
        { value: 'all', label: 'Любой' },
        { value: 'office', label: 'Офис' },
        { value: 'retail', label: 'Торговое' },
        { value: 'warehouse', label: 'Склад' },
        { value: 'free-purpose', label: 'Своб. назначения' },
        { value: 'catering', label: 'Общепит' },
      ],
    },
    { key: 'minPrice', label: 'Цена от', type: 'number', placeholder: '₽' },
    { key: 'maxPrice', label: 'Цена до', type: 'number', placeholder: '₽' },
    // Расширенные
    { key: 'district', label: 'Район', type: 'text', placeholder: 'Любой', advanced: true },
    { key: 'areaMin', label: 'Площадь от, м²', type: 'number', placeholder: '0', advanced: true },
    { key: 'areaMax', label: 'Площадь до, м²', type: 'number', placeholder: '∞', advanced: true },
    { key: 'fromOwner', label: 'От собственника', type: 'checkbox', advanced: true },
    { key: 'noCommission', label: 'Без комиссии', type: 'checkbox', advanced: true },
  ],
  lands: [
    // Базовые
    { key: 'city', label: 'Город', type: 'text', placeholder: 'Москва' },
    {
      // Поле в коллекции называется `purpose` — это исправление ранее битого filter-key.
      key: 'purpose', label: 'Назначение', type: 'select',
      options: [
        { value: 'all', label: 'Любое' },
        { value: 'ijs', label: 'ИЖС' },
        { value: 'snt', label: 'СНТ/ДНП' },
        { value: 'lph', label: 'ЛПХ' },
        { value: 'commercial', label: 'Коммерческое' },
        { value: 'agricultural', label: 'Сельхоз' },
      ],
    },
    { key: 'minPrice', label: 'Цена от', type: 'number', placeholder: '₽' },
    { key: 'maxPrice', label: 'Цена до', type: 'number', placeholder: '₽' },
    // Расширенные
    { key: 'district', label: 'Район', type: 'text', placeholder: 'Любой', advanced: true },
    { key: 'areaMin', label: 'Площадь от, сот.', type: 'number', placeholder: '0', advanced: true },
    { key: 'areaMax', label: 'Площадь до, сот.', type: 'number', placeholder: '∞', advanced: true },
  ],
  'residential-complexes': [
    {
      key: 'status', label: 'Статус', type: 'select',
      options: [
        { value: 'all', label: 'Любой' },
        { value: 'planned', label: 'В планах' },
        { value: 'under-construction', label: 'Строится' },
        { value: 'completed', label: 'Сдан' },
      ],
    },
    {
      key: 'type', label: 'Тип', type: 'select',
      options: [
        { value: 'all', label: 'Любой' },
        { value: 'apartment', label: 'Многоквартирный' },
        { value: 'townhouse', label: 'Таунхаусы' },
        { value: 'cottage', label: 'Коттеджный' },
      ],
    },
  ],
}

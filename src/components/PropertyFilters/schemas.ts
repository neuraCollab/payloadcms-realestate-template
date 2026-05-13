export type FilterFieldType = 'select' | 'number' | 'text'

export interface FilterField {
  key: string
  label: string
  type: FilterFieldType
  options?: Array<{ value: string; label: string }>
  placeholder?: string
}

export type PropertyType = 'flats' | 'commercial' | 'lands' | 'residential-complexes'

export const FILTER_SCHEMAS: Record<PropertyType, FilterField[]> = {
  flats: [
    { key: 'city', label: 'Город', type: 'text', placeholder: 'Москва' },
    { key: 'district', label: 'Район', type: 'text', placeholder: 'Любой' },
    {
      key: 'rooms', label: 'Комнаты', type: 'select',
      options: [
        { value: 'all', label: 'Любое' },
        { value: 'studio', label: 'Студия' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5plus', label: '5+' },
      ],
    },
    {
      key: 'transactionType', label: 'Сделка', type: 'select',
      options: [
        { value: 'all', label: 'Любая' },
        { value: 'sale', label: 'Продажа' },
        { value: 'rent', label: 'Аренда' },
      ],
    },
    { key: 'minPrice', label: 'Цена от', type: 'number', placeholder: '₽' },
    { key: 'maxPrice', label: 'Цена до', type: 'number', placeholder: '₽' },
  ],
  commercial: [
    {
      key: 'transactionType', label: 'Сделка', type: 'select',
      options: [
        { value: 'all', label: 'Любая' },
        { value: 'sale', label: 'Продажа' },
        { value: 'rent', label: 'Аренда' },
      ],
    },
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
  ],
  lands: [
    {
      key: 'landType', label: 'Назначение', type: 'select',
      options: [
        { value: 'all', label: 'Любое' },
        { value: 'residential', label: 'ИЖС' },
        { value: 'agricultural', label: 'Сельхоз' },
        { value: 'industrial', label: 'Промназначения' },
        { value: 'commercial', label: 'Коммерческое' },
      ],
    },
    {
      key: 'hasUtilities', label: 'Коммуникации', type: 'select',
      options: [
        { value: 'all', label: 'Любые' },
        { value: 'yes', label: 'Есть' },
        { value: 'no', label: 'Нет' },
      ],
    },
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

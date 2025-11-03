// config/filterConfigs.ts

import { FilterConfig, FilterField } from '@/types/filterTypes'

export const filterConfig: Record<string, FilterConfig> = {
  flats: {
    collection: 'flats',
    fields: [
      {
        name: 'price',
        label: 'Цена',
        type: 'range',
        min: 0,
        max: 10_000_000,
        step: 100_000,
      },
      {
        name: 'area',
        label: 'Площадь',
        type: 'range',
        min: 20,
        max: 200,
        step: 5,
      },
      {
        name: 'rooms',
        label: 'Количество комнат',
        type: 'multi-select',
        options: [
          { value: '1', label: '1 комната' },
          { value: '2', label: '2 комнаты' },
          { value: '3', label: '3 комнаты' },
          { value: '4+', label: '4+' },
        ],
      },
      {
        name: 'hasRenovation',
        label: 'С ремонтом',
        type: 'checkbox',
      },
      {
        name: 'location',
        label: 'Локация',
        type: 'text',
      },
    ],
  },
  commercial: {
    collection: 'commercialProperties',
    fields: [
      {
        name: 'price',
        label: 'Цена',
        type: 'range',
        min: 0,
        max: 50_000_000,
        step: 500_000,
      },
      {
        name: 'area',
        label: 'Площадь',
        type: 'range',
        min: 50,
        max: 1000,
        step: 10,
      },
      {
        name: 'isLease',
        label: 'Аренда',
        type: 'checkbox',
      },
      {
        name: 'purpose',
        label: 'Назначение',
        type: 'text',
      },
    ],
  },
}

import type { Block } from 'payload'

type FilterConditionData = {
  enableFilters?: boolean
  [key: string]: unknown
}

// Убираем PropertyRelation — он больше не нужен

export const PropertiesBlock: Block = {
  slug: 'properties',
  labels: {
    singular: 'Properties Block',
    plural: 'Properties Blocks',
  },
  fields: [
    {
      name: 'blockType',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
      defaultValue: 'properties',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок блока',
    },
    {
      name: 'showAllLink',
      type: 'text',
      label: 'Ссылка на все объекты',
      admin: {
        description: 'Например: /properties',
      },
    },
    {
      name: 'properties',
      type: 'relationship',
      // ✅ Изменено: теперь relationTo — массив коллекций
      relationTo: ['commercial', 'flats', 'lands', 'residential-complexes'],
      hasMany: true,
      required: false,
      label: 'Выберите объекты недвижимости',
      admin: {
        description: 'Выберите объекты из любых коллекций недвижимости',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        {
          label: 'Сетка',
          value: 'grid',
        },
        {
          label: 'Список',
          value: 'list',
        },
      ],
      label: 'Вариант отображения',
    },
    {
      name: 'itemsPerPage',
      type: 'number',
      required: true,
      defaultValue: 6,
      min: 3,
      max: 12,
      label: 'Количество объектов на странице',
      admin: {
        description: 'Минимум 3, максимум 12 объектов',
      },
    },
    {
      name: 'enableFilters',
      type: 'checkbox',
      defaultValue: false,
      label: 'Включить фильтры',
    },
    {
      name: 'filters',
      type: 'group',
      label: 'Настройки фильтров',
      admin: {
        condition: (_, siblingData: FilterConditionData) => Boolean(siblingData?.enableFilters),
      },
      fields: [
        {
          name: 'priceRange',
          type: 'checkbox',
          label: 'Фильтр по цене',
          defaultValue: true,
        },
        {
          name: 'propertyType',
          type: 'checkbox',
          label: 'Фильтр по типу недвижимости',
          defaultValue: true,
        },
        {
          name: 'bedrooms',
          type: 'checkbox',
          label: 'Фильтр по количеству спален',
          defaultValue: true,
        },
        {
          name: 'bathrooms',
          type: 'checkbox',
          label: 'Фильтр по количеству ванных',
          defaultValue: true,
        },
        {
          name: 'area',
          type: 'checkbox',
          label: 'Фильтр по площади',
          defaultValue: true,
        },
      ],
    },
  ],
}
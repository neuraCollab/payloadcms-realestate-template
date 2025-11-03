import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'map',
  labels: {
    singular: 'Map Block',
    plural: 'Map Blocks',
  },
  fields: [
    {
      name: 'blockType',
      type: 'text',
      required: true,
      admin: { hidden: true },
      defaultValue: 'map',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'center',
      type: 'group',
      label: 'Центр карты',
      fields: [
        { name: 'lat', type: 'number', label: 'Широта' },
        { name: 'lng', type: 'number', label: 'Долгота' },
        { name: 'zoom', type: 'number', label: 'Зум', defaultValue: 12, min: 1, max: 20 },
      ],
    },
    {
      name: 'properties',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: true,
      label: 'Объекты для отображения',
      admin: {
        description: 'Если пусто — можно будет загрузить последние объекты автоматически на фронте',
      },
    },
    {
      name: 'autoLoad',
      type: 'checkbox',
      label: 'Автозагрузка объектов (последние N)',
      defaultValue: true,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Лимит автозагрузки',
      defaultValue: 20,
      min: 1,
      max: 200,
      admin: { condition: (_, siblingData) => Boolean(siblingData?.autoLoad) },
    },
  ],
}



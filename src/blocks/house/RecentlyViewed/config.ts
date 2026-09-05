import type { Block } from 'payload'

export const RecentlyViewedBlock: Block = {
  slug: 'recently-viewed',
  interfaceName: 'RecentlyViewedBlock',
  labels: {
    singular: 'Недавно просмотренные',
    plural: 'Недавно просмотренные',
  },
  fields: [
    {
      name: 'blockType',
      type: 'text',
      required: true,
      admin: { hidden: true },
      defaultValue: 'recently-viewed',
    },
    { name: 'title', type: 'text', localized: true, label: 'Заголовок', defaultValue: 'Недавно вы смотрели' },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
      min: 4,
      max: 16,
      label: 'Сколько показывать максимум',
    },
  ],
}

import type { Block } from 'payload'

export const HeroSearchBlock: Block = {
  slug: 'hero-search',
  interfaceName: 'HeroSearchBlock',
  labels: {
    singular: 'Hero с поиском',
    plural: 'Hero с поиском',
  },
  fields: [
    {
      name: 'blockType',
      type: 'text',
      required: true,
      admin: { hidden: true },
      defaultValue: 'hero-search',
    },
    { name: 'badge', type: 'text', localized: true, label: 'Маленький лейбл сверху' },
    { name: 'headline', type: 'text', localized: true, label: 'Заголовок', required: true },
    { name: 'subheadline', type: 'textarea', localized: true, label: 'Подзаголовок' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Фоновое изображение',
    },
  ],
}

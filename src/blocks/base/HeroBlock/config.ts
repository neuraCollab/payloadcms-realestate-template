import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  imageURL: 'https://cdn-icons-png.flaticon.com/512/888/888879.png',
  fields: [
    {
      name: 'badgeText',
      label: 'Текст бейджа',
      type: 'text',
      localized: true,
      admin: {
        description: 'Опциональный текст для бейджа (например, "Real Estate")',
      },
    },
    {
      name: 'headline',
      label: 'Заголовок',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'highlight',
      label: 'Выделенное слово',
      type: 'text',
      localized: true,
    },
    {
      name: 'subheadline',
      label: 'Подзаголовок',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      label: 'Изображение',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

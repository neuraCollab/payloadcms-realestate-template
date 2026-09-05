import type { Block } from 'payload'

export const VisionBlock: Block = {
  slug: 'vision',
  interfaceName: 'VisionBlock',
  labels: {
    singular: 'Vision Block',
    plural: 'Vision Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Заголовок',
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      label: 'Подзаголовок',
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      label: 'Текст кнопки',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Ссылка кнопки',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Элементы',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: 'Иконка',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Заголовок',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Описание',
        },
      ],
    },
  ],
}

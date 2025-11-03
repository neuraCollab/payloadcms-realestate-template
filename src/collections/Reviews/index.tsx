// collections/Reviews.ts
import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'authorName',
    group: 'Недвижимость',
    defaultColumns: ['authorName', 'realtor', 'rating', 'status'],
  },
  labels: {
    singular: 'Отзыв',
    plural: 'Отзывы',
  },
  access: {
    read: () => true, // публичный доступ
    create: () => true, // разрешить создание через API (форма на сайте)
    // остальное — по умолчанию (только админы)
  },
  fields: [
    {
      name: 'realtor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Риелтор',
      filterOptions: {
        role: { equals: 'realtor' },
      },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Ваше имя',
    },
    {
      name: 'authorEmail',
      type: 'email',
      label: 'Email (не публикуется)',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      label: 'Оценка (1–5)',
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Отзыв',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'На модерации', value: 'pending' },
        { label: 'Одобрен', value: 'approved' },
        { label: 'Отклонён', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

// collections/Lands.ts
import { CollectionConfig } from 'payload'

export const Lands: CollectionConfig = {
  slug: 'lands',
  admin: {
    useAsTitle: 'title',
    group: 'Недвижимость',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название участка',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'purpose',
      type: 'select',
      label: 'Назначение',
      options: [
        { label: 'ИЖС', value: 'ijs' },
        { label: 'СНТ/ДНП', value: 'snt' },
        { label: 'ЛПХ', value: 'lph' },
        { label: 'Коммерческая', value: 'commercial' },
        { label: 'Сельхоз назначения', value: 'agricultural' },
      ],
    },
    {
      name: 'area',
      type: 'number',
      required: true,
      label: 'Площадь (соток)',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Цена',
    },
    {
      name: 'location',
      type: 'group',
      label: 'Расположение',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'district',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
        },
      ],
    },
    {
      name: 'communications',
      type: 'array',
      label: 'Коммуникации',
      fields: [
        {
          name: 'communication',
          type: 'text',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Изображения',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Активно', value: 'active' },
        { label: 'Продано', value: 'sold' },
        { label: 'Снято', value: 'unpublished' },
      ],
    },
  ],
}

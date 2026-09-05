// collections/ResidentialComplex.ts
import { CollectionConfig } from 'payload'
import { embedAfterChange, embedAfterDelete } from '../hooks/embeddings'
import { telegramPublishAfterChange } from '../hooks/telegramPublish'
import { cityAutoCreateAfterChange } from '../hooks/cityAutoCreate'

export const ResidentialComplex: CollectionConfig = {
  slug: 'residential-complexes',
  admin: {
    useAsTitle: 'name',
    group: 'Недвижимость',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      embedAfterChange('residential-complexes'),
      telegramPublishAfterChange('residential-complexes'),
      cityAutoCreateAfterChange,
    ],
    afterDelete: [embedAfterDelete('residential-complexes')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название ЖК',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      required: true,
      defaultValue: 'planning',
      options: [
        { value: 'planning', label: 'Планируется' },
        { value: 'under-construction', label: 'Строится' },
        { value: 'completed', label: 'Сдан' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      label: 'Класс ЖК',
      required: true,
      defaultValue: 'comfort',
      options: [
        { value: 'economy', label: 'Эконом' },
        { value: 'comfort', label: 'Комфорт' },
        { value: 'business', label: 'Бизнес' },
        { value: 'premium', label: 'Премиум' },
      ],
    },
    {
      name: 'developer',
      type: 'text',
      label: 'Застройщик',
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
          required: true,
        },
      ],
    },
    {
      name: 'completionDate',
      type: 'date',
      label: 'Срок сдачи',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
      localized: true,
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
          required: true,
        },
      ],
    },
    {
      name: 'infrastructure',
      type: 'array',
      label: 'Инфраструктура',
      fields: [
        {
          name: 'item',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}

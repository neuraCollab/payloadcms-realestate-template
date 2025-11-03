
import { CollectionConfig } from 'payload'

export const Commercial: CollectionConfig = {
  slug: 'commercial',
  admin: {
    useAsTitle: 'title',
    group: 'Недвижимость',
    defaultColumns: ['title', 'commercialType', 'price', 'area', 'city', 'status'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        }

        if (data.location?.address && (!data.coordinates?.lat || !data.coordinates?.lng)) {
          try {
            const { geocodeAddress } = await import('../../utilities/geocode')
            const result = await geocodeAddress(data.location.address)
            if (result) {
              data.coordinates = {
                lat: result.lat,
                lng: result.lng,
                formattedAddress: result.displayName || data.location.address,
              }
            }
          } catch (err) {
            console.error('Geocoding error:', err)
          }
        }
        return data
      },
    ],
  },
  fields: [
    // Базовые поля
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название объекта',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },

    // Классификация
    {
      name: 'commercialType',
      type: 'select',
      required: true,
      label: 'Тип коммерческой недвижимости',
      options: [
        { label: 'Офис', value: 'office' },
        { label: 'Торговая площадь', value: 'retail' },
        { label: 'Торговый центр', value: 'mall' },
        { label: 'Склад', value: 'warehouse' },
        { label: 'Производственное помещение', value: 'manufacturing' },
        { label: 'Помещение свободного назначения', value: 'free-purpose' },
        { label: 'Гостиница', value: 'hotel' },
        { label: 'Ресторан/кафе', value: 'restaurant' },
        { label: 'Бизнес-центр', value: 'business-center' },
      ],
    },
    {
      name: 'transactionType',
      type: 'select',
      required: true,
      label: 'Тип сделки',
      options: [
        { label: 'Продажа', value: 'sale' },
        { label: 'Аренда', value: 'rent' },
      ],
    },

    // Расположение
    {
      name: 'location',
      type: 'group',
      label: 'Расположение',
      fields: [
        {
          name: 'city',
          type: 'text',
          label: 'Город',
          required: true,
        },
        {
          name: 'district',
          type: 'text',
          label: 'Район',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          label: 'Адрес',
          required: true,
        },
        {
          name: 'highway',
          type: 'text',
          label: 'Шоссе/магистраль',
        },
      ],
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Координаты',
      fields: [
        {
          name: 'lat',
          type: 'number',
          label: 'Широта',
        },
        {
          name: 'lng',
          type: 'number',
          label: 'Долгота',
        },
        {
          name: 'formattedAddress',
          type: 'text',
          label: 'Форматированный адрес',
        },
      ],
    },

    // Площадь
    {
      name: 'area',
      type: 'group',
      label: 'Площадь',
      fields: [
        {
          name: 'total',
          type: 'number',
          label: 'Общая (м²)',
          required: true,
        },
        {
          name: 'usable',
          type: 'number',
          label: 'Полезная (м²)',
        },
        {
          name: 'land',
          type: 'number',
          label: 'Земельный участок (соток)',
        },
      ],
    },

    // Цена
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Цена',
    },
    {
      name: 'priceType',
      type: 'select',
      label: 'Тип цены',
      options: [
        { label: 'За весь объект', value: 'total' },
        { label: 'За м²/месяц', value: 'per_sqm_month' },
        { label: 'За м²/год', value: 'per_sqm_year' },
      ],
      defaultValue: 'total',
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'RUB',
      options: [
        { label: '₽ RUB', value: 'RUB' },
        { label: '$ USD', value: 'USD' },
        { label: '€ EUR', value: 'EUR' },
      ],
    },

    // Характеристики
    {
      name: 'floor',
      type: 'number',
      label: 'Этаж',
    },
    {
      name: 'ceilingHeight',
      type: 'number',
      label: 'Высота потолков (м)',
    },
    {
      name: 'entranceType',
      type: 'select',
      label: 'Тип входа',
      options: [
        { label: 'Отдельный', value: 'separate' },
        { label: 'Через бизнес-центр', value: 'through-bc' },
        { label: 'С улицы', value: 'from-street' },
      ],
    },
    {
      name: 'condition',
      type: 'select',
      label: 'Состояние',
      options: [
        { label: 'Отделка под ключ', value: 'finished' },
        { label: 'Черновая отделка', value: 'rough' },
        { label: 'Требует ремонта', value: 'needs_renovation' },
        { label: 'Под отделку', value: 'for-finishing' },
      ],
    },

    // Коммуникации
    {
      name: 'utilities',
      type: 'array',
      label: 'Коммуникации',
      fields: [
        {
          name: 'utility',
          type: 'text',
        },
      ],
    },

    // Медиа
    {
      name: 'images',
      type: 'array',
      label: 'Изображения',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // Описание
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
    },

    // Контактная информация
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Контактная информация',
      fields: [
        {
          name: 'contactPerson',
          type: 'text',
          label: 'Контактное лицо',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Телефон',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
      ],
    },

    // Статус
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Активно', value: 'active' },
        { label: 'Продано/Сдано', value: 'sold' },
        { label: 'Снято с публикации', value: 'unpublished' },
        { label: 'Черновик', value: 'draft' },
      ],
    },
  ],
}

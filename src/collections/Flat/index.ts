import { CollectionConfig } from 'payload'

export const Flats: CollectionConfig = {
  slug: 'flats',
  admin: {
    useAsTitle: 'title',
    group: 'Недвижимость',
    defaultColumns: ['title', 'propertyCategory', 'rooms', 'price', 'area', 'status'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Автоматическое создание slug
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        }

        // Геокодирование
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
    // Базовая информация
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'realtor',
      type: 'relationship',
      relationTo: 'users',
      label: 'Риелтор',
      filterOptions: {
        role: { equals: 'realtor' },
      },
    },

    // Классификация
    {
      name: 'propertyCategory',
      type: 'select',
      required: true,
      label: 'Тип жилья',
      options: [
        { label: 'Квартира', value: 'apartment' },
        { label: 'Апартаменты', value: 'apartments' },
        { label: 'Студия', value: 'studio' },
        { label: 'Таунхаус', value: 'townhouse' },
        { label: 'Пентхаус', value: 'penthouse' },
        { label: 'Часть дома', value: 'house-part' },
      ],
      defaultValue: 'apartment',
    },
    {
      name: 'transactionType',
      type: 'select',
      required: true,
      label: 'Тип сделки',
      options: [
        { label: 'Продажа', value: 'sale' },
        { label: 'Долгосрочная аренда', value: 'rent' },
        { label: 'Посуточная аренда', value: 'daily' },
      ],
      defaultValue: 'sale',
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
          name: 'metro',
          type: 'text',
          label: 'Станция метро',
        },
        {
          name: 'metroTime',
          type: 'number',
          label: 'Время до метро (мин)',
        },
      ],
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Координаты',
      admin: { description: 'Заполняются автоматически' },
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

    // Характеристики
    {
      name: 'rooms',
      type: 'select',
      label: 'Количество комнат',
      required: true,
      options: [
        { label: 'Студия', value: 'studio' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5+', value: '5plus' },
      ],
    },
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
          min: 1,
        },
        {
          name: 'living',
          type: 'number',
          label: 'Жилая (м²)',
        },
        {
          name: 'kitchen',
          type: 'number',
          label: 'Кухня (м²)',
        },
      ],
    },
    {
      name: 'floorInfo',
      type: 'group',
      label: 'Этажность',
      fields: [
        {
          name: 'floor',
          type: 'number',
          label: 'Этаж',
          min: 0,
        },
        {
          name: 'totalFloors',
          type: 'number',
          label: 'Всего этажей',
          min: 1,
        },
      ],
    },

    // Цена
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Цена',
      min: 0,
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

    // Детали здания
    {
      name: 'buildingType',
      type: 'select',
      label: 'Тип дома',
      options: [
        { label: 'Панельный', value: 'panel' },
        { label: 'Кирпичный', value: 'brick' },
        { label: 'Монолитный', value: 'monolithic' },
        { label: 'Блочный', value: 'block' },
        { label: 'Деревянный', value: 'wood' },
      ],
    },
    {
      name: 'yearBuilt',
      type: 'number',
      label: 'Год постройки',
      min: 1900,
      max: new Date().getFullYear() + 5,
    },
    {
      name: 'ceilingHeight',
      type: 'number',
      label: 'Высота потолков (м)',
    },

    // Медиа
    {
      name: 'images',
      type: 'array',
      label: 'Изображения',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Описание',
        },
      ],
    },
    {
      name: 'layout',
      type: 'upload',
      relationTo: 'media',
      label: 'Планировка',
    },
    {
      name: 'video',
      type: 'text',
      label: 'Видео (URL)',
    },

    // Описание
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
    },

    // Удобства
    {
      name: 'amenities',
      type: 'array',
      label: 'Удобства',
      fields: [
        {
          name: 'amenity',
          type: 'text',
          required: true,
        },
      ],
    },

    // Связи
    {
      name: 'residentialComplex',
      type: 'relationship',
      relationTo: 'residential-complexes',
      label: 'Жилой комплекс',
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
      admin: {
        position: 'sidebar',
      },
    },

    // Дополнительно
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Показать в featured',
      defaultValue: false,
    },
  ],
}

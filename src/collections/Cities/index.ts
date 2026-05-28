import type { CollectionConfig } from 'payload'

const slugifyRu = (input: string): string => {
  // Minimal transliteration covering the Russian alphabet → ASCII.
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
    з: 'z', и: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c',
    ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  }
  return input
    .toLowerCase()
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: {
    singular: 'Город',
    plural: 'Города',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Недвижимость',
    defaultColumns: ['name', 'slug', 'country', 'isActive'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.name) {
          data.slug = slugifyRu(data.name)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: { position: 'sidebar', description: 'Латиницей, без пробелов. Используется в URL вида /kimry' },
    },
    {
      name: 'country',
      type: 'text',
      defaultValue: 'Россия',
      label: 'Страна',
    },
    {
      name: 'region',
      type: 'text',
      label: 'Регион / область',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание (для SEO и landing-страницы)',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Фоновое фото',
    },
    {
      name: 'population',
      type: 'number',
      label: 'Население',
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Координаты центра',
      fields: [
        { name: 'lat', type: 'number', label: 'Широта' },
        { name: 'lng', type: 'number', label: 'Долгота' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Активен (виден на сайте)',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}

export { slugifyRu }

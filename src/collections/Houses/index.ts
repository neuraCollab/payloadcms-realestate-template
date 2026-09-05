import { CollectionConfig } from 'payload'
import { embedAfterChange, embedAfterDelete } from '../hooks/embeddings'
import { telegramPublishAfterChange } from '../hooks/telegramPublish'
import { cityAutoCreateAfterChange } from '../hooks/cityAutoCreate'

/**
 * Houses — частные дома, коттеджи, таунхаусы, дачи.
 *
 * Отличается от Flats: не квартира в подъезде, а отдельное здание.
 * Поэтому:
 *   • вместо rooms — bedrooms (спальни)
 *   • вместо floor + totalFloors — floors (1/2/3-этажный)
 *   • есть area_land (участок земли, м²)
 *   • house_type enum: cottage/townhouse/dacha/detached
 *   • расширенные удобства: garage, sauna, pool, gas, water, sewage
 *
 * residentialComplex отсутствует — дом сам по себе. Если это таунхаус
 * в коттеджном посёлке, можно использовать поле `compound` в будущем.
 */
export const Houses: CollectionConfig = {
  slug: 'houses',
  labels: { singular: 'Дом', plural: 'Дома' },
  admin: {
    useAsTitle: 'title',
    group: 'Недвижимость',
    defaultColumns: ['title', 'houseType', 'bedrooms', 'price', 'areaTotal', 'status'],
  },
  access: { read: () => true },
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
            console.error('[houses] geocode', err)
          }
        }
        return data
      },
    ],
    afterChange: [
      embedAfterChange('houses' as any),
      telegramPublishAfterChange('houses'),
      cityAutoCreateAfterChange,
    ],
    afterDelete: [embedAfterDelete('houses' as any)],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: 'Название' },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      label: 'Slug (URL)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'realtor',
      type: 'relationship',
      relationTo: 'users',
      filterOptions: { role: { equals: 'realtor' } },
      label: 'Риэлтор',
      admin: { position: 'sidebar' },
    },
    {
      name: 'houseType',
      type: 'select',
      defaultValue: 'cottage',
      options: [
        { label: 'Коттедж', value: 'cottage' },
        { label: 'Таунхаус', value: 'townhouse' },
        { label: 'Дача', value: 'dacha' },
        { label: 'Отдельный дом', value: 'detached' },
      ],
    },
    {
      name: 'transactionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Продажа', value: 'sale' },
        { label: 'Аренда', value: 'rent' },
        { label: 'Посуточно', value: 'daily' },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'city', type: 'text', required: true, label: 'Город' },
        { name: 'district', type: 'text', required: true, label: 'Район' },
        { name: 'address', type: 'text', required: true, label: 'Адрес' },
      ],
    },
    {
      name: 'coordinates',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
        { name: 'formattedAddress', type: 'text' },
      ],
    },
    { name: 'bedrooms', type: 'number', label: 'Спален' },
    { name: 'bathrooms', type: 'number', label: 'Санузлов' },
    { name: 'floors', type: 'number', defaultValue: 1, label: 'Этажей в доме' },
    {
      name: 'area',
      type: 'group',
      fields: [
        { name: 'total', type: 'number', required: true, label: 'Площадь дома, м²' },
        { name: 'land', type: 'number', label: 'Площадь участка, соток' },
      ],
    },
    { name: 'price', type: 'number', required: true, label: 'Цена' },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'RUB',
      options: ['RUB', 'USD', 'EUR'].map((v) => ({ label: v, value: v })),
    },
    {
      name: 'material',
      type: 'select',
      options: [
        { label: 'Кирпич', value: 'brick' },
        { label: 'Дерево/бревно', value: 'wood' },
        { label: 'Каркас', value: 'frame' },
        { label: 'Газобетон', value: 'aerocrete' },
        { label: 'Монолит', value: 'monolithic' },
      ],
    },
    { name: 'yearBuilt', type: 'number', label: 'Год постройки' },
    {
      name: 'images',
      type: 'array',
      label: 'Фотографии',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text' },
      ],
    },
    { name: 'description', type: 'richText', localized: true, label: 'Описание' },
    {
      name: 'amenities',
      type: 'array',
      label: 'Удобства',
      fields: [
        {
          name: 'amenity',
          type: 'select',
          options: [
            { label: 'Гараж', value: 'garage' },
            { label: 'Баня/сауна', value: 'sauna' },
            { label: 'Бассейн', value: 'pool' },
            { label: 'Газ', value: 'gas' },
            { label: 'Центральная вода', value: 'water' },
            { label: 'Центральная канализация', value: 'sewage' },
            { label: 'Электричество', value: 'electricity' },
            { label: 'Камин', value: 'fireplace' },
            { label: 'Терраса/веранда', value: 'terrace' },
            { label: 'Огороженный участок', value: 'fenced' },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Активно', value: 'active' },
        { label: 'Продано/Сдано', value: 'sold' },
        { label: 'Снято с публикации', value: 'unpublished' },
        { label: 'Черновик', value: 'draft' },
        { label: 'На модерации', value: 'pending_review' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    { name: 'fromOwner', type: 'checkbox', defaultValue: false },
    { name: 'noCommission', type: 'checkbox', defaultValue: false },
    // UGC поля (см. flats)
    {
      name: 'contactEmail',
      type: 'email',
      admin: { position: 'sidebar', readOnly: true },
      index: true,
    },
    { name: 'submittedAt', type: 'date', admin: { position: 'sidebar', readOnly: true } },
    { name: 'moderationNote', type: 'textarea', admin: { position: 'sidebar' } },
  ],
}

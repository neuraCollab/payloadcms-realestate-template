import type { Block } from 'payload'

/**
 * Static "office location" map for a page. Originally also supported
 * a curated/auto-loaded list of listing markers, but that half pointed
 * at the (now-removed) `properties` demo collection and a `/properties`
 * route that never existed as a real page — it was dead on arrival.
 * Only the single-marker office mode ever worked, so that's all this
 * block does now.
 */
export const MapBlock: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  labels: {
    singular: 'Map Block',
    plural: 'Map Blocks',
  },
  fields: [
    {
      name: 'blockType',
      type: 'text',
      required: true,
      admin: { hidden: true },
      defaultValue: 'map',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'center',
      type: 'group',
      label: 'Центр карты',
      fields: [
        { name: 'lat', type: 'number', label: 'Широта' },
        { name: 'lng', type: 'number', label: 'Долгота' },
        { name: 'zoom', type: 'number', label: 'Зум', defaultValue: 12, min: 1, max: 20 },
      ],
    },
    {
      name: 'officeMarker',
      type: 'group',
      label: 'Маркер офиса',
      admin: {
        description: 'Если указан label, в центре карты будет показан одиночный маркер с этой подписью.',
      },
      fields: [
        { name: 'label', type: 'text', label: 'Подпись' },
        { name: 'address', type: 'text', label: 'Адрес офиса' },
      ],
    },
  ],
}



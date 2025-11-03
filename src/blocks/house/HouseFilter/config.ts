import { Block } from 'payload'

export const HouseFilter: Block = {
  slug: 'house-filter',
  labels: {
    singular: 'Группа фильтров',
    plural: 'Группы фильтров',
  },
  fields: [
    {
      name: 'filters',
      type: 'array',
      label: 'Фильтры',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Название фильтра',
          required: true,
        },
        {
          name: 'collection',
          type: 'text',
          label: 'Имя коллекции',
          required: true,
        },
        {
          name: 'fields',
          type: 'array',
          label: 'Поля фильтра',
          required: true,
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Поле (name)',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Заголовок поля (label)',
            },
            {
              name: 'type',
              type: 'select',
              label: 'Тип поля',
              required: true,
              options: [
                { label: 'Текст', value: 'text' },
                { label: 'Число', value: 'number' },
                { label: 'Чекбокс', value: 'checkbox' },
                { label: 'Выпадающий список', value: 'select' },
                { label: 'Множественный выбор', value: 'multi-select' },
                { label: 'Диапазон (range)', value: 'range' },
              ],
            },
            {
              name: 'options',
              label: 'Опции (для select/multi-select)',
              type: 'array',
              admin: {
                condition: (_, siblingData) =>
                  ['select', 'multi-select'].includes(siblingData.type),
              },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                },
              ],
            },
            {
              name: 'min',
              label: 'Минимум (для range)',
              type: 'number',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'range',
              },
            },
            {
              name: 'max',
              label: 'Максимум (для range)',
              type: 'number',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'range',
              },
            },
            {
              name: 'step',
              label: 'Шаг (для range)',
              type: 'number',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'range',
              },
            },
          ],
        },
      ],
    },
  ],
}

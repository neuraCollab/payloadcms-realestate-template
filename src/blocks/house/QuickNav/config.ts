import type { Block } from 'payload'

export const QuickNavBlock: Block = {
  slug: 'quick-nav',
  labels: {
    singular: 'Быстрая навигация',
    plural: 'Быстрая навигация',
  },
  fields: [
    {
      name: 'blockType',
      type: 'text',
      required: true,
      admin: { hidden: true },
      defaultValue: 'quick-nav',
    },
    { name: 'label', type: 'text', label: 'Маленький лейбл сверху' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'subtitle', type: 'textarea', label: 'Подзаголовок' },
    {
      name: 'items',
      type: 'array',
      label: 'Карточки',
      minRows: 2,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Иконка',
          options: [
            { value: 'home', label: 'Квартиры (Home)' },
            { value: 'briefcase', label: 'Коммерческая (Briefcase)' },
            { value: 'trees', label: 'Земля (Trees)' },
            { value: 'building', label: 'ЖК (Building)' },
            { value: 'search', label: 'Поиск (Search)' },
            { value: 'users', label: 'Агенты (Users)' },
            { value: 'newspaper', label: 'Блог (Newspaper)' },
            { value: 'mail', label: 'Контакты (Mail)' },
            { value: 'map', label: 'Карта (Map)' },
            { value: 'star', label: 'Топ (Star)' },
            { value: 'info', label: 'Инфо (Info)' },
            { value: 'phone', label: 'Телефон (Phone)' },
          ],
          required: true,
          defaultValue: 'home',
        },
        { name: 'title', type: 'text', label: 'Заголовок карточки', required: true },
        { name: 'description', type: 'text', label: 'Короткое описание' },
        { name: 'href', type: 'text', label: 'URL', required: true },
        {
          name: 'accent',
          type: 'select',
          label: 'Цвет',
          defaultValue: 'primary',
          options: [
            { value: 'primary', label: 'Основной' },
            { value: 'emerald', label: 'Зелёный' },
            { value: 'amber', label: 'Жёлтый' },
            { value: 'rose', label: 'Розовый' },
            { value: 'sky', label: 'Голубой' },
            { value: 'violet', label: 'Фиолетовый' },
          ],
        },
      ],
    },
  ],
}

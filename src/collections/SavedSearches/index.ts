import { CollectionConfig } from 'payload'

/**
 * Сохранённые поиски — пользователь нажал «Сохранить этот поиск» на
 * каталоге и теперь получает email-дайджест новых матчей.
 *
 * Подход «email-as-id»: не привязываемся к users (которые в Payload
 * — это admin/realtor аккаунты), а храним email напрямую. Так юзер
 * получает уведомления и без полноценной авторизации.
 *
 * filters — JSON с URL-параметрами каталога:
 *   { collection: 'flats', city: 'Москва', transactionType: 'sale',
 *     rooms: '2', maxPrice: 20000000 }
 *
 * lastRunAt — последний запуск дайджеста. Cron-эндпоинт берёт записи
 * где (lastRunAt < now - frequency) и шлёт письмо с новыми объектами
 * (опубликованными после lastRunAt).
 */
export const SavedSearches: CollectionConfig = {
  slug: 'saved-searches',
  admin: {
    useAsTitle: 'name',
    group: 'Продажи',
    defaultColumns: ['name', 'email', 'frequency', 'lastRunAt', 'isActive'],
  },
  access: {
    create: () => true, // публичная сохранялка
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email получателя',
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название поиска',
    },
    {
      name: 'filters',
      type: 'json',
      required: true,
      label: 'Фильтры (JSON)',
      admin: {
        description:
          'Пример: { "collection": "flats", "city": "Москва", ' +
          '"transactionType": "sale", "rooms": "2", "maxPrice": 20000000 }',
      },
    },
    {
      name: 'frequency',
      type: 'select',
      defaultValue: 'daily',
      label: 'Частота',
      options: [
        { label: 'Сразу (как только появится новый матч)', value: 'instant' },
        { label: 'Раз в день', value: 'daily' },
        { label: 'Раз в неделю', value: 'weekly' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Активный',
    },
    {
      name: 'lastRunAt',
      type: 'date',
      label: 'Последний запуск',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'lastMatchCount',
      type: 'number',
      label: 'Новых матчей в последнем дайджесте',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}

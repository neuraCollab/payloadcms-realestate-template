import { CollectionConfig } from 'payload'

/**
 * Лиды — заявки на обратный звонок и контактные обращения.
 *
 * Хранят входящие конверсии: имя/телефон + ссылку на объект, на
 * страницу которого человек пришёл. В отличие от Messages (thread-чат),
 * Lead — это разовое обращение, которое риэлтор пересобирает в
 * звонок/встречу. Воронка: new → contacted → qualified → won|lost.
 *
 * Доступ:
 *   • create: open — публичный POST из лид-формы.
 *   • read/update: только admin + realtor роли.
 *
 * Не indexable в админке (group: 'Продажи') — отдельная воронка.
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'phone',
    group: 'Продажи',
    defaultColumns: ['phone', 'name', 'channel', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // публичная форма
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Телефон',
    },
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
    },
    {
      name: 'channel',
      type: 'select',
      defaultValue: 'callback',
      label: 'Канал',
      options: [
        { label: 'Обратный звонок', value: 'callback' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Instagram', value: 'instagram' },
      ],
    },
    {
      name: 'contactHandle',
      type: 'text',
      label: 'Ник/handle в мессенджере',
      admin: {
        description: 'Для tg/wa/ig — username без @. Для callback пусто.',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Комментарий клиента',
    },
    // Объект, с которого пришёл лид. Полиморфная связь без типа
    // через два text-поля (collection + id) — проще чем настраивать
    // полиморфный rel в Payload v3, в админке всё равно отображается.
    {
      name: 'propertyCollection',
      type: 'text',
      label: 'Коллекция объекта',
      admin: {
        description: 'flats | commercial | lands | residential-complexes',
        readOnly: true,
      },
    },
    {
      name: 'propertyId',
      type: 'text',
      label: 'ID объекта',
      admin: { readOnly: true },
    },
    {
      name: 'propertyTitle',
      type: 'text',
      label: 'Название объекта (на момент создания)',
      admin: { readOnly: true },
    },
    {
      name: 'realtor',
      type: 'relationship',
      relationTo: 'users',
      label: 'Риэлтор',
      filterOptions: { role: { equals: 'realtor' } },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Новый', value: 'new' },
        { label: 'В работе', value: 'contacted' },
        { label: 'Квалифицирован', value: 'qualified' },
        { label: 'Продажа', value: 'won' },
        { label: 'Потерян', value: 'lost' },
      ],
    },
    {
      name: 'utmSource',
      type: 'text',
      label: 'UTM source',
      admin: { readOnly: true },
    },
    {
      name: 'utmCampaign',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'pageUrl',
      type: 'text',
      label: 'Страница входа',
      admin: { readOnly: true },
    },
  ],
}

import { CollectionConfig } from 'payload'

/**
 * Маппинг город → Telegram-канал. Заполняется через бот-команду
 * /register_channel или вручную в админке.
 *
 * Bot API не даёт боту создавать каналы — поэтому канал создаётся
 * человеком, бот добавляется админом, и потом через /register_channel
 * сохраняется связь.
 *
 * channelId — ВСЕГДА отрицательный для каналов/супергрупп
 * (например, -1001234567890). Получается из forwarded message или
 * через getUpdates.
 */
export const TelegramChannels: CollectionConfig = {
  slug: 'telegram-channels',
  admin: {
    useAsTitle: 'cityName',
    group: 'Интеграции',
    defaultColumns: ['cityName', 'citySlug', 'channelId', 'channelUsername', 'status'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'cityName',
      type: 'text',
      required: true,
      label: 'Город',
      admin: {
        description: 'Точно как пишется в location.city у объявлений (напр. «Москва»)',
      },
    },
    {
      name: 'citySlug',
      type: 'text',
      required: true,
      label: 'Slug города',
      admin: {
        description: 'Латиницей, snake/kebab. Используется в команде /channel.',
      },
      index: true,
    },
    {
      name: 'channelId',
      type: 'text',
      required: true,
      label: 'Channel ID',
      admin: {
        description:
          'Отрицательное число вида -1001234567890. Узнать: переслать сообщение из канала боту через web.telegram.org, скопировать chat_id.',
      },
    },
    {
      name: 'channelUsername',
      type: 'text',
      label: 'Username (без @)',
      admin: {
        description: 'Для публичных каналов. Используется чтобы выдать ссылку t.me/<username>.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      label: 'Статус',
      options: [
        { label: 'Активный', value: 'active' },
        { label: 'Неактивный', value: 'inactive' },
      ],
      required: true,
    },
    {
      name: 'postedCount',
      type: 'number',
      defaultValue: 0,
      label: 'Опубликовано постов',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}

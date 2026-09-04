// collections/Messages.ts
import { CollectionConfig } from 'payload'
import { messageNotifyAfterChange } from '../hooks/messageNotify'

export const Messages: CollectionConfig = {
  slug: 'messages',
  // @payloadcms/plugin-form-builder registers its own built-in "message"
  // field-type block (slug: 'message', no interfaceName), which Payload
  // also names "Message" by default — the same name this collection's
  // singular type gets from its slug. That collision breaks the whole
  // GraphQL schema ("Schema must contain uniquely named types..."). We
  // can't rename the plugin's block, so rename our own type instead.
  graphQL: {
    singularName: 'ChatMessage',
    pluralName: 'ChatMessages',
  },
  admin: {
    useAsTitle: 'subject',
    group: 'Недвижимость',
    defaultColumns: ['subject', 'realtor', 'name', 'email', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user, // только авторизованные (админы/риелторы)
    create: () => true, // анонимные могут отправлять
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    // Email-уведомление при новом сообщении в треде — fire-and-forget.
    // Если SMTP лагает или ключа нет, ничего не блокирует.
    afterChange: [messageNotifyAfterChange],
  },
  fields: [
    {
      name: 'message',
      type: 'richText', // ← Payload поддерживает HTML/JSON
      required: true,
    },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'media',
      label: 'Вложение',
    },
    {
      name: 'realtor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      filterOptions: {
        role: { equals: 'realtor' },
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Тема',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Ваше имя',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'property',
      type: 'text',
      label: 'Объект недвижимости (опционально)',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Новое', value: 'new' },
        { label: 'В работе', value: 'in-progress' },
        { label: 'Завершено', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      // Идентификатор беседы: hash(email + realtorId). Группирует входящие
      // и исходящие сообщения в один тред для просмотра в личном кабинете.
      name: 'threadId',
      type: 'text',
      label: 'ID беседы',
      index: true,
      admin: { position: 'sidebar', description: 'Заполняется автоматически' },
    },
    {
      name: 'direction',
      type: 'select',
      defaultValue: 'inbound',
      options: [
        { label: 'От пользователя', value: 'inbound' },
        { label: 'От риэлтора', value: 'outbound' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

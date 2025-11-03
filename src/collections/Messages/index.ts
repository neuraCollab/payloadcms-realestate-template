// collections/Messages.ts
import { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
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
  ],
}

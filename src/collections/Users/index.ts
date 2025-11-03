import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    
    {
      name: 'name',
      type: 'text',
    },
     {
      name: 'slug',
      type: 'text',
      unique: true,
      label: 'Slug (URL)',
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // Генерируем slug из name, если не задан
            if (!data.slug && data.name) {
              data.slug = data.name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
            }
            // return data
          },
        ],
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Риелтор', value: 'realtor' },
      ],
      defaultValue: 'admin',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    // === Поля для риелтора (показываются всем, но особенно для role=realtor) ===
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'agency',
      type: 'text',
      label: 'Агентство',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'О себе',
    },
  ],
  timestamps: true,
}

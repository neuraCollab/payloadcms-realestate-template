import type { Block } from 'payload'

export const AgentsBlock: Block = {
  slug: 'agents',
  // Without this, Payload derives the GraphQL type name from the slug
  // ("Agents"), which collides with the Agents collection's own
  // generated type of the same name and breaks the GraphQL schema.
  interfaceName: 'AgentsBlock',
  labels: {
    singular: 'Agents Block',
    plural: 'Agents Blocks',
  },
  fields: [
    {
      name: 'blockType',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
      defaultValue: 'agents',
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Agents',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Meet our exceptional agents for a seamless experience',
    },
    {
      name: 'agents',
      type: 'relationship',
      relationTo: 'agents',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 6,
    },
  ],
}

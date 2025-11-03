import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/base/ArchiveBlock/config'
import { CallToAction } from '../../blocks/base/CallToAction/config'
import { Content } from '../../blocks/base/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/base/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { NavbarBlock } from '@/blocks/base/Navbar/config'
import { HeroBlock } from '@/blocks/base/HeroBlock/config'
import { VisionBlock } from '@/blocks/house/VisionBlock/config'
import { PropertiesBlock } from '@/blocks/house/PropertiesBlock/config'
import { FeatureBlock } from '../../blocks/house/FeatureBlock/config'
import { HowItWorksBlock } from '../../blocks/house/HowItWorksBlock/config'
import { BlogBlock } from '../../blocks/base/BlogBlock/config'
import { AboutHeroBlock } from '../../blocks/house/AboutHero/config'
import { VisionMissionBlock } from '@/blocks/house/VisionMission/config'
import { AmenitiesBlock } from '../../blocks/house/Amenities/config'
import { AgentsBlock } from '../../blocks/house/Agents/config'
import { TestimonialsBlock } from '../../blocks/house/Testimonials/config'
import { CallToActionNewBlock } from '../../blocks/house/CallToActionNew/config'
import { ContactHeroBlock } from '../../blocks/house/ContactHero/config'
import { ContactUsFormBlock } from '../../blocks/house/ContactUsForm/config'
import { FAQBlock } from '../../blocks/base/FAQ/config'
import { PropertyFeaturesBlock } from '@/blocks/house/PropertyFeatures/config'
import { HouseFilter } from '@/blocks/house/HouseFilter/config'
import { MapBlock } from '@/blocks/house/MapBlock/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                NavbarBlock,
                HeroBlock,
                VisionBlock,
                PropertiesBlock,
                FeatureBlock,
                HowItWorksBlock,
                BlogBlock,
                AboutHeroBlock,
                VisionMissionBlock,
                AmenitiesBlock,
                AgentsBlock,
                TestimonialsBlock,
                CallToActionNewBlock,
                ContactHeroBlock,
                ContactUsFormBlock,
                FAQBlock,
                PropertyFeaturesBlock,
                HouseFilter,
                MapBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

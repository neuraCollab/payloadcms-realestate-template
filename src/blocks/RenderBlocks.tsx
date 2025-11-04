import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/base/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/base/CallToAction/Component'
import { ContentBlock } from '@/blocks/base/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/base/MediaBlock/Component'
import { NavbarBlock } from '@/blocks/base/Navbar/Component'
import { HeroBlock } from './base/HeroBlock/Component'
import { VisionBlock } from './house/VisionBlock/Component'
import { PropertiesBlock } from './house/PropertiesBlock/component'
import { FeatureBlock } from './house/FeatureBlock/component'
import { HowItWorksBlock } from './house/HowItWorksBlock/component'
import { BlogBlock } from './base/BlogBlock/component'
import { AboutHeroBlock } from './house/AboutHero/component'
import { VisionMissionBlock } from './house/VisionMission/component'
import { AmenitiesBlock } from './house/Amenities/component'
import { AgentsBlock } from './house/Agents/component'
import { TestimonialsBlock } from './house/Testimonials/component'
import { CallToActionNewBlock } from './house/CallToActionNew/component'
import { ContactHeroBlock } from './house/ContactHero/component'
import { ContactUsFormBlock } from './house/ContactUsForm/component'
import { FAQBlock } from './base/FAQ/component'
import { UniversalFilterTabs } from './house/HouseFilter/Component'
import { MapBlock as MapBlockComponent } from './house/MapBlock/component'

const blockComponents = {
  properties: PropertiesBlock,
  vision: VisionBlock,
  hero: HeroBlock,
  navbar: NavbarBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  feature: FeatureBlock,
  'how-it-works': HowItWorksBlock,
  blog: BlogBlock,
  'about-hero': AboutHeroBlock,
  'vision-mission': VisionMissionBlock,
  amenities: AmenitiesBlock,
  agents: AgentsBlock,
  testimonials: TestimonialsBlock,
  'call-to-action-new': CallToActionNewBlock,
  'contact-hero': ContactHeroBlock,
  'contact-us-form': ContactUsFormBlock,
  faq: FAQBlock,
  'house-filter': UniversalFilterTabs,
  map: MapBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

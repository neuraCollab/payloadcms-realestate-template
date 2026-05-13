import type { Page } from '@/payload-types'

/**
 * Inputs available to page factories. Optional IDs are populated by the
 * orchestrator from existing collection data; pages should branch on
 * presence (skip a block if its required relation isn't available).
 */
export interface PageDeps {
  primaryImageId: number | null
  secondaryImageId: number | null
  contactFormId: number | null
}

export type PageFactory = (deps: PageDeps) => Page

export const ctaBlock = (): NonNullable<Page['layout']>[number] => ({
  blockType: 'call-to-action-new',
  label: 'Готовы начать?',
  title: 'Свяжитесь с нами — найдём вариант под ваши задачи',
  buttonText: 'Перейти к объектам',
  buttonLink: '/flats',
})

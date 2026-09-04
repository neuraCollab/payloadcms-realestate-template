import type { RequiredDataFromCollectionSlug } from 'payload'

import type { PageDeps } from './shared'
import { ctaBlock } from './shared'

export const contactPage = ({
  primaryImageId,
  contactFormId,
}: PageDeps): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'contact',
  title: 'Контакты',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    ...(primaryImageId
      ? [
          {
            blockType: 'contact-hero' as const,
            label: 'Контакты',
            title: 'Свяжитесь с нами сегодня — мы поможем',
            image: primaryImageId,
            email: 'hello@realty.local',
            phone: '+7 (495) 123-45-67',
            location: 'Москва, Тверская 12',
          },
        ]
      : []),
    ...(contactFormId
      ? [
          {
            blockType: 'contact-us-form' as const,
            label: 'Обратная связь',
            title: 'Оставьте заявку — мы перезвоним',
            form: contactFormId,
          },
        ]
      : []),
    {
      blockType: 'map',
      title: 'Наш офис на карте',
      center: { lat: 59.9398, lng: 30.3146, zoom: 15 },
      officeMarker: {
        label: 'Наш офис',
        address: 'Санкт-Петербург, Дворцовая площадь, 2 (Государственный Эрмитаж)',
      },
    },
    {
      blockType: 'faq',
      label: 'FAQ',
      title: 'Часто задаваемые вопросы',
      items: [
        {
          question: 'Как быстро вы отвечаете на заявки?',
          answer:
            'Обычно в течение 30 минут в рабочее время, в остальное — на следующий рабочий день.',
        },
        {
          question: 'Можно ли получить консультацию онлайн?',
          answer:
            'Да, мы проводим консультации по видеосвязи и устраиваем виртуальные туры по объектам.',
        },
        {
          question: 'Берёте ли вы оплату за подбор?',
          answer:
            'Подбор и первая консультация — бесплатны. Комиссия согласовывается на этапе договора.',
        },
      ],
    },
    ctaBlock(),
  ],
  meta: {
    title: 'Контакты — Realty',
    description:
      'Свяжитесь с командой Realty — email, телефон, форма обратной связи и карта объектов.',
  },
})

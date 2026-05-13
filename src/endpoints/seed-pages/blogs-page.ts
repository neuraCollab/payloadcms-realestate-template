import type { RequiredDataFromCollectionSlug } from 'payload'

import type { PageDeps } from './shared'
import { ctaBlock } from './shared'

export const blogsPage = ({
  primaryImageId,
}: PageDeps): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'blogs',
  title: 'Блог',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    ...(primaryImageId
      ? [
          {
            blockType: 'hero' as const,
            badgeText: 'Блог',
            headline: 'Экспертные советы и',
            highlight: 'обзоры рынка недвижимости',
            subheadline:
              'Гайды, аналитика и мнения экспертов — всё, что поможет принять взвешенное решение о покупке или продаже.',
            image: primaryImageId,
          },
        ]
      : []),
    {
      blockType: 'blog',
      subtitle: 'Последние статьи',
      title: 'Свежие материалы для покупателей и инвесторов',
      showAllLink: '/posts',
      itemsPerPage: 6,
    },
    {
      blockType: 'faq',
      label: 'Частые вопросы',
      title: 'О чём чаще всего спрашивают наши читатели',
      items: [
        {
          question: 'Как часто выходят новые статьи?',
          answer:
            'Мы публикуем 2–3 материала в неделю — гайды, разборы сделок и обзоры новых районов.',
        },
        {
          question: 'Можно ли предложить тему?',
          answer:
            'Да — напишите нам через форму обратной связи, и мы возьмём идею в работу.',
        },
        {
          question: 'Есть ли подписка на рассылку?',
          answer:
            'Пока нет, но мы планируем запустить её в ближайшее время. Следите за обновлениями.',
        },
      ],
    },
    ctaBlock(),
  ],
  meta: {
    title: 'Блог — Realty',
    description:
      'Гайды и обзоры рынка недвижимости от команды Realty.',
  },
})

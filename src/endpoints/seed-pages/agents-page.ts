import type { RequiredDataFromCollectionSlug } from 'payload'

import type { PageDeps } from './shared'
import { ctaBlock } from './shared'

export const agentsPage = ({
  primaryImageId,
}: PageDeps): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'agents',
  title: 'Наши агенты',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    ...(primaryImageId
      ? [
          {
            blockType: 'hero' as const,
            badgeText: 'Команда',
            headline: 'Знакомьтесь — наши',
            highlight: 'исключительные агенты',
            subheadline:
              'Опытные риелторы, которые знают рынок изнутри и сделают вашу сделку максимально комфортной.',
            image: primaryImageId,
          },
        ]
      : []),
    // NOTE: AgentsBlock is intentionally omitted — the `agents` collection is
    // empty. To render real agent cards, add docs to /admin and either include
    // AgentsBlock here or let the user add it in Payload admin.
    {
      blockType: 'feature',
      label: 'Специализации',
      title: 'Каждому запросу — подходящий специалист',
      features: [
        {
          icon: 'user-check',
          title: 'Старший консультант',
          description:
            'Жилая недвижимость: квартиры, новостройки, вторичный рынок.',
        },
        {
          icon: 'star',
          title: 'Специалист по luxury',
          description:
            'Премиальные объекты с конфиденциальным сопровождением.',
        },
        {
          icon: 'key',
          title: 'Менеджер по объектам',
          description: 'Управление арендой, страхование и сервисное обслуживание.',
        },
        {
          icon: 'trending-up',
          title: 'Инвестиционный советник',
          description:
            'Подбор объектов под доходность и стратегию выхода.',
        },
        {
          icon: 'map-pin',
          title: 'Эксперт района',
          description:
            'Глубокое знание локальной инфраструктуры и динамики цен.',
        },
        {
          icon: 'shield-check',
          title: 'Юридическая поддержка',
          description: 'Проверка документов, сопровождение сделки до Росреестра.',
        },
      ],
    },
    ctaBlock(),
  ],
  meta: {
    title: 'Наши агенты — Realty',
    description:
      'Команда профессионалов, которая ведёт сделки с недвижимостью под ключ.',
  },
})

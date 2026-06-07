import type { GlobalConfig } from 'payload'

/**
 * SEO-настройки главной страницы, редактируются из админки.
 *
 * Цель — таргет на 1-2 нишевых запроса в поисковой выдаче.
 * Контент-менеджер может правит meta-title/description, заголовки и
 * FAQ, не трогая код. Все поля — простые text/textarea, без Lexical —
 * чтобы CMS-вёрстка попадала в HTML напрямую и индексировалась.
 */
export const HomeSeo: GlobalConfig = {
  slug: 'home-seo',
  label: 'SEO главной страницы',
  access: { read: () => true },
  admin: { group: 'Контент' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─────── Мета ───────
        {
          label: 'Мета-теги',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Title (60-70 символов)',
              required: true,
              defaultValue:
                'MegaDomic — квартиры, дома и коммерческая недвижимость',
              admin: {
                description:
                  'Текст вкладки браузера и заголовок в выдаче. Включите ключевое слово в начало.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Description (150-160 символов)',
              required: true,
              defaultValue:
                'Поиск квартир, домов и коммерческой недвижимости. Проверенные объявления, прозрачные сделки, прямые контакты с собственниками.',
              admin: {
                description:
                  'Сниппет в выдаче. Должен убеждать кликнуть. Без переспама.',
              },
            },
          ],
        },

        // ─────── Hero ───────
        {
          label: 'Заголовки на странице',
          fields: [
            {
              name: 'h1',
              type: 'text',
              required: true,
              label: 'H1 (главный заголовок)',
              defaultValue: 'Недвижимость, которой доверяют',
              admin: {
                description:
                  'Должен быть один на странице. Содержит главное ключевое слово.',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Подзаголовок под H1',
              defaultValue:
                'Прозрачные сделки, проверенные объявления, удобный кабинет.',
            },
          ],
        },

        // ─────── Нишевые блоки ───────
        {
          label: 'Нишевые SEO-блоки',
          fields: [
            {
              name: 'seoBlocks',
              type: 'array',
              label: 'Тематические секции',
              maxRows: 4,
              labels: { singular: 'Блок', plural: 'Блоки' },
              admin: {
                description:
                  'Каждый блок — отдельная H2-секция на главной. ' +
                  'Используется для таргета нишевых запросов. ' +
                  'Заголовок — H2 с ключевой фразой, текст — 2-4 предложения, ' +
                  'CTA — ссылка на отфильтрованный каталог.',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                  label: 'H2 заголовок',
                  admin: {
                    description:
                      'Например: «Снять квартиру посуточно в Москве без комиссии»',
                  },
                },
                {
                  name: 'body',
                  type: 'textarea',
                  required: true,
                  label: 'Текст блока (2-4 предложения)',
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                  label: 'Кнопка / ссылка',
                  defaultValue: 'Смотреть объекты',
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  required: true,
                  label: 'URL (внутренний, с фильтрами)',
                  admin: {
                    description:
                      'Например: /flats?transactionType=daily&city=Москва&fromOwner=true',
                  },
                },
                {
                  name: 'highlightKeywords',
                  type: 'text',
                  label:
                    'Ключевые слова (через запятую, для подсветки в bold)',
                },
              ],
            },
          ],
        },

        // ─────── FAQ ───────
        {
          label: 'FAQ (вопросы и ответы)',
          fields: [
            {
              name: 'faqIntro',
              type: 'text',
              label: 'Заголовок FAQ',
              defaultValue: 'Частые вопросы',
            },
            {
              name: 'faq',
              type: 'array',
              label: 'Вопросы',
              maxRows: 12,
              labels: { singular: 'Вопрос', plural: 'Вопросы' },
              admin: {
                description:
                  'Каждый вопрос индексируется как FAQPage. Можно ловить ' +
                  'инфо-запросы в поиске и попасть в Featured Snippets.',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                  label: 'Вопрос',
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  label: 'Ответ (2-5 предложений)',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

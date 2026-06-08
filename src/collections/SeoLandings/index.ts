import { CollectionConfig } from 'payload'

/**
 * SeoLandings — таблица сгенерированного SEO-контента поверх
 * каталожных страниц вида `/<city>/<filter>`.
 *
 * Каждая запись — это «обогащение» одной URL-комбинации. Если запись
 * есть и is_published=true, layered render выше каталога: <h1>, intro,
 * FAQ. Если нет — каталог рендерится «голым».
 *
 * Заполняется через POST /api/admin/seo/generate (bulk) или вручную
 * в админке (если нужен тонкий правки).
 */
export const SeoLandings: CollectionConfig = {
  slug: 'seo-landings',
  labels: { singular: 'SEO Landing', plural: 'SEO Landings' },
  admin: {
    useAsTitle: 'h1',
    group: 'SEO',
    defaultColumns: ['citySlug', 'filterSlug', 'h1', 'isPublished', 'isPremium', 'updatedAt'],
    description:
      'Сгенерированные SEO-страницы для комбинаций город × фильтр. ' +
      'POST /api/admin/seo/generate — массовая генерация через LLM. ' +
      '«Premium edit» (isPremium=true) — выполнен Claude Sonnet/GPT-4.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'citySlug',
      type: 'text',
      required: true,
      label: 'Slug города',
      index: true,
    },
    { name: 'cityName', type: 'text', required: true, label: 'Название города' },
    {
      name: 'filterSlug',
      type: 'text',
      required: true,
      label: 'Slug фильтра',
      admin: {
        description: 'Из src/lib/cityUrls.ts — arenda-kvartir, prodazha-kvartir и т.п.',
      },
    },
    { name: 'filterLabel', type: 'text', label: 'Человекочитаемый ярлык' },
    {
      name: 'propertyType',
      type: 'select',
      label: 'Тип',
      options: [
        { label: 'Квартиры', value: 'flats' },
        { label: 'Дома', value: 'houses' },
        { label: 'Коммерческая', value: 'commercial' },
        { label: 'Участки', value: 'lands' },
        { label: 'ЖК', value: 'residential-complexes' },
      ],
    },
    { name: 'filterParams', type: 'json', label: 'Параметры фильтра (JSON)' },

    // Сгенерированный контент
    {
      name: 'title',
      type: 'text',
      label: '<title> (60-70 символов)',
      admin: { description: 'Будет в <title>. Brand suffix добавит layout автоматически.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: '<meta description> (140-160 символов)',
    },
    { name: 'h1', type: 'text', label: 'H1 на странице' },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Вступительный текст (1-2 параграфа)',
      admin: { description: 'Простой текст, рендерится как <p>. Без HTML-тегов.' },
    },
    {
      name: 'faq',
      type: 'array',
      label: 'FAQ',
      fields: [
        { name: 'q', type: 'text', required: true, label: 'Вопрос' },
        { name: 'a', type: 'textarea', required: true, label: 'Ответ' },
      ],
    },

    // Статус
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      label: 'Опубликовано',
      admin: { position: 'sidebar' },
    },
    {
      name: 'isPremium',
      type: 'checkbox',
      defaultValue: false,
      label: 'Premium edit (Sonnet/GPT-4)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'generationMeta',
      type: 'json',
      label: 'Метаданные генерации',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'model, tokens, prompt_version, generated_at',
      },
    },

    // Мониторинг (Phase 3)
    {
      name: 'indexedAt',
      type: 'date',
      label: 'Дата индексации (GSC)',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'indexationStatus',
      type: 'select',
      label: 'Статус индексации',
      options: [
        { label: 'Не запрошено', value: 'pending' },
        { label: 'Отправлено в индекс', value: 'submitted' },
        { label: 'Индексирована', value: 'indexed' },
        { label: 'Просканирована', value: 'crawled' },
        { label: 'Исключена', value: 'excluded' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

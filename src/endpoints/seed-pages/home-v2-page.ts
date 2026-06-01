import type { RequiredDataFromCollectionSlug } from 'payload'

import type { PageDeps } from './shared'
import { ctaBlock } from './shared'

export const homeV2Page = ({
  primaryImageId,
}: PageDeps): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'home-v2',
  title: 'Главная (Realestic)',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'hero-search' as const,
      badge: 'Real Estate',
      headline: 'Найдите дом, который подходит вашей жизни',
      subheadline:
        'От уютных квартир в центре до загородных домов — поможем подобрать недвижимость, которая отражает ваши ценности и образ жизни.',
      ...(primaryImageId ? { image: primaryImageId } : {}),
    },
    {
      blockType: 'vision',
      title: 'Дом мечты, разумные инвестиции и образ жизни класса люкс',
      subtitle: 'Realestic',
      buttonText: 'Смотреть объекты',
      buttonLink: '/flats',
      items: [
        {
          icon: 'home',
          title: 'Дом мечты',
          description:
            'Помогаем находить варианты, которые действительно соответствуют вашему ритму жизни.',
        },
        {
          icon: 'trending-up',
          title: 'Разумные инвестиции',
          description:
            'Подбираем объекты с устойчивым ростом стоимости и доходом от аренды.',
        },
        {
          icon: 'star',
          title: 'Класс люкс',
          description:
            'Закрытые продажи и эксклюзивные предложения для требовательных клиентов.',
        },
      ],
    },
    {
      blockType: 'recently-viewed' as const,
      title: 'Недавно вы смотрели',
      limit: 8,
    },
    {
      blockType: 'properties',
      title: 'Готовы купить дом мечты? Найдите его здесь',
      showAllLink: '/flats',
      layout: 'grid',
      itemsPerPage: 6,
    },
    {
      blockType: 'feature',
      label: 'Преимущества',
      title: 'Почему клиенты выбирают нас',
      features: [
        {
          icon: 'user-check',
          title: 'Экспертная поддержка',
          description:
            'Опытные риелторы сопровождают каждую сделку от заявки до подписания.',
        },
        {
          icon: 'settings',
          title: 'Индивидуальные решения',
          description:
            'Подбираем варианты под конкретные задачи и бюджет, без шаблонов.',
        },
        {
          icon: 'trending-up',
          title: 'Знание рынка',
          description: 'Актуальные данные о ценах и динамике в каждом районе.',
        },
        {
          icon: 'refresh-cw',
          title: 'Прозрачный процесс',
          description: 'От первого звонка до ключей — всё под одной крышей.',
        },
        {
          icon: 'users',
          title: 'Клиентоориентированность',
          description: 'Слушаем, уточняем, согласовываем каждый шаг.',
        },
        {
          icon: 'shield-check',
          title: 'Надёжные партнёры',
          description: 'Юристы, оценщики и банки, проверенные годами работы.',
        },
      ],
    },
    {
      blockType: 'vision-mission',
      title: 'В Realestic наша миссия проста — помочь вам найти идеальный дом',
      description:
        'Мы строим долгосрочные отношения с клиентами, основанные на доверии, открытом общении и качественном результате. Каждый объект проходит проверку, каждая сделка — юридическое сопровождение.',
      buttonText: 'Смотреть объекты',
      buttonLink: '/flats',
      stats: [
        { value: '98%', label: 'Довольных клиентов' },
        { value: '200+', label: 'Сделок' },
        { value: '500+', label: 'Проектов' },
        { value: '12', label: 'Лет на рынке' },
      ],
    },
    {
      blockType: 'how-it-works',
      label: 'Как это работает',
      title: 'Найти, посмотреть, оформить — три простых шага',
      steps: [
        {
          icon: '1',
          title: 'Найдите',
          description:
            'Просмотрите подборку и сохраните понравившиеся варианты в избранное.',
        },
        {
          icon: '2',
          title: 'Запланируйте',
          description:
            'Договоритесь о просмотре в удобное время — онлайн или вживую.',
        },
        {
          icon: '3',
          title: 'Оформите',
          description:
            'Юристы проверят документы и сопроводят сделку до получения ключей.',
        },
      ],
    },
    {
      blockType: 'feature',
      label: 'Почему мы',
      title: 'Три причины работать с Realestic',
      features: [
        {
          icon: 'map-pin',
          title: 'Знание района',
          description:
            'Подскажем где школы, парковки, какое движение и какие планы по застройке.',
        },
        {
          icon: 'heart',
          title: 'Персональный сервис',
          description:
            'Один менеджер ведёт вас от первого звонка до подписания договора.',
        },
        {
          icon: 'award',
          title: 'Подтверждённый опыт',
          description:
            'Сотни закрытых сделок и положительных отзывов клиентов.',
        },
      ],
    },
    {
      blockType: 'blog',
      subtitle: 'Блог',
      title: 'Экспертные советы и обзоры рынка недвижимости',
      showAllLink: '/posts',
      itemsPerPage: 3,
    },
    ctaBlock(),
  ],
  meta: {
    title: 'Главная (Realestic) — Realty',
    description:
      'Найдите дом, который подходит вашей жизни. Демонстрационная главная страница в стиле Realestic.',
  },
})

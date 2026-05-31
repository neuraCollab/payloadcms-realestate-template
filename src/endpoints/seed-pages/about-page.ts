import type { RequiredDataFromCollectionSlug } from 'payload'

import type { PageDeps } from './shared'
import { ctaBlock } from './shared'

export const aboutPage = ({
  primaryImageId,
  secondaryImageId,
}: PageDeps): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'about',
  title: 'О компании',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    ...(primaryImageId
      ? [
          {
            blockType: 'hero' as const,
            badgeText: 'О нас',
            headline: 'Свяжитесь с нашими экспертами и',
            highlight: 'воплотите идеи в недвижимости',
            subheadline:
              'Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать.',
            image: primaryImageId,
          },
        ]
      : []),
    {
      blockType: 'vision-mission',
      title: 'Цифры, которые говорят за нас',
      description:
        'За 12 лет работы мы помогли сотням семей найти дом, инвесторам — выгодные объекты, а бизнесу — коммерческие площади под рост. Качество, скорость, прозрачность.',
      buttonText: 'Смотреть объекты',
      buttonLink: '/flats',
      stats: [
        { value: '80%', label: 'Удовлетворённость' },
        { value: '190+', label: 'Объектов продано' },
        { value: '490+', label: 'Проектов' },
        { value: '12', label: 'Лет на рынке' },
      ],
    },
    ...(secondaryImageId ?? primaryImageId
      ? [
          {
            blockType: 'amenities' as const,
            label: 'Что вы получаете',
            title: 'Сервис, который продумывает детали',
            image: (secondaryImageId ?? primaryImageId) as number,
            amenities: [
              { icon: 'shield', title: 'Полное юридическое сопровождение' },
              { icon: 'wifi', title: 'Онлайн-просмотры и виртуальные туры' },
              { icon: 'gym', title: 'Партнёрские программы с банками' },
              { icon: 'clean', title: 'Прозрачные условия без скрытых комиссий' },
            ],
          },
        ]
      : []),
    {
      blockType: 'feature',
      label: 'Команда',
      title: 'Профессионалы, которые ведут вашу сделку',
      features: [
        {
          icon: 'user-check',
          title: 'Старшие консультанты',
          description:
            'Опыт от 5 лет, специализация на жилых и инвестиционных объектах.',
        },
        {
          icon: 'star',
          title: 'Специалисты по luxury',
          description:
            'Закрытые показы, эксклюзивные предложения, конфиденциальность.',
        },
        {
          icon: 'key',
          title: 'Менеджеры по объектам',
          description:
            'Управление арендой и постпродажное сопровождение под ключ.',
        },
      ],
    },
    {
      blockType: 'quick-nav' as const,
      label: 'Что дальше',
      title: 'Куда отправиться',
      subtitle: 'Быстрые ссылки на ключевые разделы — выберите, что вас интересует.',
      items: [
        { icon: 'home', title: 'Квартиры', description: 'Каталог квартир для покупки и аренды', href: '/flats', accent: 'primary' as const },
        { icon: 'briefcase', title: 'Коммерческая', description: 'Офисы, торговые помещения, склады', href: '/commercial', accent: 'sky' as const },
        { icon: 'trees', title: 'Земля', description: 'Участки ИЖС, СНТ и под бизнес', href: '/lands', accent: 'emerald' as const },
        { icon: 'building', title: 'ЖК', description: 'Новостройки и жилые комплексы', href: '/residential-complexes', accent: 'violet' as const },
        { icon: 'search', title: 'Расширенный поиск', description: 'Найти объект по всем категориям сразу', href: '/search', accent: 'amber' as const },
        { icon: 'users', title: 'Агенты', description: 'Найти своего риэлтора', href: '/agents', accent: 'rose' as const },
        { icon: 'newspaper', title: 'Блог', description: 'Полезные материалы о недвижимости', href: '/posts', accent: 'sky' as const },
        { icon: 'mail', title: 'Контакты', description: 'Связаться с командой', href: '/contact', accent: 'primary' as const },
      ],
    },
    ctaBlock(),
  ],
  meta: {
    title: 'О компании — Realty',
    description:
      'Команда Realty: 12 лет опыта, 190+ закрытых сделок и индивидуальный подход к каждому клиенту.',
  },
})

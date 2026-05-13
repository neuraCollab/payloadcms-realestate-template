import type { RequiredDataFromCollectionSlug } from 'payload'

type Args = { amenitiesImageId?: number | string | null }

const lexicalParagraph = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            mode: 'normal',
            text,
            format: 0,
            detail: 0,
            style: '',
            version: 1,
          },
        ],
      },
    ],
  },
})

export const demoPage = ({
  amenitiesImageId,
}: Args): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'demo',
  title: 'Демо',
  _status: 'published',
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockType: 'vision-mission',
      title: 'Ваш надёжный партнёр на рынке недвижимости',
      description:
        'Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать в недвижимость.',
      buttonText: 'Смотреть объекты',
      buttonLink: '/flats',
      stats: [
        { value: '98%', label: 'Довольных клиентов' },
        { value: '200+', label: 'Сделок закрыто' },
        { value: '500+', label: 'Проектов' },
        { value: '12', label: 'Лет на рынке' },
      ],
    },
    {
      blockType: 'how-it-works',
      label: 'Как это работает',
      title: 'Три простых шага до новой квартиры',
      steps: [
        {
          icon: '1',
          title: 'Заявка',
          description:
            'Оставьте короткую заявку или подберите интересующий объект в каталоге.',
        },
        {
          icon: '2',
          title: 'Подбор',
          description:
            'Наш агент подберёт варианты, организует показы и сопроводит сделку.',
        },
        {
          icon: '3',
          title: 'Сделка',
          description:
            'Юристы проверят документы и проведут оформление под ключ.',
        },
      ],
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
            'Каждую сделку ведёт опытный риелтор с глубоким знанием района.',
        },
        {
          icon: 'shield-check',
          title: 'Юридическая чистота',
          description:
            'Полная проверка документов и истории объекта перед сделкой.',
        },
        {
          icon: 'trending-up',
          title: 'Знание рынка',
          description:
            'Актуальные цены и прогнозы помогают принимать точные решения.',
        },
        {
          icon: 'refresh-cw',
          title: 'Гладкий процесс',
          description:
            'От первого звонка до подписания договора — всё под одной крышей.',
        },
      ],
    },
    ...(amenitiesImageId
      ? [
          {
            blockType: 'amenities' as const,
            label: 'Удобства',
            title: 'Что входит в современный жилой комплекс',
            image: amenitiesImageId,
            amenities: [
              { icon: 'clean', title: 'Чистота на территории' },
              { icon: 'wifi', title: 'Высокоскоростной интернет' },
              { icon: 'shield', title: 'Круглосуточная охрана' },
              { icon: 'gym', title: 'Фитнес-зал и магазины' },
            ],
          },
        ]
      : []),
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: lexicalParagraph(
            'Мы помогаем клиентам не просто купить недвижимость, а сделать осознанный выбор. Свяжитесь с нами — расскажем о свежих предложениях и нюансах рынка в вашем городе.',
          ),
          enableLink: false,
        },
      ],
    },
    {
      blockType: 'faq',
      label: 'FAQ',
      title: 'Часто задаваемые вопросы',
      items: [
        {
          question: 'С чего начать покупку квартиры?',
          answer:
            'С предварительного одобрения ипотеки и определения бюджета. Это покажет продавцам, что вы серьёзный покупатель.',
        },
        {
          question: 'Сколько занимает оформление сделки?',
          answer:
            'Обычно от 30 до 45 дней с момента подписания договора до регистрации права собственности.',
        },
        {
          question: 'Нужен ли осмотр квартиры специалистом?',
          answer:
            'Да, независимая техническая экспертиза помогает выявить скрытые недостатки до сделки.',
        },
        {
          question: 'Что такое рынок продавца?',
          answer:
            'Это состояние рынка, когда спрос превышает предложение, цены растут и решение нужно принимать быстро.',
        },
      ],
    },
    {
      blockType: 'map',
      title: 'Наши объекты на карте',
      center: { lat: 55.751244, lng: 37.618423, zoom: 11 },
      autoLoad: true,
      limit: 20,
    },
    {
      blockType: 'call-to-action-new',
      label: 'Готовы начать?',
      title: 'Свяжитесь с нами — найдём вариант под ваши задачи',
      buttonText: 'Перейти к объектам',
      buttonLink: '/flats',
    },
  ],
  meta: {
    title: 'Демо страница — Realty',
    description:
      'Демонстрационная страница, собранная из блоков: vision/mission, шаги, преимущества, удобства, контент, FAQ, карта и CTA.',
  },
})

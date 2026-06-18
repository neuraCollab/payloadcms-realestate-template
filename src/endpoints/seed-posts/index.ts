import type { Payload, PayloadRequest, RequiredDataFromCollectionSlug } from 'payload'

interface SeedPostsArgs {
  payload: Payload
  req: PayloadRequest
}

const lexicalContent = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: paragraphs.map((p) => ({
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
          text: p,
          format: 0,
          detail: 0,
          style: '',
          version: 1,
        },
      ],
    })),
  },
})

interface PostDeps {
  imageId: number | null
  authorId: number | null
}

const POSTS = ({ imageId, authorId }: PostDeps): RequiredDataFromCollectionSlug<'posts'>[] => [
  {
    title: 'Полный гид по покупке первой квартиры',
    slug: 'guide-first-purchase',
    publishedDate: '2026-04-12T09:00:00.000Z',
    status: 'published',
    excerpt:
      'От пред-одобрения ипотеки до подписания договора — пошаговый разбор с практическими советами и подводными камнями.',
    image: imageId as any,
    author: authorId as any,
    content: lexicalContent([
      'Покупка первой квартиры — это редко проект на одни выходные. Чаще всего процесс растягивается на пару месяцев, и большая часть этого времени уходит не на просмотры, а на бумаги.',
      'Первый шаг, который имеет смысл сделать ещё до выбора района — пред-одобрение ипотеки в двух или трёх банках. На этом этапе вы поймёте свой реальный бюджет, а продавцы будут видеть, что вы серьёзны.',
      'Дальше — параметры объекта: район, этаж, тип дома, инфраструктура. Чем чётче список «обязательно/желательно/не нужно», тем меньше шансов влюбиться в первый красивый ремонт и забыть про шумную дорогу под окнами.',
      'Юридическая проверка — отдельная история. Закажите выписку из ЕГРН, проверьте историю переходов права, наличие обременений. Если на этом этапе всё чисто — можно выходить на сделку.',
    ]),
    meta: {
      title: 'Полный гид по покупке первой квартиры — MegaDomic',
      description:
        'Пошаговый разбор покупки первой квартиры: от пред-одобрения ипотеки до подписания договора.',
    },
  },
  {
    title: 'Как выбрать риелтора и не пожалеть',
    slug: 'how-to-choose-realtor',
    publishedDate: '2026-04-20T09:00:00.000Z',
    status: 'published',
    excerpt:
      'Семь критериев, по которым отличают профессионального риелтора от случайного посредника.',
    image: imageId as any,
    author: authorId as any,
    content: lexicalContent([
      'Хороший риелтор экономит вам время и часто — деньги. Плохой — наоборот, может стоить нервов и упущенной сделки. Чтобы не вытянуть второй вариант, есть несколько практических признаков.',
      'Первое: спросите о реальных закрытых сделках за последние полгода-год. Хороший риелтор охотно поделится статистикой; если в ответ начинается размытые формулировки — это тревожный признак.',
      'Второе: посмотрите, как риелтор готовится к показу. Знает ли он историю дома, особенности района, среднюю цену квадратного метра в радиусе километра. Это базовая работа, которую делать обязан.',
      'Третье: договор и комиссия — всегда письменно. Любые устные обещания «потом разберёмся» обычно превращаются в спор о деньгах ровно в момент сделки.',
    ]),
    meta: {
      title: 'Как выбрать риелтора — MegaDomic',
      description: 'Практические критерии для выбора профессионального риелтора.',
    },
  },
  {
    title: 'Инвестиции в недвижимость: с чего реально начать',
    slug: 'investing-getting-started',
    publishedDate: '2026-05-02T09:00:00.000Z',
    status: 'published',
    excerpt:
      'Краткий и честный разбор трёх стратегий: покупка под аренду, флип после ремонта, доли в новостройках.',
    image: imageId as any,
    author: authorId as any,
    content: lexicalContent([
      'Инвестировать в недвижимость можно по-разному, и далеко не каждый из вариантов одинаково подходит начинающему. Разберём три самых распространённых сценария — без розовых очков и без апокалипсиса.',
      'Покупка под долгосрочную аренду — самая предсказуемая стратегия. Доходность скромная (6–9% годовых в среднем по стране), но риск равномерно размазан по годам, а ликвидность объекта со временем только растёт.',
      'Флип — покупка с ремонтом и быстрой перепродажей — даёт высокую маржинальность, но требует и опыта, и подрядчиков, и нервов. Без 3–5 закрытых сделок за плечами начинающему лучше не лезть.',
      'Доли в новостройках на ранней стадии — самый волатильный вариант. При удачной локации и сильном застройщике даёт 25–40% за два-три года; при неудачной — стройка останавливается, а вы оказываетесь в очереди дольщиков.',
    ]),
    meta: {
      title: 'Инвестиции в недвижимость для начинающих — MegaDomic',
      description: 'Три стратегии входа в недвижимость: аренда, флип, долёвка.',
    },
  },
  {
    title: 'Хоум-стейджинг: как ускорить продажу квартиры',
    slug: 'home-staging',
    publishedDate: '2026-05-08T09:00:00.000Z',
    status: 'published',
    excerpt:
      'Что такое хоум-стейджинг, сколько стоит, на сколько ускоряет продажу и какие пять приёмов работают всегда.',
    image: imageId as any,
    author: authorId as any,
    content: lexicalContent([
      'Хоум-стейджинг — это лёгкая косметическая подготовка квартиры к продаже: чтобы фото в объявлении выглядели лучше, а на показе у покупателя возникал нужный эмоциональный отклик.',
      'По нашей статистике, объекты с хоум-стейджингом продаются в среднем на 25–30% быстрее, чем без него, при том же ценнике. То есть это не «продать дороже», а «продать быстрее».',
      'Пять приёмов, которые работают всегда: тёплый свет вместо люминесцентного, нейтральные обои или покраска вместо ярких, минимум личных вещей в кадре, расставленная мебель так, чтобы был виден метраж, и свежий запах — обычно достаточно проветрить и постирать шторы.',
      'Стоит это, как правило, 30–80 тысяч рублей в зависимости от метража. На фоне средней комиссии риелтора и временной стоимости простоя квартиры — затраты окупаются с запасом.',
    ]),
    meta: {
      title: 'Хоум-стейджинг — MegaDomic',
      description: 'Как подготовить квартиру к продаже и ускорить сделку на 25–30%.',
    },
  },
]

export const seedPosts = async ({
  payload,
  req,
}: SeedPostsArgs): Promise<{ created: string[]; updated: string[] }> => {
  payload.logger.info('[seed-posts] starting…')

  const [media, users] = await Promise.all([
    payload.find({ collection: 'media', limit: 1, sort: 'id', depth: 0 }),
    payload.find({ collection: 'users', limit: 1, where: { role: { equals: 'admin' } }, depth: 0 }),
  ])

  const imageId = (media.docs[0]?.id as number | undefined) ?? null
  const authorId = (users.docs[0]?.id as number | undefined) ?? null

  if (!imageId || !authorId) {
    throw new Error(
      `seed-posts requires at least one media doc (got ${imageId}) and one admin user (got ${authorId}). ` +
        'Run /admin → create an admin user, upload an image, then retry.',
    )
  }

  const created: string[] = []
  const updated: string[] = []

  for (const data of POSTS({ imageId, authorId })) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: data.slug } },
      limit: 1,
      depth: 0,
      req,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        data,
        req,
      })
      updated.push(String(data.slug))
    } else {
      await payload.create({ collection: 'posts', data, req })
      created.push(String(data.slug))
    }
  }

  payload.logger.info(`[seed-posts] created=${created.length} updated=${updated.length}`)
  return { created, updated }
}

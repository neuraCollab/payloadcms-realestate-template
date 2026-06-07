import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { requireSeedAuth } from '@/utilities/seedAuth'

export const maxDuration = 60

/**
 * Два SEO-поста под нишевые запросы проекта:
 *
 *   1. «снять квартиру посуточно в Москве от собственников без комиссии»
 *      → POST_1 со внутренними ссылками на /flats?... и /sankt-peterburg
 *
 *   2. «купить квартиру в санкт-петербурге»
 *      → POST_2 с чек-листом для покупателя в 2026
 *
 * Идемпотентно: по slug. Повторный POST ничего не дублирует.
 */

interface SeoPostInput {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  /** Каждая строка → один параграф/H2/UL. Префикс задаёт тип:
   *   '# '   — H2
   *   '- '   — bullet (соседние склеиваются в UL)
   *   обычный текст — параграф
   *   '> '   — выноска (рендерится как <blockquote>)
   *   '@ HREF | TEXT' — Link на href с текстом
   */
  body: string[]
}

const POSTS: SeoPostInput[] = [
  {
    slug: 'kak-snyat-kvartiru-posutochno-v-moskve-bez-komissii',
    title:
      'Как снять квартиру посуточно в Москве без комиссии: 7 практических правил',
    metaTitle:
      'Снять квартиру посуточно в Москве без комиссии — 7 правил',
    metaDescription:
      'Чек-лист по короткой аренде в Москве: как найти посуточную квартиру ' +
      'без агентских комиссий, на что смотреть в фото, договоре и при заселении.',
    body: [
      'Посуточная аренда квартир в Москве — отдельный сегмент рынка. ' +
        'Здесь логика другая: вы платите за сутки или короткий период, ' +
        'почти всегда через сайт, и комиссия посредника может съесть бюджет. ' +
        'Ниже — что важно проверить, чтобы найти честный вариант без переплат.',

      '# 1. Снимайте напрямую у собственника',
      'Главный способ обнулить комиссию — фильтр «От собственника» в ' +
        'каталоге сайта. Собственник публикует объявление сам, и ему ' +
        'невыгодно завышать цену — он отдаёт квартиру свободному гостю ' +
        'без посредника.',
      '@ /flats?transactionType=daily&city=Москва&fromOwner=true | ' +
        'Посуточно в Москве от собственника',

      '# 2. Проверяйте фото на уникальность',
      'Скопированные фото — красный флаг. Поищите изображения через ' +
        'обратный поиск Google или Яндекса. Если они уже мелькают на ' +
        'десятке других объявлений по России — выбирайте другой вариант.',

      '# 3. Просите видео-обзор',
      'Перед бронированием попросите короткое видео из квартиры. ' +
        'Хост, которому нечего скрывать, снимет за 2 минуты. Отказ ' +
        'или «у меня выключен интернет» — обычно говорят сами за себя.',

      '# 4. Заранее обсудите условия заселения',
      'Что входит в стоимость, есть ли депозит, во сколько check-in и ' +
        'check-out, кто встречает, можно ли заселиться поздно ночью, ' +
        'нужен ли паспорт. Скриншоты переписки — ваша подушка безопасности.',

      '# 5. Платите через сайт, а не наличкой «у двери»',
      'Любое здравое объявление принимает онлайн-оплату или хотя бы ' +
        'предоплату на счёт. Если просят только наличными при заселении ' +
        '— это либо невнесённый налог, либо схема, в которой вас могут ' +
        'кинуть без следов транзакции.',

      '# 6. Сверяйте адрес и подъезд',
      'Иногда снимают красивую квартиру в центре, а селят в типовую за ' +
        'МКАДом. Перед оплатой попросите точный адрес и сверьте с фото ' +
        'дома на 2ГИС или Яндекс.Картах.',

      '# 7. Сохраняйте чат на сайте',
      'Не уходите в WhatsApp/Telegram. На MegaDomic чат с собственником ' +
        'сохраняется в личном кабинете — это защищает обе стороны при ' +
        'спорной ситуации.',
      '@ /cabinet/login | Открыть личный кабинет',

      '# Где смотреть варианты',
      'Стартовать удобнее с подборок по районам — там сразу видно цены ' +
        'и метро. Если планируете поездку в Санкт-Петербург — для него ' +
        'тоже есть отдельная посадочная.',
      '@ /flats?transactionType=daily&city=Москва | ' +
        'Все посуточные квартиры в Москве',
      '@ /sankt-peterburg | Недвижимость в Санкт-Петербурге',

      '> Все объявления на сайте проходят модерацию: проверяем фото на ' +
        'уникальность, актуальность цены и корректность адреса.',
    ],
  },

  {
    slug: 'kupit-kvartiru-v-sankt-peterburge-2026-check-list',
    title:
      'Купить квартиру в Санкт-Петербурге в 2026: чек-лист покупателя',
    metaTitle:
      'Купить квартиру в Санкт-Петербурге — чек-лист покупателя 2026',
    metaDescription:
      'Что важно проверить при покупке квартиры в Санкт-Петербурге: ' +
      'район, документы, технику, юридические тонкости. 9 шагов до сделки.',
    body: [
      'Рынок недвижимости Санкт-Петербурга в 2026 году заметно ' +
        'фрагментирован: историческая застройка центра, новостройки на ' +
        'периферии, апартаменты в бывших промзонах. Цены за квадратный ' +
        'метр сильно зависят не только от района, но и от состояния дома, ' +
        'наличия лифта, и того, как близко к метро. Этот чек-лист — про ' +
        'то, что важно проверить до сделки.',

      '# 1. Определитесь с задачей',
      'Жить самому, инвестировать или сдавать посуточно — три ' +
        'принципиально разных стратегии. Для жилья выгоднее центр и ' +
        'обжитые районы, для аренды — близость к метро и студентам, для ' +
        'посуточной — историческая часть города.',

      '# 2. Сузьте район',
      'Центр (Адмиралтейский, Петроградский, Центральный) — старый фонд ' +
        'и атмосфера. Васильевский остров — водные виды и обособленность. ' +
        'Купчино и Озерки — недорого, тихо, с зеленью. Не выбирайте ' +
        '«вообще СПб» — выберите 2–3 района и сравните в них.',
      '@ /sankt-peterburg | Каталог по Санкт-Петербургу',

      '# 3. Проверьте дом, а не только квартиру',
      'Состояние подъезда, лифта, кровли. Если дом дореволюционный — ' +
        'когда был последний капремонт, есть ли трещины в фасаде, не ' +
        'течёт ли подвал. Иногда красивая квартира внутри — это аварийный ' +
        'дом снаружи.',

      '# 4. Изучите статус документов',
      'Свидетельство о собственности или выписка из ЕГРН не старше ' +
        '30 дней. Сверьте площадь и кадастровый номер. Проверьте, нет ' +
        'ли обременений (ипотека, арест, аренда).',

      '# 5. Узнайте про несогласованные перепланировки',
      'В Санкт-Петербурге много квартир с переделанными стенами, ' +
        'кухнями в коридоре и санузлами над жилыми комнатами соседей. ' +
        'Если перепланировка не оформлена — её придётся узаконивать ' +
        'либо возвращать всё в исходное состояние.',

      '# 6. Проверьте инженерку',
      'Газовая или электрическая плита, конструкция вентиляции, ' +
        'давление воды, разводка электрики. В старом фонде проводка ' +
        'часто алюминиевая и не тянет современную бытовую технику — ' +
        'это +150-300 тысяч на ремонт.',

      '# 7. Соседи — отдельный пункт',
      'Постучите в соседние двери. Спросите про шум, протечки, ' +
        'историю дома. Иногда десять минут разговора экономят год ' +
        'нервов после сделки.',

      '# 8. Сравните цены за квадратный метр',
      'У каждого объекта на MegaDomic есть история цен и аналитика по ' +
        'району. Если квартира на 20% дороже соседей с похожими ' +
        'параметрами — спросите, почему. Иногда ответ обоснованный, ' +
        'иногда — переоценка.',

      '# 9. Используйте грамотный канал коммуникации',
      'Звонок «в лоб» через свежий номер собственника — давно ушёл в ' +
        'прошлое. Все переписки сохраняйте на сайте: вам важно, чтобы ' +
        'договорённости о цене, сроках и состоянии были задокументированы.',
      '@ /flats?city=Санкт-Петербург&transactionType=sale | ' +
        'Все квартиры на продажу в СПб',
      '@ /agents | Найти проверенного риэлтора',

      '> Если планируете ипотеку — сравните 3–4 банка по ставке и ' +
        'комиссии за выдачу. Разница в 0.5% на 10 миллионов и 25 лет ' +
        'кредита — это около 1.5 миллиона за весь срок.',
    ],
  },
]

function toLexicalDoc(lines: string[]): any {
  const children: any[] = []
  let bulletBuffer: string[] = []

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return
    children.push({
      type: 'list',
      listType: 'bullet',
      version: 1,
      tag: 'ul',
      start: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: bulletBuffer.map((t) => ({
        type: 'listitem',
        version: 1,
        value: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [textNode(t)],
      })),
    })
    bulletBuffer = []
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      flushBullets()
      continue
    }
    if (line.startsWith('# ')) {
      flushBullets()
      children.push(headingNode(line.slice(2)))
    } else if (line.startsWith('- ')) {
      bulletBuffer.push(line.slice(2))
    } else if (line.startsWith('> ')) {
      flushBullets()
      children.push(quoteNode(line.slice(2)))
    } else if (line.startsWith('@ ')) {
      flushBullets()
      const m = line.slice(2).match(/^(\S+)\s*\|\s*(.+)$/)
      if (m) children.push(linkParagraph(m[1]!, m[2]!))
    } else {
      flushBullets()
      children.push(paragraphNode(line))
    }
  }
  flushBullets()

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}

const textNode = (text: string) => ({
  type: 'text',
  version: 1,
  text,
  format: 0,
  style: '',
  detail: 0,
  mode: 'normal',
})

const paragraphNode = (text: string) => ({
  type: 'paragraph',
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: [textNode(text)],
})

const headingNode = (text: string) => ({
  type: 'heading',
  tag: 'h2',
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: [textNode(text)],
})

const quoteNode = (text: string) => ({
  type: 'quote',
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: [textNode(text)],
})

const linkParagraph = (href: string, text: string) => ({
  type: 'paragraph',
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: [
    {
      type: 'link',
      version: 2,
      format: '',
      indent: 0,
      direction: 'ltr',
      fields: { url: href, newTab: false, linkType: 'custom' },
      children: [textNode(text)],
    },
  ],
})

/** Получить/создать редакторского юзера для author-полей в постах. */
async function getOrCreateEditor(payload: any, req: any): Promise<string | number> {
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: 'editor@megadomic.ru' } },
    limit: 1,
    req,
  })
  if (existing.docs[0]) return existing.docs[0].id

  const created = await payload.create({
    collection: 'users',
    data: {
      email: 'editor@megadomic.ru',
      password: 'change-me-' + Math.random().toString(36).slice(2, 10),
      name: 'Редакция MegaDomic',
      role: 'admin',
    },
    req,
    overrideAccess: true,
  })
  return created.id
}

/** Любой существующий media-документ — fallback для image-поля. */
async function getAnyMediaId(payload: any, req: any): Promise<string | number | null> {
  const res = await payload.find({
    collection: 'media',
    limit: 1,
    sort: 'id',
    req,
  })
  return res.docs[0]?.id ?? null
}

export async function POST(request: Request): Promise<Response> {
  const authErr = requireSeedAuth(request)
  if (authErr) return authErr

  const payload = await getPayload({ config })
  const req = await createLocalReq({}, payload)

  const authorId = await getOrCreateEditor(payload, req)
  const heroImageId = await getAnyMediaId(payload, req)

  const created: string[] = []
  const skipped: string[] = []
  const failed: Array<{ slug: string; err: string }> = []

  for (const p of POSTS) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: p.slug } },
      limit: 1,
      depth: 0,
      req,
    })
    if (existing.docs[0]) {
      skipped.push(p.slug)
      continue
    }

    try {
      await payload.create({
        collection: 'posts',
        data: {
          title: p.title,
          slug: p.slug,
          _status: 'published',
          publishedDate: new Date().toISOString(),
          excerpt: p.metaDescription,
          ...(heroImageId ? { image: heroImageId } : {}),
          author: authorId,
          content: toLexicalDoc(p.body),
          meta: {
            title: p.metaTitle,
            description: p.metaDescription,
            ...(heroImageId ? { image: heroImageId } : {}),
          },
        } as any,
        req,
        overrideAccess: true,
      })
      created.push(p.slug)
    } catch (err: any) {
      failed.push({ slug: p.slug, err: err?.message ?? String(err) })
    }
  }

  return Response.json({ success: true, created, skipped, failed })
}

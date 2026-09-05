import type { Payload, PayloadRequest } from 'payload'

interface Args {
  payload: Payload
  req: PayloadRequest
}

// maxRows: 6 in header/footer configs.
// Все ссылки проверены против существующих routes:
//   /home-v2, /flats, /commercial, /lands, /residential-complexes,
//   /search, /agents, /about, /posts, /contact, /cabinet/chats
// /home-v2 закомментирован — главная одна, по корню «/». В навбаре
// его не показываем, чтобы пользователь не упирался в 404.
const HEADER_NAV = [
  { label: 'Главная', url: '/' },
  { label: 'Квартиры', url: '/flats' },
  { label: 'Коммерческая', url: '/commercial' },
  { label: 'Земля', url: '/lands' },
  { label: 'Агенты', url: '/agents' },
  { label: 'Поиск', url: '/search' },
]

const FOOTER_NAV = [
  { label: 'О нас', url: '/about' },
  { label: 'Агенты', url: '/agents' },
  { label: 'Блог', url: '/posts' },
  { label: 'Мои переписки', url: '/cabinet/chats' },
  { label: 'Поиск', url: '/search' },
  { label: 'Контакты', url: '/contact' },
]

// Mock legal info. Реквизиты — заменить в админке /admin/globals/legal-info.
const LEGAL_INFO_MOCK = {
  displayName: 'Realty',
  legalForm: 'ooo' as const,
  fullName: 'Общество с ограниченной ответственностью «Агентство Недвижимости Реалти»',
  ceoName: 'Иванов Иван Иванович',
  ceoTitle: 'Генеральный директор',
  ogrn: '1234567890123',
  inn: '7707083893',
  kpp: '770701001',
  bankAccount: '40702810000000000000',
  bankName: 'ПАО Сбербанк',
  bankBic: '044525225',
  legalAddress: '125009, г. Москва, ул. Тверская, д. 12, стр. 1, оф. 405',
  actualAddress: '125009, г. Москва, ул. Тверская, д. 12, стр. 1, оф. 405',
  phone: '+7 (495) 123-45-67',
  email: 'hello@realty.local',
  workingHours: 'Пн–Пт 10:00–19:00, Сб 11:00–17:00',
  privacyPolicyUrl: '/privacy',
  termsUrl: '/terms',
  dataProtectionOfficer: 'Петрова Анна Сергеевна',
}

export const seedGlobals = async ({ payload, req }: Args) => {
  payload.logger.info('[seed-globals] updating header & footer & legal-info…')

  await payload.updateGlobal({
    slug: 'legal-info',
    data: LEGAL_INFO_MOCK,
    req,
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: HEADER_NAV.map((item) => ({
        link: { type: 'custom' as const, newTab: false, url: item.url, label: item.label },
      })),
    },
    locale: 'ru',
    req,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: FOOTER_NAV.map((item) => ({
        link: { type: 'custom' as const, newTab: false, url: item.url, label: item.label },
      })),
    },
    locale: 'ru',
    req,
  })

  payload.logger.info('[seed-globals] done')
  return { header: HEADER_NAV.length, footer: FOOTER_NAV.length }
}

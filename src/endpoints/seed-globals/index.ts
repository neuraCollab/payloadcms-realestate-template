import type { Payload, PayloadRequest } from 'payload'
import { sql } from '@payloadcms/db-postgres'

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

  // LegalInfo через стандартный updateGlobal API (без drizzle).
  await payload.updateGlobal({
    slug: 'legal-info',
    data: LEGAL_INFO_MOCK,
    req,
  })

  // Payload's link-field has `reference: required` even when type='custom'
  // (the required flag fires regardless of admin.condition). Bypass the
  // validator by writing directly to the Postgres tables that back the
  // global. Schema:
  //   header (id=1) ← header_nav_items (id, _order, _parent_id, link_type,
  //     link_new_tab, link_url, link_label)
  const db = (payload as any).db
  const drizzle = db?.drizzle
  if (!drizzle) {
    throw new Error('Postgres adapter not available')
  }

  for (const [globalSlug, items] of [
    ['header', HEADER_NAV],
    ['footer', FOOTER_NAV],
  ] as const) {
    // Ensure the global row exists; create it if missing.
    await drizzle.execute(
      sql`INSERT INTO ${sql.raw(globalSlug)} (id) VALUES (1) ON CONFLICT (id) DO NOTHING`,
    )
    // Wipe existing nav items, repopulate.
    await drizzle.execute(sql`DELETE FROM ${sql.raw(`${globalSlug}_nav_items`)} WHERE _parent_id = 1`)
    for (let i = 0; i < items.length; i++) {
      const it = items[i]
      const itemId = `seed_${globalSlug}_${i}_${Date.now()}`
      await drizzle.execute(
        sql`INSERT INTO ${sql.raw(`${globalSlug}_nav_items`)}
           (id, _order, _parent_id, link_type, link_new_tab, link_url, link_label)
         VALUES
           (${itemId}, ${i + 1}, 1, 'custom', false, ${it.url}, ${it.label})`,
      )
    }
  }

  payload.logger.info('[seed-globals] done')
  return { header: HEADER_NAV.length, footer: FOOTER_NAV.length }
}

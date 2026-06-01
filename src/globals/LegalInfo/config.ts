import type { GlobalConfig } from 'payload'

/**
 * Реквизиты юр. лица — глобальный документ, редактируется в админке.
 * Используется футером, страницами /privacy и /terms, а также чекбоксом
 * согласия на обработку ПДн. По 149-ФЗ должны быть видны на каждой
 * странице коммерческого сайта.
 */
export const LegalInfo: GlobalConfig = {
  slug: 'legal-info',
  label: 'Реквизиты компании',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Юридическое',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Компания',
          fields: [
            {
              name: 'displayName',
              type: 'text',
              required: true,
              label: 'Краткое название (в шапке/футере)',
              defaultValue: 'Realty',
            },
            {
              name: 'legalForm',
              type: 'select',
              label: 'Форма организации',
              defaultValue: 'ooo',
              options: [
                { label: 'ООО', value: 'ooo' },
                { label: 'ИП', value: 'ip' },
                { label: 'Самозанятый', value: 'self-employed' },
                { label: 'АО', value: 'ao' },
                { label: 'ПАО', value: 'pao' },
              ],
            },
            {
              name: 'fullName',
              type: 'text',
              required: true,
              label: 'Полное наименование',
              admin: {
                description:
                  'Как в ЕГРЮЛ/ЕГРИП. Например: «Общество с ограниченной ответственностью "Агентство Недвижимости Квадрат"».',
              },
            },
            {
              name: 'ceoName',
              type: 'text',
              label: 'ФИО руководителя',
              admin: {
                description:
                  'Полное ФИО директора / ИП. Используется в Пользовательском соглашении.',
              },
            },
            {
              name: 'ceoTitle',
              type: 'text',
              label: 'Должность руководителя',
              defaultValue: 'Генеральный директор',
            },
          ],
        },
        {
          label: 'ОГРН / ИНН',
          fields: [
            {
              name: 'ogrn',
              type: 'text',
              required: true,
              label: 'ОГРН / ОГРНИП',
              admin: { description: 'Только цифры, 13 (ОГРН) или 15 (ОГРНИП).' },
            },
            {
              name: 'inn',
              type: 'text',
              required: true,
              label: 'ИНН',
            },
            {
              name: 'kpp',
              type: 'text',
              label: 'КПП (только для ООО/АО)',
            },
            {
              name: 'bankAccount',
              type: 'text',
              label: 'Расчётный счёт (опц.)',
            },
            {
              name: 'bankName',
              type: 'text',
              label: 'Банк (опц.)',
            },
            {
              name: 'bankBic',
              type: 'text',
              label: 'БИК банка (опц.)',
            },
          ],
        },
        {
          label: 'Адреса',
          fields: [
            {
              name: 'legalAddress',
              type: 'textarea',
              required: true,
              label: 'Юридический адрес',
            },
            {
              name: 'actualAddress',
              type: 'textarea',
              label: 'Фактический адрес (если отличается)',
            },
          ],
        },
        {
          label: 'Контакты',
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
              label: 'Основной телефон',
              admin: { description: 'В формате +7 (495) 123-45-67' },
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              label: 'Контактный email',
            },
            {
              name: 'workingHours',
              type: 'text',
              label: 'Часы работы',
              defaultValue: 'Пн–Пт 10:00–19:00',
            },
          ],
        },
        {
          label: 'Документы',
          fields: [
            {
              name: 'privacyPolicyUrl',
              type: 'text',
              defaultValue: '/privacy',
              label: 'URL Политики обработки ПДн',
            },
            {
              name: 'termsUrl',
              type: 'text',
              defaultValue: '/terms',
              label: 'URL Пользовательского соглашения',
            },
            {
              name: 'dataProtectionOfficer',
              type: 'text',
              label: 'ФИО ответственного за обработку ПДн (опц.)',
              admin: {
                description:
                  'По 152-ФЗ — лицо, ответственное за организацию обработки ПДн в компании.',
              },
            },
          ],
        },
      ],
    },
  ],
}

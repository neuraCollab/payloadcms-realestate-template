import type { Metadata } from 'next'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'

interface LegalInfo {
  displayName?: string
  fullName?: string
  ogrn?: string
  inn?: string
  legalAddress?: string
  email?: string
  phone?: string
  dataProtectionOfficer?: string
}

export default async function PrivacyPage() {
  const legal = (await getCachedGlobal('legal-info', 1)()) as LegalInfo
  const operator = legal?.fullName ?? 'Оператор сайта'
  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="container max-w-3xl pt-24 pb-24 prose prose-neutral dark:prose-invert">
      <h1>Политика обработки персональных данных</h1>

      <p>
        Настоящая Политика (далее — «Политика») определяет порядок обработки и защиты
        персональных данных пользователей сайта{' '}
        <strong>{legal?.displayName ?? 'Realty'}</strong> (далее — «Сайт»). Оператором
        выступает <strong>{operator}</strong>
        {legal?.ogrn ? ` (ОГРН ${legal.ogrn})` : ''}
        {legal?.inn ? `, ИНН ${legal.inn}` : ''}
        {legal?.legalAddress ? `, адрес: ${legal.legalAddress}` : ''}.
      </p>
      <p>
        Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
        «О персональных данных» и общими принципами GDPR.
      </p>

      <h2>1. Какие данные мы собираем</h2>
      <ul>
        <li>Имя, email и телефон — при отправке заявки или сообщения риэлтору.</li>
        <li>Сообщения и файлы вложений — для ведения переписки с риэлтором.</li>
        <li>Файлы cookie — для запоминания избранного, фильтров и сессии личного кабинета.</li>
        <li>Технические данные (IP, user-agent) — для статистики и противодействия спаму.</li>
      </ul>

      <h2>2. Цели обработки</h2>
      <ul>
        <li>Связь с пользователем по его запросу.</li>
        <li>Подбор недвижимости и предоставление информации об объектах.</li>
        <li>Улучшение работы Сайта и аналитика.</li>
        <li>Соблюдение требований законодательства РФ.</li>
      </ul>

      <h2>3. Правовые основания</h2>
      <ul>
        <li>
          Согласие субъекта персональных данных, выраженное проставлением чекбокса под
          формами на Сайте.
        </li>
        <li>Заключение и исполнение договора по инициативе пользователя.</li>
        <li>Требования закона (149-ФЗ, 152-ФЗ).</li>
      </ul>

      <h2>4. Передача третьим лицам</h2>
      <p>
        Мы не продаём и не передаём персональные данные третьим лицам, за исключением
        случаев, прямо предусмотренных законом, а также передачи риэлторам,
        непосредственно работающим с вашим запросом, для целей подбора недвижимости.
      </p>

      <h2>5. Хранение и безопасность</h2>
      <p>
        Данные хранятся на защищённых серверах с ограниченным доступом. Срок хранения —
        не дольше, чем требуется для целей обработки, после чего данные удаляются или
        обезличиваются.{' '}
        {legal?.dataProtectionOfficer
          ? `Ответственное за организацию обработки ПДн — ${legal.dataProtectionOfficer}.`
          : ''}
      </p>

      <h2>6. Ваши права</h2>
      <p>
        Вы можете в любой момент запросить копию ваших данных, потребовать их
        исправления, удаления или ограничения обработки, а также отозвать своё согласие.
        Для этого свяжитесь с нами по адресу{' '}
        {legal?.email ? <a href={`mailto:${legal.email}`}>{legal.email}</a> : 'указанному в разделе «Контакты»'}.
      </p>

      <h2>7. Cookie</h2>
      <p>
        Сайт использует файлы cookie для базовой работы (избранное, авторизация,
        фильтры) и аналитики. Отключение cookie может привести к некорректной работе
        отдельных разделов.
      </p>

      <h2>8. Изменения политики</h2>
      <p>
        Мы вправе обновлять Политику. Актуальная редакция всегда доступна по этому
        адресу. Дата последней редакции: <strong>{today}</strong>.
      </p>

      {legal?.phone || legal?.email ? (
        <>
          <h2>9. Контактные данные оператора</h2>
          <ul>
            {legal.phone ? <li>Телефон: {legal.phone}</li> : null}
            {legal.email ? <li>Email: {legal.email}</li> : null}
            {legal.legalAddress ? <li>Адрес: {legal.legalAddress}</li> : null}
          </ul>
        </>
      ) : null}
    </article>
  )
}

export const metadata: Metadata = {
  // Brand-suffix `— MegaDomic` добавит layout.tsx через title.template.
  title: 'Политика обработки персональных данных',
  description:
    'Как MegaDomic собирает, использует и защищает персональные данные ' +
    'пользователей: цели обработки, сроки хранения, права субъекта данных. ' +
    'Соответствует 152-ФЗ и GDPR.',
  alternates: { canonical: '/privacy' },
}

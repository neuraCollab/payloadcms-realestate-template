import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { sendEmail } from '@/lib/email'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * POST /api/cron/saved-search-digest
 *
 * Запускается внешним cron'ом (system cron / GH Actions schedule /
 * Vercel cron). Для каждого активного saved-search'а с lastRunAt
 * старше его frequency собирает новые объекты, опубликованные после
 * lastRunAt, и шлёт письмо.
 *
 * Auth: Bearer CRON_SECRET.
 *
 * Body (опц.): {} — без параметров. Можно расширить debugEmail для
 * forced-pull-теста.
 *
 * Cron-расписание:
 *   • instant — каждые 15 минут
 *   • daily   — раз в день 10:00 MSK
 *   • weekly  — пн 10:00 MSK
 * Все три можно запускать одним cron'ом каждые 15 минут — выбираем
 * сами по lastRunAt vs frequency.
 */
const FREQUENCY_MS: Record<string, number> = {
  instant: 15 * 60_000,
  daily: 24 * 60 * 60_000,
  weekly: 7 * 24 * 60 * 60_000,
}

const COLLECTION_MAP: Record<string, string> = {
  flats: 'flats',
  commercial: 'commercial',
  lands: 'lands',
  'residential-complexes': 'residential-complexes',
}

const FILTER_FIELD_MAP: Record<string, string> = {
  city: 'location.city',
  district: 'location.district',
  transactionType: 'transactionType',
  rooms: 'rooms',
}

const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

export async function POST(req: NextRequest): Promise<Response> {
  const auth = req.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const now = Date.now()
  const baseUrl = getServerSideURL()

  const searches = await payload.find({
    collection: 'saved-searches',
    where: { isActive: { equals: true } },
    limit: 500,
    depth: 0,
    overrideAccess: true,
  })

  const stats = {
    checked: 0,
    sent: 0,
    skipped: 0,
    errors: 0,
  }

  for (const s of searches.docs as any[]) {
    stats.checked++
    const interval = FREQUENCY_MS[s.frequency as string] ?? FREQUENCY_MS.daily
    const last = s.lastRunAt ? new Date(s.lastRunAt).getTime() : 0
    if (now - last < interval) {
      stats.skipped++
      continue
    }

    try {
      const filters = (s.filters ?? {}) as Record<string, any>
      const collection = COLLECTION_MAP[String(filters.collection ?? 'flats')]
      if (!collection) {
        stats.skipped++
        continue
      }

      // Собираем where-условие из filters + добавляем createdAt > last
      // (или > 7 дней назад для первого запуска).
      const since = last > 0 ? new Date(last) : new Date(now - 7 * 24 * 60 * 60_000)
      const where: any = {
        and: [
          { status: { equals: 'active' } },
          { createdAt: { greater_than: since.toISOString() } },
        ],
      }
      for (const [k, v] of Object.entries(filters)) {
        if (k === 'collection') continue
        if (v == null || v === '') continue
        const field = FILTER_FIELD_MAP[k] ?? k
        if (k === 'maxPrice') {
          where.and.push({ price: { less_than_equal: Number(v) } })
        } else if (k === 'minPrice') {
          where.and.push({ price: { greater_than_equal: Number(v) } })
        } else {
          where.and.push({ [field]: { equals: v } })
        }
      }

      const matches = await payload.find({
        collection: collection as any,
        where,
        sort: '-createdAt',
        limit: 10,
        depth: 1,
        overrideAccess: true,
      })

      // Обновляем lastRunAt + count в любом случае, даже без матчей —
      // иначе будем дёргать БД каждые 15 минут впустую.
      await payload.update({
        collection: 'saved-searches',
        id: s.id,
        data: {
          lastRunAt: new Date(now).toISOString(),
          lastMatchCount: matches.totalDocs,
        } as any,
        overrideAccess: true,
      })

      if (matches.totalDocs === 0) {
        stats.skipped++
        continue
      }

      // Письмо.
      const subject = `Новые объекты по вашему поиску «${s.name}» — Demo Realty`
      const items = matches.docs as any[]
      const textLines = items
        .slice(0, 10)
        .map(
          (d: any) =>
            `• ${d.title} — ${formatPrice(d.price)} — ${d.location?.city ?? ''}` +
            `\n  ${baseUrl}/${collection}/${d.slug}`,
        )
        .join('\n\n')
      const htmlItems = items
        .slice(0, 10)
        .map((d: any) => {
          const img = d.images?.[0]?.image?.url
          const imgFull = img ? new URL(img, baseUrl).toString() : null
          return (
            `<tr>` +
            `<td style="padding:8px 12px;border-bottom:1px solid #eee">` +
            (imgFull
              ? `<img src="${imgFull}" alt="" width="120" style="border-radius:8px;display:block">`
              : '') +
            `</td>` +
            `<td style="padding:8px 12px;border-bottom:1px solid #eee">` +
            `<a href="${baseUrl}/${collection}/${d.slug}" style="color:#1d4ed8;text-decoration:none;font-weight:500">${d.title}</a>` +
            `<div style="color:#444;margin-top:4px">${formatPrice(d.price)} · ${d.location?.city ?? ''}</div>` +
            `</td>` +
            `</tr>`
          )
        })
        .join('')

      const text =
        `По вашему сохранённому поиску «${s.name}» нашлось ${matches.totalDocs} новых объектов:\n\n` +
        textLines +
        `\n\nВсе результаты: ${baseUrl}/${collection}` +
        `\n\nЕсли больше не хотите получать письма — зайдите в кабинет и удалите поиск:\n` +
        `${baseUrl}/cabinet/saved-searches\n`
      const html =
        `<h2 style="margin:0 0 8px">Новые объекты по поиску «${escapeHtml(s.name)}»</h2>` +
        `<p style="color:#555">${matches.totalDocs} ${matches.totalDocs === 1 ? 'новый объект' : 'новых'}.</p>` +
        `<table style="border-collapse:collapse;width:100%;max-width:600px">${htmlItems}</table>` +
        `<p style="margin-top:24px"><a href="${baseUrl}/${collection}" style="color:#1d4ed8">Открыть все результаты</a></p>` +
        `<hr/>` +
        `<p style="color:#999;font-size:12px"><a href="${baseUrl}/cabinet/saved-searches" style="color:#999">Отписаться/изменить поиск</a></p>`

      const send = await sendEmail({
        to: s.email,
        subject,
        text,
        html,
      })
      if (send.ok) {
        stats.sent++
      } else {
        stats.errors++
      }
    } catch (err) {
      console.error('[digest]', s.id, (err as Error).message)
      stats.errors++
    }
  }

  return NextResponse.json({ ok: true, stats })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

import { NextRequest, NextResponse } from 'next/server'
import { tg } from '@/lib/telegram/client'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * POST /api/admin/telegram-setup
 *
 * Regs webhook на сервере Telegram. Дёргать один раз после деплоя
 * (или при смене домена / token / secret).
 *
 * Auth: Bearer CRON_SECRET.
 *
 * Body:
 *   { action: 'set' | 'delete' | 'info' }
 *
 * Без body — действие 'set'.
 */
export async function POST(req: NextRequest): Promise<Response> {
  const auth = req.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const action = body.action ?? 'set'

  if (action === 'info') {
    const info = await tg.getWebhookInfo()
    return NextResponse.json(info)
  }

  if (action === 'delete') {
    const res = await tg.deleteWebhook()
    return NextResponse.json(res)
  }

  const base = getServerSideURL()
  const webhookUrl = `${base}/api/telegram/webhook`
  const res = await tg.setWebhook(
    webhookUrl,
    process.env.TELEGRAM_WEBHOOK_SECRET,
  )
  return NextResponse.json({
    webhookUrl,
    result: res,
  })
}

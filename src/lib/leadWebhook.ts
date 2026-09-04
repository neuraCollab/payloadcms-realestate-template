import { getServerSideURL } from '@/utilities/getURL'

/**
 * Outbound notification fired on every new lead — POSTs to an external
 * service (e.g. a separate Telegram-bot repo) so it can push a message
 * to the agency. This app has no Telegram bot logic of its own for
 * this; it just tells whoever's listening that a lead came in.
 *
 * Env:
 *   LEAD_WEBHOOK_URL    — full URL to POST to. Empty = feature off.
 *   LEAD_WEBHOOK_SECRET — sent as `Authorization: Bearer <secret>` so
 *                          the receiver can reject unauthenticated
 *                          requests to its endpoint.
 */

const TIMEOUT_MS = 5000

export interface LeadWebhookPayload {
  id: number | string
  phone: string
  name?: string
  channel: 'callback' | 'telegram' | 'whatsapp' | 'instagram'
  contactHandle?: string
  message?: string
  propertyCollection?: string
  propertyId?: string
  propertyTitle?: string
  realtorId?: number
  pageUrl?: string
  createdAt: string
  adminUrl: string
}

export async function notifyLeadWebhook(
  lead: Omit<LeadWebhookPayload, 'adminUrl'>,
): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) return // feature off — no bot configured yet

  const payload: LeadWebhookPayload = {
    ...lead,
    adminUrl: `${getServerSideURL()}/admin/collections/leads/${lead.id}`,
  }

  const secret = process.env.LEAD_WEBHOOK_SECRET
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!res.ok) {
      console.warn(`[leadWebhook] non-OK response: ${res.status} ${res.statusText}`)
    }
  } catch (err) {
    console.warn('[leadWebhook] request failed:', (err as Error).message)
  } finally {
    clearTimeout(timeout)
  }
}

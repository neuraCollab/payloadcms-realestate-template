import type { CollectionAfterChangeHook } from 'payload'
import { sendEmail } from '@/lib/email'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * afterChange-хук для коллекции messages.
 *
 * При операции `create` отправляет email уведомление получателю:
 *   • inbound  (user → realtor) → шлём риэлтору
 *   • outbound (realtor → user) → шлём юзеру
 *
 * Fire-and-forget: setImmediate отдаёт контроль обратно немедленно,
 * чтобы лагающий Resend не блокировал ответ Payload create.
 *
 * Содержимое — только subject + первые ~200 символов message + ссылка
 * на тред в кабинете. Полное сообщение не дублируем в email чтобы не
 * стать вектором утечки данных через скомпрометированную почту.
 */
export const messageNotifyAfterChange: CollectionAfterChangeHook = ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc

  setImmediate(async () => {
    try {
      const direction = doc.direction ?? 'inbound'
      const baseUrl = getServerSideURL()

      // Кому отправляем
      let recipientEmail: string | null = null
      let recipientLabel = ''

      if (direction === 'inbound') {
        // От юзера → риэлтору. Берём email из связи realtor.
        const realtorId =
          typeof doc.realtor === 'object' ? doc.realtor?.id : doc.realtor
        if (!realtorId) return
        const realtor: any = await req.payload.findByID({
          collection: 'users',
          id: realtorId,
          depth: 0,
        })
        recipientEmail = realtor?.email ?? null
        recipientLabel = realtor?.name ?? 'риэлтор'
      } else {
        // От риэлтора → юзеру. Email юзера хранится в doc.email
        // (тред заводился от его имени).
        recipientEmail = doc.email ?? null
        recipientLabel = doc.name ?? ''
      }

      if (!recipientEmail) return

      // Превью текста — Lexical-doc → грубый plain-text.
      const messagePreview = extractText(doc.message).slice(0, 200)
      const threadUrl = doc.threadId
        ? `${baseUrl}/cabinet/chats/${doc.threadId}`
        : `${baseUrl}/cabinet/chats`

      const subject =
        direction === 'inbound'
          ? `Новое сообщение от ${doc.name ?? 'пользователя'} — Demo Realty`
          : `Ответ риэлтора по вашему запросу — Demo Realty`

      const text =
        `Здравствуйте${recipientLabel ? ', ' + recipientLabel : ''}!\n\n` +
        (doc.subject ? `Тема: ${doc.subject}\n\n` : '') +
        (messagePreview ? `«${messagePreview}…»\n\n` : '') +
        `Открыть в кабинете: ${threadUrl}\n`
      const html =
        `<p>Здравствуйте${recipientLabel ? ', <b>' + recipientLabel + '</b>' : ''}!</p>` +
        (doc.subject ? `<p><b>Тема:</b> ${escapeHtml(doc.subject)}</p>` : '') +
        (messagePreview
          ? `<p style="border-left:3px solid #1d4ed8;padding-left:12px;color:#444">«${escapeHtml(messagePreview)}…»</p>`
          : '') +
        `<p><a href="${threadUrl}" style="background:#1d4ed8;color:#fff;padding:10px 20px;text-decoration:none;border-radius:24px;display:inline-block">Открыть в кабинете</a></p>` +
        `<p style="color:#999;font-size:12px">Письмо отправлено автоматически.</p>`

      await sendEmail({ to: recipientEmail, subject, text, html })
    } catch (err) {
      req.payload.logger.error(
        { err: (err as Error).message },
        '[messageNotify] failed',
      )
    }
  })

  return doc
}

/** Грубый Lexical → plain text. Берёт все text-ноды по dfs. */
function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  const parts: string[] = []
  if (typeof node.text === 'string') parts.push(node.text)
  if (Array.isArray(node.children)) parts.push(...node.children.map(extractText))
  if (node.root) parts.push(extractText(node.root))
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// app/api/messages/route.ts
//
// Accepts both JSON and multipart/form-data. Multipart form lets the message
// popup attach a single file (uploaded into the Media collection first, then
// referenced from the Message). Field `message` is wrapped into a minimal
// Lexical-style structure because the Messages.message field is richText.

import { getPayload } from 'payload'
import config from '@/payload.config'
import { computeThreadId } from '@/lib/threadId'

type Payload = {
  realtorId?: string
  subject?: string
  name?: string
  email?: string
  phone?: string
  message?: string
  property?: string
}

/**
 * Wraps a plain string into a minimal Lexical-compatible richText value so
 * Payload's lexical editor accepts it for the `message` field.
 */
const wrapText = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            mode: 'normal',
            text,
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
      },
    ],
  },
})

const readBody = async (req: Request): Promise<{ payload: Payload; file?: File }> => {
  const ct = req.headers.get('content-type') ?? ''
  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()
    const payload: Payload = {
      realtorId: form.get('realtorId')?.toString(),
      subject: form.get('subject')?.toString(),
      name: form.get('name')?.toString(),
      email: form.get('email')?.toString(),
      phone: form.get('phone')?.toString(),
      message: form.get('message')?.toString(),
      property: form.get('property')?.toString(),
    }
    const file = form.get('attachment')
    return { payload, file: file instanceof File ? file : undefined }
  }
  return { payload: (await req.json()) as Payload }
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const { payload: body, file } = await readBody(req)
    const { realtorId, subject, name, email, phone, message, property } = body

    if (!realtorId || !subject || !name || !email || !message) {
      return Response.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    const realtor = await payload.findByID({ collection: 'users', id: realtorId })
    if (!realtor || realtor.role !== 'realtor') {
      return Response.json({ error: 'Неверный риелтор' }, { status: 400 })
    }

    // Optional file: upload to Media first with overrideAccess so anonymous
    // users can attach files without a session.
    let attachmentId: string | number | undefined
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer()
      const created = await payload.create({
        collection: 'media',
        data: { alt: `Вложение от ${name}` } as any,
        file: {
          data: Buffer.from(arrayBuffer),
          mimetype: file.type,
          name: file.name,
          size: file.size,
        },
        overrideAccess: true,
      })
      attachmentId = created.id
    }

    const threadId = computeThreadId(realtorId, email)

    await payload.create({
      collection: 'messages',
      data: {
        realtor: realtorId,
        subject,
        name,
        email,
        phone,
        message: wrapText(message) as any,
        property,
        threadId,
        direction: 'inbound',
        ...(attachmentId ? { attachment: attachmentId } : {}),
      } as any,
      overrideAccess: true,
    })

    // Set lightweight email-session cookie so /cabinet/chats can list this
    // user's threads without forcing them through real auth.
    const res = Response.json({
      success: true,
      threadId,
      chatUrl: `/cabinet/chats/${threadId}`,
    })
    res.headers.append(
      'Set-Cookie',
      `realty_email=${encodeURIComponent(email)}; Path=/; Max-Age=${60 * 60 * 24 * 90}; SameSite=Lax`,
    )
    return res
  } catch (error) {
    console.error('Message submission error:', error)
    return Response.json({ error: 'Ошибка отправки' }, { status: 500 })
  }
}

import { getPayload } from 'payload'
import config from '@/payload.config'
import { rateLimitOk, looksLikeBot, HONEYPOT_FIELD } from '@/lib/rateLimit'

export async function POST(req: Request) {
  try {
    const rl = rateLimitOk(req, { key: 'reviews', limit: 5, windowMs: 10 * 60_000 })
    if (!rl.ok) return rl.response

    const payload = await getPayload({ config })
    const body = await req.json()

    if (looksLikeBot(body?.[HONEYPOT_FIELD])) {
      return Response.json({ success: true })
    }

    const { realtorId, authorName, authorEmail, rating, comment } = body

    if (!realtorId || !authorName || !rating || !comment) {
      return Response.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    const realtor = await payload.findByID({ collection: 'users', id: realtorId })
    if (!realtor || realtor.role !== 'realtor') {
      return Response.json({ error: 'Неверный риэлтор' }, { status: 400 })
    }

    await payload.create({
      collection: 'reviews',
      data: {
        realtor: realtorId,
        authorName,
        authorEmail,
        rating,
        comment,
        status: 'pending',
      },
      overrideAccess: true,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Не удалось отправить отзыв' }, { status: 500 })
  }
}

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()

    const { realtorId, authorName, authorEmail, rating, comment } = body

    if (!realtorId || !authorName || !rating || !comment) {
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Проверяем, что realtorId — это пользователь с ролью realtor
    const realtor = await payload.findByID({
      collection: 'users',
      id: realtorId,
    })

    if (!realtor || realtor.role !== 'realtor') {
      return Response.json({ error: 'Invalid realtor' }, { status: 400 })
    }

    const review = await payload.create({
      collection: 'reviews',
      data: {
        realtor: realtorId,
        authorName,
        authorEmail,
        rating,
        comment,
        status: 'pending',
      },
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}

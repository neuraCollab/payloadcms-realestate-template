// app/api/messages/route.ts
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()

    const { realtorId, subject, name, email, phone, message, property } = body

    // Валидация
    if (!realtorId || !subject || !name || !email || !message) {
      return Response.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    // Проверяем, что realtorId — это риелтор
    const realtor = await payload.findByID({
      collection: 'users',
      id: realtorId,
    })

    if (!realtor || realtor.role !== 'realtor') {
      return Response.json({ error: 'Неверный риелтор' }, { status: 400 })
    }

    // Создаём сообщение
    const msg = await payload.create({
  collection: 'messages',
   {
    realtor: realtorId,
    subject,
    name,
    email,
    phone,
    message,
    property,
  },
})

    return Response.json({ success: true })
  } catch (error) {
    console.error('Message submission error:', error)
    return Response.json({ error: 'Ошибка отправки' }, { status: 500 })
  }
}
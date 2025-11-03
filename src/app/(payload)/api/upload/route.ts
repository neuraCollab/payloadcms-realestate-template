// app/api/upload/route.ts
import { getPayload } from 'payload'
import config from '@/payload.config'

export const POST = async (req: Request) => {
  const payload = await getPayload({ config })
  
  // Этот эндпоинт требует авторизации по умолчанию
  // Для анонимной загрузки нужно настроить access control
  // Или использовать кастомную логику
  
  // Альтернатива: загружайте файлы напрямую через Payload Media API
  // с временным токеном (сложнее)
  
  // Пока — просто вернём ошибку
  return Response.json({ error: 'Анонимная загрузка отключена' }, { status: 403 })
}
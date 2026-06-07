import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { requireSeedAuth } from '@/utilities/seedAuth'

export const maxDuration = 60

// 4 фото для разных интерьерных миниатюр — все CC0 из Unsplash,
// скачаны в /public. Этот эндпоинт привязывает их к первым 4
// активным квартирам, чтобы было видно как карточка/галерея
// смотрятся с настоящим фото (а не только с placeholder.jpg).
const PHOTO_FILES = [
  'placeholder.jpg', // дом снаружи
  'sample-1.jpg',
  'sample-2.jpg',
  'sample-3.jpg',
]

export async function POST(request: Request): Promise<Response> {
  const authErr = requireSeedAuth(request)
  if (authErr) return authErr

  const payload = await getPayload({ config })
  const req = await createLocalReq({}, payload)

  // Берём самые свежие активные квартиры — на них прицепим фото.
  const flats = await payload.find({
    collection: 'flats',
    where: { status: { equals: 'active' } },
    sort: '-createdAt',
    limit: PHOTO_FILES.length,
    depth: 0,
    req,
  })

  const attached: Array<{ id: number | string; file: string }> = []
  const skipped: Array<{ id: number | string; reason: string }> = []

  for (let i = 0; i < flats.docs.length; i++) {
    const flat: any = flats.docs[i]
    const fileName = PHOTO_FILES[i % PHOTO_FILES.length]!
    const filePath = path.join(process.cwd(), 'public', fileName)

    let buffer: Buffer
    try {
      buffer = await fs.readFile(filePath)
    } catch {
      skipped.push({ id: flat.id, reason: `файл ${fileName} не найден` })
      continue
    }

    try {
      // Создаём Media-док из файла — Payload сам обработает имя,
      // размер и MIME через sharp.
      const media = await payload.create({
        collection: 'media',
        data: { alt: flat.title || 'Фото объекта' },
        file: {
          data: buffer,
          mimetype: 'image/jpeg',
          name: `${flat.slug || 'flat'}-${i}.jpg`,
          size: buffer.length,
        },
        req,
      })

      // Прикрепляем как первое изображение квартиры.
      await payload.update({
        collection: 'flats',
        id: flat.id,
        data: {
          images: [{ image: media.id, alt: flat.title || 'Фото объекта' } as any],
        },
        req,
      })

      attached.push({ id: flat.id, file: fileName })
    } catch (err: any) {
      skipped.push({ id: flat.id, reason: err?.message || 'unknown error' })
    }
  }

  return Response.json({ success: true, attached, skipped })
}

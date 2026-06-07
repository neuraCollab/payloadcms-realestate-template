import type { CollectionAfterChangeHook } from 'payload'
import { slugifyRu } from '@/collections/Cities'

/**
 * Auto-create record в коллекции `cities` если объявление пришло
 * из города которого ещё нет.
 *
 * Зачем: чтобы новый город автоматически получал landing-page
 * `/<city-slug>` без ручного добавления в админке. Например пришло
 * первое объявление из Омска → автоматом создаётся `cities` с
 * name='Омск', slug='omsk', isActive=true → доступен `/omsk`.
 *
 * **Безопасность 404:** мы не делаем «любой slug — это город».
 * Page-роут /[slug] проверяет ИМЕННО запись в cities (queryCityBySlug
 * + isActive=true). Если её нет — fallback на Pages, иначе 404.
 * Хук лишь добавляет запись для городов, которые РЕАЛЬНО есть в
 * объявлениях. Случайный slug вроде /adadfds никогда не появится
 * в cities и продолжит 404'ить.
 *
 * Fire-and-forget — лагающий create не блокирует основной поток.
 *
 * Идемпотентно: проверяем существующую запись по точному name. Если
 * есть — выходим. Если slug коллизит с другой записью (редко, но
 * возможно для городов-омонимов в разных регионах) — добавляем
 * суффикс из первых 2 букв региона. Без региона — просто пропускаем
 * (админ создаст вручную).
 */
export const cityAutoCreateAfterChange: CollectionAfterChangeHook = ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create' && operation !== 'update') return doc

  const cityName: string | undefined = doc?.location?.city?.trim()
  if (!cityName) return doc

  setImmediate(async () => {
    try {
      // 1. Уже есть запись с таким именем?
      const existing = await req.payload.find({
        collection: 'cities',
        where: { name: { equals: cityName } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      if (existing.totalDocs > 0) return

      // 2. Сгенерировать slug. Если занят — попробовать с суффиксом
      // из района/региона (district в location), иначе skip.
      const baseSlug = slugifyRu(cityName)
      if (!baseSlug) return // пустой slug — пропускаем

      const slugCollision = await req.payload.find({
        collection: 'cities',
        where: { slug: { equals: baseSlug } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })

      let finalSlug = baseSlug
      if (slugCollision.totalDocs > 0) {
        // Город-омоним. Пробуем добавить регион (если есть в районе).
        const district: string | undefined = doc?.location?.district
        if (district) {
          finalSlug = `${baseSlug}-${slugifyRu(district).slice(0, 6)}`
        } else {
          // Без региона имени-омонима не различить — оставим
          // существующий, новый объект просто без своего landing.
          req.payload.logger.warn(
            { city: cityName, slug: baseSlug },
            '[cityAutoCreate] slug collision, skipping',
          )
          return
        }
      }

      await req.payload.create({
        collection: 'cities',
        data: {
          name: cityName,
          slug: finalSlug,
          isActive: true,
          country: 'Россия',
        } as any,
        overrideAccess: true,
      })

      req.payload.logger.info(
        { city: cityName, slug: finalSlug },
        '[cityAutoCreate] new city created',
      )
    } catch (err) {
      req.payload.logger.error(
        { err: (err as Error).message, city: cityName },
        '[cityAutoCreate] failed',
      )
    }
  })

  return doc
}

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getServerSideURL } from '@/utilities/getURL'
import type { PropertyType } from '@/components/PropertyFilters/schemas'
import { formatPrice } from '@/utilities/formatPrice'


const COLLECTION_MAP: Record<PropertyType, string> = {
  flats: 'flats',
  commercial: 'commercial',
  lands: 'lands',
  'residential-complexes': 'residential-complexes',
}

const TYPE_LABEL: Record<PropertyType, string> = {
  flats: 'Квартира',
  commercial: 'Коммерческая недвижимость',
  lands: 'Земельный участок',
  'residential-complexes': 'Жилой комплекс',
}


/**
 * Generates SEO metadata for a property detail page.
 * Includes title, description, canonical url, OG image and Twitter card.
 * Fetches the property doc once — call from `generateMetadata`.
 */
export const buildPropertyMetadata = async (
  type: PropertyType,
  slug: string,
): Promise<Metadata> => {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: COLLECTION_MAP[type] as any,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    const doc: any = result.docs?.[0]
    if (!doc) return { title: 'Объект не найден' }

    // ResidentialComplex docs use `name`, every other collection uses `title`.
    const docTitle: string = doc.title ?? doc.name
    const title = `${docTitle} — ${TYPE_LABEL[type]}`
    const priceText = typeof doc.price === 'number' ? formatPrice(doc.price) : null
    const where = doc.location?.address || doc.location?.city || ''
    const description = [
      docTitle,
      where ? `· ${where}` : '',
      priceText ? `· ${priceText}` : '',
    ]
      .filter(Boolean)
      .join(' ')
      .slice(0, 200)

    const baseUrl = getServerSideURL()
    const canonical = `${baseUrl}/${type}/${doc.slug}`
    const ogImage: string | undefined = doc.images?.[0]?.image?.url
      ? new URL(doc.images[0].image.url, baseUrl).toString()
      : undefined

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'website',
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: docTitle }] : undefined,
        siteName: 'Demo Realty',
        locale: 'ru_RU',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
    }
  } catch {
    return { title: 'Объект недвижимости — Demo Realty' }
  }
}

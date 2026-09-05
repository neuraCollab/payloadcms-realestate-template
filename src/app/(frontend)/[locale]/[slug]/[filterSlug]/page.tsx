import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'

import { PropertyListingPage } from '@/components/PropertyListingPage'
import { ALL_FILTER_SLUGS, parseFilterSlug } from '@/lib/cityUrls'
import { getServerSideURL } from '@/utilities/getURL'

interface RouteParams {
  locale: string
  slug: string
  filterSlug: string
}

interface Args {
  params: Promise<RouteParams>
  searchParams: Promise<Record<string, string | undefined>>
}

// SSG skipped — DB unreachable at build-time inside docker compose.
export const dynamic = 'force-dynamic'

const fetchCity = async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'cities',
    where: {
      and: [{ slug: { equals: slug } }, { isActive: { equals: true } }],
    },
    limit: 1,
    depth: 0,
    pagination: false,
  })
  return res.docs?.[0] ?? null
}

/**
 * Получить опубликованный seo-landing, если он есть для этой комбо.
 * Возвращает null если нет (роут продолжит работать как и раньше).
 */
const fetchSeoLanding = async (citySlug: string, filterSlug: string) => {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'seo-landings' as any,
      where: {
        and: [
          { citySlug: { equals: citySlug } },
          { filterSlug: { equals: filterSlug } },
          { isPublished: { equals: true } },
        ],
      },
      limit: 1,
      depth: 0,
      pagination: false,
      overrideAccess: true,
    })
    return (res.docs?.[0] as any) ?? null
  } catch {
    // Таблица seo_landings может ещё не существовать на проде.
    return null
  }
}

export default async function CityFilterPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { locale, slug, filterSlug } = await paramsPromise
  const userParams = await searchParamsPromise

  const [city, parsed, landing] = await Promise.all([
    fetchCity(slug),
    Promise.resolve(parseFilterSlug(filterSlug)),
    fetchSeoLanding(slug, filterSlug),
  ])

  if (!city) notFound()
  if (!parsed) notFound()

  // Compose searchParams: filter-slug provides defaults, user-supplied overrides win.
  const composed: Record<string, string | undefined> = {
    city: city.name,
    ...(parsed.transactionType ? { transactionType: parsed.transactionType } : {}),
    ...userParams,
  }

  // FAQPage JSON-LD — если в landing есть FAQ, отдадим Google.
  const faqJsonLd = landing?.faq && Array.isArray(landing.faq) && landing.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: landing.faq.map((item: any) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null

  return (
    <div className="pt-16 pb-24">
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <div className="container space-y-6">
        {/* Layered SEO-блок — поверх каталога. Если landing нет —
            ничего не рендерим, каталог работает как раньше. */}
        {landing ? (
          <section className="space-y-3">
            <h1 className="text-display text-on-surface">
              {landing.h1 || `${parsed.label} в городе ${city.name}`}
            </h1>
            {landing.intro ? (
              <div className="max-w-3xl space-y-3 text-body text-on-surface-variant">
                {String(landing.intro)
                  .split(/\n\s*\n/)
                  .map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <PropertyListingPage
          type={parsed.category}
          title={landing ? undefined : `${parsed.label} в городе ${city.name}`}
          searchParams={composed}
          mapBaseUrl={`/${parsed.category}`}
          locale={locale}
        />

        {/* FAQ — внизу страницы, под каталогом. Видимые вопросы +
            JSON-LD выше для Google. */}
        {landing?.faq && Array.isArray(landing.faq) && landing.faq.length > 0 ? (
          <section className="bg-card rounded-md shadow-e1 p-6 max-w-3xl">
            <h2 className="text-title-lg text-on-surface mb-4">Частые вопросы</h2>
            <div className="divide-y divide-border">
              {landing.faq.map((item: any, i: number) => (
                <details key={i} className="group py-3">
                  <summary className="flex items-center justify-between gap-3 cursor-pointer text-body font-medium text-on-surface list-none">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="text-on-surface-variant transition-transform group-open:rotate-45 text-xl leading-none"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-body-sm text-on-surface-variant leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug, filterSlug } = await paramsPromise
  const [city, parsed, landing] = await Promise.all([
    fetchCity(slug),
    Promise.resolve(parseFilterSlug(filterSlug)),
    fetchSeoLanding(slug, filterSlug),
  ])
  if (!city || !parsed) {
    return { title: 'Страница не найдена' }
  }
  const base = getServerSideURL()
  const canonical = `${base}/${slug}/${filterSlug}`
  const title =
    landing?.title || `${parsed.label} в городе ${city.name}`
  const description =
    landing?.metaDescription ||
    `${parsed.label.toLowerCase()} в городе ${city.name}. Свежие объявления с фильтрами и картой.`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website' },
  }
}

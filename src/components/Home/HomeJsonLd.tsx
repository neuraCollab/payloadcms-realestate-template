import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * JSON-LD для главной: Organization + WebSite + RealEstateAgent.
 *
 * • Organization — для всего бренда, появляется в Knowledge Panel.
 * • WebSite + potentialAction SearchAction — даёт sitelinks searchbox
 *   в выдаче Google.
 * • RealEstateAgent — отраслевая разметка, помогает попадать в
 *   тематические подборки.
 *
 * Реквизиты юр.лица берутся из глобала legal-info (если он заполнен).
 */
export const HomeJsonLd: React.FC<{
  legal?: {
    displayName?: string
    legalAddress?: string
    phone?: string
    email?: string
  } | null
}> = ({ legal }) => {
  const base = getServerSideURL()
  const orgName = legal?.displayName || 'MegaDomic'

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: orgName,
    url: base,
    logo: `${base}/logo-light.svg`,
    sameAs: [],
    ...(legal?.phone && { telephone: legal.phone }),
    ...(legal?.email && { email: legal.email }),
    ...(legal?.legalAddress && {
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RU',
        streetAddress: legal.legalAddress,
      },
    }),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: orgName,
    url: base,
    inLanguage: 'ru-RU',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const realEstate = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: orgName,
    url: base,
    areaServed: [
      { '@type': 'City', name: 'Москва' },
      { '@type': 'City', name: 'Санкт-Петербург' },
    ],
    knowsAbout: [
      'Продажа квартир',
      'Аренда квартир',
      'Посуточная аренда',
      'Коммерческая недвижимость',
      'Земельные участки',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstate) }}
      />
    </>
  )
}

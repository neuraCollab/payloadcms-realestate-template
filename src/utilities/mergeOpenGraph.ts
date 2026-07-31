import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Demo Realty — поиск и покупка недвижимости: квартиры, дома, земля, коммерческая. Тысячи проверенных объявлений и прозрачные сделки.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Demo Realty — недвижимость',
    },
  ],
  siteName: 'Demo Realty',
  title: 'Demo Realty — недвижимость',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

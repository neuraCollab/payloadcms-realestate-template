import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'MegaDomic — поиск и покупка недвижимости: квартиры, дома, земля, коммерческая. Тысячи проверенных объявлений и прозрачные сделки.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'MegaDomic — недвижимость',
    },
  ],
  siteName: 'MegaDomic',
  title: 'MegaDomic — недвижимость',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

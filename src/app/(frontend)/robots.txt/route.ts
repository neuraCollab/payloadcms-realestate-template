import { getServerSideURL } from '@/utilities/getURL'

/**
 * Динамический robots.txt. Указывает базу с относительным URL sitemap,
 * чтобы поисковики автоматически нашли карту сайта при первом обходе.
 *
 * Запрещаем /admin (внутренний UI Payload) и /api (REST-эндпоинты —
 * это сервисные данные, не контент).
 */
export const dynamic = 'force-dynamic'

export function GET(): Response {
  const base = getServerSideURL()
  const body = [
    'User-agent: *',
    'Disallow: /admin',
    'Disallow: /api',
    'Disallow: /next/',
    'Disallow: /cabinet/',
    '',
    `Sitemap: ${base}/pages-sitemap.xml`,
    `Sitemap: ${base}/posts-sitemap.xml`,
    '',
  ].join('\n')

  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

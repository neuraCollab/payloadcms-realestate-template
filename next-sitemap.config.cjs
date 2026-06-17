const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  // robots.txt is served by the dynamic route at
  // src/app/(frontend)/robots.txt/route.ts instead. next-sitemap writing a
  // static public/robots.txt would shadow that route (Next.js always
  // prefers a static file in public/ over a route handler at the same
  // path), undoing its Disallow rules for /api, /next/ and /cabinet/.
  generateRobotsTxt: false,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/listings-sitemap.xml', '/*', '/posts/*'],
}

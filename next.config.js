import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output bundles only the deps Next needs at runtime.
  // Required by Dockerfile (multi-stage prod build copies .next/standalone).
  output: 'standalone',
  // Skip TypeScript during build to free RAM on small VPS.
  // Both are caught in CI / IDE — no functional impact.
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
    // Payload media is served same-origin at /api/media/file/*, with a
    // `?<updatedAt>` cache-busting query string appended by ImageMedia.
    // Next 16 requires local image URLs that carry a search string to be
    // explicitly allow-listed, otherwise next/image throws
    // "using a query string which is not configured in images.localPatterns".
    // Any local (relative-src) image is allowed, same as before Next
    // required an explicit allow-list — this app also serves next/image
    // from /public (e.g. /placeholder.jpg) besides /api/media/file/**,
    // and the latter carries a per-image `?<updatedAt>` cache-busting
    // query string next/image would otherwise reject.
    localPatterns: [{ pathname: '/**' }],
    // AVIF → WebP → JPEG fallback. AVIF меньше JPEG в 2-3 раза
    // при сопоставимом качестве, WebP в 1.5-2. Поддерживают почти
    // все живые браузеры. Next сам выбирает по Accept заголовку.
    formats: ['image/avif', 'image/webp'],
    // Кеш оптимизированной картинки в _next/image — год.
    // Меняется только при изменении исходного файла (хеш в URL).
    minimumCacheTTL: 31536000,
  },
  reactStrictMode: true,
  redirects,
  // Aggressive caching for hashed static assets и иконок: эти файлы
  // immutable (next/font/google пишет хэш в имя), браузер и любой
  // прокси-кэш могут держать их год без re-validation.
  //
  // Без этого nginx по умолчанию отдаёт только Cache-Control: public,
  // что на холодную сеть превращается в ~1с на 80 KiB woff2.
  async headers() {
    const oneYear = 'public, max-age=31536000, immutable'
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: oneYear }],
      },
      {
        // next/font выгружается в /_next/static/media — отдельным
        // паттерном для надёжности (на случай если roadmap изменит путь).
        source: '/_next/static/media/:path*',
        headers: [{ key: 'Cache-Control', value: oneYear }],
      },
      {
        // /public иконки и манифест — реже меняются.
        source: '/:asset(favicon\\.ico|icon-mark\\.svg|apple-touch-icon\\.png|site\\.webmanifest)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

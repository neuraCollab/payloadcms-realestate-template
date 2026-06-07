# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.js file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Pull from Google Container Registry mirror of DockerHub.
# DockerHub's CloudFront CDN is blocked in some regions (e.g. RU); the GCR
# mirror is consistently reachable. Falls back to `docker.io/library/node`
# automatically if your registry mirror config covers Docker Hub.
FROM mirror.gcr.io/library/node:22.12.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager.
# NOTE: --no-frozen-lockfile позволяет собрать прод-образ даже если
# pnpm-lock.yaml отстал от package.json. Для воспроизводимых билдов
# регенерируй lockfile перед коммитом (`pnpm install` локально).
#
# pnpm устанавливается через `npm install -g`, а НЕ через corepack:
# corepack в Node 22.12 падает на проверке подписей последних релизов
# pnpm («Cannot find matching keyid»). Прямая установка обходит баг.
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --no-lockfile; \
  elif [ -f package-lock.json ]; then npm install --no-audit --no-fund; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm@10.3.0 && pnpm i --no-frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Build-time secrets/env. Все NEXT_PUBLIC_* должны попасть в bundle
# именно на этом этапе — Next запекает их статически в client JS.
# Передаются через compose `build.args` или `docker build --build-arg`.
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_MAPBOX_STYLE
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID
ARG NEXT_PUBLIC_GA4_ID
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG CRON_SECRET
ARG PREVIEW_SECRET
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_MAPBOX_STYLE=$NEXT_PUBLIC_MAPBOX_STYLE
ENV NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID
ENV NEXT_PUBLIC_GA4_ID=$NEXT_PUBLIC_GA4_ID
ENV DATABASE_URI=$DATABASE_URI
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV CRON_SECRET=$CRON_SECRET
ENV PREVIEW_SECRET=$PREVIEW_SECRET

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm@10.3.0 && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Remove this line if you do not have this folder
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js

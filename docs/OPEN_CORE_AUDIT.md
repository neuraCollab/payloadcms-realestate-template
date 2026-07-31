# Аудит проекта для перехода на Open-Core

## 1. Использование AI (pgvector, embeddings, TEI, Anthropic, OpenAI)
- **База данных и векторы:** `pgvector` используется через сервис TEI (в `docker-compose.yml`) для генерации эмбеддингов. За это отвечают хуки в `src/collections/hooks/embeddings.ts` и модули в `src/lib/embeddings/*`. Индексация происходит для коллекций: `ResidentialComplex`, `Houses`, `Lands`, `Commercial`, `Flat`.
- **LLM-генерация и рекомендации:**
  - `Anthropic Claude Haiku` используется в `src/lib/recommend/index.ts` и `src/lib/llm.ts` для извлечения фильтров из NL-запросов и генерации объяснений к рекомендациям (recommendation engine / ANN / ivfflat).
  - `OpenAI gpt-4o-mini` используется в `src/lib/seo/generate.ts` и `src/app/(payload)/api/admin/seo/generate/route.ts` для bulk-генерации SEO-текстов (landing pages).
- **Поиск по естественному языку (AiSearchBox):**
  - Компонент `src/components/AiSearchBox/index.tsx` перенаправляет запросы с параметром `?ai=1&q=...`.
  - Роут `src/app/(payload)/api/ai-search/route.ts` обрабатывает эти запросы, используя эмбеддинги и AI.
- **Служебные эндпоинты:**
  - `/api/admin/reindex-embeddings` — переиндексация базы через AI.
  - `/api/admin/seo/generate` — массовая генерация SEO-описаний.

## 2. Секреты и конфигурации
- **.env.example / .env:**
  - Подключение к Postgres (`DATABASE_URI`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`).
  - Служебные ключи Payload (`PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`).
  - Токены аналитики и карт (`NEXT_PUBLIC_MAPBOX_TOKEN`, `NEXT_PUBLIC_YANDEX_METRIKA_ID`, `NEXT_PUBLIC_GA4_ID`).
  - Ключи для email и OAuth (`RESEND_API_KEY`, `GOOGLE_CLIENT_SECRET`, `YANDEX_CLIENT_SECRET`, `MAILRU_CLIENT_SECRET`).
  - AI API ключи (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `EMBEDDINGS_URL`).
- **CI/CD (.github/workflows):** Использование `Infisical CLI` для рантайм-внедрения секретов на сервере по SSH. Хардкодятся переменные сборки.
- **docker-compose.yml:** Указаны пароли для сервисов.

## 3. Хардкод (Специфичные для текущего владельца данные)
- **Бренд и домены:**
  - Имя `Demo Realty` и домен `example.com` фигурируют в конфигурации nginx (`deploy/nginx/conf.d/demorealty.conf`), `src/components/Logo/Logo.tsx`, `src/Footer/Component.tsx`, SEO-настройках (`src/globals/HomeSeo/config.ts`), `public/site.webmanifest` и `src/app/(frontend)/page.tsx`.
  - В `.env.example` захардкожен email отправителя: `Demo Realty <no-reply@example.com>`.
- **Документация и конфигурация:**
  - В `docs/DEPLOY-PROD.md`, `docs/CI-CD-SETUP.md` и `docs/RESEND-BEGET-SETUP.md` присутствуют детали реального сервера, хостинга Beget и настроек DNS.
- **Seed-скрипты:**
  - В `src/endpoints/seed/*` (посты, SEO и т.д.) могут присутствовать реальные данные пользователей и объектов, которые подлежат анонимизации.

---

**Вывод:** Для создания полноценного open-core приложения требуется вынести функционал из п.1 за Feature Flag (`NEXT_PUBLIC_ENABLE_AI`), чтобы система не падала без этих ключей, а также провести поиск и замену специфичных данных (п.3) на обезличенные (`example.com`, `Demo Realty`), чтобы не раскрывать бренд и внутренние процессы владельца.

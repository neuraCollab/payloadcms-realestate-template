# Realty — документация проекта

Площадка по поиску и публикации объектов недвижимости. Headless-CMS на
Payload v3 + Next.js 15 + PostgreSQL. Поддерживает квартиры, коммерческую
недвижимость, земельные участки и жилые комплексы, имеет личный кабинет
с чатом риэлтор↔пользователь, бесплатный анализ цены и локализованные
URL'ы по городам.

> Этот файл — точка входа в кодовую базу. Если коротко: для запуска
> локально достаточно `cp .env.example .env && docker compose up -d`,
> для деплоя — `./scripts/snapshot.ps1` локально и `./scripts/deploy.sh`
> на сервере. Подробности ниже.

---

## Содержание

1. [Архитектура](#архитектура)
2. [Технологии](#технологии)
3. [Структура репозитория](#структура-репозитория)
4. [Локальный запуск](#локальный-запуск)
5. [Конфигурация (.env)](#конфигурация-env)
6. [Основные фичи](#основные-фичи)
7. [Модель данных](#модель-данных)
8. [REST API](#rest-api)
9. [Скрипты](#скрипты)
10. [Тестирование](#тестирование)
11. [Продакшн-деплой](#продакшн-деплой)
12. [Troubleshooting](#troubleshooting)
13. [Roadmap](#roadmap)

---

## Архитектура

```
            ┌────────────────────────────────────────┐
            │   Браузер пользователя                  │
            └──────────────────┬──────────────────────┘
                               │ HTTPS
            ┌──────────────────▼──────────────────────┐
            │   Nginx + Let's Encrypt (reverse proxy) │
            └──────────────────┬──────────────────────┘
                               │ http://127.0.0.1:3000
       ┌───────────────────────▼──────────────────────────┐
       │  Next.js 15 (Standalone, RSC)                    │
       │  ├── /(frontend)        — публичные страницы     │
       │  │   ├── /flats, /commercial, /lands             │
       │  │   ├── /search                                 │
       │  │   ├── /[citySlug]/[filterSlug]                │
       │  │   ├── /cabinet/*                              │
       │  │   └── /admin (Payload)                        │
       │  ├── /(payload)/api/admin/*                      │
       │  ├── /(payload)/api/cabinet/*                    │
       │  └── /(payload)/api/messages                     │
       └───────────────────────┬──────────────────────────┘
                               │ pg driver
       ┌───────────────────────▼──────────────────────────┐
       │  PostgreSQL 15                                   │
       │  Schema управляется через Payload + Drizzle      │
       │  Миграции в src/migrations/                      │
       └──────────────────────────────────────────────────┘

       ┌──────────────────────────────────────────────────┐
       │  Внешние сервисы (опционально)                   │
       │  ├── Mapbox GL — отображение карт                │
       │  ├── OpenStreetMap Nominatim — геокодинг         │
       │  └── SMTP — email (не настроен по умолчанию)     │
       └──────────────────────────────────────────────────┘
```

### Принципы

- **Headless CMS**: Payload v3 управляет схемой данных, валидацией и
  админкой. Frontend — отдельное Next.js приложение, общается с Payload
  через локальный API (`getPayload({ config })`) в server-components.
- **SSG/SSR**: статические страницы (`/about`, `/contact`, `/privacy`)
  prerender'ятся при сборке; динамические (`/[slug]`, `/flats/[slug]`)
  поддерживают `generateStaticParams` — на этапе билда читают БД и
  готовят страницы для популярных объектов, остальные — SSR.
- **Миграции — явные**. `push: false` в `postgresAdapter`, все изменения
  схемы проходят через `pnpm payload migrate:create` + `migrate`.
- **Без overrides на проде**: секреты приходят только из `.env`,
  билд-аргументы передаются скриптом деплоя, а не Compose.

---

## Технологии

| Слой | Технологии |
|---|---|
| Frontend | Next.js 15.4 (App Router, RSC, Turbopack), React 19, TypeScript 5.7 |
| Стили | Tailwind CSS 3.4 + tailwindcss-animate + Material 3 токены |
| UI-примитивы | Radix UI, Lucide Icons |
| Карты | mapbox-gl (динамический импорт, опционально) |
| CMS | Payload v3 (+ плагины: SEO, Search, Redirects, Nested Docs, Form Builder) |
| DB | PostgreSQL 15 через `@payloadcms/db-postgres` (Drizzle ORM) |
| Тестирование | Playwright (e2e), node:test + tsx (unit) |
| Деплой | Docker, Docker Compose, multi-stage Dockerfile, nginx, Let's Encrypt |
| Пакетный менеджер | pnpm 10.3 |

---

## Структура репозитория

```
.
├── docker-compose.yml          # dev-стек (postgres + pgadmin + app с hot-reload)
├── docker-compose.prod.yml     # production-стек
├── Dockerfile                  # production multi-stage build
├── Dockerfile.dev              # dev-build с volume-mount
├── next.config.js              # output: 'standalone'
├── package.json
├── pnpm-lock.yaml
├── .env.example                # шаблон секретов
├── playwright.config.ts        # e2e-конфиг
│
├── src/
│   ├── app/                                       # Next.js App Router
│   │   ├── (frontend)/                            # публичные роуты + layout
│   │   │   ├── (realestate)/                      # /flats /commercial /lands /residential-complexes
│   │   │   ├── [slug]/                            # динамические /home-v2, /about, /kimry
│   │   │   │   └── [filterSlug]/                  # /kimry/arenda-kvartir
│   │   │   ├── cabinet/                           # личный кабинет
│   │   │   │   ├── chats/, favorites/, recent/    # разделы
│   │   │   │   └── layout.tsx → CabinetShell      # общий сайдбар
│   │   │   ├── search/, agents/, posts/           # отдельные страницы
│   │   │   ├── privacy/, terms/, contact/         # правовые
│   │   │   ├── error.tsx, loading.tsx, not-found.tsx
│   │   │   └── layout.tsx                         # корневой layout (Header/Footer/CookieConsent)
│   │   └── (payload)/                             # Payload-роуты и API
│   │       ├── admin/[[...segments]]              # /admin
│   │       └── api/
│   │           ├── admin/                         # import-listings, maintenance, generate-description
│   │           ├── cabinet/                       # session, messages
│   │           └── messages/                      # форма для риэлтора
│   │
│   ├── collections/                               # Payload-коллекции
│   │   ├── Flat/, Commercial/, Lands/             # 4 типа недвижимости
│   │   ├── ResidentialComplex/, Cities/
│   │   ├── Users/, Agents/                        # пользователи и риэлторы
│   │   ├── Messages/, Reviews/                    # коммуникация
│   │   ├── Pages/, Posts/, Categories/, Media/
│   │   └── Properties/                            # legacy, оставлен для обратной совместимости
│   │
│   ├── globals/
│   │   └── LegalInfo/                             # реквизиты компании (149-ФЗ)
│   │
│   ├── components/                                # переиспользуемые UI
│   │   ├── PropertyDetailPage/                    # страница объекта (10+ под-компонентов)
│   │   │   ├── PropertyMetaBar, PropertySpecs
│   │   │   ├── RealtorCard, MessageButton, MessagePopup
│   │   │   ├── PropertyAnalytics, AnalyticsCharts
│   │   │   ├── MortgageCalculator, PriceHistoryChart
│   │   │   └── JsonLd, TrackView
│   │   ├── PropertyListingPage/                   # каталог + фильтры + пагинация
│   │   ├── PropertyFilters/                       # фильтр-форма + advanced
│   │   ├── PropertyCard/                          # карточка объекта
│   │   ├── PropertyMap.tsx/                       # Mapbox-обёртка
│   │   ├── CityLandingPage/                       # /kimry landing
│   │   ├── SearchFilters/                         # /search фильтры
│   │   ├── ViewToggle/, SortSelect/, ListingsPagination/
│   │   ├── FavoriteButton/, MaskedPhone/
│   │   ├── CookieConsent/, ConsentCheckbox/
│   │   └── ui/                                    # shadcn-style примитивы
│   │
│   ├── blocks/                                    # блоки для Pages-коллекции
│   │   ├── base/                                  # Hero, BlogBlock, FAQ, Navbar и т.п.
│   │   └── house/                                 # HouseFilter, PropertiesBlock, MapBlock,
│   │                                              # QuickNav, HeroSearch, RecentlyViewed и др.
│   │
│   ├── lib/                                       # pure-функции, утилиты
│   │   ├── marketAnalytics.ts                     # агрегации (avg, median, monthly trend)
│   │   ├── recentlyViewed.ts, favorites.ts        # localStorage
│   │   ├── propertyMetadata.ts                    # SEO metadata builder
│   │   ├── csv.ts                                 # CSV-парсер для импорта
│   │   ├── describeFlat.ts                        # rule-based AI описание
│   │   ├── cityUrls.ts                            # парсер /<city>/<filter-slug>
│   │   ├── rateLimit.ts                           # in-memory rate-limit + honeypot
│   │   ├── threadId.ts                            # хеш для чат-тредов
│   │   └── listings-parser/                       # мок-провайдеры (Avito/Sutochno/Этажи)
│   │
│   ├── endpoints/                                 # seed-скрипты (dev-only)
│   │   ├── seed/                                  # стартовая seed-функция для home-static
│   │   ├── seed-cities/, seed-globals/
│   │   ├── seed-pages/, seed-posts/
│   │
│   ├── Header/, Footer/                           # навигация + футер с реквизитами
│   │
│   ├── migrations/                                # Payload-миграции БД
│   │   └── 20260602_011706.ts                     # initial migration
│   │
│   ├── payload.config.ts                          # центральный конфиг Payload
│   └── ...
│
├── scripts/
│   ├── snapshot.ps1                               # снимок локального стейта (Windows)
│   ├── backup.sh                                  # то же на Linux
│   ├── restore.sh                                 # восстановление на новой машине
│   ├── deploy.sh                                  # деплой-пайплайн
│   └── README.md
│
├── docs/
│   ├── README.md                                  # ← этот файл
│   ├── DEPLOY-PROD.md                             # подробная инструкция деплоя
│   └── labs/                                      # учебные лабораторные
│
├── tests/
│   ├── unit/                                      # node:test
│   ├── e2e/                                       # Playwright
│   └── README.md
│
└── public/
    └── media/                                     # загруженные через админку файлы
```

---

## Локальный запуск

### Требования

- Docker Desktop (Windows/macOS) или docker-engine + compose-plugin (Linux)
- 4 ГБ свободной RAM
- 10 ГБ свободного диска

### Шаги

```bash
# 1. Клонировать репо
git clone https://github.com/neuraCollab/payloadcms-realestate-template.git
cd payloadcms-realestate-template

# 2. .env с dev-секретами (можно не менять для локального запуска)
cp .env.example .env

# 3. Запустить стек (postgres + app + pgadmin)
docker compose up -d

# 4. Применить миграции (нужно при первом запуске и после изменения коллекций)
docker compose run --rm app pnpm payload migrate

# 5. Открыть в браузере
#    http://localhost:3000        — фронт
#    http://localhost:3000/admin  — Payload-админка (первый заход создаёт админа)
#    http://localhost:8080        — pgAdmin (если нужен SQL-доступ к БД)
```

### Прогрев данными

База пустая после первого запуска. Чтобы появились страницы, посты, города и объявления:

```bash
# Глобалы (header, footer, реквизиты юр.лица)
curl -X POST http://localhost:3000/next/seed-globals

# Города (Москва, СПб, Кимры и др.)
curl -X POST http://localhost:3000/next/seed-cities

# Demo-страницы (/home-v2, /about, /contact, /agents, /blogs)
curl -X POST http://localhost:3000/next/seed-pages

# Demo-посты для блога
curl -X POST http://localhost:3000/next/seed-posts

# Мокированные объявления (Avito/Sutochno/Этажи провайдеры)
curl -X POST 'http://localhost:3000/next/parse-listings?per=20'
```

После этого `/flats`, `/search`, `/kimry/arenda-kvartir` будут показывать реальный контент.

### Альтернатива: только Postgres в Docker, app локально

```bash
docker compose up -d postgres pgadmin

# В .env замени `postgres` на `localhost`:
# DATABASE_URI=postgresql://admin:secretpassword@localhost:5432/mydb

pnpm install
pnpm payload migrate
pnpm dev    # http://localhost:3000
```

Удобно для отладки — hot-reload работает без Docker overhead.

---

## Конфигурация (.env)

| Переменная | Назначение | Обязательно |
|---|---|:---:|
| `DATABASE_URI` | Подключение к Postgres | ✓ |
| `PAYLOAD_SECRET` | Секрет для JWT-токенов админки | ✓ |
| `NEXT_PUBLIC_SERVER_URL` | Публичный URL без слеша (`https://...`) | ✓ |
| `CRON_SECRET` | Bearer-токен для `/api/admin/maintenance` | ✓ |
| `PREVIEW_SECRET` | Для preview-режима страниц | ✓ |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Compose-credentials Postgres | ✓ (Docker) |
| `POSTGRES_PORT` | Внутренний порт Postgres | ✓ (Docker) |
| `PGADMIN_*` | pgAdmin для dev | dev only |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Токен Mapbox | для карт |
| `NEXT_PUBLIC_MAPBOX_STYLE` | Стиль карты, дефолт `streets-v12` | нет |

Прод-секреты должны быть случайными:

```bash
openssl rand -hex 32   # для PAYLOAD_SECRET, CRON_SECRET, PREVIEW_SECRET
```

`NEXT_PUBLIC_*` переменные «вшиваются» в bundle при сборке — после их изменения нужен **пересбор образа**, а не просто перезапуск контейнера.

---

## Основные фичи

### 1. Каталог объектов

- 4 коллекции: `flats`, `commercial`, `lands`, `residential-complexes`
- Списочные страницы с грид-видом, картой (`?view=map`) и пагинацией
- 6+ фильтров на тип: базовые (город, район, комнаты, цена) + advanced
  (площадь, этаж, тип дома, год постройки, от собственника, без комиссии)
- Сортировка: новизна, цена возр/убыв, площадь возр/убыв
- URL — источник истины: можно сохранить в закладки, поделиться

### 2. Карточка объекта

- Hero-галерея + chip избранного
- **Метабар**: теги (топ/новое/со снижением цены), адрес, мини-карта
- **Характеристики**: key-value таблица в стиле Avito
- **Калькулятор ипотеки** (только для `transactionType=sale`):
  ползунки (ПВ %, срок, ставка), аннуитет
- **История цены**: SVG-график snapshot'ов из `priceHistory` поля
- **Бесплатный анализ**: avg ₽/м² по району, dynamics 12 месяцев,
  сравнение с медианой
- **Карточка риэлтора**: фото, рейтинг отзывов, CTA-кнопки (позвонить
  через MaskedPhone, профиль, написать), список активных и завершённых
  объектов, превью отзывов
- **Slide-in popup сообщения**: textarea + paperclip + chip "согласен на
  обработку ПДн" + Send. После отправки — редирект в /cabinet/chats/<thread>
- JSON-LD (RealEstateListing + BreadcrumbList + Organization) для SEO

### 3. Поиск

- `/search` — кросс-коллекционный поиск с фильтрами
- Параметры: `q`, `category`, `city`, `transactionType`, `minPrice`,
  `maxPrice`
- Один запрос → 4 параллельных `payload.find()` → merge → sort by
  newest

### 4. Локализованные URL городов

- `/kimry`, `/sankt-peterburg`, `/moskva` — landing-страницы городов
- `/kimry/arenda-kvartir`, `/moskva/novostroyki` — типы запросов
- Префиксы парсятся через `parseFilterSlug()` в `lib/cityUrls.ts`
- При парсинге объявлений (ingest-pipeline) автоматически создаются
  Cities-записи через `upsertCity`

### 5. Личный кабинет (`/cabinet/*`)

- Без real-auth: cookie `realty_email` = «сессия»
- Sidebar (`CabinetShell.tsx`): профиль, сообщения, избранное,
  просмотренные, сохранённые поиски
- **Чаты**: треды группируются по `threadId = hash(realtorId + email)`,
  директивы inbound/outbound. Polling 15 секунд через `/api/cabinet/messages`
  пока вкладка активна
- **Избранное / Просмотренные**: localStorage, sync через
  `CustomEvent` на все вкладки

### 6. Админ-эндпоинты

- `POST /api/admin/import-listings` — CSV-импорт квартир (auth: role=admin)
- `POST /api/admin/maintenance` — массовая деактивация устаревших + dedup
- `POST /api/admin/generate-description` — rule-based генератор описания
  квартиры (без LLM)

### 7. Юридическая часть

- Глобал `LegalInfo` в админке: реквизиты юр.лица (5 вкладок)
- Footer на каждой странице рендерит ОГРН/ИНН/адрес/телефон
- `ConsentCheckbox` под каждой формой отправки
- `/privacy`, `/terms` — server-component, подставляет данные из global
- Cookie banner — dismissable, состояние в localStorage

### 8. Защита от спама

- In-memory rate-limit per-IP (`lib/rateLimit.ts`)
- Honeypot-поле `website` в формах — отвечаем 200 без записи
- Применяется: `/api/messages`, `/api/cabinet/session`, `/api/reviews`

### 9. Pluggable Mapbox

- Динамический импорт + lazy CSS-loading
- При отсутствии `NEXT_PUBLIC_MAPBOX_TOKEN` — placeholder с инструкцией
- Стиль карты конфигурируется через `NEXT_PUBLIC_MAPBOX_STYLE`

---

## Модель данных

Главные коллекции и их связи:

```
                       ┌─────────────────────────┐
                       │       Users             │
                       │  email, role,           │
                       │  phone, agency, photo   │
                       │  (role=admin|realtor)   │
                       └────────────┬────────────┘
                                    │ realtor
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
            ┌─────▼─────┐    ┌──────▼─────┐    ┌──────▼─────┐
            │   Flats   │    │ Commercial │    │   Lands    │
            │   slug    │    │            │    │            │
            │   title   │    │            │    │            │
            │   price   │    │            │    │            │
            │ priceHist │    │            │    │            │
            │ location  │    │            │    │            │
            │ rooms     │    │            │    │            │
            │ area      │    │            │    │            │
            │ images[]  │    │            │    │            │
            │ status    │    │            │    │            │
            └───────────┘    └────────────┘    └────────────┘
                  │
                  │ (Cities автоматически создаются из location.city)
                  ▼
            ┌───────────┐
            │  Cities   │
            │ slug,     │
            │ name,     │
            │ region,   │
            │ heroImage │
            └───────────┘

            ┌────────────────────────────────────────┐
            │  Messages                              │
            │  ├── realtor → Users                   │
            │  ├── threadId (sha1(realtorId+email))  │
            │  ├── direction (inbound/outbound)      │
            │  ├── message (richText)                │
            │  ├── attachment → Media                │
            │  └── email                             │
            └────────────────────────────────────────┘

            ┌────────────────────────────────────────┐
            │  Reviews                               │
            │  ├── realtor → Users                   │
            │  ├── rating (1–5)                      │
            │  ├── comment                           │
            │  └── status (pending/approved/rejected)│
            └────────────────────────────────────────┘

            ┌────────────────────────────────────────┐
            │  Pages (Payload-страницы из блоков)    │
            │  ├── slug, title                       │
            │  └── layout: блоки (Hero, Properties,  │
            │      QuickNav, BlogBlock, FAQ, ...)    │
            └────────────────────────────────────────┘

            ┌──────────────┐  ┌──────────────┐
            │  Globals     │  │  Globals     │
            │  Header      │  │  Footer      │
            │  Header navItems│  navItems     │
            └──────────────┘  └──────────────┘
            ┌──────────────┐
            │  Global      │
            │  LegalInfo   │
            │ (реквизиты)  │
            └──────────────┘
```

Полная схема — см. `src/payload-types.ts` (генерируется автоматически
из коллекций) и `src/migrations/20260602_011706.ts`.

---

## REST API

Payload автоматически создаёт REST + GraphQL эндпоинты на основе
коллекций. Базовые маршруты:

| Метод | URL | Описание |
|---|---|---|
| GET | `/api/flats` | Список квартир с фильтрами/пагинацией |
| GET | `/api/flats/:id` | Карточка квартиры |
| POST | `/api/flats` | Создать (только authenticated) |
| PATCH | `/api/flats/:id` | Обновить |
| DELETE | `/api/flats/:id` | Удалить |
| (то же для commercial, lands, residential-complexes, cities, users, posts) |

### Кастомные эндпоинты

| Метод | URL | Авторизация | Назначение |
|---|---|---|---|
| `POST` | `/api/messages` | публичный + rate-limit + honeypot | Отправка сообщения риэлтору |
| `POST` | `/api/cabinet/session` | публичный | Установка cookie кабинета |
| `DELETE` | `/api/cabinet/session` | публичный | Logout |
| `GET` | `/api/cabinet/messages?threadId=…` | cookie `realty_email` | Polling сообщений треда |
| `POST` | `/api/reviews` | публичный + rate-limit | Отзыв на риэлтора |
| `POST` | `/api/admin/import-listings` | role=admin | CSV-импорт |
| `POST` | `/api/admin/maintenance` | role=admin / `CRON_SECRET` | Maintenance pass |
| `POST` | `/api/admin/generate-description` | role=admin | Rule-based описание |
| `POST` | `/api/upload` | role=admin | Доп. upload endpoint |
| `POST` | `/api/form-submissions` | публичный | Стандартный Payload Form Builder |
| `POST` | `/next/seed-globals` | dev-only | Засев Header/Footer/LegalInfo |
| `POST` | `/next/seed-cities` | dev-only | Засев городов |
| `POST` | `/next/seed-pages` | dev-only | Засев demo-страниц |
| `POST` | `/next/parse-listings?per=N` | dev-only | Ингест моковых объявлений |

### Параметры Payload-find

Все стандартные коллекции принимают:
- `?limit=20&page=1` — пагинация
- `?sort=-createdAt` — сортировка (`-` для DESC)
- `?depth=1` — глубина populating связей
- `?where[field][equals|like|in|...]=value` — фильтрация

Пример:

```
GET /api/flats?where[status][equals]=active&where[location.city][like]=Москва&sort=-createdAt&limit=20
```

---

## Скрипты

В `package.json`:

| Скрипт | Что делает |
|---|---|
| `pnpm dev` | Next.js dev (Turbopack) на :3000 |
| `pnpm build` | Прод-сборка standalone |
| `pnpm start` | Запуск standalone после build |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm payload migrate:create --name <slug>` | Создать миграцию из изменений |
| `pnpm payload migrate` | Применить миграции |
| `pnpm generate:types` | Перегенерировать `payload-types.ts` |
| `pnpm generate:importmap` | Регенерировать Payload `importMap.js` |
| `pnpm test:unit` | Unit-тесты через `node:test` |
| `pnpm test:e2e` | Playwright (нужен запущенный сервер) |
| `pnpm test:e2e:smoke` | Только smoke-тесты |
| `pnpm test:e2e:headed` | С UI-окном для отладки |
| `pnpm test:e2e:report` | Открыть report после прогона |

В `scripts/`:

| Файл | Что делает |
|---|---|
| `snapshot.ps1` | Снимок локального стейта на Windows (pg_dump + media + .env.template + commit SHA) → `backups/realty-snapshot-…tar.gz` |
| `backup.sh` | То же на Linux |
| `restore.sh` | Восстановить из снимка на новой машине |
| `deploy.sh` | Production-пайплайн (см. ниже) |

---

## Тестирование

### Unit (быстро, без сервера)

```bash
pnpm test:unit
```

Покрывает:
- `lib/marketAnalytics.ts` — aggregateStats/compareSubject/monthlyTrend
- `lib/csv.ts` — CSV-парсер (квотинг, BOM, CRLF)
- `lib/cityUrls.ts` — parseFilterSlug всех вариантов
- `lib/threadId.ts` — определённость хеша

### E2E (нужен запущенный сервер на :3000)

```bash
docker compose up -d
# Подождать ~30 сек чтобы Next сбил первый компайл
pnpm test:e2e:smoke    # быстро (~2 мин)
pnpm test:e2e          # полный прогон (~10 мин)
```

Спеки:
- `smoke.spec.ts` — 22 публичных роута → 200 OK, 4 несуществующих → 404
- `pages-content.spec.ts` — основной UI-контент
- `listings-and-search.spec.ts` — сортировка, view toggle, advanced
  filters, /search submit
- `property-detail.spec.ts` — галерея + favorite + mortgage + popup
- `cabinet.spec.ts` — login, sidebar, cookie consent
- `api-contracts.spec.ts` — валидация, honeypot, 401 без cookie

### CI-вариант

```bash
docker compose up -d
sleep 30
pnpm test:e2e:smoke   # gate, не должен падать
```

---

## Продакшн-деплой

См. отдельный документ → [DEPLOY-PROD.md](./DEPLOY-PROD.md).

Короткий цикл:

```bash
# На рабочей машине (Windows + Docker)
.\scripts\snapshot.ps1
scp .\backups\realty-snapshot-*.tar.gz user@server:/srv/realty/

# На сервере (Ubuntu 22.04+)
cd /srv/realty
git pull origin main
./scripts/deploy.sh realty-snapshot-*.tar.gz
```

`deploy.sh` делает 6 шагов:
1. Preflight: .env, docker, compose plugin
2. Распаковать снимок
3. `docker compose up -d postgres` + wait healthy
4. Восстановить `db.sql` через psql + media через rsync
5. `docker build --network=host --build-arg DATABASE_URI=…
   --build-arg PAYLOAD_SECRET=…` (с доступом к postgres на этапе
   сборки → `generateStaticParams` отрабатывает)
6. `docker compose up -d app` + health check

После: настроить nginx + Let's Encrypt по образцу из DEPLOY-PROD.md.

### Reverse-proxy: host vs docker

По умолчанию reverse-proxy — **nginx на хосте**, проксирующий
`127.0.0.1:3000`. Это работает из коробки, certbot обновляет
сертификаты через `--webroot`.

Альтернатива — **dockerized nginx** (`deploy/nginx/` + сервис
`nginx` в `docker-compose.prod.yml` под profile `nginx`).
Сертификаты bind-mount'ятся с хоста, certbot остаётся на хосте.

```bash
# Переход host → docker:
sudo systemctl disable --now nginx
docker compose -f docker-compose.prod.yml --profile nginx up -d nginx

# Откат на host-nginx:
docker compose -f docker-compose.prod.yml stop nginx
sudo systemctl enable --now nginx
```

Оба варианта используют одни и те же кеширующие правила
(/_next/static/* immutable 1y, /_next/image 30d, манифест/иконки 1d)
и WebSocket-upgrade через conditional `Connection` map.

### Сидинг и миграции на свежем сервере (без снепшота)

Если на сервере поднимается чистая БД (без переноса данных через
снимок), порядок такой. **Важно:** prod-образ — Next standalone, в нём
нет `pnpm` и Payload CLI. Миграции и сиды запускаются через
HTTP-эндпоинты, защищённые Bearer `CRON_SECRET`.

```bash
SECRET=$(grep '^CRON_SECRET=' .env | cut -d= -f2)
HOST=http://127.0.0.1:3000

# 1. Применить pending миграции
curl -X POST "$HOST/api/admin/migrate" \
  -H "Authorization: Bearer $SECRET" \
  -H 'Content-Type: application/json' -d '{}'

# 2. Создать стартовых пользователей/глобалы (один раз)
curl -X POST "$HOST/next/seed-globals" -H "Authorization: Bearer $SECRET"
curl -X POST "$HOST/next/seed-cities"  -H "Authorization: Bearer $SECRET"

# 3. Засеять SEO-контент главной + блог + моковые объекты SPb
curl -X POST "$HOST/next/seed-home-seo"       -H "Authorization: Bearer $SECRET"
curl -X POST "$HOST/next/seed-spb-listings"   -H "Authorization: Bearer $SECRET"
curl -X POST "$HOST/next/seed-seo-posts"      -H "Authorization: Bearer $SECRET"

# 4. Переиндексировать эмбеддинги (после того как TEI стал Ready)
curl -X POST "$HOST/api/admin/reindex-embeddings" \
  -H "Authorization: Bearer $SECRET" \
  -H 'Content-Type: application/json' -d '{}'
```

Все эти эндпоинты идемпотентны — повторный вызов не дублирует данные.
В dev-окружении (`NODE_ENV !== 'production'`) Bearer не требуется.

---

## Troubleshooting

Известные проблемы и решения:

### Docker compose: `Bind for 0.0.0.0:3000 failed: port is already allocated`
Кто-то уже занимает порт 3000.
```bash
sudo ss -tlnp | grep ':3000'
# Найти процесс, убить или поменять порт в docker-compose.yml
```

### Payload зависает на запрос: `Pulling schema from database…`
Auto-push Drizzle ждёт ответа на интерактивный prompt. Уже выключено
(`push: false`), но если контейнер старый — пересобери:
```bash
docker compose down -v
docker compose run --rm app pnpm payload migrate:create --name initial --force-accept-warning
docker compose run --rm app pnpm payload migrate
docker compose up -d
```

### `psql: invalid byte sequence for encoding "UTF8": 0xff`
PowerShell-овский `>` пишет UTF-16 BOM. Используй `scripts/snapshot.ps1`
который делает редирект через `cmd.exe /c` (без BOM).

### `failed to resolve source metadata for docker.io/library/node`
DockerHub CDN заблокирован. Переключись на mirror:
```dockerfile
FROM mirror.gcr.io/library/node:22.12.0-alpine AS base
```
(уже в репо)

### `corepack: Cannot find matching keyid`
Баг подписей в Node 22.12. Уже обходится — Dockerfile ставит pnpm
напрямую через `npm install -g pnpm@10.3.0`.

### Сборка падает с OOM (ENOSPC, или процесс убит без объяснений)
Серверу не хватает RAM. Добавь swap:
```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Сборка `next build` падает на `missing secret key`
Postgres недоступен из build-сети. `deploy.sh` решает это через
`--network=host` + временный проброс postgres на `127.0.0.1:5432`.

### Let's Encrypt не выдаёт сертификат: 500 на acme-challenge
Между интернетом и сервером стоит чужой прокси (например, у российских
хостеров типа Beget). Используй DNS-01:
```bash
sudo certbot certonly --manual --preferred-challenges dns -d domain.ru
```

### Карта не отображается
Не установлен `NEXT_PUBLIC_MAPBOX_TOKEN`. Получи на
https://account.mapbox.com/access-tokens/ и пересобери образ (токен
вшивается в bundle при build).

---

## AI-поиск (семантический)

NL-запросы на сайте и в Telegram-боте: пользователь пишет «двушка в
Москве рядом с парком до 15 млн, светлая, с балконом» — система понимает
смысл и ранжирует выдачу.

### Стек

| Компонент | Реализация |
|---|---|
| Embedding-модель | **BGE-M3** (BAAI) — 1024-dim, мультиязычный, top-tier для смешанных запросов |
| Embedding-сервер | **HuggingFace TEI** (`text-embeddings-inference`) — отдельный Docker-сервис, REST API |
| Хранилище векторов | **pgvector** в существующем Postgres (отдельный сервис не нужен) |
| Парсер фильтров | Rule-based (regex) `src/lib/embeddings/queryParser.ts` — заглушка под LLM в будущем |
| Гибрид | Structured-фильтры (city/rooms/price) применяются hard-фильтром, семантика ранжирует прошедшее |

### Архитектура

```
┌──── /api/ai-search ──┐    embedOne(q)    ┌─── TEI ──────────┐
│ 1. parsePrompt(q)    │ ────────────────► │  BGE-M3 на CPU   │
│ 2. payload.find(...) │ ◄──── vector ──── │  /embed endpoint │
│    (префильтр 200)   │                   └──────────────────┘
│ 3. ANN среди ids     │
│ 4. hydrate + sort    │            ┌─── Postgres ───────────┐
└──────────┬───────────┘            │  pgvector              │
           │                        │  property_embeddings   │
           ▼                        │   (collection, doc_id, │
       JSON results                 │    vector, hash)       │
                                    └────────────────────────┘
```

### Установка

1. Поднять обновлённый стек: `docker compose up -d` (Postgres сменится на `pgvector/pgvector:pg15`, добавится `tei`).
2. Применить миграцию: `docker compose run --rm app pnpm payload migrate`. Она создаст `vector` extension и таблицу.
3. Дождаться загрузки модели (~2.3GB в `tei_models` volume) — `docker compose logs -f tei` покажет «Ready».
4. Полная индексация:
   ```bash
   curl -X POST http://localhost:3000/api/admin/reindex-embeddings \
     -H "Authorization: Bearer $CRON_SECRET" \
     -H "Content-Type: application/json" \
     -d '{}'
   ```
   Ответ: `{ stats: { flats: { total: 35, indexed: 35, ... }, ... } }`.

### Использование

- **На сайте**: AI-поиск box на главной → редирект на `/search?ai=1&q=...`. Также любой URL `/search?ai=1&q=...` работает.
- **В Telegram-боте**: любое сообщение-текст уходит в `aiSearch.ts` (вызов API сайта). Если сайт/TEI недоступны → fallback на regex `matcher.ts`.
- **Авто-индексация**: `afterChange`/`afterDelete` hooks во всех 4 коллекциях — fire-and-forget. При создании/обновлении объекта эмбеддинг считается в фоне, не блокируя сохранение.

### Переменные окружения

```env
EMBEDDINGS_URL=http://tei:80
EMBEDDING_MODEL=bge-m3
EMBEDDING_DIM=1024
```

Если `EMBEDDINGS_URL` пустой — AI-поиск молча отключён, сайт продолжает работать на keyword-поиске.

### API

```
GET /api/ai-search?q=<NL>&limit=20&collections=flats,commercial
→ {
    query: "...",
    extracted: { city, rooms, maxPrice, ... },
    mode: "semantic" | "filter-only",
    total: 12,
    results: [{ collection, id, score, doc }]
  }

POST /api/admin/reindex-embeddings
   Auth: Bearer CRON_SECRET  ИЛИ Payload session с role=admin
   Body: { collections?: ["flats", ...], force?: boolean }
→ { ok: true, stats: {...} }
```

### Готовность к фото-поиску

Таблица `property_embeddings` уже полиморфная по полю `kind` (text|image_clip). Когда захочется поиск по фотографиям:

1. Запустить второй TEI с CLIP-моделью.
2. Добавить `kind='image_clip'` в `serialize.ts` (или отдельный сериализатор по media).
3. Hook будет эмбеддить и текст, и каждое фото.
4. Search-endpoint объединит дистанции с весами.

Никаких миграций схемы не понадобится.

---

## Roadmap

### Реализовано

- ✅ 4 типа недвижимости + кросс-коллекционный поиск
- ✅ Расширенные фильтры + сортировка + пагинация + map view
- ✅ Локализованные URL городов
- ✅ Личный кабинет с чатом и polling'ом
- ✅ Калькулятор ипотеки + анализ цены + история цены
- ✅ Избранное и просмотренные (localStorage)
- ✅ Юридическая часть (152-ФЗ + 149-ФЗ)
- ✅ CSV-импорт + maintenance + AI-описание (admin endpoints)
- ✅ Ингест-пайплайн (мокированные провайдеры)
- ✅ SEO (JSON-LD, OG, динамические meta)
- ✅ Rate-limit + honeypot + cookie consent
- ✅ Production-пайплайн (snapshot → deploy)

### В планах

- ⬜ Реальная авторизация (magic-link через email)
- ⬜ Saved searches с уведомлениями о новых матчах
- ⬜ Сравнение объектов (multi-select)
- ⬜ Email-уведомления (нужен SMTP-адаптер Payload)
- ⬜ Запись на просмотр (календарь)
- ⬜ Virtual tour / 360° фото
- ⬜ Реальный XML-feed парсер (Cian, Avito)
- ⬜ Telegram-бот для нотификаций
- ⬜ Admin dashboard с метриками

### Технический долг

- TypeScript `any` в API-роутах — следует типизировать через
  `payload-types.ts`
- Тесты покрывают сценарии, но не граничные ошибки БД
- Нет интеграционных тестов для admin-эндпоинтов (`/api/admin/*`)
- Миграции пишутся вручную через `pnpm payload migrate:create` — не
  автоматизировано в CI
- Logging через `console.log` / `console.error` — стоит вынести в
  структурированный logger

---

## Лицензия

MIT. Шаблон базируется на `payloadcms/payload-website-template`.

---

## Контакты и ссылки

- **GitHub**: https://github.com/neuraCollab/payloadcms-realestate-template
- **Payload Docs**: https://payloadcms.com/docs
- **Next.js App Router**: https://nextjs.org/docs/app
- **Mapbox GL JS**: https://docs.mapbox.com/mapbox-gl-js/

---

Если что-то непонятно или сломалось — ищи в этом файле раздел
[Troubleshooting](#troubleshooting). Если там нет — открой issue в
репозитории с логами `docker compose logs app --tail 100`.

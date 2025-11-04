# Real Estate Template (Next.js + Payload CMS)

Современный шаблон для сайта недвижимости на базе Next.js 15, Payload CMS и Tailwind CSS. Подходит как стартовый проект для агентств и маркетплейсов недвижимости: каталог объектов, страницы проектов, блог, поиск и интеграция с админкой Payload.

### Click on image to watch demo
[![Demo Video](assets/image.png)](https://www.youtube.com/watch?v=jh0KOi1ZXtg)


## Ключевые технологии
- **Next.js 15** (App Router, RSC)
- **React 19** + **TypeScript**
- **Payload CMS** (+ плагины: SEO, Search, Redirects, Nested Docs, Form Builder, Admin Bar, Live Preview)
- **PostgreSQL** (адаптер `@payloadcms/db-postgres`)
- **Tailwind CSS** (+ `tailwindcss-animate`, `@tailwindcss/typography`)
- **UI**: Radix UI, Lucide Icons, Flowbite
- **Изображения**: `sharp`
- **Карта**: Leaflet + React Leaflet
- **Sitemap**: `next-sitemap`

## Что входит
- **Каталог недвижимости**: объекты, типы (квартиры, коммерция, земли, ЖК), агенты, отзывы
- **Страницы и блог**: посты, категории, пагинация, SEO
- **Поиск и фильтры**: страницы поиска и листинги по типам
- **Сео и редиректы**: плагины Payload для SEO и редиректов
- **Сидинг контента**: API-роут для быстрого наполнения демо-данными
- **Админка Payload**: глобалы `Header` и `Footer`, коллекции и медиа
- **Sitemap**: карты для страниц и постов

## Структура проекта
- `src/app/(frontend)` — клиентские страницы
  - `page.tsx` — главная
  - `properties`, `posts`, `search`, `[slug]` — ключевые разделы
  - `(realestate)` — листинги по типам: `flats`, `commercial`, `lands`, `residential-complexes`
  - `(sitemaps)` — `pages-sitemap.xml`, `posts-sitemap.xml`
  - `next/exit-preview`, `next/preview`, `next/seed` — служебные роуты
- `src/collections` — коллекции Payload: `Properties`, `Agents`, `Flats`, `Commercial`, `Lands`, `ResidentialComplex`, `Pages`, `Posts`, `Categories`, `Media`, `Testimonials`, `Reviews`, `Messages`, `Users`
- `src/blocks` — конструктор блоков для страниц (базовые, формы, блоки для недвижимости)
- `src/Header`, `src/Footer` — глобальные зоны с конфигами Payload
- `src/payload.config.ts` — конфигурация Payload (PostgreSQL, плагины, коллекции, глобалы)

## Быстрый старт (pnpm)
1) Установите зависимости
```bash
pnpm install
```

2) Создайте `.env` в корне
```env
PAYLOAD_SECRET=your-strong-secret
DATABASE_URI=postgres://user:password@localhost:5432/dbname
# Опционально для превью и крон-задач
CRON_SECRET=some-cron-token
```

3) Запустите инфраструктуру (PostgreSQL и веб-интерфейс)
```bash
docker compose up -d --build
```

4) Запуск в dev-режиме
```bash
pnpm dev
```
- Frontend: http://localhost:3000
- Админка Payload: http://localhost:3000/admin

5) Билд и прод-режим
```bash
pnpm build
pnpm start
```

6) Сидинг демо-данных (опционально)
- Откройте: `GET http://localhost:3000/next/seed`

## Запуск в Docker
Предоставлен `Dockerfile` и `docker-compose.yml`.

Быстрый старт:
```bash
# Заполните .env как в примере выше
docker compose up -d --build
```
- Приложение и админка будут доступны на `http://localhost:3000` (проверьте маппинги в `docker-compose.yml`).

## Импорт/экспорт базы данных (PostgreSQL в Docker)

### Импорт из локального SQL-бэкапа `./db/mydb_backup.sql`
```bash
# Скопировать файл в контейнер
docker cp ./db/mydb_backup.sql my_postgres:/tmp/mydb_backup.sql

# Импортировать в базу (замените пользователя/БД при необходимости)
docker exec -it my_postgres psql -U admin -d mydb -f /tmp/mydb_backup.sql
```

### Экспорт бэкапа из контейнера

1. Создать дамп внутри контейнера
```bash
docker exec -t my_postgres pg_dump -U admin -d mydb -f /tmp/mydb_backup.sql
```

2. Скопировать на хост
```bash
docker cp my_postgres:/tmp/mydb_backup.sql ./mydb_backup.sql
```

## Основные коллекции (Payload CMS)
- **Properties** — объекты недвижимости (поля: цена, площадь, спальни/ванные, адрес, медиа, особенности)
- **Flats / Commercial / Lands / ResidentialComplex** — типизированные разделы и листинги
- **Agents** — агенты и контактные данные
- **Pages** — статические страницы из блоков
- **Posts / Categories** — блог
- **Media** — медиафайлы
- **Testimonials / Reviews** — отзывы и рейтинги
- **Messages** — входящие сообщения с форм
- **Users** — пользователи админки

## Страницы и функциональность
- **Главная**: промо-блоки, подборки объектов
- **Каталог**: `/(frontend)/properties`, фильтры и пагинация
- **Детальная объекта**: `/(frontend)/properties/[slug]`
- **Поиск**: `/(frontend)/search`
- **Блог**: `/(frontend)/posts` и `/(frontend)/posts/[slug]`
- **Страницы из CMS**: `/[slug]`
- **Sitemaps**: `/(frontend)/(sitemaps)/...`

## Скрипты
- `pnpm dev` — запуск разработки (Turbopack)
- `pnpm build` — сборка
- `pnpm start` — старт прод-режима
- `pnpm generate:types` — генерация типов Payload
- `pnpm generate:importmap` — генерация import map для админки
- `pnpm lint` / `pnpm lint:fix` — линтинг

## Заметки по конфигурации
- База данных: по умолчанию настроен адаптер **PostgreSQL** (`DATABASE_URI`). В коде есть закомментированный пример MongoDB-адаптера.
- Глобалы: `Header`, `Footer` управляются из Payload.
- Live Preview настроен с брейкпоинтами для Mobile/Tablet/Desktop.
- SEO / Redirects / Search плагины в `src/plugins` подключены через `src/payload.config.ts`.
 
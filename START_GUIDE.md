# Запуск проекта (Development Mode)

В этом руководстве описано, как запустить проект в режиме разработки с использованием Docker и без него.

## Переменные окружения (.env)

Перед запуском проекта необходимо создать файл `.env` в корне проекта (вы можете скопировать его из `.env.example`). 

Обязательные переменные окружения:

```env
# Секреты для PayloadCMS
PAYLOAD_SECRET=YOUR_SECRET_HERE
CRON_SECRET=YOUR_CRON_SECRET_HERE
PREVIEW_SECRET=YOUR_SECRET_HERE
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Настройки PostgreSQL
POSTGRES_USER=admin
POSTGRES_PASSWORD=secretpassword
POSTGRES_DB=mydb
POSTGRES_PORT=5432
DATABASE_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}

# Настройки PgAdmin (опционально, если используете Docker)
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=pgadminpass
PGADMIN_PORT=8080

# Настройки AI-поиска (TEI)
EMBEDDINGS_URL=http://tei:80
EMBEDDING_MODEL=multilingual-e5-small
EMBEDDING_DIM=384
```

---

## Вариант 1: Запуск с помощью Docker (рекомендуется)

Запуск через Docker автоматически поднимет базу данных PostgreSQL (с расширением `pgvector`), сервис `pgAdmin` для управления БД, сервис `TEI` для векторного поиска (AI) и само Next.js / Payload приложение.

1. Убедитесь, что у вас установлен Docker и Docker Compose.
2. Проверьте, что заполнен файл `.env`. *Важно:* при запуске приложения в докере `DATABASE_URI` должен указывать на контейнер БД (например, `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}`).
3. Выполните команду для сборки и запуска всех контейнеров:

```bash
docker compose up --build
```

Если вы хотите запустить контейнеры в фоновом режиме, добавьте флаг `-d`:

```bash
docker compose up -d --build
```

### Доступ к сервисам
- **Приложение (Next.js + PayloadCMS)**: http://localhost:3000
- **PgAdmin**: http://localhost:8080 (или тот порт, что указан в `PGADMIN_PORT`)
- **TEI (API эмбеддингов)**: http://localhost:8081

---

## Вариант 2: Запуск без Docker-контейнера для приложения

Если вы хотите запустить Next.js приложение локально на хост-машине, но при этом использовать Docker для базы данных и сторонних сервисов:

1. Установите зависимости:
```bash
# Рекомендуется использовать pnpm
pnpm install
# или
npm install
```

2. Запустите инфраструктуру (Postgres, TEI, pgAdmin) в Docker. Для этого можно запустить только нужные сервисы:
```bash
docker compose up -d postgres tei pgadmin
```

3. Обновите `DATABASE_URI` и `EMBEDDINGS_URL` в вашем `.env` файле, чтобы они указывали на `localhost`:
```env
DATABASE_URI=postgresql://admin:secretpassword@localhost:5432/mydb
EMBEDDINGS_URL=http://localhost:8081
```

4. Запустите сервер разработки Next.js:
```bash
pnpm run dev
# или
npm run dev
```

### Доступ к приложению
- Приложение будет доступно по адресу http://localhost:3000. Вся инфраструктура (база данных и векторный поиск) работает в фоне через Docker.

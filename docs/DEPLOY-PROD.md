# Production Deployment

End-to-end процедура: текущий локальный стек (Windows + Docker Desktop)
→ снэпшот → Linux-сервер → продакшн с реальными данными.

Все скрипты находятся в `scripts/`.

---

## Архитектура продакшна

```
                  ┌─────────────────────────────┐
                  │  internet (HTTPS, 443)      │
                  └─────────────┬───────────────┘
                                │
              ┌─────────────────▼──────────────────┐
              │  nginx / Caddy / Traefik           │  ← TLS termination
              │  realty.example.com                │
              └─────────────────┬──────────────────┘
                                │ http://127.0.0.1:3000
              ┌─────────────────▼──────────────────┐
              │  docker compose -f                  │
              │  docker-compose.prod.yml             │
              │                                     │
              │  ┌────────────┐  ┌──────────────┐  │
              │  │  app (Next)│──│ postgres:15  │  │
              │  │  port 3000 │  │ persisted    │  │
              │  └────────────┘  └──────────────┘  │
              │       │                             │
              │  /app/public/media (bind mount)    │
              └─────────────────────────────────────┘
```

`pgadmin` в проде не нужен — управление БД через `psql` внутри контейнера.

---

## Подготовка сервера (один раз)

Минимум: Ubuntu 22.04+ / Debian 12+, 2 vCPU, 2 GB RAM, 20 GB диск.

```bash
# 1. Docker + compose plugin
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# 2. Папка для проекта
sudo mkdir -p /srv/realty
sudo chown $USER:$USER /srv/realty
cd /srv/realty

# 3. Клонируем код
git clone https://github.com/neuraCollab/payloadcms-realestate-template.git .
chmod +x scripts/*.sh

# 4. .env
cp .env.example .env
nano .env
```

В `.env` обязательно поменять:

| Переменная | Значение |
|---|---|
| `PAYLOAD_SECRET` | случайная строка ≥ 32 символа (`openssl rand -hex 32`) |
| `POSTGRES_PASSWORD` | случайный сильный пароль |
| `CRON_SECRET` | случайная строка |
| `PREVIEW_SECRET` | случайная строка |
| `NEXT_PUBLIC_SERVER_URL` | `https://realty.example.com` (без слеша) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | публичный токен с https://account.mapbox.com/access-tokens/ |

**Не трогать**: `DATABASE_URI` (использует `postgres` как имя сервиса compose), `POSTGRES_USER` / `POSTGRES_DB` можно оставить дефолтными.

---

## Подготовка локального стека (один раз)

На Windows-машине должен крутиться `docker compose up -d` (dev-стек) с
рабочей БД и реальными загруженными картинками. Это и есть «эталон»,
который будет перенесён в прод.

---

## 1. Снимок локального состояния

На Windows, в корне репозитория:

```powershell
.\scripts\snapshot.ps1
```

Что произойдёт:

1. Из работающего dev-контейнера `postgres` снимается `pg_dump` → `db.sql`
2. Копируется содержимое `public/media/`
3. Из `.env` вычищаются секреты → `.env.template` (для справки)
4. Записывается текущий git-commit SHA → `COMMIT_SHA.txt`
5. Всё пакуется в `backups/realty-snapshot-YYYYMMDD-HHMMSS.tar.gz`

Скрипт упадёт с ошибкой если:
- `.env` нет в корне
- compose-стек не запущен
- `pg_dump` вернул пустой файл

---

## 2. Загрузка снимка на сервер

```powershell
# в PowerShell (Windows 10+ ships scp via OpenSSH)
scp .\backups\realty-snapshot-YYYYMMDD-HHMMSS.tar.gz `
    user@realty.example.com:/srv/realty/
```

---

## 3. Развёртывание

На сервере:

```bash
cd /srv/realty
./scripts/deploy.sh realty-snapshot-YYYYMMDD-HHMMSS.tar.gz
```

Что произойдёт:

1. Проверка наличия `.env` и docker
2. Распаковка снимка во временную папку
3. Если в снимке есть `COMMIT_SHA.txt` — `git checkout` на тот же коммит
4. Запуск только `postgres`, ожидание `healthy`
5. `psql < db.sql` — восстановление базы
6. `rsync` (или `cp -r`) `media/` → `public/media/`
7. `docker compose -f docker-compose.prod.yml build app` (multi-stage standalone)
8. Запуск `app`
9. Health-check `curl http://127.0.0.1:3000/`

При успехе скрипт печатает «✅ Deployment complete».

---

## 4. Reverse-proxy (nginx)

После шага 3 приложение слушает только `127.0.0.1:3000`. Нужен внешний
reverse-proxy с TLS.

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
sudo nano /etc/nginx/sites-available/realty
```

Содержимое:

```nginx
server {
    listen 80;
    server_name realty.example.com;

    # большой client_max_body_size — Payload админка грузит файлы
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/realty /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Бесплатный TLS-сертификат от Let's Encrypt
sudo certbot --nginx -d realty.example.com
```

После этого сайт доступен на `https://realty.example.com`.

---

## 5. Первая проверка прод-сборки

Открыть в браузере:

- `/` → главная (hero-search должен показать селекторы)
- `/flats` → каталог квартир с пагинацией
- `/admin` → Payload-админка, залогиниться существующим пользователем (восстановлен из снимка)
- `/cabinet/login` → форма логина
- В подвале — реквизиты юр.лица из LegalInfo global

Если карта Mapbox не загружается — проверить `NEXT_PUBLIC_MAPBOX_TOKEN` в `.env`. Токен попадает в bundle на этапе `docker compose build`, поэтому **после изменения переменной нужен пересбор**:

```bash
docker compose -f docker-compose.prod.yml up -d --build app
```

---

## Периодические задачи

### Регулярный бэкап БД и media

`crontab -e`:

```cron
# Каждый день в 3:00 — снимок в /srv/realty/backups
0 3 * * * cd /srv/realty && ./scripts/backup.sh >> /var/log/realty-backup.log 2>&1

# Каждое воскресенье в 4:00 — maintenance (експайр + дедуп)
0 4 * * 0 curl -sS -X POST -H "Authorization: Bearer ${CRON_SECRET}" \
  http://127.0.0.1:3000/api/admin/maintenance?action=all
```

### Обновление кода

```bash
cd /srv/realty
git pull origin main

# Если ничего не сломали в БД — просто пересборка
docker compose -f docker-compose.prod.yml up -d --build app

# Если меняли коллекции Payload — миграция
docker compose -f docker-compose.prod.yml exec app pnpm payload migrate
```

### Откат на предыдущий снимок

```bash
./scripts/deploy.sh backups/realty-snapshot-YYYYMMDD-HHMMSS.tar.gz
```

`deploy.sh` идемпотентен — повторный запуск с тем же файлом возвращает
систему к этому состоянию.

---

## Решение проблем

| Симптом | Что проверить |
|---|---|
| `Bind for 0.0.0.0:3000 failed` | На сервере что-то слушает 3000. `sudo lsof -i :3000` |
| `pg_dump produced empty file` | Локальный compose не запущен или БД пустая |
| Картинки 404 на проде | `ls /srv/realty/public/media/` — файлы скопировались? |
| `realty_email` cookie не ставится | nginx не пробрасывает заголовки — добавить `proxy_set_header` |
| `/admin` показывает «Database not ready» | `docker compose -f docker-compose.prod.yml logs postgres` |
| Карта пустая | `NEXT_PUBLIC_MAPBOX_TOKEN` пустой ИЛИ нужно пересобрать после изменения |
| Nginx отдает 502 Bad Gateway | Приложение Next.js (контейнер `app`) упало, еще не запустилось или слушает другой порт. <br>1. Проверьте логи: `docker compose -f docker-compose.prod.yml logs app --tail 50`<br>2. Проверьте статус контейнера: `docker compose -f docker-compose.prod.yml ps`<br>3. Убедитесь, что порт в `proxy_pass http://127.0.0.1:3000;` совпадает с портом приложения.<br>4. Перезапустите: `docker compose -f docker-compose.prod.yml restart app` |

---

## Что включено в снимок

| Категория | Откуда |
|---|---|
| Все коллекции Payload | `pg_dump` всей схемы |
| Глобалы (Header / Footer / LegalInfo) | те же таблицы |
| Загруженные картинки и файлы | `public/media/` |
| Структура `.env` (без секретов) | `.env.template` |
| Commit SHA | для воспроизводимости |

## Что НЕ включено

- `node_modules/` — переустанавливаются на сервере
- `.next/` — пересобирается на сервере
- секреты — задаются заново в `.env` на сервере
- логи / cron-задачи / nginx-конфиг — настраиваются отдельно

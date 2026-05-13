# Развёртывание на сервере

Пошаговая инструкция по развёртыванию приложения на чистом Linux-сервере с подключением домена и HTTPS. Все команды проверены под Ubuntu 22.04 LTS.

---

## 1. Характеристики сервера

Минимум, которого хватит для запуска и первых посетителей (≈ 1k уникальных в сутки):

| Параметр | Минимум | Рекомендация |
|---|---|---|
| vCPU | 2 | 2–4 |
| ОЗУ | 2 ГБ | **4 ГБ** *(Next.js dev-server держит ≈1.5 ГБ, плюс Postgres ≈300 МБ)* |
| Диск (SSD) | 25 ГБ | **40–50 ГБ** *(10 ГБ ОС, 5 ГБ Docker-образы, остальное под медиа и БД)* |
| ОС | Ubuntu 22.04 LTS / Debian 12 | Ubuntu 22.04 LTS |
| Публичный IPv4 | 1 | 1 |

### Куда брать сервер

| Провайдер | Локация | Стартовый тариф | Примечание |
|---|---|---|---|
| **Hetzner Cloud** (CX22) | DE, FI | ≈ €4.5 / мес | Лучшее соотношение цена/качество; оплата картой Visa/Mastercard |
| **Selectel** | RU | от ≈ 500 ₽ / мес | Российский провайдер, оплата по реквизитам |
| **Timeweb Cloud** | RU | от ≈ 400 ₽ / мес | Очень простой интерфейс, для начинающих |
| **Beget** | RU | от ≈ 300 ₽ / мес | Дёшево, хост и DNS «под ключ» |
| **Yandex Cloud** | RU | от ≈ 1000 ₽ / мес | Корпоративный уровень, гибкий тариф |
| **DigitalOcean** (Basic) | США/ЕС | $12 / мес | Удобный интерфейс, оплата только западной картой |
| **Vultr** (Cloud Compute) | США/ЕС/Азия | $12 / мес | Похож на DigitalOcean |

> Для быстрого старта рекомендую **Hetzner CX22** (если есть западная карта) либо **Timeweb Cloud** (если нужен российский ЦОД и оплата в рублях).

### Что выбрать в панели провайдера

- Образ: **Ubuntu 22.04 LTS** (или 24.04, если доступен).
- Тип CPU: shared (общий) — для старта достаточно.
- Дополнительный том: не нужен, всё ляжет на основной SSD.
- Сетевые настройки: 1× публичный IPv4 (обязательно), IPv6 — опционально.
- SSH-ключ: добавить **до создания** сервера (см. п. 3 ниже).

---

## 2. Регистрация и подключение домена

### 2.1. Покупка домена

Регистраторы (любой по вкусу):

- **Reg.ru**, **Beget**, **NIC.ru** — Россия.
- **Cloudflare Registrar** — без наценки, но требует западной карты.
- **Namecheap**, **Porkbun** — Запад, недорого.

Цена популярных зон в среднем:
- `.ru` / `.рф` ≈ 200–300 ₽ / год;
- `.com` ≈ $10 / год;
- `.online`, `.site`, `.store` — часто дешевле.

### 2.2. Привязка домена к серверу

В панели регистратора домена (или у DNS-провайдера) добавить **A-записи**:

| Хост | Тип | Значение | TTL |
|---|---|---|---|
| `@` (или пусто) | A | IP-адрес сервера | 300 |
| `www` | A | IP-адрес сервера | 300 |

Проверка через 5–30 минут (зависит от TTL и кеша DNS):

```bash
dig +short your-domain.com
# должно вывести IP вашего сервера
```

---

## 3. Подготовка сервера

Войдите по SSH из вашей локальной машины:

```bash
# Сгенерировать ключ, если его ещё нет:
ssh-keygen -t ed25519 -C "deploy@your-domain.com"

# Подключиться к серверу (первый раз — под root, по паролю из письма провайдера):
ssh root@SERVER_IP
```

### 3.1. Обновление системы

```bash
apt update && apt upgrade -y
apt install -y curl git ufw fail2ban
```

### 3.2. Пользователь `deploy` (чтобы не работать под root)

```bash
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
# Разрешить sudo без пароля для удобства (опционально):
echo "deploy ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/deploy

# Скопировать ваш SSH-ключ от root к deploy:
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy/
```

### 3.3. Усиление SSH

```bash
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/'   /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/'  /etc/ssh/sshd_config
systemctl restart ssh
```

Выйти из root-сессии (`exit`) и **переподключиться под deploy**:

```bash
ssh deploy@SERVER_IP
```

### 3.4. Firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp     # SSH
sudo ufw allow 80/tcp     # HTTP (нужен для выпуска Let's Encrypt)
sudo ufw allow 443/tcp    # HTTPS
sudo ufw enable
sudo ufw status numbered
```

---

## 4. Установка Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# Перелогиниться, чтобы группа применилась:
exit
ssh deploy@SERVER_IP

# Проверка:
docker --version
docker compose version
```

---

## 5. Развёртывание приложения

### 5.1. Клонирование репозитория

```bash
git clone https://github.com/neuraCollab/payloadcms-realestate-template.git ~/app
cd ~/app
```

### 5.2. Настройка `.env`

```bash
cp .env.example .env

# Сгенерировать сильные секреты:
echo "PAYLOAD_SECRET=$(openssl rand -hex 32)"
echo "CRON_SECRET=$(openssl rand -hex 32)"
echo "PREVIEW_SECRET=$(openssl rand -hex 32)"
echo "POSTGRES_PASSWORD=$(openssl rand -hex 16)"
echo "PGADMIN_DEFAULT_PASSWORD=$(openssl rand -hex 16)"

nano .env
```

Вставьте сгенерированные значения. Также:
- `NEXT_PUBLIC_SERVER_URL=https://your-domain.com` (без слэша на конце)
- `DATABASE_URI=postgresql://admin:<новый-пароль>@postgres:5432/mydb`
- `PGADMIN_DEFAULT_EMAIL=admin@your-domain.com`

### 5.3. Закрыть лишние порты в `docker-compose.yml`

По умолчанию контейнеры выставляют `5432` (Postgres) и `8080` (pgAdmin) наружу. **Это небезопасно для продакшена.** Откройте `docker-compose.yml` и закомментируйте порт-маппинги для `postgres` и `pgadmin`:

```yaml
  postgres:
    # …
    # ports:
    #   - "${POSTGRES_PORT}:5432"

  pgadmin:
    # …
    # ports:
    #   - "${PGADMIN_PORT}:80"
```

Сервисы продолжат общаться между собой через внутреннюю Docker-сеть. Если pgAdmin нужен снаружи — пробрасывайте через SSH-туннель: `ssh -L 8080:localhost:8080 deploy@SERVER_IP`, либо настройте отдельный поддомен `pgadmin.your-domain.com` через Caddy с базовой авторизацией.

### 5.4. Запуск стека

```bash
docker compose up -d --build
# Сборка займёт 3–5 минут на первом запуске.

# Дождаться, пока postgres станет healthy:
docker compose ps
```

### 5.5. Восстановление демо-контента (опционально)

Если хотите, чтобы сайт сразу выглядел с теми же страницами, что и на скриншоте репозитория:

```bash
./db/restore.sh
```

Скрипт развернёт `db/dump.sql` в свежую БД (`pages`, `posts`, `media`, `agents`, `forms` и т.д.). Медиафайлы уже на диске в `public/media/` (3 jpg).

### 5.6. Проверка

```bash
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/
# должно вернуть 200
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin
# должно вернуть 200
```

---

## 6. Reverse-proxy и HTTPS через Caddy

Caddy сам получит и автоматически продлевает сертификат Let's Encrypt — никаких certbot и крон-задач не нужно.

### 6.1. Установка

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key'      | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list

sudo apt update
sudo apt install -y caddy
```

### 6.2. Конфигурация

```bash
sudo nano /etc/caddy/Caddyfile
```

Замените содержимое на:

```caddy
your-domain.com, www.your-domain.com {
    encode zstd gzip

    # Передаём все запросы в Next.js
    reverse_proxy localhost:3000

    # Долгий кеш для статики Next.js и медиа
    @static {
        path /_next/static/* /media/* /favicon.ico /favicon.svg
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    # Защитные заголовки
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}

# Редирект с www на корень (опционально):
www.your-domain.com {
    redir https://your-domain.com{uri} permanent
}
```

> **Замените `your-domain.com` на ваш реальный домен в обоих местах.**

### 6.3. Применение

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
sudo systemctl status caddy --no-pager
```

При первом обращении к `https://your-domain.com` Caddy выпустит сертификат (5–30 секунд). Логи: `sudo journalctl -u caddy -f`.

### 6.4. Финальная проверка

```bash
curl -I https://your-domain.com/
# HTTP/2 200 — всё работает
```

Откройте в браузере `https://your-domain.com` — должен показаться сайт. Админка — на `https://your-domain.com/admin`.

---

## 7. Создание первого администратора

При первом открытии `/admin` Payload предложит создать админ-аккаунт (если БД ещё пустая). Если вы развернули демо-дамп через `./db/restore.sh`, то пользователь уже есть — обновите пароль через панель.

Сбросить пароль вручную (если нужно):

```bash
docker compose exec postgres psql -U admin -d mydb -c "DELETE FROM users WHERE email='old@example.com';"
# Затем зайти на /admin/create-first-user
```

---

## 8. Обновление приложения

Обычный цикл обновления:

```bash
cd ~/app
git pull origin main
docker compose up -d --build
```

Если изменилась схема Payload-коллекций — Payload автоматически выполнит миграции при запуске. Дамп старой БД желательно сделать перед обновлением:

```bash
./db/backup.sh                       # обновит db/dump.sql
cp db/dump.sql ~/backups/pre-$(date +%F).sql
```

---

## 9. Резервное копирование

### 9.1. Ручной бэкап

```bash
./db/backup.sh
tar czf ~/backups/snapshot-$(date +%F).tar.gz db/dump.sql public/media .env
```

### 9.2. Автоматический бэкап (cron, ежедневно в 03:00)

```bash
mkdir -p ~/backups
crontab -e
```

Добавить строку:

```cron
0 3 * * * cd /home/deploy/app && ./db/backup.sh && tar czf /home/deploy/backups/snapshot-$(date +\%F).tar.gz db/dump.sql public/media && find /home/deploy/backups -name "snapshot-*.tar.gz" -mtime +14 -delete
```

(хранит снапшоты 14 дней, далее удаляет.)

### 9.3. Хранение бэкапов вне сервера

Для надёжности — выгружайте бэкапы в облако (S3, Backblaze, Yandex Object Storage, Selectel S3):

```bash
# Пример с rclone (universal облачный клиент):
sudo apt install -y rclone
rclone config   # настроить remote, например `s3-backup`
rclone copy ~/backups/ s3-backup:realty-backups/ --max-age 7d
```

Добавить в cron после строки бэкапа.

---

## 10. Усиление безопасности

| Что | Как |
|---|---|
| SSH только по ключу | См. п. 3.3 |
| Закрыть Postgres / pgAdmin порты | См. п. 5.3 |
| Сильные секреты | `openssl rand -hex 32` для каждого секрета в `.env` |
| Fail2ban | `sudo systemctl enable --now fail2ban` (защищает SSH от перебора) |
| HTTPS / HSTS | Caddy + блок `Strict-Transport-Security` (см. п. 6.2) |
| Авто-обновления безопасности | `sudo apt install unattended-upgrades && sudo dpkg-reconfigure --priority=low unattended-upgrades` |
| Логи Docker | `docker compose logs --tail 200 app` |
| Мониторинг ресурсов | `htop`, `docker stats` |

### Cloudflare (опционально, бесплатно)

Если поставить Cloudflare перед своим сервером:
- Бесплатный DDoS-щит и кеш статики на 200+ точках мира.
- В Cloudflare DNS прописать те же A-записи, **в режиме «Proxied» (оранжевое облачко)**.
- В Caddyfile добавить `trusted_proxies cloudflare`.
- В Cloudflare → SSL/TLS выставить **Full (strict)**.

---

## 11. Производственная оптимизация (на будущее)

Текущая конфигурация запускает Next.js в режиме **dev** (Turbopack). Это работает для трафика ≤ 1k посетителей/сутки, но потребляет в 2–3 раза больше памяти, чем `next start`.

Чтобы перейти на production-build:

1. В `next.config.js` добавить:
   ```js
   output: 'standalone',
   ```
2. Использовать существующий `Dockerfile` вместо `Dockerfile.dev` (в `docker-compose.yml` поменять `dockerfile: Dockerfile.dev` → `dockerfile: Dockerfile`).
3. В `Dockerfile` заменить `corepack enable pnpm && pnpm i --frozen-lockfile` на `npm install -g pnpm@10.3.0 && pnpm i --no-frozen-lockfile` (corepack-проверка подписи pnpm@10 ломается на текущем Alpine).
4. Пересобрать: `docker compose up -d --build`.

После этого:
- Контейнер запускает `node server.js` (вместо `pnpm dev`).
- Память ≈ 400 МБ против ≈ 1.4 ГБ.
- Hot-reload недоступен (нужно для каждого изменения делать `git pull && docker compose up -d --build`).

---

## 12. Краткая шпаргалка команд

```bash
# Первичный setup (one-shot):
adduser deploy && usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy/
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config && systemctl restart ssh
ufw allow 22,80,443/tcp && ufw enable
curl -fsSL https://get.docker.com | sh && usermod -aG docker deploy

# Деплой:
git clone https://github.com/neuraCollab/payloadcms-realestate-template.git ~/app && cd ~/app
cp .env.example .env && nano .env
docker compose up -d --build
./db/restore.sh

# Caddy + HTTPS:
sudo apt install -y caddy
sudo nano /etc/caddy/Caddyfile   # см. п. 6.2
sudo systemctl reload caddy

# Обновление:
cd ~/app && git pull && docker compose up -d --build

# Бэкап:
./db/backup.sh && tar czf ~/backups/snap-$(date +%F).tar.gz db/dump.sql public/media
```

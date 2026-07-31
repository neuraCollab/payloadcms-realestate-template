# CI/CD: GitHub Actions → ghcr.io → prod-сервер

Поток после `git push origin main`:

```
push → GH Actions
        │
        ├─ build (docker buildx, кеш GHA)
        │   └─ push в ghcr.io/neuracollab/payloadcms-realestate-template:sha-XXXXXXX
        │                                                                + :latest
        │
        └─ deploy (если build прошёл)
            └─ SSH на сервер
                ├─ git pull origin main           # compose.yml + migrations
                ├─ docker pull <image>:sha-XXXXXXX
                ├─ docker tag → realty-app:latest
                ├─ docker compose up -d --force-recreate app
                ├─ wait healthy
                └─ POST /api/admin/migrate
```

Сборка ~2-10 минут (после первого билда работает GHA-кеш слоёв).
Деплой ~30-60 секунд.

---

## Что нужно настроить ОДИН РАЗ

### 1. SSH ключ для GitHub Actions → сервер

На рабочей машине:

```bash
ssh-keygen -t ed25519 -C "gh-actions@demorealty" -f ~/.ssh/demorealty_deploy -N ""
# Создаст ~/.ssh/demorealty_deploy (приватный) + .pub (публичный)
```

На сервере:

```bash
# Добавить публичный ключ
cat >> ~/.ssh/authorized_keys <<'EOF'
<вставить содержимое demorealty_deploy.pub>
EOF
chmod 600 ~/.ssh/authorized_keys
```

Проверить с локалки что коннект работает с этим ключом:

```bash
ssh -i ~/.ssh/demorealty_deploy root@<server-ip> "echo ok"
```

### 2. GitHub Secrets (Settings → Secrets and variables → Actions → New secret)

| Secret name | Значение |
|---|---|
| `SSH_HOST` | IP или домен сервера (`195.x.x.x`) |
| `SSH_USER` | `root` |
| `SSH_KEY` | содержимое `~/.ssh/demorealty_deploy` (полное, включая `-----BEGIN ...-----` и `-----END ...-----`) |
| `SSH_PORT` | (опц.) — если не `22` |
| `PAYLOAD_SECRET` | строка ≥32 символа — должна совпадать с `.env` на сервере |
| `CRON_SECRET` | то же что на сервере |
| `PREVIEW_SECRET` | то же что на сервере |
| `NEXT_PUBLIC_SERVER_URL` | `https://example.com` |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | (опц.) `pk.eyJ1...` |
| `NEXT_PUBLIC_MAPBOX_STYLE` | (опц.) дефолт `mapbox://styles/mapbox/streets-v12` |

> Важно: `PAYLOAD_SECRET`/`CRON_SECRET`/`PREVIEW_SECRET` в GitHub
> Secrets **должны** быть **точно те же** что в `.env` на сервере.
> Иначе сессии Payload-админа протухнут после деплоя, а
> `/api/admin/migrate` вернёт 401.

Берём со своего сервера:
```bash
grep -E '^(PAYLOAD_SECRET|CRON_SECRET|PREVIEW_SECRET)=' .env
```

### 3. Сделать GHCR-пакет публичным (один раз, после первого build)

После первого успешного `gh-actions/deploy`:

1. Открыть https://github.com/neuraCollab/payloadcms-realestate-template/pkgs/container/payloadcms-realestate-template
2. Right side → Package settings → **Change visibility** → Public.

Альтернатива (если хочется держать приватным) — на сервере залогиниться
в GHCR через PAT, но это дополнительная морока. Public проще.

### 4. Сервер должен иметь Docker login в GHCR

Workflow логинится за тебя через `GITHUB_TOKEN`, но сервер сам тоже
должен мочь pull-ить. Если пакет публичный (см. п.3) — pull без auth.
Если приватный:

```bash
# На сервере, один раз:
echo "ghp_xxxxxxxxxxxxx" | docker login ghcr.io -u <username> --password-stdin
# Сохранит в ~/.docker/config.json, последующие pull работают.
```

PAT: github.com → Settings → Developer settings → Personal access tokens
→ Tokens (classic) → `read:packages` scope.

### 5. Сервер должен иметь репозиторий в `/root/payloadcms-realestate-template`

```bash
# Если ещё нет
cd /root
git clone https://github.com/neuraCollab/payloadcms-realestate-template.git
cd payloadcms-realestate-template
cp .env.example .env
nano .env   # заполнить секреты
```

Workflow делает `git pull origin main` каждый деплой — compose.yml,
migrations и `deploy/nginx/*` обновляются автоматически.

---

## Как проверить что всё работает

После настройки секретов сделать тестовый push:

```bash
git commit --allow-empty -m "test: trigger first CI build"
git push origin main
```

В Actions UI должна появиться задача `Deploy`. Если что-то падает —
смотреть логи прямо в job, обычно ошибки понятные:

- `denied: permission_denied` при push → разреши `Workflow permissions`
  → Read and write в Settings → Actions → General.
- `ssh: handshake failed` → проверь `SSH_KEY` (полная строка с BEGIN/END)
  и `SSH_HOST/PORT`.
- `docker pull manifest unknown` → пакет ещё приватный (см. п.3).
- `401 Unauthorized` на `/api/admin/migrate` → `CRON_SECRET` в GitHub
  Secrets не совпадает с `.env` на сервере.

## Откат

Если деплой попал, но что-то не так с новым кодом:

```bash
# На сервере
cd /root/payloadcms-realestate-template
docker image ls ghcr.io/neuracollab/payloadcms-realestate-template
# Найти предыдущий sha-XXXXXXX
docker tag ghcr.io/neuracollab/payloadcms-realestate-template:sha-XXXXXXX realty-app:latest
docker compose -f docker-compose.prod.yml up -d --force-recreate app
```

Образы старше 3-х последних чистятся автоматически workflow'ом.
Если нужен совсем старый — он есть в GHCR на github.com/.../pkgs/container/.

## Скорости

| Шаг | Время (cold cache) | Время (warm) |
|---|---|---|
| GHA setup + checkout | 5-10s | 5-10s |
| Docker buildx setup | 10s | 10s |
| Build image | ~6-10мин | 2-3мин |
| Push в GHCR | ~30-60s | ~20-30s |
| SSH + pull на сервер | ~20s | ~20s |
| Recreate + healthy | ~30-60s | ~30-60s |
| Migrate | ~3s | ~3s |
| **Итого** | **~9-13мин** | **~4-5мин** |

`./scripts/deploy.sh` на сервере остаётся как fallback для ручных
сборок (например, тестируешь dirty changes без коммита).

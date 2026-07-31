# Настройка Resend на сервере Beget (письма со своего домена)

Как подключить отправку реальных писем (magic-link вход в кабинет,
а в будущем — уведомления о новых матчах) с домена `example.com`,
если сервер арендован у Beget.

## Почему Resend, а не SMTP-сервер на Beget

Шаблонный SMTP-сервер хостинга (`smtp.beget.com`) подходит для простых
рассылок, но:

- порт 25 для исходящей почты у большинства VPS заблокирован (антиспам
  политика Beget и многих российских хостеров) — порт 587/465 работает,
  но требует логин/пароль почтового ящика и легко улетает в спам без
  правильных SPF/DKIM;
- `src/lib/email.ts` в проекте уже написан под HTTP API Resend
  (`POST https://api.resend.com/emails`) — никакого SMTP-клиента в
  зависимостях нет, и не нужен: запрос идёт по HTTPS (443), порт 25/587
  тут вообще не используется, поэтому никакие блокировки хостера не
  мешают;
- Resend сам выдаёт DKIM/SPF записи и держит репутацию IP — письма с
  верифицированного домена не улетают в спам у Gmail/Mail.ru/Yandex.

Поэтому правильный путь — верифицировать домен в Resend и направить
DNS-записи через панель Beget. Сервер останется на Beget, письма уйдут
через Resend.

## 1. Завести аккаунт и API key в Resend

1. Зарегистрироваться на https://resend.com (бесплатный тариф — 3000
   писем/месяц, этого достаточно для старта).
2. Resend Dashboard → **API Keys** → **Create API Key**. Права —
   `Sending access` достаточно. Скопировать ключ (вида `re_xxxxxxxx`,
   показывается один раз).

## 2. Добавить и верифицировать домен в Resend

1. Resend Dashboard → **Domains** → **Add Domain** → ввести
   `example.com` (без `www`, без `https://`).
2. Resend покажет 3 DNS-записи (имена могут немного отличаться,
   ориентируйтесь на то что покажет дашборд):

   | Тип | Имя (host) | Значение |
   |---|---|---|
   | MX | `send.example.com` | `feedback-smtp.<region>.amazonses.com` (приоритет 10) |
   | TXT (SPF) | `send.example.com` | `v=spf1 include:amazonses.com ~all` |
   | TXT (DKIM) | `resend._domainkey.example.com` | длинная строка `p=MIGfMA0...` |

   Опционально, но рекомендуется — DMARC:

   | Тип | Имя | Значение |
   |---|---|---|
   | TXT | `_dmarc.example.com` | `v=DMARC1; p=none; rua=mailto:postmaster@example.com` |

## 3. Внести записи в DNS-панели Beget

1. Зайти в **my.beget.com** → **Домены** → выбрать `example.com` →
   **DNS-записи** (или «Управление DNS»).
2. Добавить каждую запись из шага 2 кнопкой **Добавить запись**:
   - Тип записи выбрать из выпадающего списка (`MX`, `TXT`).
   - В поле «Поддомен/имя» — указать **только** часть до домена
     (например `send`, `resend._domainkey`, `_dmarc`), Beget сам
     подставит `.example.com`.
   - Для MX дополнительно есть поле «Приоритет» — поставить `10`.
   - Значение TXT-записи вставлять **целиком в кавычках**, как показал
     Resend — не обрезать.
3. Сохранить. DNS-записи Beget обычно применяются 15–60 минут (может
   доходить до нескольких часов из-за TTL).
4. Вернуться в Resend → Domains → нажать **Verify DNS Records**. Статус
   должен стать «Verified» у всех трёх (MX/SPF/DKIM).

> Если у домена `example.com` уже настроена корпоративная почта
> (`@example.com` через другой MX) — не трогайте существующую
> MX-запись почты, а используйте отдельный поддомен только для отправки,
> например `mail.example.com`, и при добавлении домена в Resend
> укажите именно его. Тогда `EMAIL_FROM` в шаге 4 будет
> `Demo Realty <no-reply@mail.example.com>`.

## 4. Прописать переменные окружения

Проект хранит секреты в **Infisical** (см. `docs/README.md`), а не в
закоммиченном `.env`. Добавить в Infisical (env `prod`, и при желании
`dev`/`staging`):

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Demo Realty <no-reply@example.com>
```

`EMAIL_FROM` обязательно должен быть в верифицированном домене —
иначе Resend вернёт `403` на каждое письмо. Локально для разработки
эти переменные можно не задавать: `src/lib/email.ts` при пустом
`RESEND_API_KEY` просто пишет письмо в `console.warn` и не падает
(см. ниже «Поведение без ключа»).

После обновления секретов в Infisical — пересобрать и перезапустить
прод (значения подтягиваются в `docker build --build-arg` в
`scripts/deploy.sh`, см. `docs/DEPLOY-PROD.md`):

```bash
infisical run --env=prod -- ./scripts/deploy.sh realty-snapshot-*.tar.gz
```

## 5. Пример: письмо для входа в личный кабинет

Magic-link логин (`src/app/(payload)/api/auth/magic-link/route.ts`)
уже использует `sendEmail()` из `src/lib/email.ts` — ничего менять не
нужно, просто после шага 4 письма начнут реально доходить. Вот что
происходит «под капотом»:

```ts
// src/app/(payload)/api/auth/magic-link/route.ts
const subject = 'Вход в личный кабинет Demo Realty'
const text =
  `Здравствуйте!\n\n` +
  `Чтобы войти в кабинет Demo Realty, перейдите по ссылке:\n` +
  `${verifyUrl}\n\n` +
  `Ссылка действительна 15 минут и работает один раз.`
const html = `<p>...</p><a href="${verifyUrl}">Войти в кабинет</a>...`

void sendEmail({ to: email, subject, text, html })
```

`sendEmail()` (`src/lib/email.ts`) делает POST на Resend:

```ts
fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: process.env.EMAIL_FROM, // "Demo Realty <no-reply@example.com>"
    to: ['user@example.com'],
    subject,
    text,
    html,
  }),
})
```

### Проверка end-to-end

1. На проде/staging открыть `/cabinet/login`, ввести свой email,
   нажать «Получить ссылку на email».
2. Resend Dashboard → **Logs** → должна появиться запись со статусом
   `Delivered` для адресата и темой «Вход в личный кабинет Demo Realty».
3. Письмо должно дойти за 5–30 секунд. Если письмо в спаме у
   Mail.ru/Yandex — это обычно означает что DKIM/SPF ещё не
   подтверждены (см. шаг 3) либо домен слишком новый (репутация
   наращивается первые письма-дни).

## Поведение без ключа (dev/staging без Resend)

Если `RESEND_API_KEY` не задан — `sendEmail()` не падает и не блокирует
запрос, а пишет в лог сервера:

```
[email] RESEND_API_KEY не задан, письмо НЕ отправлено. Содержимое для проверки: { to: [...], subject: '...', text: '...' }
```

Удобно для локальной разработки: токен из magic-link можно скопировать
из лога и открыть `/api/auth/verify?token=<тот самый>` вручную.

## Troubleshooting

### Resend возвращает `403 from_address_not_verified`
Домен в `EMAIL_FROM` не совпадает с верифицированным в Resend, либо
верификация DNS ещё не прошла. Проверить статус: Resend Dashboard →
Domains → должно быть `Verified` у всех записей.

### DNS-записи в Beget не подтверждаются часами
Проверить что TTL записи не выставлен на максимум (Beget по умолчанию
ставит разумный TTL, но если меняли руками — выставьте `300`–`3600`).
Проверить распространение записи:
```bash
dig TXT resend._domainkey.example.com +short
dig MX send.example.com +short
```
Если пусто — запись либо не сохранилась в панели Beget, либо опечатка
в имени поддомена.

### Письма уходят, но попадают в спам
1. Убедиться что DKIM и SPF (а не только MX) — `Verified`.
2. Добавить DMARC-запись (шаг 2, опциональная таблица) — заметно
   снижает шанс попадания в спам у Mail.ru/Yandex.
3. Не слать с `EMAIL_FROM` вида `onboarding@resend.dev` (дефолтный
   фолбэк в коде) на проде — это шаред-домен Resend для тестов, у него
   нет репутации под ваш бренд.

### Нужно сменить адрес отправителя без редеплоя
`EMAIL_FROM` — обычная (не `NEXT_PUBLIC_*`) переменная, читается в
runtime на сервере (`process.env.EMAIL_FROM` в `src/lib/email.ts`).
Обновить значение в Infisical и перезапустить контейнер `app` —
пересборка образа не требуется.

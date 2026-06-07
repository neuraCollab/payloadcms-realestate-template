import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import config from '@/payload.config'
import { migrations } from '@/migrations'

/**
 * Применяет pending Payload-миграции из `src/migrations/`.
 *
 * Зачем эндпоинт, а не `pnpm payload migrate`:
 * production-образ — Next standalone, в нём нет `pnpm`, нет исходников,
 * нет CLI Payload. Единственный способ выполнить миграцию изнутри
 * контейнера — HTTP-запрос к запущенному Next-серверу.
 *
 * Импорт `@/migrations` нужен, чтобы Next включил миграции в
 * standalone-трейс (иначе они отсутствуют в production-бандле).
 *
 * Auth:
 *   • Bearer ${CRON_SECRET}
 *   • ИЛИ Payload session с role=admin
 *
 * Идемпотентно — пропускает уже применённые (отслеживает по
 * payload_migrations.name).
 *
 * POST /api/admin/migrate
 *   Body: { dryRun?: boolean }
 *   200 → { ok, applied: [...names], skipped: [...names] }
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const dryRun = body.dryRun === true

  const payload = await getPayload({ config })
  // @ts-expect-error — drizzle exposed by postgres adapter at runtime
  const drizzle = payload.db.drizzle

  // На свежей БД таблицы payload_migrations ещё нет. Создаём ровно так,
  // как это делает payload migrate CLI (схема из db-postgres internals).
  await drizzle.execute(sql`
    CREATE TABLE IF NOT EXISTS payload_migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      batch NUMERIC,
      updated_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
      created_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()
    )
  `)

  const appliedRes = await drizzle.execute(sql`
    SELECT name FROM payload_migrations WHERE name IS NOT NULL
  `)
  const appliedNames = new Set<string>(
    (appliedRes.rows ?? []).map((r: any) => String(r.name)),
  )

  // Следующий batch_number — все pending миграции одного запуска
  // получают один batch (тот же подход, что в payload CLI).
  const maxBatchRes = await drizzle.execute(sql`
    SELECT COALESCE(MAX(batch), 0) AS max FROM payload_migrations
  `)
  const nextBatch = Number((maxBatchRes.rows?.[0] as any)?.max ?? 0) + 1

  const applied: string[] = []
  const skipped: string[] = []
  const failed: Array<{ name: string; error: string }> = []

  for (const m of migrations) {
    if (appliedNames.has(m.name)) {
      skipped.push(m.name)
      continue
    }
    if (dryRun) {
      applied.push(m.name)
      continue
    }
    try {
      await m.up({
        db: drizzle,
        payload,
        // req нужен миграциям с payload.create() внутри. Наши миграции
        // его не используют — но тип требует.
        req: undefined as any,
      })
      await drizzle.execute(sql`
        INSERT INTO payload_migrations (name, batch)
        VALUES (${m.name}, ${nextBatch})
      `)
      applied.push(m.name)
      payload.logger.info({ migration: m.name }, 'migrate: applied')
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      payload.logger.error({ migration: m.name, err: msg }, 'migrate: failed')
      failed.push({ name: m.name, error: msg })
      // Останавливаемся на первой ошибке — последующие миграции
      // могут зависеть от текущей. Лучше не накатывать половину.
      break
    }
  }

  const status = failed.length > 0 ? 500 : 200
  return NextResponse.json(
    {
      ok: failed.length === 0,
      dryRun,
      batch: dryRun ? null : nextBatch,
      applied,
      skipped,
      failed,
      total: migrations.length,
    },
    { status },
  )
}

async function authorize(req: NextRequest): Promise<boolean> {
  const auth = req.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (expected && auth === `Bearer ${expected}`) return true
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: req.headers })
    return user?.role === 'admin'
  } catch {
    return false
  }
}

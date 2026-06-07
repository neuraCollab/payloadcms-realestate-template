import { sql } from '@payloadcms/db-postgres'
import type { Payload } from 'payload'

/**
 * Сессии диалога — состояние Q&A для команд /new, /search и т.п.
 * Persist в БД (telegram_sessions): {chat_id, step, draft, updated_at}.
 *
 * 1 чат = 1 активная сессия. Запуск новой команды перезаписывает.
 */
export interface Session {
  chatId: number
  step: string | null
  draft: Record<string, any>
}

const drizzleOf = (payload: Payload): any =>
  // @ts-expect-error drizzle exposed at runtime by postgres-adapter
  payload.db.drizzle

export async function getSession(
  payload: Payload,
  chatId: number,
): Promise<Session | null> {
  const drizzle = drizzleOf(payload)
  const res = await drizzle.execute(sql`
    SELECT chat_id, step, draft FROM telegram_sessions
    WHERE chat_id = ${chatId}
    LIMIT 1
  `)
  const row = (res.rows ?? [])[0] as any
  if (!row) return null
  return {
    chatId: Number(row.chat_id),
    step: row.step ?? null,
    draft: row.draft ?? {},
  }
}

export async function setSession(
  payload: Payload,
  chatId: number,
  step: string | null,
  draft: Record<string, any>,
): Promise<void> {
  const drizzle = drizzleOf(payload)
  await drizzle.execute(sql`
    INSERT INTO telegram_sessions (chat_id, step, draft, updated_at)
    VALUES (${chatId}, ${step}, ${JSON.stringify(draft)}::jsonb, now())
    ON CONFLICT (chat_id) DO UPDATE
      SET step = EXCLUDED.step,
          draft = EXCLUDED.draft,
          updated_at = now()
  `)
}

export async function clearSession(payload: Payload, chatId: number): Promise<void> {
  const drizzle = drizzleOf(payload)
  await drizzle.execute(sql`DELETE FROM telegram_sessions WHERE chat_id = ${chatId}`)
}

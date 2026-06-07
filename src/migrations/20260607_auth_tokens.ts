import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Magic-link tokens.
 *
 * Хранится только хеш токена (sha256), а не сам токен — если БД утечёт,
 * злоумышленник не сможет восстановить активные сессии. Сам токен
 * существует только в письме у получателя.
 *
 * expires_at — обычно +15 минут от создания. По истечении токен
 * нельзя использовать.
 *
 * used_at — устанавливаем при первом успешном verify. Один-раз-токен:
 * повторный clik по той же ссылке не залогинит.
 *
 * purpose — на будущее: 'login' / 'email_verify' / 'password_reset'.
 * Сейчас используем только login.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS auth_tokens (
      id           SERIAL PRIMARY KEY,
      token_hash   VARCHAR(64) NOT NULL UNIQUE,
      email        VARCHAR NOT NULL,
      purpose      VARCHAR DEFAULT 'login',
      created_at   TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
      expires_at   TIMESTAMP(3) WITH TIME ZONE NOT NULL,
      used_at      TIMESTAMP(3) WITH TIME ZONE
    );

    CREATE INDEX IF NOT EXISTS auth_tokens_email_idx ON auth_tokens (email);
    CREATE INDEX IF NOT EXISTS auth_tokens_expires_at_idx ON auth_tokens (expires_at);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS auth_tokens;`)
}

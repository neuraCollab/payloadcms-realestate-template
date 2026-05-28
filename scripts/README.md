# Backup & Restore

Tooling for capturing/restoring full app state — database + media uploads.
Used to migrate the running stack from one host to another or to roll back
after a botched seed.

## Capture a snapshot

```bash
./scripts/backup.sh
```

Produces `backups/realty-YYYYMMDD-HHMMSS.tar.gz` containing:

- `db.sql` — full Postgres dump (`pg_dump --clean --if-exists`)
- `media/` — every file Payload uploaded into `public/media/`
- `.env.template` — config knobs (secrets are stripped)

Requires the `docker compose` stack to be running so `pg_dump` can talk to
the `postgres` service.

## Restore on a new host

1. `git clone` this repo and set up `.env` with the *target* secrets
2. `docker compose up -d postgres` (just the DB)
3. `./scripts/restore.sh path/to/realty-…tar.gz`
4. `docker compose up -d app` (and `pgadmin` if needed)

The restore script:

- `psql` replays `db.sql` against the configured Postgres DB
- Copies `media/` into `public/media/` so uploaded images are accessible
- Does *not* restore secrets — keep your `.env` separate and version-controlled
  outside the repo

## What's *not* in the archive

- `node_modules/` — reinstalled via `pnpm install` on the new host
- `.next/` — re-built via `pnpm build`
- Cron jobs / scheduled tasks — re-configured on the host

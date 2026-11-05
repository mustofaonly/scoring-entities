# PostgreSQL migration guide

This guide targets Prisma ORM 7. Run the commands from the repository root.
The configuration example is stored beside the schema, but must be copied to
the root so its paths resolve correctly. No SQL migrations have been created yet.

## 1. Set up the CLI

Use a supported Node.js LTS release, such as Node 22.12+ or 24.x.
Install the migration CLI and environment loader:

```sh
npm install --save-dev prisma@7 dotenv
cp src/infra/database/migrations/prisma.config.ts.example prisma.config.ts
```

Keep the resulting lockfile to pin the CLI version. These migration commands
do not require Prisma Client or a generator block. If an application needs a
generated client, configure it separately and run `npx prisma generate` after
schema changes.

Create a root `.env` with a development database connection:

```dotenv
DATABASE_URL="postgresql://scoring:password@localhost:5432/scoring_dev?schema=public"
```

Replace the example credentials and percent-encode special characters in them.
Add `.env` to `.gitignore` before storing real credentials; this repository does
not currently ignore it. CI can supply `DATABASE_URL` directly instead of using
a file. Even local validation requires this variable because the config uses
`env("DATABASE_URL")`.

`migrate dev` needs a shadow database. Give the development role permission to
create databases, or uncomment `shadowDatabaseUrl` in the config and provide
`SHADOW_DATABASE_URL` for a separate disposable database. Never point the shadow
URL at the development or production database.

See the [Prisma 7 config reference](https://www.prisma.io/docs/orm/v7/reference/prisma-config-reference)
and [system requirements](https://www.prisma.io/docs/orm/v7/reference/system-requirements).

## 2. Review the schema

Review the mapping assumptions in [README.md](./README.md), particularly optional
relations, corner participants, audit users, numeric timestamps, and `Int` fields.
Then check the schema:

```sh
npx prisma format --config prisma.config.ts
npx prisma validate --config prisma.config.ts
```

The datasource must stay named `db` with `provider = "postgresql"` so
`@db.Char(26)` resolves against the intended connector.

## 3. Create the first migration for an empty development database

Create a draft for review:

```sh
npx prisma migrate dev --name init --create-only --config prisma.config.ts
```

Inspect the generated
`src/infra/database/migrations/<timestamp>_init/migration.sql`.
Check `CHAR(26)` keys, nullable foreign keys, table names, enum values, and JSON
columns. `--create-only` leaves the new migration unapplied, but the command
still connects to the development and shadow databases and can detect drift.
If Prisma requests a reset, verify the target and investigate before accepting.

Apply the reviewed migration:

```sh
npx prisma migrate dev --config prisma.config.ts
npx prisma migrate status --config prisma.config.ts
```

Commit the schema, active root configuration, SQL migration folders, generated
`migration_lock.toml`, and dependency lockfile. Keep credentials out of commits.

## 4. Make later changes

Edit the schema, format and validate it, then draft a named migration:

```sh
npx prisma migrate dev --name adjust_relations --create-only --config prisma.config.ts
```

Review the SQL before applying it with `migrate dev`. For a new required relation,
backfill missing foreign keys before adding `NOT NULL`. For a rename, review
whether Prisma proposes dropping and recreating the column. Preserve migrations
that have already been applied; record corrections in a new migration.

## 5. Deploy reviewed migrations

In CI or the deployment environment, install the locked dependencies including
the Prisma CLI, and set `DATABASE_URL` to the target database. Apply committed SQL:

```sh
npx prisma migrate deploy --config prisma.config.ts
npx prisma migrate status --config prisma.config.ts
```

`migrate deploy` applies pending migrations without a shadow database; it does
not generate migration SQL, detect schema drift, or generate Prisma Client.
Use `migrate dev` and `migrate reset` only with development databases.
See [development and production workflows](https://www.prisma.io/docs/orm/v7/prisma-migrate/workflows/development-and-production).

## 6. Adopt an existing database

Use a baseline instead of applying an empty-database `init` migration to existing
tables. First inspect the current database without overwriting this schema:

```sh
npx prisma db pull --print --config prisma.config.ts
```

The baseline must describe the database as it exists today, including existing
constraints. This generated schema is a proposed design and may differ. Follow
the [baselining workflow](https://www.prisma.io/docs/orm/v7/prisma-migrate/workflows/baselining)
to generate SQL for that actual starting state and mark it applied only on
databases that already match. Then create separate migrations for the desired
changes. Marking a baseline applied records history; it does not execute its SQL.

## Prisma 6 compatibility

The example above targets Prisma 7. For Prisma 6, the schema's datasource also
needs `url = env("DATABASE_URL")`. Config support varies between Prisma 6
versions; use the config API supported by the version pinned in your project.
Prisma 7 keeps the connection URL in the config, outside the schema.

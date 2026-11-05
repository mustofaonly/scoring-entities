# Prisma model schema

`schema.prisma` derives all 16 models from
`src/implementations/entities/*/schema/*ModelSchema.ts`.

For setup, development migrations, deployment, and existing databases, see
[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md). Copy
[`prisma.config.ts.example`](./prisma.config.ts.example) to the repository root
as `prisma.config.ts` to use the Prisma 7 configuration.

- Every foreign key and to-one relation is nullable for manual review. Reverse
  collections use Prisma lists, which can be empty but cannot be nullable.
- Nested entity objects (`*_info`) become relations. `Weight` adds `kategori_id`,
  `golongan_id`, and `kelas_id` to support those relations. Nested objects inside
  `Undian.peserta_info` and `UserLogin.users_info` are accessed through the related
  models rather than stored as duplicate snapshots.
- `Jadwal.red_corner` and `blue_corner` are assumed to reference `Peserta`.
  `created_by` and `updated_by` are assumed to reference `Users`.
- `Jadwal.score` and `Logs.data` use `Json`. Log reference fields remain scalar
  strings because their targets are dynamic.
- Counts, gender, role level, and arena use `Int`; ages and weights use `Float`.
  Numeric timestamps use `Float` to retain the source's JavaScript number shape
  without assuming a time unit. `dob` remains a nullable string.
- Enum values, defaults, field spelling (including `cualification`), and scalar
  nullability are preserved, except foreign keys are intentionally nullable.
  IDs remain application-supplied strings; no extra uniqueness rules are assumed.
  All primary keys and their foreign keys use `@db.Char(26)` for fixed-width
  storage. The `db` datasource explicitly declares PostgreSQL so Prisma can
  resolve these native types.
- Other Zod string lengths, number ranges, and nested JSON validation remain
  application concerns. No database checks are added.

Add the connection and client configuration appropriate to your Prisma version
before generating a client or migrations. Prisma 7 reads the connection URL from
`prisma.config.ts`; Prisma 6 requires `url = env("DATABASE_URL")` inside the
datasource block. This directory contains
the model definitions only; no database migration has been generated or applied.

# Prisma model schema

`schema.prisma` derives all 17 models from
`src/implementations/entities/*/schema/*ModelSchema.ts`.

For setup, development migrations, deployment, and existing databases, see
[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md). Copy
[`prisma.config.ts.example`](./prisma.config.ts.example) to the repository root
as `prisma.config.ts` to use the Prisma 7 configuration.

- Some foreign keys and to-one relations remain nullable for manual review.
  Team membership and team references on scores/draws are required; schedule
  corners remain nullable for byes. Reverse collections can be empty.
- Nested entity objects (`*_info`) become relations. `Weight` adds `kategori_id`,
  `golongan_id`, and `kelas_id` to support those relations. Nested objects inside
  `UserLogin.users_info` are accessed through related models.
  `Undian.peserta_team_info` stores the team snapshot, including its weight
  and contingent details. Participant info exposes this as `peserta_team_info`.
- `PesertaTeam.id` is the unique team key. Multiple `Peserta` members share
  `peserta_team_id`; it is indexed, not unique. `Scores.peserta_team_id`,
  `FinalScore.peserta_team_id`, `Undian.peserta_team_id`, and the schedule
  corners reference `PesertaTeam.id`, never the non-unique `Peserta.peserta_team_id`.
- `PesertaTeam` owns required `weight_id`, `kontingen_id`, and `events_id`
  relations. `Peserta` retains athlete membership and validity only; access
  competition, contingent, and event data through its team.
- `Jadwal.red_corner` and `blue_corner` reference `PesertaTeam`.
  `created_by` and `updated_by` are assumed to reference `Users`.
- `Jadwal.score` and `Logs.data` use `Json`. Log reference fields remain scalar
  strings because their targets are dynamic.
- Counts, gender, role level, and arena use `Int`; ages and weights use `Float`.
  Numeric timestamps use `Float` to retain the source's JavaScript number shape
  without assuming a time unit. `dob` remains a nullable string.
- Enum values, defaults, field spelling (including `cualification`), and scalar
  nullability are preserved, except for the reviewed relation nullability described above.
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

## Team reference migration

Create one `peserta_team` row for each distinct existing `peserta.peserta_team_id`
before adding the membership foreign key. Preserve those IDs so multiple
members remain on the same team. Draws, scores, final scores, and schedule
corners must contain team IDs. For older `peserta_id` columns containing member
IDs, resolve each member's `peserta_team_id` and backfill `peserta_team_id`; a column
rename alone is insufficient. The obsolete `Undian.pesertaId` helper column is
removed from the proposed schema. Review existing values before dropping it.
No SQL migration or database change is applied by editing this schema.

When migrating older member-owned competition fields, backfill each team's
`weight_id`, `kontingen_id`, and `events_id` before removing those columns from
`peserta`. Resolve conflicting values within a team before adding required
constraints. Rename an existing member `team_id` column to `peserta_team_id`.
Draw snapshots now use `peserta_team_info` with the team shape, and participant
info nests competition details under `peserta_team_info` rather than exposing
member-level `weight_info` and `kontingen_info`.

# Prisma model schema

`schema.prisma` represents all 21 public entity models. File names use
snake_case directories, lowerCamelCase schema values, PascalCase TypeScript
models/repositories, and English snake_case relational fields. Silat category
and score enum values remain unchanged domain codes.

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for Prisma setup and migration
commands and [NAMING_MIGRATION.md](./NAMING_MIGRATION.md) for the English rename
mapping. This package ships a schema template, not applied database migrations.

- Required foreign keys match required Zod fields. Nullable relations include
  schedule corners/winner/next match, weight class, draw updater, and the weight
  verifier. Existing databases must be backfilled before adding required keys.
- `ParticipantTeam` owns weight, contingent, and event links. Multiple
  `Participant` rows share `participant_team_id`, which is indexed, not unique.
  Match corners, winners, scores, calls, draws, and verification records reference
  the unique team primary key, not an individual participant's membership key.
- `MatchSchedule` includes qualification, date/session/status, the winner,
  self-referencing next-match progression, audit fields, and JSON `properties`.
  Its properties default matches the Zod corner status/score/winner defaults.
- Match calls, weight verification, verification calls, and winner models have
  explicit foreign keys and reverse relations. Verification `verified_at` is a
  nullable `DateTime`, matching Zod Date. Call timestamps remain String because
  their public schemas accept strings; other numeric timestamps remain Float.
- Nested category/age-group/weight-class and user/role info become relations.
  `Draw.participant_team_info` remains a JSON snapshot. Dynamic log references
  remain strings; schedule properties and log payloads remain JSON.
- `Athletes.national_id` replaces `nik`, and `avatar` is nullable. Contingents
  include a nullable `flag`. IDs remain application-supplied `@db.Char(26)` values.
- Scalar ranges, string validation, and nested JSON validation still belong to
  the shared Zod schemas. The schema does not add database CHECK constraints.

Configure a datasource URL for your Prisma version before validation/generation.
Prisma 7 reads the URL from `prisma.config.ts`; Prisma 6 requires a datasource
`url` in the schema. The supplied example config targets Prisma 7/PostgreSQL.

# English naming migration

This release changes exported names and payload keys. Consumers must upgrade
imports and payloads together, even though `commit.sh` increments a patch version.
Silat enum values (`tanding`, `jurus_baku`, `bina`, etc.) are intentionally retained.

Entity/model/repository mappings:

- `Golongan` → `AgeGroup`, directory `age_group`.
- `Kategori` → `Category`, directory `category`.
- `Kelas` → `WeightClass`, directory `weight_class`.
- `Kontingen` → `Contingent`, directory `contingent`.
- `Peserta` → `Participant`, directory `participant`.
- `PesertaTeam` → `ParticipantTeam`, directory `participant_team`.
- `Jadwal` → `MatchSchedule`, directory `match_schedule`.
- `Undian` → `Draw`, directory `draw`.

Relational/payload mappings:

- `jadwal_id` → `match_schedule_id`.
- `peserta_team_id`/`peserta_team_info` → `participant_team_id`/`participant_team_info`.
- `kontingen_id`/`kontingen_info` → `contingent_id`/`contingent_info`.
- `kategori_id`/`kategori_info` → `category_id`/`category_info`.
- `golongan_id`/`golongan_info` → `age_group_id`/`age_group_info`.
- `kelas_id`/`kelas_info` → `weight_class_id`/`weight_class_info`.
- `cualification` → `qualification`; `nik` → `national_id`.
- Participant-list display fields use `category` and `contingent`.
- Schema value exports use lowerCamelCase, including
  `infoParticipantResponseSchema` and `infoContingentResponseSchema`.
- `UserLoginRepository.ts` and `allScoresSchema.ts` now match their exported names.

All-athlete projections now expose `national_id` consistently with AthletesModel
rather than requiring the unrelated `external_id`. New athlete/contingent fields
(`avatar`, `flag`) are nullable but still required keys in complete model payloads.

The new match-schedule model replaces the old aggregate `score` document with
`properties` and adds date, session, status, winner/progression, and audit fields.
Do not merely rename that JSON document: convert the corner status/score/winner
shape explicitly. Schedule calls, weight verification/calls, and winners now have
matching Prisma models and repository interfaces.

## Existing databases

The Prisma table mappings now use English names. Prisma may otherwise propose
dropping old tables/columns and creating empty replacements. Review a draft SQL
migration and use data-preserving table/column renames and backfills. No database
migration is executed by this package release.

Create one team row per distinct existing team ID, preserving IDs and validating
weight/event/contingent consistency. Individual `peserta_id` columns in older
applications can identify an athlete, while `group_id` identifies a team: they
must not be blindly renamed to `participant_team_id`. Backfill new required
foreign keys and lifecycle fields, migrate JSON snapshots, and resolve any null
legacy references before enforcing the canonical constraints.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as entities from "../src";

const id = "A".repeat(26);
const prisma = readFileSync(new URL("../src/infra/database/migrations/schema.prisma", import.meta.url), "utf8");

describe("English entity contracts", () => {
  it("exports English names and retains the silat domain codes", () => {
    expect(Object.keys(entities).filter(name => /jadwal|peserta|kategori|kontingen|golongan|kelas|undian/i.test(name))).toEqual([]);
    expect(entities.categoryCodeTypes.options).toEqual(["tanding", "ganda", "regu", "jurus_baku", "solo_kreatif", "tunggal"]);
    expect(entities.scoreTypes.options).toContain("bina");
  });

  it("requires match_schedule_id and participant_team_id in score queries", () => {
    expect(entities.allScoresRequestSchema.parse({ match_schedule_id: id, participant_team_id: id, score_type: ["punch"] })).toHaveProperty("match_schedule_id", id);
    expect(entities.allScoresRequestSchema.safeParse({ jadwal_id: id, peserta_team_id: id, score_type: ["punch"] }).success).toBe(false);
    expect(entities.weightModelSchema.shape).toHaveProperty("category_info");
    expect(entities.weightModelSchema.shape).toHaveProperty("age_group_info");
    expect(entities.weightModelSchema.shape).toHaveProperty("weight_class_info");
    expect(entities.allAthletesResponseSchema.shape).toHaveProperty("national_id");
    expect(entities.allAthletesResponseSchema.shape).not.toHaveProperty("external_id");
  });

  it("includes the new match lifecycle fields and defaults", () => {
    const schedule = entities.matchScheduleModelSchema.parse({ id, events_id: id, weight_id: id, qualification: "final", red_corner: id, blue_corner: null, date: "2026-11-07", session: "morning", winner: null, next_match_schedule_id: null, created_at: 1, updated_at: 1, created_by: id, updated_by: id });
    expect(schedule.status).toBe("pending");
    expect(schedule.arena).toBe(1);
    expect(schedule.schedule_type).toBe("match");
    expect(entities.matchScheduleModelSchema.parse({
      ...schedule, arena: null, date: null, session: null, schedule_type: "match",
      bracket_number: 1, schedule_number: null, next_corner: "blue",
    })).toMatchObject({ arena: null, date: null, session: null, bracket_number: 1 });
    expect(entities.drawTypeSchema.options).toEqual(["pool", "match"]);
    expect(entities.matchScheduleTypeSchema.options).toEqual(["pool", "match"]);
    expect(schedule.properties.red.score.total).toBe(0);
    expect(schedule.properties.blue.winner_status.status).toBe("pending");
    expect(entities.matchScheduleCallsModelSchema.parse({ id, match_schedule_id: id, participant_team_id: id, created_at: "2026-11-07T00:00:00Z", created_by: id }).call_count).toBe(1);
    expect(entities.weightVerificationModelSchema.parse({ id, participant_team_id: id, weight_id: id, verified_by: null, verified_at: null }).status).toBe("pending");
    expect(entities.weightVerificationCallsModelSchema.parse({ id, weight_verification_id: id, created_at: "2026-11-07T00:00:00Z", created_by: id }).call_count).toBe(1);
    expect(entities.winnerModelSchema.parse({ id, events_id: id, participant_team_id: id, contingent_id: id, match_schedule_id: id, weight_id: id, rank: 1 }).winner_status).toBe("pending");
  });

  it("keeps all entity fields represented in the published Prisma schema", () => {
    const models = {
      Athletes: entities.athletesModelSchema, Events: entities.eventsModelSchema,
      FinalScore: entities.finalScoreSchema, AgeGroup: entities.ageGroupModelSchema,
      MatchSchedule: entities.matchScheduleModelSchema, MatchScheduleCalls: entities.matchScheduleCallsModelSchema,
      Category: entities.categoryModelSchema, WeightClass: entities.weightClassModelSchema,
      Contingent: entities.contingentModelSchema, Logs: entities.logsModelSchema,
      Participant: entities.participantModelSchema, ParticipantTeam: entities.participantTeamModelSchema,
      Roles: entities.rolesModelSchema, Scores: entities.scoresModelSchema,
      Draw: entities.drawModelSchema, UserLogin: entities.userLoginModelSchema,
      Users: entities.usersModelSchema, Weight: entities.weightModelSchema,
      WeightVerification: entities.weightVerificationModelSchema,
      WeightVerificationCalls: entities.weightVerificationCallsModelSchema, Winner: entities.winnerModelSchema,
    };
    expect([...prisma.matchAll(/^model /gm)]).toHaveLength(Object.keys(models).length);
    for (const [name, schema] of Object.entries(models)) {
      const body = prisma.match(new RegExp(`model ${name} \\{([\\s\\S]*?)^\\}`, "m"))?.[1];
      expect(body, name).toBeDefined();
      for (const field of Object.keys(schema.shape)) expect(body, `${name}.${field}`).toMatch(new RegExp(`^\\s+${field}\\s+`, "m"));
    }
    expect(prisma).not.toMatch(/\b(jadwal_id|peserta_team_id|kontingen_id|kategori_id|golongan_id|kelas_id|cualification|nik)\b/);
  });
});

import { describe, it, expect } from "vitest";
import {
  allScoreByUserRequestSchema,
  allScoresRequestSchema,
  allScoresResponseSchema,
  finalScoreSchema,
  listUndianAthletesResponseSchema,
  pesertaModelSchema,
  pesertaTeamModelSchema,
  pesertaTeamInfoSchema,
  infoPesertaResponseSchema,
  scoresModelSchema,
  undianModelSchema,
} from "../src";

const teamId = "T".repeat(26);
const memberId = "P".repeat(26);
const team = { id: teamId, weight_id: "W".repeat(26), kontingen_id: "K".repeat(26), events_id: "E".repeat(26) };
const score = {
  id: "S".repeat(26), score_type: "punch", score: "1",
  jadwal_id: "J".repeat(26), peserta_team_id: teamId,
  created_at: 1, created_by: "U".repeat(26),
};

describe("participant teams", () => {
  it("supports multiple participant members sharing one team", () => {
    expect(pesertaTeamModelSchema.parse(team)).toEqual(team);
    const participant = {
      id: memberId, external_id: "member-1",
      athletes_id: "A".repeat(26), peserta_team_id: teamId,
    };
    const first = pesertaModelSchema.parse(participant);
    const second = pesertaModelSchema.parse({ ...participant, id: "Q".repeat(26), athletes_id: "B".repeat(26), external_id: "member-2" });
    expect(first.peserta_team_id).toBe(second.peserta_team_id);
    expect(first.id).not.toBe(second.id);
  });

  it("keeps competition data on teams and nests team info consistently", () => {
    expect(pesertaTeamModelSchema.safeParse({ id: teamId }).success).toBe(false);
    for (const field of ["weight_id", "kontingen_id", "events_id"] as const) {
      expect(pesertaModelSchema.shape).not.toHaveProperty(field);
      expect(pesertaTeamModelSchema.safeParse({ ...team, [field]: "short" }).success).toBe(false);
    }
    expect(infoPesertaResponseSchema.shape.peserta_team_info).toBe(pesertaTeamInfoSchema);
    expect(infoPesertaResponseSchema.shape).not.toHaveProperty("weight_info");
    expect(infoPesertaResponseSchema.shape).not.toHaveProperty("kontingen_info");
    expect(undianModelSchema.shape.peserta_team_info.shape.id).toBe(pesertaTeamInfoSchema.shape.id);
    expect(undianModelSchema.shape).not.toHaveProperty("peserta_info");
  });

  for (const [name, schema] of [["scores", scoresModelSchema], ["score responses", allScoresResponseSchema], ["final scores", finalScoreSchema]] as const) {
    it(`${name} require a team ID, not the old participant field`, () => {
      expect(schema.parse(score).peserta_team_id).toBe(teamId);
      const { peserta_team_id: _teamId, ...withoutTeam } = score;
      expect(schema.safeParse({ ...withoutTeam, peserta_id: memberId }).success).toBe(false);
      expect(schema.safeParse({ ...score, peserta_team_id: "short" }).success).toBe(false);
    });
  }

  it("score queries and per-user queries use team IDs", () => {
    const query = { jadwal_id: score.jadwal_id, peserta_team_id: teamId, score_type: ["punch"] };
    expect(allScoresRequestSchema.parse(query).peserta_team_id).toBe(teamId);
    expect(allScoreByUserRequestSchema.parse({ ...query, created_by: score.created_by }).peserta_team_id).toBe(teamId);
    const legacy = { jadwal_id: query.jadwal_id, peserta_id: memberId, score_type: query.score_type, created_by: score.created_by };
    expect(allScoresRequestSchema.safeParse(legacy).success).toBe(false);
    expect(allScoreByUserRequestSchema.safeParse(legacy).success).toBe(false);
  });

  it("draw and derived draw response schemas use the same team reference", () => {
    for (const schema of [undianModelSchema, listUndianAthletesResponseSchema]) {
      const reference = schema.pick({ peserta_team_id: true });
      expect(reference.parse({ peserta_team_id: teamId })).toEqual({ peserta_team_id: teamId });
      expect(reference.safeParse({ peserta_id: memberId }).success).toBe(false);
      expect(reference.safeParse({ peserta_team_id: "short" }).success).toBe(false);
    }
  });
});

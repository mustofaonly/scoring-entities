import { describe, it, expect } from "vitest";
import {
  allScoreByUserRequestSchema,
  allScoresRequestSchema,
  allScoresResponseSchema,
  finalScoreSchema,
  listDrawAthletesResponseSchema,
  participantModelSchema,
  participantTeamModelSchema,
  participantTeamInfoSchema,
  infoParticipantResponseSchema,
  scoresModelSchema,
  drawModelSchema,
} from "../src";

const teamId = "T".repeat(26);
const memberId = "P".repeat(26);
const team = { id: teamId, weight_id: "W".repeat(26), contingent_id: "K".repeat(26), events_id: "E".repeat(26) };
const score = {
  id: "S".repeat(26), score_type: "punch", score: "1",
  match_schedule_id: "J".repeat(26), participant_team_id: teamId,
  created_at: 1, created_by: "U".repeat(26),
};

describe("participant teams", () => {
  it("supports multiple participant members sharing one team", () => {
    expect(participantTeamModelSchema.parse(team)).toEqual(team);
    const participant = {
      id: memberId, external_id: "member-1",
      athletes_id: "A".repeat(26), participant_team_id: teamId,
    };
    const first = participantModelSchema.parse(participant);
    const second = participantModelSchema.parse({ ...participant, id: "Q".repeat(26), athletes_id: "B".repeat(26), external_id: "member-2" });
    expect(first.participant_team_id).toBe(second.participant_team_id);
    expect(first.id).not.toBe(second.id);
  });

  it("keeps competition data on teams and nests team info consistently", () => {
    expect(participantTeamModelSchema.safeParse({ id: teamId }).success).toBe(false);
    for (const field of ["weight_id", "contingent_id", "events_id"] as const) {
      expect(participantModelSchema.shape).not.toHaveProperty(field);
      expect(participantTeamModelSchema.safeParse({ ...team, [field]: "short" }).success).toBe(false);
    }
    expect(infoParticipantResponseSchema.shape.participant_team_info).toBe(participantTeamInfoSchema);
    expect(infoParticipantResponseSchema.shape).not.toHaveProperty("weight_info");
    expect(infoParticipantResponseSchema.shape).not.toHaveProperty("contingent_info");
    expect(drawModelSchema.shape).not.toHaveProperty("participant_team_info");
    expect(drawModelSchema.shape).not.toHaveProperty("increment");
    expect(drawModelSchema.shape).toHaveProperty("events_id");
    expect(drawModelSchema.shape).toHaveProperty("weight_id");
    expect(drawModelSchema.shape).not.toHaveProperty("participant_info");
  });

  for (const [name, schema] of [["scores", scoresModelSchema], ["score responses", allScoresResponseSchema], ["final scores", finalScoreSchema]] as const) {
    it(`${name} require a team ID, not the old participant field`, () => {
      expect(schema.parse(score).participant_team_id).toBe(teamId);
      const { participant_team_id: _teamId, ...withoutTeam } = score;
      expect(schema.safeParse({ ...withoutTeam, participant_id: memberId }).success).toBe(false);
      expect(schema.safeParse({ ...score, participant_team_id: "short" }).success).toBe(false);
    });
  }

  it("score queries and per-user queries use team IDs", () => {
    const query = { match_schedule_id: score.match_schedule_id, participant_team_id: teamId, score_type: ["punch"] };
    expect(allScoresRequestSchema.parse(query).participant_team_id).toBe(teamId);
    expect(allScoreByUserRequestSchema.parse({ ...query, created_by: score.created_by }).participant_team_id).toBe(teamId);
    const legacy = { match_schedule_id: query.match_schedule_id, participant_id: memberId, score_type: query.score_type, created_by: score.created_by };
    expect(allScoresRequestSchema.safeParse(legacy).success).toBe(false);
    expect(allScoreByUserRequestSchema.safeParse(legacy).success).toBe(false);
  });

  it("draw and derived draw response schemas use the same team reference", () => {
    for (const schema of [drawModelSchema, listDrawAthletesResponseSchema]) {
      const reference = schema.pick({ participant_team_id: true });
      expect(reference.parse({ participant_team_id: teamId })).toEqual({ participant_team_id: teamId });
      expect(reference.safeParse({ participant_id: memberId }).success).toBe(false);
      expect(reference.safeParse({ participant_team_id: "short" }).success).toBe(false);
    }
  });
});

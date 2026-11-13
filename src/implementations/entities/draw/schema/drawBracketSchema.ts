import z from "zod";
import { matchScheduleModelSchema } from "../../match_schedule";
import { listDrawGroupResponseSchema } from "./listDrawGroupSchema";
import { listDrawParticipantTeamsSchema } from "./listDrawParticipantTeamsSchema";

export const drawBracketTeamSchema = listDrawParticipantTeamsSchema.pick({
  id: true,
  participants: true,
  contingent: true,
});

export const drawBracketResponseSchema = listDrawGroupResponseSchema.extend({
  event_id: listDrawParticipantTeamsSchema.shape.event_id,
  matches: z.array(matchScheduleModelSchema.pick({
    id: true,
    qualification: true,
    red_corner: true,
    blue_corner: true,
    next_match_schedule_id: true,
    next_corner: true,
    winner: true,
    status: true,
    schedule_number: true,
  }).extend({ bracket_number: z.number().int().nonnegative() })),
  teams: z.array(drawBracketTeamSchema),
});

export type DrawBracketTeam = z.infer<typeof drawBracketTeamSchema>;
export type DrawBracketResponse = z.infer<typeof drawBracketResponseSchema>;

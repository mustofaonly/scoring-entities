import z from "zod";
import { winnerStatusSchema } from "../../match_schedule/schema/matchScheduleModelSchema";

export const winnerModelSchema = z.object({
  id: z.string().length(26).describe("Winner ID"),
  events_id: z.string().length(26).describe("Events ID"),
  participant_team_id: z.string().length(26).describe("Participant Team ID"),
  contingent_id: z.string().length(26).describe("Contingent ID"),
  match_schedule_id: z.string().length(26).describe("Match Schedule ID"),
  weight_id: z.string().length(26).describe("Weight ID"),
  rank: z.number().describe("Rank"),
  winner_status: winnerStatusSchema
    .describe("Winner Status")
    .default("pending"),
});

export type WinnerModel = z.infer<typeof winnerModelSchema>;

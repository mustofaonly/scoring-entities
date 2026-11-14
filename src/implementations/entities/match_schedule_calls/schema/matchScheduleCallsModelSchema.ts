import z from "zod";

export const matchScheduleCallsModelSchema = z.object({
  id: z.string().length(26).describe("Match Schedule Calls ID"),
  match_schedule_id: z.string().length(26).describe("Match Schedule ID"),
  participant_team_id: z.string().length(26).describe("Participant Team ID"),
  call_count: z
    .number()
    .default(1)
    .describe("Call Count :: default ascending order"),
  created_at: z.string().describe("Created At"),
  created_by: z.string().length(26).describe("Created By"),
});

export type MatchScheduleCallsModel = z.infer<
  typeof matchScheduleCallsModelSchema
>;

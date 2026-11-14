import z from "zod";
import { listMatchScheduleSchema } from "../../match_schedule/schema/listMatchScheduleSchema";
import { matchScheduleCallsModelSchema } from "./matchScheduleCallsModelSchema";

export const listMatchScheduleCallsSchema = z.object({
  ...listMatchScheduleSchema.shape,
  red_corner_info: z
    .object({
      participant_team_id: z
        .string()
        .length(26)
        .describe("Participant Team ID"),
      contingent: z.string().describe("Contingent"),
      participants: z.array(
        z.object({
          id: z.string().length(26).describe("Participant ID"),
          name: z.string().min(1).max(300).describe("Participant Name"),
        }),
      ),
      calls: z.array(matchScheduleCallsModelSchema),
    })
    .nullable()
    .describe("Red Corner Info"),
  blue_corner_info: z
    .object({
      participant_team_id: z
        .string()
        .length(26)
        .describe("Participant Team ID"),
      contingent: z.string().describe("Contingent"),
      participants: z.array(
        z.object({
          id: z.string().length(26).describe("Participant ID"),
          name: z.string().min(1).max(300).describe("Participant Name"),
        }),
      ),
      calls: z.array(matchScheduleCallsModelSchema),
    })
    .nullable()
    .describe("Blue Corner Info"),
});

export type ListMatchScheduleCalls = z.infer<
  typeof listMatchScheduleCallsSchema
>;

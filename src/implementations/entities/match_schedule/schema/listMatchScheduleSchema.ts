import z from "zod";
import { matchScheduleModelSchema } from "./matchScheduleModelSchema";

export const listMatchScheduleSchema = z.object({
  ...matchScheduleModelSchema.shape,
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
    })
    .nullable()
    .describe("Blue Corner Info"),
  winner_info: z
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
    })
    .nullable()
    .describe("Winner Info"),
  calls: z.array(
    z.object({
      count: z.number().describe("Call Count"),
      created_at: z.number().describe("Created At"),
    }),
  ),
});

export type ListMatchSchedule = z.infer<typeof listMatchScheduleSchema>;

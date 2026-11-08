import z from "zod";
import { participantTeamInfoSchema } from "../../participant_team";
import { matchCornerSchema } from "../../match_schedule";

export const drawTypeSchema = z.enum(["pool", "match"]);

export const drawModelSchema = z.object({
  id: z.string().length(26).describe("Draw ID"),
  pool: z.number().min(1).default(1).describe("Pool"),
  draw_type: drawTypeSchema.default("match"),
  match_schedule_id: z.string().length(26).nullable().default(null),
  draw_number: z.number().int().nonnegative().nullable().default(null),
  corner: matchCornerSchema.nullable().default(null),
  increment: z.number().min(1).default(1).describe("Increment"),
  participant_team_id: z.string().length(26).describe("Participant Team ID"),
  participant_team_info: participantTeamInfoSchema.describe("Participant Team Info"),
  created_at: z.number().describe("Created At"),
  created_by: z.string().length(26).describe("Created By"),
  updated_at: z.number().nullable().describe("Updated At"),
  updated_by: z.string().length(26).nullable().describe("Updated By"),
});

export type DrawModel = z.infer<typeof drawModelSchema>;
export type DrawType = z.infer<typeof drawTypeSchema>;

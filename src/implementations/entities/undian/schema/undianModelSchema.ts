import z from "zod";
import { pesertaTeamInfoSchema } from "../../peserta_team";

export const undianModelSchema = z.object({
  id: z.string().length(26).describe("Undian ID"),
  pool: z.number().min(1).default(1).describe("Pool"),
  increment: z.number().min(1).default(1).describe("Increment"),
  peserta_team_id: z.string().length(26).describe("Peserta Team ID"),
  peserta_team_info: pesertaTeamInfoSchema.describe("Peserta Team Info"),
  created_at: z.number().describe("Created At"),
  created_by: z.string().length(26).describe("Created By"),
  updated_at: z.number().nullable().describe("Updated At"),
  updated_by: z.string().length(26).nullable().describe("Updated By"),
});

export type UndianModel = z.infer<typeof undianModelSchema>;

import z from "zod";
import { matchCornerSchema } from "../../match_schedule";

const id = z.string().length(26);
const number = z.number().int().min(0).max(2_147_483_647);

export const saveDrawGroupRequestSchema = z.object({
  event_id: id,
  draw_type: z.literal("match").default("match"),
  result: z.array(z.object({
    bracket_number: number,
    teams: z.array(z.object({
      participant_team_id: id,
      draw_number: number,
      corner: matchCornerSchema,
    }).strict()).max(2),
    next_bracket_number: number.nullable(),
    next_corner: matchCornerSchema.nullable(),
  }).strict()).min(1).max(256),
}).strict();

export const saveDrawGroupResultSchema = z.object({
  id: id.describe("Draw group ID for GET /draw/group/:id"),
  pool: z.number().int().min(1),
  matches: z.array(z.object({ bracket_number: number, match_schedule_id: id })),
  bye_advancements: z.array(z.object({
    bracket_number: number,
    participant_team_id: id,
    next_bracket_number: number.nullable(),
  })),
});

export type SaveDrawGroupRequest = z.input<typeof saveDrawGroupRequestSchema>;
export type SaveDrawGroupResult = z.infer<typeof saveDrawGroupResultSchema>;

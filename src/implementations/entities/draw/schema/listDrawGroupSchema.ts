import z from "zod";
/** Group row returned by GET /draw/list. Use weight_id to list weight placements. */
export const listDrawGroupResponseSchema = z.object({
  id: z.string().length(26).describe("Draw group ID for saved knockout brackets"),
  weight_id: z.string().length(26),
  category: z.string(),
  pool: z.number().int().min(1),
  athletes_count: z.number().int().nonnegative(),
  team_count: z.number().int().nonnegative(),
  drawed: z.number().describe("Draw timestamp in milliseconds since the Unix epoch"),
});

export type ListDrawGroupResponse = z.infer<typeof listDrawGroupResponseSchema>;

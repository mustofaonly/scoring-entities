import z from "zod";

export const listDrawGroupResponseSchema = z.object({
  id: z.string().length(26),
  weight_id: z.string().length(26),
  category: z.string(),
  pool: z.number(),
  athletes_count: z.number(),
});

export type ListDrawGroupResponse = z.infer<
  typeof listDrawGroupResponseSchema
>;

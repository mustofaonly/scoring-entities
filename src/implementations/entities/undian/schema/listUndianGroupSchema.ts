import z from "zod";

export const listUndianGroupResponseSchema = z.object({
  id: z.string().length(26),
  weight_id: z.string().length(26),
  kategori: z.string(),
  pool: z.number(),
  athletes_count: z.number(),
});

export type ListUndianGroupResponse = z.infer<
  typeof listUndianGroupResponseSchema
>;

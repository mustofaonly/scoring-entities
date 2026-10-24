import z from "zod";
import { kontingenModelSchema } from "..";

export const listKontingenResponseSchema = z.object({
  ...kontingenModelSchema.shape,
  athletes_count: z.number(),
});

export type ListKontingenResponse = z.infer<typeof listKontingenResponseSchema>;

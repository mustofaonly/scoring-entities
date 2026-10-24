import z from "zod";
import { kontingenModelSchema } from "..";

export const allKontingenResponseSchema = z.object({
  ...kontingenModelSchema.shape,
});

export const allKontingenRequestSchema = z.object({
  events_id: z.string().length(26),
});

export type AllKontingenRequest = z.infer<typeof allKontingenRequestSchema>;
export type AllKontingenResponse = z.infer<typeof allKontingenResponseSchema>;

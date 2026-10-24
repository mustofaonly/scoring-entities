import z from "zod";
import { kontingenModelSchema } from "..";

export const infoKontingenResponseSchema = z.object({
  ...kontingenModelSchema.shape,
});

export const infoKontingenRequestSchema = z.object({
  id: z.string().length(26),
});

export type infoKontingenResponse = z.infer<typeof infoKontingenResponseSchema>;
export type infoKontingenRequest = z.infer<typeof infoKontingenRequestSchema>;

import z from "zod";
import { contingentModelSchema } from "./contingentModelSchema";

export const infoContingentResponseSchema = z.object({
  ...contingentModelSchema.shape,
});

export const infoContingentRequestSchema = z.object({
  id: z.string().length(26),
});

export type InfoContingentResponse = z.infer<typeof infoContingentResponseSchema>;
export type InfoContingentRequest = z.infer<typeof infoContingentRequestSchema>;

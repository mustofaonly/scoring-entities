import z from "zod";
import { contingentModelSchema } from "./contingentModelSchema";

export const allContingentResponseSchema = z.object({
  ...contingentModelSchema.shape,
});

export const allContingentRequestSchema = z.object({
  events_id: z.string().length(26),
});

export type AllContingentRequest = z.infer<typeof allContingentRequestSchema>;
export type AllContingentResponse = z.infer<typeof allContingentResponseSchema>;

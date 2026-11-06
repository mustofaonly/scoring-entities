import z from "zod";
import { contingentModelSchema } from "./contingentModelSchema";

export const listContingentResponseSchema = z.object({
  ...contingentModelSchema.shape,
  athletes_count: z.number(),
});

export type ListContingentResponse = z.infer<typeof listContingentResponseSchema>;

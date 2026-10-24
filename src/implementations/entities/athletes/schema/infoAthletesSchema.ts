import z from "zod";
import { athletesModelSchema } from "..";

export const infoAthletesResponseSchema = z.object({
  ...athletesModelSchema.shape,
});

export type InfoAthletesResponse = z.infer<typeof infoAthletesResponseSchema>;

export const infoAthletesRequestSchema = z.object({
  id: z.string().length(26),
});

export type InfoAthletesRequest = z.infer<typeof infoAthletesRequestSchema>;

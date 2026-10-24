import z from "zod";
import { athletesModelSchema } from "..";

export const listAthletesResponseSchema = z.object({
  ...athletesModelSchema.shape,
});

export type ListAthletesResponse = z.infer<typeof listAthletesResponseSchema>;

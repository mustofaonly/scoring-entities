import z from "zod";
import { athletesModelSchema } from "./athletesModelSchema";

export const allAthletesResponseSchema = athletesModelSchema.pick({
  id: true,
  national_id: true,
  name: true,
});

export type AllAthletesResponse = z.infer<typeof allAthletesResponseSchema>;

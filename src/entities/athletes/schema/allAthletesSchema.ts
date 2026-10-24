import z from "zod";

export const allAthletesResponseSchema = z.object({
  id: z.string().length(26),
  external_id: z.string().min(1).max(300),
  name: z.string().min(2).max(300),
});

export type AllAthletesResponse = z.infer<typeof allAthletesResponseSchema>;

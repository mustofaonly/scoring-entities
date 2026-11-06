import z from "zod";

export const contingentModelSchema = z.object({
  id: z.string().length(26).describe("Contingent ID"),
  external_id: z.string().min(1).max(300).describe("Contingent External ID"),
  events_id: z.string().min(1).max(300).describe("Events ID"),
  name: z.string().min(2).max(300).describe("Contingent Name"),
  flag: z.string().nullable().describe("Contingent Flag"),
});

export type ContingentModel = z.infer<typeof contingentModelSchema>;

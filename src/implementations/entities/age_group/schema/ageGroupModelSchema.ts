import z from "zod";

export const ageGroupModelSchema = z.object({
  id: z.string().length(26).describe("AgeGroup ID"),
  external_id: z.string().min(1).max(300).describe("AgeGroup External ID"),
  name: z.string().min(2).max(300).describe("AgeGroup Name"),
  min_age: z.number().nullable().describe("Min Age"),
  max_age: z.number().nullable().describe("Max Age"),
});

export type AgeGroupModel = z.infer<typeof ageGroupModelSchema>;

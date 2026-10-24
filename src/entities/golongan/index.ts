import z from "zod";

export const golonganModelSchema = z.object({
  id: z.string().length(26).describe("Golongan ID"),
  external_id: z.string().min(1).max(300).describe("Golongan External ID"),
  name: z.string().min(2).max(300).describe("Golongan Name"),
  min_age: z.number().nullable().describe("Min Age"),
  max_age: z.number().nullable().describe("Max Age"),
});

export type GolonganModel = z.infer<typeof golonganModelSchema>;

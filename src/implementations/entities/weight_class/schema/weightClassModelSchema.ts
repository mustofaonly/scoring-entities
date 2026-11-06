import z from "zod";

export const weightClassModelSchema = z.object({
  id: z.string().length(26).describe("WeightClass ID"),
  external_id: z.string().min(1).max(300).describe("WeightClass External ID"),
  name: z.string().min(2).max(300).describe("WeightClass Name"),
});

export type WeightClassModel = z.infer<typeof weightClassModelSchema>;

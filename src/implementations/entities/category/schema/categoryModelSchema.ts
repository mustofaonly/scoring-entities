import z from "zod";

export const categoryCodeTypes = z.enum([
  "tanding",
  "ganda",
  "regu",
  "jurus_baku",
  "solo_kreatif",
  "tunggal",
]);

export const categoryModelSchema = z.object({
  id: z.string().length(26).describe("Category ID"),
  external_id: z.string().min(1).max(300).describe("Category External ID"),
  name: z.string().min(2).max(300).describe("Category Name"),
  min_athlete: z.number().min(1).describe("Min Athlete"),
  max_athlete: z.number().min(1).describe("Max Athlete"),
  code: categoryCodeTypes.describe("Category Code"),
});

export type CategoryModel = z.infer<typeof categoryModelSchema>;

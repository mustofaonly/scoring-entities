import z from "zod";

export const kategoriCodeTypes = z.enum([
  "tanding",
  "ganda",
  "regu",
  "jurus_baku",
  "solo_kreatif",
  "tunggal",
]);

export const kategoriModelSchema = z.object({
  id: z.string().length(26).describe("Kategori ID"),
  external_id: z.string().min(1).max(300).describe("Kategori External ID"),
  name: z.string().min(2).max(300).describe("Kategori Name"),
  min_athlete: z.number().min(1).describe("Min Athlete"),
  max_athlete: z.number().min(1).describe("Max Athlete"),
  code: kategoriCodeTypes.describe("Kategori Code"),
});

export type KategoriModel = z.infer<typeof kategoriModelSchema>;

import z from "zod";
import { kelasModelSchema } from "../kelas";
import { kategoriModelSchema } from "../kategori";
import { golonganModelSchema } from "../golongan";

export const weightModelSchema = z.object({
  id: z.string().length(26).describe("Weight ID"),
  external_id: z.string().min(1).max(300).describe("Weight External ID"),
  kategori_info: kategoriModelSchema.describe("Kategori Info"),
  golongan_info: golonganModelSchema.describe("Golongan Info"),
  kelas_info: kelasModelSchema.nullable().describe("Kelas Info"),
  min_weight: z.number().nullable().describe("Min Weight"),
  max_weight: z.number().nullable().describe("Max Weight"),
});

export type WeightModel = z.infer<typeof weightModelSchema>;

import z from "zod";
import { pesertaModelSchema } from "..";

export const listPesertaResponseSchema = z.object({
  ...pesertaModelSchema.shape,
  name: z.string().min(2).max(300),
  nik: z.string().length(16),
  gender: z.number().min(1).max(2),
  kontingen: z.string().min(2).max(300),
  kategori: z.string().min(2).max(300),
});

export type ListPesertaResponse = z.infer<typeof listPesertaResponseSchema>;

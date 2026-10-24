import z from "zod";

export const pesertaModelSchema = z.object({
  id: z.string().length(26).describe("Peserta ID"),
  external_id: z.string().min(1).max(300).describe("Peserta External ID"),
  weight_id: z.string().length(26).describe("Weight ID"),
  athletes_id: z.string().length(26).describe("Athletes ID"),
  kontingen_id: z.string().length(26).describe("Kontingen ID"),
  valid: z.boolean().default(false).describe("Valid"),
});

export type PesertaModel = z.infer<typeof pesertaModelSchema>;

//
export * from "./schema/infoPesertaSchema";
export * from "./schema/listPesertaSchema";

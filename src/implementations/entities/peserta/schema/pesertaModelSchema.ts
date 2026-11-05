import z from "zod";

export const pesertaModelSchema = z.object({
  id: z.string().length(26).describe("Peserta ID"),
  external_id: z.string().min(1).max(300).describe("Peserta External ID"),
  athletes_id: z.string().length(26).describe("Athletes ID"),
  valid: z.boolean().default(false).describe("Valid"),
  peserta_team_id: z.string().length(26).describe("Peserta Team ID"),
});

export type PesertaModel = z.infer<typeof pesertaModelSchema>;

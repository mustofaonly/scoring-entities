import z from "zod";

// Team membership is represented by PesertaModel.peserta_team_id.
export const pesertaTeamModelSchema = z.object({
  id: z.string().length(26).describe("Peserta Team ID"),
  weight_id: z.string().length(26).describe("Weight ID"),
  kontingen_id: z.string().length(26).describe("Kontingen ID"),
  events_id: z.string().length(26).describe("Events ID"),
});

export type PesertaTeamModel = z.infer<typeof pesertaTeamModelSchema>;

import z from "zod";
import { pesertaModelSchema } from "..";
import { pesertaTeamInfoSchema } from "../../peserta_team";
import { athletesModelSchema } from "../../athletes";

export const infoPesertaResponseSchema = z.object({
  ...pesertaModelSchema.shape,
  peserta_team_info: pesertaTeamInfoSchema,
  athletes_info: athletesModelSchema,
});

export const infoPesertaRequestSchema = z.object({
  id: z.string().length(26),
});

export type infoPesertaResponse = z.infer<typeof infoPesertaResponseSchema>;
export type infoPesertaRequest = z.infer<typeof infoPesertaRequestSchema>;

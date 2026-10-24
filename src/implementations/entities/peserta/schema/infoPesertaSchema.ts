import z from "zod";
import { pesertaModelSchema } from "..";
import { kontingenModelSchema } from "../../kontingen";
import { weightModelSchema } from "../../weight";
import { athletesModelSchema } from "../../athletes";

export const infoPesertaResponseSchema = z.object({
  ...pesertaModelSchema.shape,
  kontingen_info: kontingenModelSchema,
  weight_ingo: weightModelSchema,
  athletes_info: athletesModelSchema,
});

export const infoPesertaRequestSchema = z.object({
  id: z.string().length(26),
});

export type infoPesertaResponse = z.infer<typeof infoPesertaResponseSchema>;
export type infoPesertaRequest = z.infer<typeof infoPesertaRequestSchema>;

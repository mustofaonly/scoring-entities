import z from "zod";
import { pesertaTeamModelSchema } from "./pesertaTeamModelSchema";
import { kontingenModelSchema } from "../../kontingen";
import { weightModelSchema } from "../../weight";

export const pesertaTeamInfoSchema = z.object({
  ...pesertaTeamModelSchema.shape,
  kontingen_info: kontingenModelSchema,
  weight_info: weightModelSchema,
});

export const pesertaTeamInfoRequestSchema = z.object({
  id: z.string().length(26),
});

export type PesertaTeamInfoResponse = z.infer<typeof pesertaTeamInfoSchema>;

export type PesertaTeamInfoRequest = z.infer<typeof pesertaTeamInfoRequestSchema>;

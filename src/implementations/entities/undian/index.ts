import z from "zod";
import { pesertaModelSchema } from "../peserta";
import { kontingenModelSchema } from "../kontingen";
import { weightModelSchema } from "../weight";
import { athletesModelSchema } from "../athletes";

export const undianModelSchema = z.object({
  id: z.string().length(26).describe("Undian ID"),
  pool: z.number().min(1).default(1).describe("Pool"),
  increment: z.number().min(1).default(1).describe("Increment"),
  peserta_id: z.string().length(26).describe("Peserta ID"),
  peserta_info: z
    .object({
      ...pesertaModelSchema.shape,
      kontingen_info: kontingenModelSchema.describe("Kontingen Info"),
      weight_info: weightModelSchema.describe("Weight Info"),
      athletes_info: athletesModelSchema.describe("Athletes Info"),
    })
    .describe("Peserta Info"),
});

export type UndianModel = z.infer<typeof undianModelSchema>;

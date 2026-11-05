import z from "zod";

const scoreSchema = z.object({
  total: z.number(),
  properties: z.any(),
});

export const jadwalModelSchema = z.object({
  id: z.string().length(26).describe("Jadwal ID"),
  events_id: z.string().length(26).describe("Events ID"),
  kategori_id: z.string().length(26).describe("Kategori ID"),
  arena: z.number().min(1).default(1).describe("Arena"),
  pool: z.number().min(1).default(1).describe("Pool"),
  round: z.number().min(1).default(1).describe("Round"),
  cualification: z.string().describe("Cualification"),
  red_corner: z.string().length(26).nullable().describe("Red Corner"),
  blue_corner: z.string().length(26).nullable().describe("Blue Corner"),
  score: z
    .object({
      red: scoreSchema.describe("Score Red"),
      blue: scoreSchema.describe("Score Blue"),
    })
    .describe("Score"),
});

export type JadwalModel = z.infer<typeof jadwalModelSchema>;

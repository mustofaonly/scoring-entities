import z from "zod";
import { scoreTypes } from "../scores";

export const finalScoreSchema = z.object({
  id: z.string().length(26).describe("Final Score ID"),
  score_type: scoreTypes.describe("Score Type"),
  score: z.string().describe("Score"),
  jadwal_id: z.string().length(26).describe("Jadwal ID"),
  peserta_id: z.string().length(26).describe("Peserta ID"),
  round: z.number().min(1).default(1).describe("Round"),
  increment: z.number().min(1).default(1).describe("Increment"),
  created_at: z.number().describe("Created At"),
  created_by: z.string().length(26).describe("Created By"),
});

export type FinalScore = z.infer<typeof finalScoreSchema>;

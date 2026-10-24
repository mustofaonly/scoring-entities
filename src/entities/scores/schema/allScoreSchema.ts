import z from "zod";
import { scoresModelSchema, scoreTypes } from "..";

export const allScoresResponseSchema = z.object({
  ...scoresModelSchema.shape,
});

export const allScoresRequestSchema = z.object({
  jadwal_id: z.string().length(26),
  peserta_id: z.string().length(26),
  round: z.number().min(1).default(1),
  score_type: z.array(scoreTypes),
});

export const allScoreByUserRequestSchema = z.object({
  ...allScoresRequestSchema.shape,
  created_by: z.string().length(26),
});

export type AllScoresResponse = z.infer<typeof allScoresResponseSchema>;
export type AllScoresRequest = z.infer<typeof allScoresRequestSchema>;
export type AllScoreByUserRequest = z.infer<typeof allScoreByUserRequestSchema>;

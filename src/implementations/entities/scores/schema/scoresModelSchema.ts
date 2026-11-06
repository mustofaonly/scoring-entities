import z from "zod";

export const scoreTypes = z.enum([
  "punch",
  "kick",
  "drop",
  "bina",
  "hukum",
  "tegur",
  "kemantapan",
  "kebenaran",
  //
  //
  //
]);

export const scoreStatus = z.enum(["pending", "valid", "invalid"]);

export const scoresModelSchema = z.object({
  id: z.string().length(26).describe("Scores ID"),
  score_type: scoreTypes.describe("Score Type"),
  score: z.string().describe("Score"),
  match_schedule_id: z.string().length(26).describe("Match Schedule ID"),
  participant_team_id: z.string().length(26).describe("Participant Team ID"),
  round: z.number().min(1).default(1).describe("Round"),
  increment: z.number().min(1).default(1).describe("Increment"),
  status: scoreStatus.default("pending").describe("Score Status"),
  created_at: z.number().describe("Created At"),
  created_by: z.string().length(26).describe("Created By"),
});

export type ScoreStatus = z.infer<typeof scoreStatus>;
export type ScoreTypes = z.infer<typeof scoreTypes>;
export type ScoresModel = z.infer<typeof scoresModelSchema>;

//

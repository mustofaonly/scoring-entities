import z from "zod";

export const athleteStatusSchema = z.enum([
  "disqualified",
  "surrendered",
  "valid",
  "pending",
]);
export const winnerStatusSchema = z.enum([
  "winner",
  "loser",
  "draw",
  "pending",
]);
const scoreSchema = z.object({
  total: z.number().default(0),
  properties: z.any().default({}), // {[key : keyof scoreTypes]: number | null}
});
export const matchScheduleSessionSchema = z.enum([
  "morning",
  "afternoon",
  "evening",
]);
export const matchScheduleStatusSchema = z.enum([
  "pending",
  "running",
  "finished",
]);

export const matchScheduleModelSchema = z.object({
  id: z.string().length(26).describe("Match Schedule ID"),
  events_id: z.string().length(26).describe("Events ID"),
  weight_id: z.string().length(26).describe("Weight ID"),
  arena: z.number().min(1).default(1).describe("Arena"),
  pool: z.number().min(1).default(1).describe("Pool"),
  round: z.number().min(1).default(1).describe("Round"),
  qualification: z.string().describe("Qualification"),
  red_corner: z
    .string()
    .length(26)
    .nullable()
    .describe("Red Corner Participant Team ID"),
  blue_corner: z
    .string()
    .length(26)
    .nullable()
    .describe("Blue Corner Participant Team ID"),
  date: z.string().describe("Date"),
  session: matchScheduleSessionSchema.describe("Session"),
  winner: z.string().length(26).nullable().describe("Winner Participant Team ID"),
  next_match_schedule_id: z
    .string()
    .length(26)
    .nullable()
    .describe("Next Match Schedule ID"),
  status: matchScheduleStatusSchema.default("pending"),
  properties: z
    .object({
      red: z
        .object({
          status: athleteStatusSchema
            .default("pending")
            .describe("Red Corner Athlete Status"),
          score: scoreSchema.describe("Red Corner Score"),
          winner_status: z
            .object({
              status: winnerStatusSchema
                .default("pending")
                .describe("Red Corner Winner Status"),
              remarks: z
                .string()
                .nullable()
                .describe("Red Corner Winner Remarks"),
            })
            .describe("Red Corner Winner Status"),
        })
        .describe("Red Corner Properties"),
      blue: z
        .object({
          status: athleteStatusSchema
            .default("pending")
            .describe("Blue Corner Athlete Status"),
          score: scoreSchema.describe("Blue Corner Score"),
          winner_status: z
            .object({
              status: winnerStatusSchema
                .default("pending")
                .describe("Blue Corner Winner Status"),
              remarks: z
                .string()
                .nullable()
                .describe("Blue Corner Winner Remarks"),
            })
            .describe("Blue Corner Winner Status"),
        })
        .describe("Blue Corner Properties"),
    })
    .default({
      red: {
        status: "pending",
        score: {
          total: 0,
          properties: {},
        },
        winner_status: {
          status: "pending",
          remarks: null,
        },
      },
      blue: {
        status: "pending",
        score: {
          total: 0,
          properties: {},
        },
        winner_status: {
          status: "pending",
          remarks: null,
        },
      },
    })
    .describe("Properties"),
  created_at: z.number().describe("Created At"),
  updated_at: z.number().describe("Updated At"),
  created_by: z.string().length(26).describe("Created By"),
  updated_by: z.string().length(26).describe("Updated By"),
});

export type MatchScheduleModel = z.infer<typeof matchScheduleModelSchema>;
export type MatchScheduleSession = z.infer<typeof matchScheduleSessionSchema>;
export type MatchScheduleStatus = z.infer<typeof matchScheduleStatusSchema>;
export type AthleteStatus = z.infer<typeof athleteStatusSchema>;
export type WinnerStatus = z.infer<typeof winnerStatusSchema>;

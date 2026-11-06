import z from "zod";

export const weightStatusSchema = z.enum([
  "overweight",
  "underweight",
  "surrendered",
  "valid",
  "pending",
]);

export const weightVerificationModelSchema = z.object({
  id: z.string().length(26).describe("Weight Verification ID"),
  participant_team_id: z.string().length(26).describe("Participant Team ID"),
  weight_id: z.string().length(26).describe("Weight ID"),
  verified_by: z.string().length(26).nullable().describe("Verified By"),
  verified_at: z.date().nullable().describe("Verified At"),
  status: weightStatusSchema.default("pending").describe("Weight Status"),
});

export type WeightVerificationModel = z.infer<
  typeof weightVerificationModelSchema
>;

import z from "zod";

export const weightVerificationCallsModelSchema = z.object({
  id: z.string().length(26).describe("Weight Verification Calls ID"),
  weight_verification_id: z
    .string()
    .length(26)
    .describe("Weight Verification ID"),
  call_count: z.number().default(1).describe("Call Count"),
  created_at: z.string().describe("Created At"),
  created_by: z.string().length(26).describe("Created By"),
});

export type WeightVerificationCallsModel = z.infer<
  typeof weightVerificationCallsModelSchema
>;

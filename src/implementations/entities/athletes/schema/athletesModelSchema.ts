import z from "zod";

export const athletesModelSchema = z.object({
  id: z.string().length(26).describe("Athletes ID"),
  national_id: z.string().length(16).describe("National ID"), // Primary identifier from external personal data.
  name: z.string().min(2).max(300).describe("Athletes Name"),
  gender: z
    .number()
    .min(1)
    .max(2)
    .describe("Athletes Gender (1 = Male, 2 = Female)"),
  dob: z.string().nullable().describe("Date of Birth"),
  avatar: z.string().nullable().describe("Athletes Avatar"),
});

export type AthletesModel = z.infer<typeof athletesModelSchema>;

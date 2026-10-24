import z from "zod";

export const athletesModelSchema = z.object({
  id: z.string().length(26).describe("Athletes ID"),
  nik: z.string().length(16).describe("NIK"), // should be the primary key from external personal data
  name: z.string().min(2).max(300).describe("Athletes Name"),
  gender: z
    .number()
    .min(1)
    .max(2)
    .describe("Athletes Gender (1 = Male, 2 = Female)"),
  dob: z.string().nullable().describe("Date of Birth"),
});

export type AthletesModel = z.infer<typeof athletesModelSchema>;

export * from "./schema/allAthletesSchema";
export * from "./schema/infoAthletesSchema";
export * from "./schema/listAthletesSchema";

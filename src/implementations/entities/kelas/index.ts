import z from "zod";

export const kelasModelSchema = z.object({
  id: z.string().length(26).describe("Kelas ID"),
  external_id: z.string().min(1).max(300).describe("Kelas External ID"),
  name: z.string().min(2).max(300).describe("Kelas Name"),
});

export type KelasModel = z.infer<typeof kelasModelSchema>;

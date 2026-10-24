import z from "zod";

export const rolesModelSchema = z.object({
  id: z.string().length(26).describe("Roles ID"),
  name: z.string().min(2).max(300).describe("Roles Name"),
  description: z
    .string()
    .min(2)
    .max(300)
    .nullable()
    .describe("Roles Description"),
  level: z.number().min(1).describe("Roles Level"),
});

export type RolesModel = z.infer<typeof rolesModelSchema>;

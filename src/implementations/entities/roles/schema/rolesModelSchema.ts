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
  level: z
    .number()
    .min(1)
    .describe(
      "Roles Level 1: Super Admin 2: Administrator 3: Technical Delegate 4: Leader of Championship 5: co. Leader of Championship 6: Judges 7: Weight Verificator 8: Announcer 9: Time Keeper",
    ),
});

export type RolesModel = z.infer<typeof rolesModelSchema>;

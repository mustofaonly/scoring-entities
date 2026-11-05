import z from "zod";
import { usersModelSchema } from "../../users";
import { rolesModelSchema } from "../../roles";

export const userLoginModelSchema = z.object({
  id: z.string().length(26),
  users_id: z.string().length(26),
  token: z.string(),
  refresh_token: z.string(),
  expired_at: z.number(),
  created_at: z.number(),
  users_info: z.object({
    ...usersModelSchema.shape,
    roles_info: rolesModelSchema,
  }),
  arena: z.number().min(1),
});

export type UserLoginModel = z.infer<typeof userLoginModelSchema>;

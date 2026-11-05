import z from "zod";

export const usersModelSchema = z.object({
  id: z.string().length(26).describe("Users ID"),
  name: z.string().min(2).max(300).describe("Users Name"),
  username: z.string().min(2).max(50).describe("Users Username"),
  password: z.string().min(2).max(500).describe("Users Password"),
  roles_id: z.string().length(26).describe("Roles ID"),
});

export type UsersModel = z.infer<typeof usersModelSchema>;

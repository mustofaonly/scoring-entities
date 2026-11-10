import z from "zod";
import { categoryModelSchema } from "../../category";

export const listParticipantTeamSchema = z.object({
  id: z.string().length(26).describe("Participant Team ID"),
  event_id: z.string().length(26).describe("Event ID"), // filterable
  weight_id: z.string().length(26).describe("Weight ID"), // filterable
  participants: z.array(
    z.object({
      id: z.string().length(26).describe("Participant ID"),
      name: z.string().min(1).max(300).describe("Participant Name"), // searchable
      valid: z.boolean().default(false).describe("Valid"),
    }),
  ),
  gender: z.number().int().min(1).max(2).nullable().describe("Gender"), // 1 = Male, 2 = Female | filterable
  contingent: z.string().min(2).max(300).describe("Contingent name"), // searchable
  contingent_id: z.string().length(26).describe("Contingent ID"), // filterable
  category: z.string().min(2).max(300).describe("Category"), // category.name + gender (1 = Male, 2 = Female) + age_group.name + weight_class.name | not searchable, just for display purpose
  category_id: z.string().length(26).describe("Category ID"), // filterable
  category_info: categoryModelSchema.describe("Category Info"),
  age_group_id: z.string().length(26).describe("Age Group ID"), // filterable
  weight_class_id: z.string().length(26).nullable().describe("Weight Class ID"), // filterable
  valid: z.boolean().default(false).describe("Valid"), // if all participants are valid, then this is valid. else if participant count is not meets with category_info.min_athletes and max_athletes then invalid | filterable
});

export type ListParticipantTeamSchema = z.infer<
  typeof listParticipantTeamSchema
>;

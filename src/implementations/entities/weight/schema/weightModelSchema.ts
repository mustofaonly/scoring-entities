import z from "zod";
import { weightClassModelSchema } from "../../weight_class";
import { categoryModelSchema } from "../../category";
import { ageGroupModelSchema } from "../../age_group";

export const weightModelSchema = z.object({
  id: z.string().length(26).describe("Weight ID"),
  external_id: z.string().min(1).max(300).describe("Weight External ID"),
  category_info: categoryModelSchema.describe("Category Info"),
  age_group_info: ageGroupModelSchema.describe("AgeGroup Info"),
  weight_class_info: weightClassModelSchema.nullable().describe("WeightClass Info"),
  min_weight: z.number().nullable().describe("Min Weight"),
  max_weight: z.number().nullable().describe("Max Weight"),
});

export type WeightModel = z.infer<typeof weightModelSchema>;

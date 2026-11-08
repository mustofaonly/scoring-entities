import type { WeightModel } from "../../entities";

export interface WeightDomain {
  /** Format the category name, weight gender, age group, and optional weight class. */
  formatCategory(weight: WeightModel): string;
}

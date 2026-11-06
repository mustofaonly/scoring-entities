import z from "zod";
import { drawModelSchema } from "./drawModelSchema";

export const listDrawAthletesResponseSchema = drawModelSchema;

export type ListDrawAthletesResponse = z.infer<
  typeof listDrawAthletesResponseSchema
>;

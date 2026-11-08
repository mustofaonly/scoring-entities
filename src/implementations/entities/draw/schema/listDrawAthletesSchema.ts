import z from "zod";
import { drawModelSchema } from "./drawModelSchema";

/** Placement row returned by GET /draw/weight/list/:id for a weight ID. */
export const listDrawAthletesResponseSchema = drawModelSchema;

export type ListDrawAthletesResponse = z.infer<
  typeof listDrawAthletesResponseSchema
>;

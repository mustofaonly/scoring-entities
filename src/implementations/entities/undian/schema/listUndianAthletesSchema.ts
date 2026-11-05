import z from "zod";
import { undianModelSchema } from "./undianModelSchema";

export const listUndianAthletesResponseSchema = undianModelSchema;

export type ListUndianAthletesResponse = z.infer<
  typeof listUndianAthletesResponseSchema
>;

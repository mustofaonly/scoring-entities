import z from "zod";

export const kontingenModelSchema = z.object({
  id: z.string().length(26).describe("Kontingen ID"),
  external_id: z.string().min(1).max(300).describe("Kontingen External ID"),
  events_id: z.string().min(1).max(300).describe("Events ID"),
  name: z.string().min(2).max(300).describe("Kontingen Name"),
});

export type KontingenModel = z.infer<typeof kontingenModelSchema>;

export * from "./schema/allKontingenSchema";
export * from "./schema/infoKontingenSchema";
export * from "./schema/listKontingenSchema";

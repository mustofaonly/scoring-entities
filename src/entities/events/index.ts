import z from "zod";

export const eventsModelSchema = z.object({
  id: z.string().length(26).describe("Events ID"),
  external_id: z.string().min(1).max(300).describe("Events External ID"),
  name: z.string().min(2).max(300).describe("Events Name"),
  arena: z.number().min(1).nullable().describe("Events Arena"),
});

export type EventsModel = z.infer<typeof eventsModelSchema>;

export * from "./schema/infoEventsSchema";
export * from "./schema/listEventsSchema";

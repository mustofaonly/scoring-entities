import z from "zod";
import { eventsModelSchema } from "..";

export const listEventsResponseSchema = z.object({
  ...eventsModelSchema.shape,
});

export type ListEventsResponse = z.infer<typeof listEventsResponseSchema>;

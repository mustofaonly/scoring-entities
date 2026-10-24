import z from "zod";
import { eventsModelSchema } from "..";

export const infoEventsResponseSchema = z.object({
  ...eventsModelSchema.shape,
});

export const infoEventsRequestSchema = z.object({
  id: z.string().length(26),
});

export type InfoEventsResponse = z.infer<typeof infoEventsResponseSchema>;
export type InfoEventsRequest = z.infer<typeof infoEventsRequestSchema>;

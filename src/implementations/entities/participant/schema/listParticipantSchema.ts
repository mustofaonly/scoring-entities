import z from "zod";
import { participantModelSchema } from "..";

export const listParticipantResponseSchema = z.object({
  ...participantModelSchema.shape,
  name: z.string().min(2).max(300),
  national_id: z.string().length(16),
  gender: z.number().min(1).max(2),
  contingent: z.string().min(2).max(300),
  category: z.string().min(2).max(300),
});

export type ListParticipantResponse = z.infer<typeof listParticipantResponseSchema>;

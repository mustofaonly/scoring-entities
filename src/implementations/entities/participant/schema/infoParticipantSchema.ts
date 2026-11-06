import z from "zod";
import { participantModelSchema } from "..";
import { participantTeamInfoSchema } from "../../participant_team";
import { athletesModelSchema } from "../../athletes";

export const infoParticipantResponseSchema = z.object({
  ...participantModelSchema.shape,
  participant_team_info: participantTeamInfoSchema,
  athletes_info: athletesModelSchema,
});

export const infoParticipantRequestSchema = z.object({
  id: z.string().length(26),
});

export type InfoParticipantResponse = z.infer<typeof infoParticipantResponseSchema>;
export type InfoParticipantRequest = z.infer<typeof infoParticipantRequestSchema>;

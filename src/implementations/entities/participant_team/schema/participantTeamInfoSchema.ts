import z from "zod";
import { participantTeamModelSchema } from "./participantTeamModelSchema";
import { contingentModelSchema } from "../../contingent";
import { weightModelSchema } from "../../weight";

export const participantTeamInfoSchema = z.object({
  ...participantTeamModelSchema.shape,
  contingent_info: contingentModelSchema,
  weight_info: weightModelSchema,
});

export const participantTeamInfoRequestSchema = z.object({
  id: z.string().length(26),
});

export type ParticipantTeamInfoResponse = z.infer<typeof participantTeamInfoSchema>;

export type ParticipantTeamInfoRequest = z.infer<typeof participantTeamInfoRequestSchema>;

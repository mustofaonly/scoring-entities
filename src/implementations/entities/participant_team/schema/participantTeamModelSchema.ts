import z from "zod";

// Team membership is represented by ParticipantModel.participant_team_id.
export const participantTeamModelSchema = z.object({
  id: z.string().length(26).describe("Participant Team ID"),
  weight_id: z.string().length(26).describe("Weight ID"),
  contingent_id: z.string().length(26).describe("Contingent ID"),
  events_id: z.string().length(26).describe("Events ID"),
});

export type ParticipantTeamModel = z.infer<typeof participantTeamModelSchema>;

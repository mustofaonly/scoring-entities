import z from "zod";

export const participantModelSchema = z.object({
  id: z.string().length(26).describe("Participant ID"),
  external_id: z.string().min(1).max(300).describe("Participant External ID"),
  athletes_id: z.string().length(26).describe("Athletes ID"),
  valid: z.boolean().default(false).describe("Valid"),
  participant_team_id: z.string().length(26).describe("Participant Team ID"),
});

export type ParticipantModel = z.infer<typeof participantModelSchema>;

import z from "zod";
import { listParticipantTeamSchema } from "../../participant_team";

export const listDrawParticipantTeamsSchema = z.object({
  ...listParticipantTeamSchema.shape,
  drawed: z.boolean().default(false).describe("Drawed"), // if this participant team has been drawn in the draw, then this is true. else false | filterable
});

export type ListDrawParticipantTeamsSchema = z.infer<
  typeof listDrawParticipantTeamsSchema
>;

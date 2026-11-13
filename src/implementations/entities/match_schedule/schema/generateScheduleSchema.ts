import z from "zod";

const id = z.string().length(26);
const arena = z.number().int().min(1).max(2147483647);
const scope = {
  group_ids: z.array(id).min(1).max(100),
  numbering: z.enum(["continue", "restart"]).default("continue"),
  // Reuse the same arena order between preview and confirmation.
  seed: z.number().int().min(0).max(4294967295),
};

export const generateScheduleRequestSchema = z.discriminatedUnion("mode", [
  z.object({ ...scope, mode: z.literal("random") }).strict(),
  z.object({ ...scope, mode: z.literal("range"), first_arena: arena, last_arena: arena }).strict(),
  z.object({
    ...scope, mode: z.literal("manual"),
    arenas: z.array(arena).min(1),
    assignments: z.array(z.object({ group_id: id, arena })).min(1).max(100),
  }).strict(),
]);

export const generateScheduleResultSchema = z.object({
  matches: z.array(z.object({
    id, group_id: id, bracket_number: z.number().int(),
    qualification: z.string(), arena, schedule_number: arena,
  })),
  warnings: z.array(z.string()),
});

export type GenerateScheduleRequest = z.infer<typeof generateScheduleRequestSchema>;
export type GenerateScheduleResult = z.infer<typeof generateScheduleResultSchema>;

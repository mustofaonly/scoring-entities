import z from "zod";

const positiveInteger = z.number().int().min(1).max(2147483647);

export const bulkScheduleAssignmentSchema = z.object({
  matches: z.array(z.object({
    id: z.string().length(26),
    arena: positiveInteger,
    schedule_number: positiveInteger,
  }).strict()).min(1).max(500),
}).strict();

export type BulkScheduleAssignment = z.infer<typeof bulkScheduleAssignmentSchema>;

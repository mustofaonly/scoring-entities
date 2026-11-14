import z from "zod";
import { listMatchScheduleSchema } from "../../match_schedule/schema/listMatchScheduleSchema";
import { matchScheduleCallsModelSchema } from "./matchScheduleCallsModelSchema";

export const listMatchScheduleCallsSchema = z.object({
  ...listMatchScheduleSchema.shape,
  calls: z.array(
    z.object({
      count: z.number().describe("Call Count"),
      created_at: z.number().describe("Created At"),
    }),
  ),
});

export type ListMatchScheduleCalls = z.infer<
  typeof listMatchScheduleCallsSchema
>;

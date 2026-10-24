import z from "zod";

export const logOperationTypes = z.enum(["create", "update", "delete"]);

export type LogOperationType = z.infer<typeof logOperationTypes>;

export const logStatus = z.enum(["success", "failed"]);

export type LogStatus = z.infer<typeof logStatus>;

export const logsModelSchema = z.object({
  id: z.string().length(26).describe("Logs ID"),
  operation: logOperationTypes.describe("Operation"),
  status: logStatus.describe("Status"),
  message: z.string().nullable().describe("Message"),
  data: z.any().describe("Data"),
  reference_table: z.string().describe("Reference Table"),
  reference_column: z.string().describe("Reference Column"),
  reference_value: z.string().describe("Reference Value"),
  created_at: z.number().describe("Created At"),
  increment: z.number().min(1).default(1).describe("Increment"),
});

export type LogsModel = z.infer<typeof logsModelSchema>;

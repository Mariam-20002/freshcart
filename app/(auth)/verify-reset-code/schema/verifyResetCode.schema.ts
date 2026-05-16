import { z } from "zod";

export const verifyResetCodeSchema = z.object({
  resetCode: z.string().min(1, "Reset code is required"),
});

export type VerifyResetCodeSchemaType = z.infer<typeof verifyResetCodeSchema>;

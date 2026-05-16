import * as zod from "zod";
import { z } from "zod";
export const LoginSchema = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email"),

  password: zod
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

import * as zod from "zod";
import { z } from "zod";
export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(4, "Min 4 characters")
      .max(10, "Max 10 characters")
      .regex(/^[A-Za-z\s]+$/, "Letters only"),

    email: zod.string().nonempty("Email is required").email("Invalid email"),

    password: zod
      .string()
      .nonempty("Password is required")
      .min(8, "Must be at least 8 characters"),

    rePassword: zod.string().nonempty("Confirm password is required"),

    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),

    terms: zod.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })

  // password rules
  .refine((data) => /[A-Z]/.test(data.password), {
    message: "At least one uppercase letter",
    path: ["password"],
  })
  .refine((data) => /[a-z]/.test(data.password), {
    message: "At least one lowercase letter",
    path: ["password"],
  })
  .refine((data) => /[0-9]/.test(data.password), {
    message: "At least one number",
    path: ["password"],
  })
  .refine((data) => /[#?!@$%^&*-]/.test(data.password), {
    message: "At least one special character",
    path: ["password"],
  })

  //  confirm password
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

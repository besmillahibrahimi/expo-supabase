import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string({ required_error: "name.required" })
    .min(2, "name.min")
    .max(20, "name.max"),
  email: z
    .string({ required_error: "email.required" })
    .email("email.invalid")
    .min(5, "email.min")
    .max(50, "email.max"),
  password: z
    .string({ required_error: "password.required" })
    .min(8, "password.min")
    .max(20, "password.max"),
  confirmPassword: z
    .string({ required_error: "confirmPassword.required" })
    .min(8, "confirmPassword.min")
    .max(20, "confirmPassword.max"),
});

export type SignupFormData = z.infer<typeof signupSchema>;

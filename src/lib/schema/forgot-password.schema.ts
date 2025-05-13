import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: "email.required" }).email("email.invalid"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

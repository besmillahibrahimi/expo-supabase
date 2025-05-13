import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

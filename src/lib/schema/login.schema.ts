import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({required_error: "email.required"}).email({message: "email.invalid"}).min(1, 'email.min').max(255, 'email.max'),
  password: z.string({required_error: "password.required"}).min(8, 'password.min').max(20, 'password.max'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

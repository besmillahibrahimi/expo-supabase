
import { z } from "zod";

export const magicLoginSchema = z.object({
  email: z.string({required_error: "email.required"}).email({message: "email.invalid"}).min(1, 'email.min').max(255, 'email.max'),
});

export const otpSchema = z.object({
  email: z.string({required_error: "email.required"}).email({message: "email.invalid"}).min(1, 'email.min').max(255, 'email.max'),
  otp: z.string().length(6, {message: "otp.invalid"}),
});

export type MagicLoginFormData = z.infer<typeof magicLoginSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;

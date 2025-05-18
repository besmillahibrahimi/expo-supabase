import { z } from "zod";

export const envSchema = z.object({
  app: z.object({
    name: z.string(),
    schema: z.string(),
  }),
  google: z.object({
    androidClientId: z.string(),
    webClientId: z.string(),
    iosClientId: z.string().optional(),

  }),
  supabase: z.object({
    url: z.string(),
    anonKey: z.string(),
  }),
});

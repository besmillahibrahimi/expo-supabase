import { z } from "zod";

export const envSchema = z.object({
  app: z.object({
    name: z.string(),
    schema: z.string(),
  }),
  google: z.object({
    clientId: z.string(),
  }),
  supabase: z.object({
    url: z.string(),
    anonKey: z.string(),
  }),
});

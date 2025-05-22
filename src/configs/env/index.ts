import { envSchema } from "./schema";

export const Env = envSchema.parse({
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL,
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
  app: {
    name: process.env.EXPO_PUBLIC_APP_NAME,
    schema: process.env.EXPO_PUBLIC_APP_SCHEMA,
  },
  google: {
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  },
});

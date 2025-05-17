import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { Env } from "../env";
import { ExpoSecureStoreAdapter } from "../secure-store";

export const supabase = createClient(Env.supabase.url, Env.supabase.anonKey, {
  auth: {
    storage: new ExpoSecureStoreAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

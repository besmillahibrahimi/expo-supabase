import { envSchema } from "./schema";

export const Env = envSchema.parse({
  supabase: {
    url: "https://lujrcqmwmpvxymyrphbm.supabase.co",
    anonKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1anJjcW13bXB2eHlteXJwaGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2OTkwMTIsImV4cCI6MjA2MjI3NTAxMn0.oJVLn4eEQk1WnADAzQ3UNVwPsOe47FWXCpZu4QzpGiM",
  },
  app: {
    name: "Educational App",
    schema: "com.besmillahibrahimi.educationalapp",
  },
  google: {
    androidClientId:
      "1043752002269-u0g66sde8ucj542pk5vs4c7035m3r7sh.apps.googleusercontent.com", // android
    webClientId:
      "1043752002269-a9t1atmqng5lq63m5f1en5d312gaaa6a.apps.googleusercontent.com", // web
    iosClientId:
      "1043752002269-g2qkatqj11dhdb6dja93d7f4qki4tmau.apps.googleusercontent.com", // ios
  },
});

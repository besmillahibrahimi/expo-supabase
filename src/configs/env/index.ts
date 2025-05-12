import { envSchema } from "./schema";

export const Env = envSchema.parse({
    supabase : {
        url: 'https://lujrcqmwmpvxymyrphbm.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1anJjcW13bXB2eHlteXJwaGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2OTkwMTIsImV4cCI6MjA2MjI3NTAxMn0.oJVLn4eEQk1WnADAzQ3UNVwPsOe47FWXCpZu4QzpGiM',
    },
    app: {
        name: "Educational App",
    },
});
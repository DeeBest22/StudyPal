import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dhaxxpxxrqnzigsxuhtu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoYXh4cHh4cnFuemlnc3h1aHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNTEwNDMsImV4cCI6MjA5NTkyNzA0M30.GNMIBEatf3Qe6xHZKkKJI_AUQRuTDoft7H1zwH8O9ko";

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Use a stub URL/key when env is missing so the app can still render (SSR / preview deploys
// without secrets won't crash). Auth calls will surface a friendly error instead.
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

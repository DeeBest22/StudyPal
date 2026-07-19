import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://djdefftbzcschbwwxikp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZGVmZnRiemNzY2hid3d4aWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NzU0MjAsImV4cCI6MjEwMDA1MTQyMH0.OH8ySvRv_w1HA02JothJtONtb_aPQjIRUoxn-tc_1Ik";

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

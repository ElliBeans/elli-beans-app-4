import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dffsfxctbypmrqiutmjd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZnNmeGN0YnlwbXJxaXV0bWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjU1MzgsImV4cCI6MjA3NzI0MTUzOH0.HIlo36uRnWdkHA1LCDQvkMjQY7NcMtj74svbDctW8f4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

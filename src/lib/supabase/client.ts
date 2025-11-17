/**
 * Supabase Client for Browser
 * Phase 6: Client-side Supabase client for authentication and data access
 * Uses @supabase/supabase-js for better type support
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables with fallbacks for build time
// Use placeholder values during build, real values at runtime
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MzIsImV4cCI6MTk2MDc2ODgzMn0.placeholder';

// Log warning if using placeholder values (only in browser)
if (typeof window !== 'undefined' && (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey.includes('placeholder'))) {
  console.warn('⚠️  Supabase environment variables not configured. Authentication will not work.');
}

/**
 * Export a singleton Supabase client for browser use
 * This client has full TypeScript type support from Database type
 */
export const supabaseBrowser = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

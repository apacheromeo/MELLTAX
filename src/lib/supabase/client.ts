/**
 * Supabase Client for Browser
 * Phase 6: Client-side Supabase client for authentication and data access
 * Uses @supabase/supabase-js for better type support
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env configuration.');
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

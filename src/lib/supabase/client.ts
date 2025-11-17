/**
 * Supabase Client for Browser
 * Phase 6: Client-side Supabase client for authentication and data access
 * Uses @supabase/supabase-js for better type support
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables with fallback values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

/**
 * Export a singleton Supabase client for browser use
 * This client has full TypeScript type support from Database type
 *
 * Note: If Supabase env vars are not configured, this will create a client with placeholder values
 * that won't actually work. Check isSupabaseConfigured() before using auth features.
 */
export const supabaseBrowser = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
  );
}

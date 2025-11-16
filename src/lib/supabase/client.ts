/**
 * Supabase Client for Browser
 * Phase 6: Client-side Supabase client for authentication and data access
 * Uses @supabase/supabase-js for better type support
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

/**
 * Export a singleton Supabase client for browser use
 * This client has full TypeScript type support from Database type
 */
export const supabaseBrowser = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

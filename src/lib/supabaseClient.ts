/**
 * Supabase client configuration (optional)
 * Only needed if you want to implement user authentication and data saving
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if credentials are provided
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Sign in with Google (example)
 */
export async function signInWithGoogle() {
  if (!supabase) {
    console.warn('Supabase is not configured');
    return;
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in:', error);
  }

  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
  }
}

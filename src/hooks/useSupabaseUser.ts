/**
 * useSupabaseUser Hook
 * Phase 6: React hook to manage current user state
 * 
 * This hook:
 * - Fetches the current logged-in user
 * - Listens for auth state changes (login/logout)
 * - Returns user object and loading state
 * 
 * Usage:
 * const { user, loading } = useSupabaseUser();
 */

'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabaseBrowser, isSupabaseConfigured } from '@/lib/supabase/client';

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Supabase is not configured, just set loading to false
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get initial session
    const getUser = async () => {
      try {
        const { data: { user } } = await supabaseBrowser.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

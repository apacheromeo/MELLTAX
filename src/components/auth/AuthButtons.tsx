/**
 * AuthButtons Component
 * Phase 6: Authentication UI with Google Sign-in
 * 
 * Features:
 * - Shows "Sign in with Google" when logged out
 * - Shows user avatar + email + "Sign out" when logged in
 * - Handles authentication flow with Supabase
 * - Responsive design matching premium UI
 */

'use client';

import { useState } from 'react';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { supabaseBrowser } from '@/lib/supabase/client';

interface AuthButtonsProps {
  translations: {
    signInWithGoogle: string;
    signOut: string;
    welcome: string;
  };
}

export function AuthButtons({ translations }: AuthButtonsProps) {
  const { user, loading } = useSupabaseUser();
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      setSigningIn(true);
      const { error } = await supabaseBrowser.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error('Error signing in:', error);
        alert('Failed to sign in. Please try again.');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabaseBrowser.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-light-hover dark:bg-brand-dark-hover animate-pulse" />
      </div>
    );
  }

  // Signed in state
  if (user) {
    return (
      <div className="flex items-center gap-3">
        {/* User Avatar & Email */}
        <div className="hidden md:flex items-center gap-2">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata?.name || 'User'}
              className="w-8 h-8 rounded-full border border-brand-light-border dark:border-brand-dark-border"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-primary dark:bg-brand-accent flex items-center justify-center text-white text-sm font-semibold">
              {user.email?.[0].toUpperCase()}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs text-brand-text dark:text-brand-text-dark font-medium">
              {user.user_metadata?.name || user.email?.split('@')[0]}
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm font-medium text-brand-text-light dark:text-brand-text-dark-light hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-150 rounded-lg hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover"
        >
          {translations.signOut}
        </button>
      </div>
    );
  }

  // Signed out state
  return (
    <button
      onClick={handleSignIn}
      disabled={signingIn}
      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-brand-dark-surface border border-brand-light-border dark:border-brand-dark-border rounded-lg hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
    >
      {signingIn ? (
        <>
          <div className="w-5 h-5 border-2 border-brand-primary dark:border-brand-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-brand-text dark:text-brand-text-dark">
            Signing in...
          </span>
        </>
      ) : (
        <>
          {/* Google Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm font-medium text-brand-text dark:text-brand-text-dark">
            {translations.signInWithGoogle}
          </span>
        </>
      )}
    </button>
  );
}

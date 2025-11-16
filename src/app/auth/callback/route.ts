/**
 * Auth Callback Route
 * Phase 6: Handles OAuth redirect after Google sign-in
 * 
 * This route:
 * 1. Receives the OAuth code from Supabase
 * 2. Exchanges it for a session
 * 3. Redirects user back to the app
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Check if user profile exists, create if not
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();
        
        if (!profile) {
          // Create profile for new user
          await supabase.from('profiles').insert({
            id: user.id,
            display_name: user.user_metadata?.name || user.email?.split('@')[0],
            preferred_language: 'th',
          } as any);
        }
      }
      
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to home if something went wrong
  return NextResponse.redirect(`${origin}/`);
}

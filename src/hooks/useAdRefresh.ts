/**
 * useAdRefresh Hook
 * Phase 7: Refresh ads on route change
 * 
 * This hook:
 * - Listens to Next.js route changes
 * - Refreshes AdSense ads when user navigates
 * - Debounces refresh to prevent excessive calls
 * - Handles errors gracefully
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useAdRefresh() {
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousPathRef = useRef<string>('');

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Skip if pathname hasn't changed
    if (pathname === previousPathRef.current) return;
    previousPathRef.current = pathname;

    // Clear any pending refresh
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce ad refresh by 100ms
    timeoutRef.current = setTimeout(() => {
      try {
        // Check if AdSense is loaded
        const adsbygoogle = (window as any).adsbygoogle;
        
        if (adsbygoogle && Array.isArray(adsbygoogle)) {
          // Refresh all ads on the page
          adsbygoogle.push({});
          console.log('AdSense: Refreshed ads for route:', pathname);
        }
      } catch (error) {
        // Silently fail - ads are not critical
        console.debug('AdSense refresh error:', error);
      }
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);
}

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * useAdRefresh Hook
 *
 * Refreshes Google AdSense ads when navigating between pages in Next.js.
 * Uses the Next.js navigation events to detect route changes and triggers
 * ad refresh with a debounced approach to prevent excessive refreshes.
 *
 * This ensures ads reload correctly when users navigate without full page refresh.
 */
export default function useAdRefresh() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only refresh if pathname actually changed
    if (previousPathname.current !== null && previousPathname.current !== pathname) {
      // Clear any existing debounce timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Debounce the ad refresh by 100ms
      debounceTimer.current = setTimeout(() => {
        try {
          // Trigger AdSense ad refresh
          if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          }
        } catch (error) {
          // Silently fail - ads might not be loaded yet or could be blocked
          console.debug('Ad refresh failed:', error);
        }
      }, 100);
    }

    // Update previous pathname
    previousPathname.current = pathname;

    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [pathname]);
}

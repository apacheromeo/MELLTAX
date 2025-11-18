/**
 * ClientLayout Component
 * Phase 7: Client-side layout wrapper for AdSense
 * 
 * This component:
 * - Loads AdSense script client-side
 * - Refreshes ads on route changes
 * - Wraps children with necessary client-side functionality
 */

'use client';

import AdSenseScript from '@/components/ads/AdSenseScript';
import useAdRefresh from '@/hooks/useAdRefresh';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  // Refresh ads on route change
  useAdRefresh();

  return (
    <>
      <AdSenseScript />
      {children}
    </>
  );
}

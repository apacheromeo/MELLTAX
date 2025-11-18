'use client';

import AdSenseScript from './AdSenseScript';
import useAdRefresh from '@/hooks/useAdRefresh';

/**
 * ClientAdSenseWrapper Component
 *
 * Client-side wrapper that:
 * 1. Loads the AdSense script on the client
 * 2. Refreshes ads on route changes
 *
 * This component must be used in a server component (like layout.tsx)
 * to integrate client-only AdSense functionality.
 */
export default function ClientAdSenseWrapper() {
  // Refresh ads on route change
  useAdRefresh();

  return (
    <>
      <AdSenseScript />
    </>
  );
}

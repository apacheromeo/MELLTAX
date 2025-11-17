/**
 * AdSense Script Loader
 * Phase 7: Client-side Google AdSense script loader using Next.js Script
 *
 * This component:
 * - Loads AdSense script using Next.js Script component (safe for SSR)
 * - Prevents duplicate script injection
 * - Uses environment variable for client ID
 */

'use client';

import Script from 'next/script';

export function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Don't render if client ID is not configured
  if (!clientId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onLoad={() => {
        console.log('AdSense script loaded');
      }}
      onError={() => {
        console.error('Failed to load AdSense script');
      }}
    />
  );
}

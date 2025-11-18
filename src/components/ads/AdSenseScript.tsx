'use client';

import Script from 'next/script';

interface AdSenseScriptProps {
  clientId?: string;
}

/**
 * AdSenseScript Component
 *
 * Loads the Google AdSense script on the client side using Next.js Script component.
 * This prevents hydration mismatches and DOM conflicts.
 *
 * @param clientId - Your Google AdSense client ID (e.g., "ca-pub-XXXXXXXXXXXXXXXX")
 */
export default function AdSenseScript({
  clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ''
}: AdSenseScriptProps) {
  // Don't load script if no client ID is provided
  if (!clientId) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      onError={() => {
        console.warn('Failed to load AdSense script');
      }}
    />
  );
}

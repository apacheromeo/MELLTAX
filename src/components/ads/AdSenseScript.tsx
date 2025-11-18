'use client';

import { useEffect, useRef } from 'react';

interface AdSenseScriptProps {
  clientId?: string;
}

/**
 * AdSenseScript Component
 *
 * Loads the Google AdSense script on the client side only to avoid SSR/hydration issues.
 * Uses a ref guard to prevent duplicate script injection.
 *
 * @param clientId - Your Google AdSense client ID (e.g., "ca-pub-XXXXXXXXXXXXXXXX")
 */
export default function AdSenseScript({
  clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ''
}: AdSenseScriptProps) {
  const isScriptLoaded = useRef(false);

  useEffect(() => {
    // Skip if already loaded or no client ID
    if (isScriptLoaded.current || !clientId) {
      return;
    }

    // Check if script already exists in the document
    const existingScript = document.querySelector(
      `script[src*="pagead2.googlesyndication.com"]`
    );

    if (existingScript) {
      isScriptLoaded.current = true;
      return;
    }

    // Create and append the AdSense script
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    // Add error handling
    script.onerror = () => {
      console.warn('Failed to load AdSense script');
    };

    document.head.appendChild(script);
    isScriptLoaded.current = true;

    // Cleanup function (optional, script typically stays for entire session)
    return () => {
      // We don't remove the script as it should persist across route changes
    };
  }, [clientId]);

  return null; // This component doesn't render anything
}

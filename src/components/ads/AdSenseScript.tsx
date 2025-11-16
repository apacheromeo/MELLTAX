/**
 * AdSense Script Loader
 * Phase 7: Client-side Google AdSense script loader
 * 
 * This component:
 * - Loads AdSense script only on client (prevents SSR issues)
 * - Prevents duplicate script injection
 * - Uses environment variable for client ID
 */

'use client';

import { useEffect, useRef } from 'react';

export function AdSenseScript() {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Check if AdSense client ID is configured
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    
    if (!clientId) {
      console.warn('AdSense: NEXT_PUBLIC_ADSENSE_CLIENT_ID not configured');
      return;
    }

    // Prevent duplicate script loading
    if (scriptLoadedRef.current) {
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(
      `script[src*="pagead2.googlesyndication.com"]`
    );

    if (existingScript) {
      scriptLoadedRef.current = true;
      return;
    }

    // Create and inject AdSense script
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      console.log('AdSense script loaded successfully');
      scriptLoadedRef.current = true;
    };

    script.onerror = () => {
      console.error('Failed to load AdSense script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup is optional as script should persist across page navigations
    };
  }, []);

  return null; // This component doesn't render anything
}

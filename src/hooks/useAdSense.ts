/**
 * AdSense hook for handling ad loading and display
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function useAdSense() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // Push ads when route changes
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [pathname]);

  return {
    isAdSenseLoaded: typeof window !== 'undefined' && !!window.adsbygoogle,
  };
}

/**
 * Load AdSense script
 * This should be called in the root layout
 */
export function loadAdSenseScript(clientId: string): void {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

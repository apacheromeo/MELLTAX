/**
 * AdInContent component
 * In-content ad (responsive)
 */

'use client';

import { useEffect } from 'react';

interface AdInContentProps {
  slot?: string;
  className?: string;
}

export function AdInContent({
  slot = '0987654321',
  className = '',
}: AdInContentProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX';

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Don't show ads in development mode (optional)
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          AdSense In-Content Placeholder (336x280)
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
          Ads will appear in production
        </p>
      </div>
    );
  }

  return (
    <div className={`my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

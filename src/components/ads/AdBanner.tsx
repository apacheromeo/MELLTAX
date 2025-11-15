/**
 * AdBanner component
 * Top banner ad (horizontal)
 */

'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: boolean;
  className?: string;
}

export function AdBanner({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
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
          AdSense Banner Placeholder (728x90)
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
          Ads will appear in production
        </p>
      </div>
    );
  }

  return (
    <div className={`my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}

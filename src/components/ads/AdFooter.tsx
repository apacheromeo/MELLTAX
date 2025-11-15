/**
 * AdFooter component
 * Footer ad (sticky bottom on mobile)
 */

'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

interface AdFooterProps {
  slot?: string;
  sticky?: boolean;
  className?: string;
}

export function AdFooter({
  slot = '1122334455',
  sticky = true,
  className = '',
}: AdFooterProps) {
  const [isVisible, setIsVisible] = useState(true);
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

  if (!isVisible) return null;

  // Don't show ads in development mode (optional)
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={clsx(
          'bg-gray-100 dark:bg-gray-800 border-t-2 border-dashed border-gray-300 dark:border-gray-700 p-4',
          sticky && 'md:hidden fixed bottom-0 left-0 right-0 z-40',
          className
        )}
      >
        <div className="container-responsive flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            AdSense Footer Placeholder
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close ad"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800',
        sticky && 'md:hidden fixed bottom-0 left-0 right-0 z-40',
        className
      )}
    >
      <div className="container-responsive py-2 flex items-center justify-between gap-2">
        <ins
          className="adsbygoogle flex-1"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
          aria-label="Close ad"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

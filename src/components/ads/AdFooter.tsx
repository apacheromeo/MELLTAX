'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AdFooterProps {
  slotId: string;
  className?: string;
}

/**
 * AdFooter Component
 *
 * Subtle footer ad format for placement above the footer section.
 * Features:
 * - CLS-safe with min-height placeholder (100px)
 * - Subtle and non-intrusive styling
 * - Center-aligned
 * - Dark mode support
 * - Fallback for ad blockers
 *
 * @param slotId - The AdSense ad slot ID for this placement
 * @param className - Additional CSS classes
 */
export default function AdFooter({ slotId, className = '' }: AdFooterProps) {
  const t = useTranslations('ads');
  const adRef = useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && adRef.current) {
      hasInitialized.current = true;

      // Small delay to ensure AdSense script is loaded
      const timer = setTimeout(() => {
        try {
          // Initialize AdSense ad
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          setIsLoading(false);
        } catch (error) {
          console.warn('AdSense initialization failed:', error);
          setAdBlocked(true);
          setIsLoading(false);
        }
      }, 100);

      // Check if ad was blocked after 2 seconds
      const blockCheckTimer = setTimeout(() => {
        if (adRef.current) {
          const ins = adRef.current.querySelector('ins');
          if (ins && ins.getAttribute('data-ad-status') === 'unfilled') {
            setAdBlocked(true);
          }
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(blockCheckTimer);
      };
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';

  if (!clientId) {
    return null; // Don't render if no client ID
  }

  return (
    <div
      className={`w-full flex justify-center pt-8 pb-6 ${className}`}
      aria-label={t('sponsored')}
    >
      <div className="w-full max-w-4xl">
        {/* Label */}
        <div className="text-xs text-gray-400 dark:text-gray-500 text-center mb-2">
          {isLoading ? t('loading') : t('sponsored')}
        </div>

        {/* Ad Container with CLS-safe placeholder */}
        <div
          ref={adRef}
          className="min-h-[100px] bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/30 rounded-lg overflow-hidden flex items-center justify-center"
          style={{ minHeight: '100px' }}
        >
          {adBlocked ? (
            <div className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
              {t('blocked')}
            </div>
          ) : (
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={clientId}
              data-ad-slot={slotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}

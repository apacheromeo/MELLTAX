'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AdInContentProps {
  slotId: string;
  className?: string;
}

/**
 * AdInContent Component
 *
 * In-content ad format for placement between sections (e.g., between calculator and suggestions).
 * Features:
 * - CLS-safe with min-height placeholder (160px)
 * - Soft border and muted background
 * - Dark mode support
 * - Non-intrusive, blends with content
 * - Fallback for ad blockers
 *
 * @param slotId - The AdSense ad slot ID for this placement
 * @param className - Additional CSS classes
 */
export default function AdInContent({ slotId, className = '' }: AdInContentProps) {
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
      className={`w-full my-8 ${className}`}
      aria-label={t('sponsored')}
    >
      {/* Label */}
      <div className="text-xs text-gray-400 dark:text-gray-500 text-center mb-2">
        {isLoading ? t('loading') : t('sponsored')}
      </div>

      {/* Ad Container with CLS-safe placeholder */}
      <div
        ref={adRef}
        className="min-h-[160px] bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl overflow-hidden flex items-center justify-center shadow-sm"
        style={{ minHeight: '160px' }}
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
  );
}

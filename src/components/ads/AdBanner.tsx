/**
 * AdBanner Component
 * Phase 7: Wide horizontal banner ad (top of page)
 * 
 * Features:
 * - CLS-safe with min-height placeholder
 * - Responsive AdSense unit
 * - Dark mode container support
 * - AdBlock fallback
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AdBannerProps {
  slotId?: string;
  className?: string;
}

export function AdBanner({ slotId = '0000000000', className = '' }: AdBannerProps) {
  const t = useTranslations('ads');
  const adRef = useRef<HTMLDivElement>(null);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Check if AdSense is configured
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    if (!clientId) {
      setAdError(true);
      return;
    }

    try {
      // Initialize AdSense ad
      const adsbygoogle = (window as any).adsbygoogle || [];
      
      // Push ad request
      if (adRef.current && adRef.current.querySelector('.adsbygoogle')) {
        adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
      setAdError(true);
    }
  }, []);

  return (
    <div
      className={`w-full flex justify-center py-6 ${className}`}
      ref={adRef}
    >
      <div className="w-full max-w-5xl">
        {/* Ad label */}
        <div className="text-xs text-brand-text-lighter dark:text-brand-text-dark-lighter text-center mb-2">
          {t('sponsored')}
        </div>

        {/* Ad container with CLS prevention */}
        <div
          className="rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 overflow-hidden"
          style={{ minHeight: '120px' }}
        >
          {!adError ? (
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
              data-ad-slot={slotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[120px]">
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
                {t('blocked')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * AdInContent Component
 * Phase 7: In-content ad placement (between sections)
 * 
 * Features:
 * - CLS-safe with min-height placeholder (160px)
 * - Soft border and muted background
 * - Dark mode support
 * - Non-intrusive design
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AdInContentProps {
  slotId?: string;
  className?: string;
}

export function AdInContent({ slotId = '0000000000', className = '' }: AdInContentProps) {
  const t = useTranslations('ads');
  const adRef = useRef<HTMLDivElement>(null);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    if (!clientId) {
      setAdError(true);
      return;
    }

    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
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
      className={`w-full flex justify-center py-8 ${className}`}
      ref={adRef}
    >
      <div className="w-full max-w-4xl">
        {/* Ad label */}
        <div className="text-xs text-brand-text-lighter dark:text-brand-text-dark-lighter text-center mb-2">
          {t('sponsored')}
        </div>

        {/* Ad container with CLS prevention */}
        <div
          className="rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 overflow-hidden"
          style={{ minHeight: '160px' }}
        >
          {!adError ? (
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
              data-ad-slot={slotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[160px]">
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

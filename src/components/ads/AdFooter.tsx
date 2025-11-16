/**
 * AdFooter Component
 * Phase 7: Subtle footer ad (above site footer)
 * 
 * Features:
 * - CLS-safe with min-height placeholder
 * - Subtle, non-intrusive design
 * - Center-aligned
 * - Dark mode support
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AdFooterProps {
  slotId?: string;
  className?: string;
}

export function AdFooter({ slotId = '0000000000', className = '' }: AdFooterProps) {
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
      className={`w-full flex justify-center py-10 ${className}`}
      ref={adRef}
    >
      <div className="w-full max-w-3xl">
        {/* Ad label */}
        <div className="text-xs text-brand-text-lighter dark:text-brand-text-dark-lighter text-center mb-2">
          {t('sponsored')}
        </div>

        {/* Ad container with CLS prevention */}
        <div
          className="rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 overflow-hidden"
          style={{ minHeight: '100px' }}
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
            <div className="flex items-center justify-center h-full min-h-[100px]">
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
                {t('blocked')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

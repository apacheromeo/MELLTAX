/**
 * SkipToContent Component
 * Phase 8: Accessibility improvement for keyboard navigation
 * Hidden link that appears on focus, allows users to skip to main content
 */

'use client';

import { useTranslations } from 'next-intl';

export function SkipToContent() {
  const t = useTranslations('common');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-brand-accent focus:text-white focus:font-semibold focus:rounded-xl focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-accent/50 transition-all duration-200"
    >
      {t('skipToContent')}
    </a>
  );
}

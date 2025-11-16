/**
 * PlannerSummaryCard component
 * Phase 4: Premium summary card showing totals with financial color accents
 * Glass-morphism elevated card design
 */

'use client';

import { Card } from '@/components/common/Card';
import { PlannerItem } from '@/types/planner';

interface PlannerSummaryCardProps {
  items: PlannerItem[];
  locale: 'th' | 'en';
  translations: {
    title: string;
    totalGross: string;
    totalTax: string;
    totalNet: string;
    effectiveRate: string;
    itemCount: string;
  };
}

export function PlannerSummaryCard({
  items,
  locale,
  translations,
}: PlannerSummaryCardProps) {
  // Compute totals
  const totalGross = items.reduce((sum, item) => sum + item.gross, 0);
  const totalTax = items.reduce((sum, item) => sum + item.tax, 0);
  const totalNet = items.reduce((sum, item) => sum + item.net, 0);
  const effectiveRate = totalGross > 0 ? (totalTax / totalGross) * 100 : 0;
  const itemCount = items.length;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <Card variant="dashboard" padding="lg" className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-brand-primary dark:text-brand-text-dark mb-1 tracking-tight">
          {translations.title}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Item Count - Full Width */}
        <div className="rounded-xl bg-gradient-to-br from-brand-light-hover to-brand-light-surface dark:from-brand-dark-hover dark:to-brand-dark-surface border border-brand-light-border dark:border-brand-dark-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-text-light dark:text-brand-text-dark-light mb-1">
                {translations.itemCount}
              </p>
              <p className="text-3xl font-bold text-brand-primary dark:text-brand-text-dark tabular-nums">
                {itemCount}
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-brand-primary-100 dark:bg-brand-primary-900/30 flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        {/* Total Gross */}
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800/30 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
              {translations.totalGross}
            </p>
            <span className="text-xl">💰</span>
          </div>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-300 tabular-nums">
            {formatCurrency(totalGross)}
          </p>
        </div>

        {/* Total Tax */}
        <div className="rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800/30 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide">
              {translations.totalTax}
            </p>
            <span className="text-xl">🧾</span>
          </div>
          <p className="text-2xl font-bold text-red-800 dark:text-red-300 tabular-nums">
            {formatCurrency(totalTax)}
          </p>
        </div>

        {/* Total Net */}
        <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800/30 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
              {translations.totalNet}
            </p>
            <span className="text-xl">✅</span>
          </div>
          <p className="text-2xl font-bold text-green-800 dark:text-green-300 tabular-nums">
            {formatCurrency(totalNet)}
          </p>
        </div>

        {/* Effective Tax Rate */}
        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800/30 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wide">
              {translations.effectiveRate}
            </p>
            <span className="text-xl">📊</span>
          </div>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-300 tabular-nums">
            {formatNumber(effectiveRate)}%
          </p>
        </div>
      </div>
    </Card>
  );
}

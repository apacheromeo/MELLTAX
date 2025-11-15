/**
 * PlannerSummaryCard component
 * Summary card showing total amounts in the tax planner
 */

import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { PlannerSummary } from '@/types/planner';
import { formatCurrency, formatNumber } from '@/lib/tax/calculateWithholding';

interface PlannerSummaryCardProps {
  summary: PlannerSummary;
  locale: 'th' | 'en';
  translations: {
    summary: string;
    totalGross: string;
    totalTax: string;
    totalNet: string;
    effectiveTaxRate: string;
    invoiceCount: string;
  };
}

export function PlannerSummaryCard({
  summary,
  locale,
  translations,
}: PlannerSummaryCardProps) {
  return (
    <Card variant="elevated" padding="lg">
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {translations.summary}
        </h3>
      </CardHeader>

      <CardBody>
        <div className="grid grid-cols-2 gap-4">
          {/* Invoice Count */}
          <div className="col-span-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {translations.invoiceCount}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
              {summary.invoiceCount}
            </p>
          </div>

          {/* Total Gross */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">
              {translations.totalGross}
            </p>
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-300 tabular-nums">
              {formatCurrency(summary.totalGross, locale)}
            </p>
          </div>

          {/* Total Tax */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <p className="text-xs text-red-600 dark:text-red-400 mb-1">
              {translations.totalTax}
            </p>
            <p className="text-lg font-semibold text-red-700 dark:text-red-300 tabular-nums">
              {formatCurrency(summary.totalTax, locale)}
            </p>
          </div>

          {/* Total Net */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-xs text-green-600 dark:text-green-400 mb-1">
              {translations.totalNet}
            </p>
            <p className="text-lg font-semibold text-green-700 dark:text-green-300 tabular-nums">
              {formatCurrency(summary.totalNet, locale)}
            </p>
          </div>

          {/* Effective Tax Rate */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">
              {translations.effectiveTaxRate}
            </p>
            <p className="text-lg font-semibold text-purple-700 dark:text-purple-300 tabular-nums">
              {formatNumber(summary.effectiveTaxRate, locale)}%
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

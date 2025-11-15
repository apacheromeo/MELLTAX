/**
 * WithholdingResultCard component
 * Displays the result of withholding tax calculation
 */

'use client';

import { Card, CardHeader, CardBody, CardFooter } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { TaxCalculationResult } from '@/types/tax';
import { formatCurrency, formatNumber } from '@/lib/tax/calculateWithholding';

interface WithholdingResultCardProps {
  result: TaxCalculationResult | null;
  locale: 'th' | 'en';
  translations: {
    result: string;
    withholdingTax: string;
    grossAmount: string;
    netAmount: string;
    effectiveRate: string;
    print: string;
    save: string;
    loginToSave: string;
  };
}

export function WithholdingResultCard({
  result,
  locale,
  translations,
}: WithholdingResultCardProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    // TODO: Implement save to Supabase (requires authentication)
    alert(translations.loginToSave);
  };

  if (!result) {
    return (
      <Card variant="bordered" padding="lg">
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'th'
              ? 'กรอกข้อมูลด้านซ้ายแล้วกดคำนวณเพื่อดูผลลัพธ์'
              : 'Enter information on the left and click Calculate to see results'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="lg" className="print:shadow-none">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {translations.result}
        </h2>
      </CardHeader>

      <CardBody>
        {/* Main Result - Tax Amount */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {translations.withholdingTax}
          </p>
          <p className="text-4xl font-bold text-primary-700 dark:text-primary-400 tabular-nums">
            {formatCurrency(result.taxAmount, locale)}
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">
              {translations.grossAmount}
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatCurrency(result.grossAmount, locale)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">
              {translations.netAmount}
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatCurrency(result.netAmount, locale)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              {translations.effectiveRate}
            </span>
            <span className="text-lg font-semibold text-secondary-600 dark:text-secondary-400 tabular-nums">
              {formatNumber(result.taxRate, locale)}%
            </span>
          </div>
        </div>
      </CardBody>

      <CardFooter>
        <div className="flex gap-3 no-print">
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={handlePrint}
          >
            {translations.print}
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={handleSave}
          >
            {translations.save}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

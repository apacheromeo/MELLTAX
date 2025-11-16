/**
 * WithholdingResultCard component
 * Displays the result of withholding tax calculation
 * Phase 3: Premium dashboard design with empty state
 */

'use client';

import { Card, CardBody } from '@/components/common/Card';
import { CalculatorIcon } from '@/components/icons';
import { WithholdingResult, WithholdingInput } from '@/types/tax';
import { getCategoryById } from '@/lib/tax/withholdingRates';

interface WithholdingResultCardProps {
  result?: WithholdingResult;
  input?: WithholdingInput;
  locale: 'th' | 'en';
  translations: {
    result: string;
    withholdingTax: string;
    grossAmount: string;
    netAmount: string;
    taxRate: string;
    print: string;
    save: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
}

export function WithholdingResultCard({
  result,
  input,
  locale,
  translations,
}: WithholdingResultCardProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    alert(locale === 'th' ? 'กรุณาเข้าสู่ระบบเพื่อบันทึกการคำนวณ' : 'Please login to save calculations');
  };

  // Empty state
  if (!result) {
    return (
      <Card variant="dashboard" padding="lg" className="h-full flex items-center justify-center">
        <div className="text-center py-12">
          <div className="mx-auto w-20 h-20 bg-brand-primary-50 dark:bg-brand-primary-900/20 rounded-2xl flex items-center justify-center mb-6">
            <CalculatorIcon className="text-brand-primary dark:text-brand-accent" size={40} />
          </div>
          <h3 className="text-lg font-semibold text-brand-text dark:text-brand-text-dark mb-2">
            {translations.emptyTitle}
          </h3>
          <p className="text-brand-text-light dark:text-brand-text-dark-light max-w-sm mx-auto">
            {translations.emptySubtitle}
          </p>
        </div>
      </Card>
    );
  }

  const category = input ? getCategoryById(input.paymentCategory) : null;

  return (
    <Card variant="dashboard" padding="lg" className="h-full print:shadow-none">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-brand-primary dark:text-brand-text-dark mb-1 tracking-tight">
            {translations.result}
          </h2>
          {category && (
            <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
              {locale === 'th' ? category.labelTh : category.labelEn}
            </p>
          )}
        </div>

        {/* Main Result - Withholding Tax Amount */}
        <div className="relative rounded-2xl bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 dark:from-brand-accent/20 dark:to-brand-primary/20 border-2 border-brand-accent/20 p-6">
          <div className="absolute top-4 right-4">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/20 dark:bg-brand-accent/30 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <p className="text-sm font-medium text-brand-text-light dark:text-brand-text-dark-light mb-2">
            {translations.withholdingTax}
          </p>
          <p className="text-4xl font-bold text-brand-accent dark:text-brand-accent tabular-nums">
            {formatCurrency(result.tax)}
          </p>
          <p className="mt-3 text-sm text-brand-text-lighter dark:text-brand-text-dark-lighter">
            {locale === 'th' ? 'ภาษีที่ต้องหัก ณ ที่จ่าย' : 'Tax to be withheld at source'}
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          {/* Gross Amount */}
          <div className="flex justify-between items-center py-3 border-b border-brand-light-border dark:border-brand-dark-border">
            <span className="text-brand-text-light dark:text-brand-text-dark-light font-medium">
              {translations.grossAmount}
            </span>
            <span className="text-xl font-semibold text-brand-text dark:text-brand-text-dark tabular-nums">
              {formatCurrency(result.gross)}
            </span>
          </div>

          {/* Net Amount */}
          <div className="flex justify-between items-center py-3 border-b border-brand-light-border dark:border-brand-dark-border">
            <span className="text-brand-text-light dark:text-brand-text-dark-light font-medium">
              {translations.netAmount}
            </span>
            <span className="text-xl font-semibold text-brand-text dark:text-brand-text-dark tabular-nums">
              {formatCurrency(result.net)}
            </span>
          </div>

          {/* Tax Rate */}
          <div className="flex justify-between items-center py-3">
            <span className="text-brand-text-light dark:text-brand-text-dark-light font-medium">
              {translations.taxRate}
            </span>
            <span className="text-lg font-semibold text-brand-primary dark:text-brand-accent">
              {result.taxRate}%
            </span>
          </div>
        </div>

        {/* Additional Notes */}
        {category && category.descriptionTh && (
          <div className="rounded-xl bg-brand-light-hover dark:bg-brand-dark-hover p-4 border border-brand-light-border dark:border-brand-dark-border">
            <p className="text-xs font-medium text-brand-text-light dark:text-brand-text-dark-light mb-1">
              {locale === 'th' ? 'หมายเหตุ' : 'Note'}
            </p>
            <p className="text-sm text-brand-text dark:text-brand-text-dark">
              {locale === 'th' ? category.descriptionTh : category.descriptionEn}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 px-4 py-2.5 border-2 border-brand-primary dark:border-brand-accent text-brand-primary dark:text-brand-accent font-medium rounded-xl hover:bg-brand-primary hover:text-white dark:hover:bg-brand-accent dark:hover:text-white transition-all duration-200"
          >
            {translations.print}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 bg-brand-light-hover dark:bg-brand-dark-hover border-2 border-brand-light-border dark:border-brand-dark-border text-brand-text-light dark:text-brand-text-dark-light font-medium rounded-xl hover:border-brand-primary dark:hover:border-brand-accent hover:text-brand-primary dark:hover:text-brand-accent transition-all duration-200"
          >
            {translations.save}
          </button>
        </div>
      </div>
    </Card>
  );
}

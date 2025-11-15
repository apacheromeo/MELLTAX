/**
 * Profit Calculator Form Component
 * Helps users calculate selling price based on cost and desired profit margin
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TAX_RATES } from '@/lib/tax/withholdingRates';
import { PaymentCategory } from '@/types/tax';

interface ProfitResult {
  costPrice: number;
  profitMargin: number;
  sellingPrice: number;
  profitAmount: number;
  markup: number;
  withTax: boolean;
  taxCategory?: PaymentCategory;
  taxRate?: number;
  taxAmount?: number;
  finalReceived?: number;
}

export function ProfitCalculatorForm() {
  const t = useTranslations('profit');
  const tCommon = useTranslations('common');
  const tErrors = useTranslations('errors');

  const [costPrice, setCostPrice] = useState<string>('');
  const [profitMargin, setProfitMargin] = useState<string>('30');
  const [withTax, setWithTax] = useState<boolean>(false);
  const [taxCategory, setTaxCategory] = useState<PaymentCategory>('service_general');
  const [result, setResult] = useState<ProfitResult | null>(null);

  const handleCalculate = () => {
    const cost = parseFloat(costPrice);
    const margin = parseFloat(profitMargin);

    if (isNaN(cost) || cost <= 0) {
      alert(tErrors('mustBePositive'));
      return;
    }

    if (isNaN(margin) || margin < 0 || margin > 1000) {
      alert(tErrors('invalidRate'));
      return;
    }

    // Calculate selling price and profit
    const profitAmount = cost * (margin / 100);
    const sellingPrice = cost + profitAmount;
    const markup = (profitAmount / cost) * 100;

    let calculationResult: ProfitResult = {
      costPrice: cost,
      profitMargin: margin,
      sellingPrice,
      profitAmount,
      markup,
      withTax,
    };

    // If withholding tax is included
    if (withTax) {
      const taxRate = TAX_RATES[taxCategory].rate;
      const taxAmount = sellingPrice * (taxRate / 100);
      const finalReceived = sellingPrice - taxAmount;

      calculationResult = {
        ...calculationResult,
        taxCategory,
        taxRate,
        taxAmount,
        finalReceived,
      };
    }

    setResult(calculationResult);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cost Price */}
          <div>
            <label htmlFor="costPrice" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
              {t('costPrice')}
            </label>
            <div className="relative">
              <input
                id="costPrice"
                type="number"
                step="0.01"
                min="0"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder={t('enterCost')}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all font-mono text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-semibold">
                {tCommon('thb')}
              </span>
            </div>
          </div>

          {/* Profit Margin */}
          <div>
            <label htmlFor="profitMargin" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
              {t('profitMargin')}
            </label>
            <div className="relative">
              <input
                id="profitMargin"
                type="number"
                step="1"
                min="0"
                max="1000"
                value={profitMargin}
                onChange={(e) => setProfitMargin(e.target.value)}
                placeholder={t('enterMargin')}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all font-mono text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Withholding Tax Option */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <input
              id="withTax"
              type="checkbox"
              checked={withTax}
              onChange={(e) => setWithTax(e.target.checked)}
              className="w-5 h-5 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary focus:ring-offset-0"
            />
            <label htmlFor="withTax" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {t('taxWithholding')}
            </label>
          </div>

          {withTax && (
            <div>
              <label htmlFor="taxCategory" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                {t('selectTaxCategory')}
              </label>
              <select
                id="taxCategory"
                value={taxCategory}
                onChange={(e) => setTaxCategory(e.target.value as PaymentCategory)}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              >
                {Object.entries(TAX_RATES).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.nameTh} / {config.nameEn} ({config.rate}%)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="mt-6 w-full bg-gradient-to-r from-brand-primary to-accent-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg"
        >
          {t('calculate')}
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-gradient-to-br from-brand-primary/5 to-accent-500/5 dark:from-brand-primary/10 dark:to-accent-500/10 rounded-2xl shadow-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 p-6 md:p-8 animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-2xl font-extrabold text-brand-primary dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">💰</span>
            {t('result')}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Cost Price */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-md">
              <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                {t('costPrice')}
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">
                {formatCurrency(result.costPrice)} {tCommon('thb')}
              </p>
            </div>

            {/* Profit Margin */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-md">
              <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                {t('profitMargin')}
              </p>
              <p className="text-2xl font-bold text-accent-600 dark:text-accent-400 font-mono">
                {result.profitMargin.toFixed(2)}%
              </p>
            </div>

            {/* Profit Amount */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-md">
              <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                {t('profitAmount')}
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 font-mono">
                +{formatCurrency(result.profitAmount)} {tCommon('thb')}
              </p>
            </div>

            {/* Selling Price */}
            <div className="bg-gradient-to-br from-brand-primary to-accent-600 rounded-xl p-4 shadow-lg md:col-span-2 lg:col-span-3">
              <p className="text-sm font-semibold text-white/90 mb-1">
                {t('sellingPrice')}
              </p>
              <p className="text-4xl font-extrabold text-white font-mono">
                {formatCurrency(result.sellingPrice)} {tCommon('thb')}
              </p>
            </div>

            {/* Tax Information (if applicable) */}
            {result.withTax && result.taxAmount !== undefined && result.finalReceived !== undefined && (
              <>
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-md">
                  <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                    {tCommon('withholdingTax')} ({result.taxRate}%)
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 font-mono">
                    -{formatCurrency(result.taxAmount)} {tCommon('thb')}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 shadow-lg md:col-span-2">
                  <p className="text-sm font-semibold text-white/90 mb-1">
                    {t('finalReceived')}
                  </p>
                  <p className="text-3xl font-extrabold text-white font-mono">
                    {formatCurrency(result.finalReceived)} {tCommon('thb')}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <span className="font-bold">{t('summary')}:</span> {t('exampleDesc')}
            </p>
          </div>
        </div>
      )}

      {/* Example Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-6">
        <h3 className="text-lg font-bold text-brand-primary dark:text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          {t('exampleTitle')}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {t('exampleDesc')}
        </p>
      </div>
    </div>
  );
}

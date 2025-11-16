/**
 * VAT Calculator Page
 * Calculate VAT at 7% and 10% rates
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInContent } from '@/components/ads/AdInContent';
import { Locale } from '@/lib/i18n/config';
import {
  calculateVATFromExcludingAmount,
  calculateVATFromIncludingAmount,
  compareVATRates,
  shouldRegisterVAT,
  getDaysUntilVATRateChange,
  VAT_RATES,
  VAT_REGISTRATION_THRESHOLD,
  type VATCalculation,
} from '@/lib/tax/vatCalculator';

export default function VATPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tVAT = useTranslations('vat');

  const [calculationType, setCalculationType] = useState<'excluding' | 'including'>(
    'excluding'
  );
  const [amount, setAmount] = useState('');
  const [vatRate, setVatRate] = useState<number>(VAT_RATES.current);
  const [showResult, setShowResult] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [annualTurnover, setAnnualTurnover] = useState('');

  const handleCalculate = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setShowResult(true);
  };

  const handleClear = () => {
    setAmount('');
    setShowResult(false);
    setShowComparison(false);
  };

  const result: VATCalculation | null = showResult
    ? calculationType === 'excluding'
      ? calculateVATFromExcludingAmount(parseFloat(amount), vatRate)
      : calculateVATFromIncludingAmount(parseFloat(amount), vatRate)
    : null;

  const comparison =
    showComparison && amount
      ? compareVATRates(parseFloat(amount))
      : null;

  const registration = annualTurnover
    ? shouldRegisterVAT(parseFloat(annualTurnover))
    : null;

  const daysUntilChange = getDaysUntilVATRateChange();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container-responsive py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
            {tVAT('title')}
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            {tVAT('description')}
          </p>

          {daysUntilChange > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                {tVAT('rateExpiry')} {tVAT('expiryDate')} (
                {tVAT('daysUntilChange').replace('{days}', daysUntilChange.toString())})
              </p>
            </div>
          )}
        </div>

        {/* Top Ad */}
        <AdBanner className="mb-8" />

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Calculator Form */}
          <div className="space-y-6">
            <Card variant="bordered" padding="lg">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {tVAT('calculate')}
              </h2>

              <div className="space-y-4">
                <Select
                  label={tVAT('calculationType')}
                  value={calculationType}
                  onChange={(e) =>
                    setCalculationType(e.target.value as 'excluding' | 'including')
                  }
                  options={[
                    { value: 'excluding', label: tVAT('fromExcluding') },
                    { value: 'including', label: tVAT('fromIncluding') },
                  ]}
                />

                <Input
                  label={tVAT('amount')}
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10000"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Select
                  label={tVAT('vatRate')}
                  value={vatRate.toString()}
                  onChange={(e) => setVatRate(parseFloat(e.target.value))}
                  options={[
                    {
                      value: VAT_RATES.current.toString(),
                      label: tVAT('currentRate'),
                    },
                    {
                      value: VAT_RATES.standard.toString(),
                      label: tVAT('standardRate'),
                    },
                  ]}
                />
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="primary" size="lg" onClick={handleCalculate} className="flex-1">
                  {tVAT('calculate')}
                </Button>
                <Button variant="outline" size="lg" onClick={handleClear}>
                  {t('clear')}
                </Button>
              </div>
            </Card>

            {/* VAT Registration Check */}
            <Card variant="bordered" padding="lg">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {tVAT('checkRegistration')}
              </h2>

              <div className="space-y-4">
                <Input
                  label={tVAT('annualTurnover')}
                  type="number"
                  step="0.01"
                  value={annualTurnover}
                  onChange={(e) => setAnnualTurnover(e.target.value)}
                  placeholder="1800000"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                {registration && (
                  <div
                    className={`p-4 rounded-md ${
                      registration.required
                        ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                        : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        registration.required
                          ? 'text-red-800 dark:text-red-200'
                          : 'text-green-800 dark:text-green-200'
                      }`}
                    >
                      {registration.required
                        ? tVAT('registrationRequired')
                        : locale === 'th'
                        ? 'ไม่ต้องจดทะเบียน VAT'
                        : 'VAT Registration Not Required'}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        registration.required
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-green-700 dark:text-green-300'
                      }`}
                    >
                      {tVAT('threshold')}: {formatCurrency(VAT_REGISTRATION_THRESHOLD)} {t('thb')}
                    </p>
                    {registration.required && (
                      <p className="text-xs mt-1 text-red-700 dark:text-red-300">
                        {locale === 'th' ? 'เกินเกณฑ์' : 'Exceeded by'}:{' '}
                        {formatCurrency(registration.exceededBy)} {t('thb')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {showResult && result && (
              <Card variant="elevated" padding="lg">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  {tVAT('result')}
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tVAT('amountExcludingVAT')}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(result.totalWithoutVAT)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tVAT('vatAmount')} ({result.rate}%)
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(result.vatAmount)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 bg-neutral-900 dark:bg-white rounded-md px-4 mt-4">
                    <span className="text-base font-semibold text-white dark:text-black">
                      {tVAT('amountIncludingVAT')}
                    </span>
                    <span className="text-xl font-bold text-white dark:text-black">
                      {formatCurrency(result.totalWithVAT)} {t('thb')}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setShowComparison(!showComparison)}
                    className="w-full"
                  >
                    {tVAT('compareRates')}
                  </Button>
                </div>
              </Card>
            )}

            {showComparison && comparison && (
              <Card variant="bordered" padding="lg">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-4">
                  {tVAT('compareRates')}
                </h3>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">
                      {tVAT('current7')}
                    </p>
                    <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                      {formatCurrency(comparison.currentRate.vatAmount)} {t('thb')}
                    </p>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md">
                    <p className="text-xs text-orange-700 dark:text-orange-300 mb-1">
                      {tVAT('standard10')}
                    </p>
                    <p className="text-lg font-semibold text-orange-900 dark:text-orange-100">
                      {formatCurrency(comparison.standardRate.vatAmount)} {t('thb')}
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-md">
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                      {tVAT('difference')}
                    </p>
                    <p className="text-base font-semibold text-neutral-900 dark:text-white">
                      +{formatCurrency(comparison.difference)} {t('thb')} (
                      {comparison.percentageIncrease.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* In-Content Ad */}
        <AdInContent className="mb-8" />
      </div>
    </div>
  );
}

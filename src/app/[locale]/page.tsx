/**
 * Home Page - Tax Calculator
 * Main page with withholding tax calculator
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { WithholdingForm } from '@/components/calculator/WithholdingForm';
import { WithholdingResultCard } from '@/components/calculator/WithholdingResultCard';
import { TaxScenarioExamples } from '@/components/calculator/TaxScenarioExamples';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInContent } from '@/components/ads/AdInContent';
import { TaxCalculationResult } from '@/types/tax';
import { Locale } from '@/lib/i18n/config';

export default function HomePage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tHero = useTranslations('hero');
  const tCalc = useTranslations('calculator');

  const [result, setResult] = useState<TaxCalculationResult | null>(null);

  const handleCalculate = (calculationResult: TaxCalculationResult) => {
    setResult(calculationResult);
  };

  return (
    <div className="container-responsive py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div>
          <h1 className="heading-1 text-gray-900 dark:text-white mb-4">
            {tHero('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {tHero('subtitle')}
          </p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{tHero('feature1')}</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{tHero('feature2')}</span>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">฿</div>
              <p className="text-gray-600 dark:text-gray-400">
                {t('tagline')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Ad Banner */}
      <AdBanner className="mb-8" />

      {/* Main Calculator Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Left: Calculator Form */}
        <WithholdingForm
          locale={locale}
          translations={{
            title: tCalc('title'),
            paymentType: tCalc('paymentType'),
            selectPaymentType: tCalc('selectPaymentType'),
            calculationMode: tCalc('calculationMode'),
            grossToNet: tCalc('grossToNet'),
            netToGross: tCalc('netToGross'),
            amount: tCalc('amount'),
            enterAmount: tCalc('enterAmount'),
            customRate: tCalc('customRate'),
            calculate: t('calculate'),
            clear: t('clear'),
          }}
          onCalculate={handleCalculate}
        />

        {/* Right: Result Card */}
        <WithholdingResultCard
          result={result}
          locale={locale}
          translations={{
            result: tCalc('result'),
            withholdingTax: tCalc('withholdingTax'),
            grossAmount: tCalc('grossAmount'),
            netAmount: tCalc('netAmount'),
            effectiveRate: tCalc('effectiveRate'),
            print: t('print'),
            save: t('save'),
            loginToSave: tCalc('loginToSave'),
          }}
        />
      </div>

      {/* In-Content Ad */}
      <AdInContent className="mb-8" />

      {/* Examples and FAQ */}
      <TaxScenarioExamples
        locale={locale}
        translations={{
          exampleTitle: tCalc('exampleTitle'),
          exampleDesc1: tCalc('exampleDesc1'),
          exampleDesc2: tCalc('exampleDesc2'),
        }}
      />
    </div>
  );
}

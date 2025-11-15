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
    <div className="min-h-screen bg-gradient-to-br from-brand-light-bg via-white to-accent-50 dark:from-brand-dark-bg dark:via-neutral-900 dark:to-neutral-800">
      <div className="container-responsive py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12 text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="space-y-6 animate-in slide-in-from-left-8 duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-accent-600 to-brand-primary mb-4">
              {tHero('title')}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-6 font-medium">
              {tHero('subtitle')}
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">{tHero('feature1')}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">{tHero('feature2')}</span>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center justify-center animate-in slide-in-from-right-8 duration-700">
            <div className="w-full h-80 bg-gradient-to-br from-brand-primary/10 via-accent-500/10 to-brand-primary/10 dark:from-brand-primary/20 dark:via-accent-500/20 dark:to-brand-primary/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-brand-primary/20 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="text-8xl animate-pulse">฿</div>
                <p className="text-xl font-bold text-brand-primary dark:text-white">
                  {t('tagline')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Ad Banner */}
        <AdBanner className="mb-8" />

        {/* Main Calculator Section */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
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
    </div>
  );
}

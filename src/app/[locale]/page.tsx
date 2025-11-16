/**
 * Home Page - Tax Calculator
 * Minimal, clean design
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
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="container-responsive py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-4 tracking-tight">
            {tHero('title')}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {tHero('subtitle')}
          </p>
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
    </div>
  );
}

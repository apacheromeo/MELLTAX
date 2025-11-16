/**
 * Home Page - Tax Calculator
 * Minimal, clean design
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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

        {/* All Calculators */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mb-8 text-center">
            {locale === 'th' ? 'เครื่องมือคำนวณภาษีทั้งหมด' : 'All Tax Calculators'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/income-tax"
              className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-100 hover:shadow-md transition-all group"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'ภาษีเงินได้บุคคลธรรมดา' : 'Personal Income Tax'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'คำนวณภาษีแบบก้าวหน้า 8 ขั้น (0-35%) พร้อมค่าลดหย่อน'
                  : '8-bracket progressive tax (0-35%) with deductions'}
              </p>
            </Link>

            <Link
              href="/vat"
              className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-100 hover:shadow-md transition-all group"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'ภาษีมูลค่าเพิ่ม (VAT)' : 'Value Added Tax (VAT)'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'คำนวณ VAT 7% และ 10% พร้อมเปรียบเทียบอัตรา'
                  : 'Calculate 7% and 10% VAT with rate comparison'}
              </p>
            </Link>

            <Link
              href="/social-security"
              className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-100 hover:shadow-md transition-all group"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'ประกันสังคม' : 'Social Security'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'คำนวณเงินสมทบ SSF 5% และกองทุนสวัสดิการ 0.25%'
                  : 'Calculate SSF 5% and Welfare Fund 0.25%'}
              </p>
            </Link>

            <Link
              href="/dashboard"
              className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-100 hover:shadow-md transition-all group"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'แดชบอร์ดภาษี' : 'Tax Dashboard'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'ดูกำหนดยื่นภาษีและภาพรวมทั้งหมด'
                  : 'View tax deadlines and overview'}
              </p>
            </Link>

            <Link
              href="/planner"
              className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-100 hover:shadow-md transition-all group"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'วางแผนภาษี' : 'Tax Planner'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'วางแผนภาษีหลายใบแจ้งหนี้พร้อมกราฟ'
                  : 'Plan multiple invoices with charts'}
              </p>
            </Link>

            <Link
              href="/profit"
              className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-100 hover:shadow-md transition-all group"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'คำนวณกำไร' : 'Profit Calculator'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'คำนวณราคาขายเพื่อให้ได้กำไรตามเป้าหมาย'
                  : 'Calculate selling price for target profit'}
              </p>
            </Link>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mb-8 text-center">
            {locale === 'th' ? 'ทำไมต้องใช้ MELLTAX?' : 'Why Use MELLTAX?'}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'ครบครันและแม่นยำ' : 'Comprehensive & Accurate'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'ครอบคลุมภาษีทุกประเภทตามกฎหมายไทย 2025'
                  : 'Covers all Thai tax types per 2025 law'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'ใช้งานง่าย ฟรี 100%' : 'Easy & 100% Free'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'คำนวณได้ทันที ไม่ต้องสมัครสมาชิก'
                  : 'Instant calculations, no sign-up required'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                {locale === 'th' ? 'รองรับสองภาษา' : 'Bilingual Support'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {locale === 'th'
                  ? 'รองรับภาษาไทยและอังกฤษเต็มรูปแบบ'
                  : 'Full Thai and English language support'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

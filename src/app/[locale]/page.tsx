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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container-responsive py-8 md:py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
            <span className="text-sm font-semibold text-white">
              {locale === 'th' ? '🎯 เครื่องมือคำนวณภาษีครบวงจร' : '🎯 Complete Tax Calculator Suite'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-6 tracking-tight">
            {tHero('title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
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
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {locale === 'th' ? 'เครื่องมือคำนวณภาษีทั้งหมด' : 'All Tax Calculators'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {locale === 'th' ? 'เลือกเครื่องมือที่ต้องการใช้งาน' : 'Choose the tool you need'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/income-tax"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px] hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl p-6">
                <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {locale === 'th' ? 'ภาษีเงินได้บุคคลธรรมดา' : 'Personal Income Tax'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {locale === 'th'
                    ? 'คำนวณภาษีแบบก้าวหน้า 8 ขั้น (0-35%)'
                    : '8-bracket progressive tax (0-35%)'}
                </p>
              </div>
            </Link>

            <Link
              href="/vat"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px] hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl p-6">
                <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="text-2xl">🏪</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {locale === 'th' ? 'ภาษีมูลค่าเพิ่ม (VAT)' : 'Value Added Tax (VAT)'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {locale === 'th'
                    ? 'คำนวณ VAT 7% และ 10% พร้อมเปรียบเทียบ'
                    : 'Calculate 7% and 10% VAT with comparison'}
                </p>
              </div>
            </Link>

            <Link
              href="/social-security"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-[2px] hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl p-6">
                <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {locale === 'th' ? 'ประกันสังคม' : 'Social Security'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {locale === 'th'
                    ? 'คำนวณเงินสมทบ SSF และกองทุนสวัสดิการ'
                    : 'Calculate SSF and Welfare Fund'}
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-[2px] hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl p-6">
                <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {locale === 'th' ? 'แดชบอร์ดภาษี' : 'Tax Dashboard'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {locale === 'th'
                    ? 'ดูกำหนดยื่นภาษีและภาพรวมทั้งหมด'
                    : 'View tax deadlines and overview'}
                </p>
              </div>
            </Link>

            <Link
              href="/planner"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl p-6">
                <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {locale === 'th' ? 'วางแผนภาษี' : 'Tax Planner'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {locale === 'th'
                    ? 'วางแผนภาษีหลายใบแจ้งหนี้พร้อมกราฟ'
                    : 'Plan multiple invoices with charts'}
                </p>
              </div>
            </Link>

            <Link
              href="/profit"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 p-[2px] hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl p-6">
                <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {locale === 'th' ? 'คำนวณกำไร' : 'Profit Calculator'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {locale === 'th'
                    ? 'คำนวณราคาขายเพื่อให้ได้กำไรตามต้องการ'
                    : 'Calculate selling price for target profit'}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20"></div>
          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {locale === 'th' ? 'ทำไมต้องใช้ MELLTAX?' : 'Why Use MELLTAX?'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {locale === 'th' ? 'เครื่องมือที่ออกแบบมาเพื่อคุณ' : 'Tools designed for you'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/30 dark:hover:to-indigo-950/30 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {locale === 'th' ? 'ครบครันและแม่นยำ' : 'Comprehensive & Accurate'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {locale === 'th'
                    ? 'ครอบคลุมภาษีทุกประเภทตามกฎหมายไทย 2025 พร้อมอัปเดตล่าสุด'
                    : 'Covers all Thai tax types per 2025 law with latest updates'}
                </p>
              </div>

              <div className="group text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950/30 dark:hover:to-teal-950/30 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {locale === 'th' ? 'ใช้งานง่าย ฟรี 100%' : 'Easy & 100% Free'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {locale === 'th'
                    ? 'คำนวณได้ทันที ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย'
                    : 'Instant calculations, no sign-up, completely free'}
                </p>
              </div>

              <div className="group text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950/30 dark:hover:to-pink-950/30 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {locale === 'th' ? 'รองรับสองภาษา' : 'Bilingual Support'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {locale === 'th'
                    ? 'รองรับภาษาไทยและอังกฤษเต็มรูปแบบ สลับได้ทันที'
                    : 'Full Thai and English support, switch instantly'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

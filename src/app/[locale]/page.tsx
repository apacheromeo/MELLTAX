/**
 * Home Page - Withholding Tax Calculator
 * Premium dashboard design with HR management aesthetic (Dribbble inspired)
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
import { Card } from '@/components/common/Card';
import { MelltaxLogo } from '@/components/icons';
import { WithholdingResult, WithholdingInput } from '@/types/tax';
import { Locale } from '@/lib/i18n/config';

export default function HomePage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tHero = useTranslations('hero');
  const tCalc = useTranslations('calculator');

  const [result, setResult] = useState<WithholdingResult | undefined>(undefined);
  const [lastInput, setLastInput] = useState<WithholdingInput | undefined>(undefined);

  const handleCalculate = (calculationResult: WithholdingResult, input: WithholdingInput) => {
    setResult(calculationResult);
    setLastInput(input);
  };

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 space-y-10">
        {/* Hero Section - Premium SaaS Aesthetic */}
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-light-surface to-brand-light-hover dark:from-brand-dark-surface dark:to-brand-dark-hover border border-brand-light-border dark:border-brand-dark-border shadow-dashboard overflow-hidden">
          <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 min-h-[240px] md:min-h-[260px]">
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start px-4 py-2 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-full border border-brand-accent/20">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-sm font-semibold text-brand-accent">
                  {locale === 'th' ? 'เครื่องมือคำนวณภาษีครบวงจร' : 'Complete Tax Calculator Suite'}
                </span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl md:text-[42px] font-semibold text-brand-primary dark:text-brand-text-dark mb-4 tracking-tight leading-tight">
                  {tHero('title')}
                </h1>
                <p className="text-base md:text-lg text-brand-text-light dark:text-brand-text-dark-light leading-relaxed opacity-90">
                  {tHero('subtitle')}
                </p>
              </div>
            </div>

            {/* Right: Illustration Placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-sm h-48 rounded-2xl border-2 border-dashed border-brand-light-border dark:border-brand-dark-border bg-brand-light-surface/50 dark:bg-brand-dark-surface/50 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <MelltaxLogo
                    className="text-brand-primary/30 dark:text-brand-accent/30 mx-auto"
                    size={64}
                  />
                  <p className="text-sm text-brand-text-lighter dark:text-brand-text-dark-lighter font-medium">
                    {locale === 'th' ? 'คำนวณภาษีอย่างชาญฉลาด' : 'Smart Tax Calculations'}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Top Ad Banner */}
        <AdBanner />

        {/* Main Calculator Section */}
        <div className="grid lg:grid-cols-2 gap-6">
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
              grossAmount: tCalc('grossAmount'),
              netAmount: tCalc('netAmount'),
              enterAmount: tCalc('enterAmount'),
              taxRate: tCalc('taxRate'),
              calculate: t('calculate'),
              clear: t('clear'),
            }}
            onCalculate={handleCalculate}
          />

          {/* Right: Result Card */}
          <WithholdingResultCard
            result={result}
            input={lastInput}
            locale={locale}
            translations={{
              result: tCalc('result'),
              withholdingTax: tCalc('withholdingTax'),
              grossAmount: tCalc('grossAmount'),
              netAmount: tCalc('netAmount'),
              taxRate: tCalc('taxRate'),
              print: t('print'),
              save: t('save'),
              emptyTitle: tCalc('emptyTitle'),
              emptySubtitle: tCalc('emptySubtitle'),
              saveSuccess: tCalc('save.success'),
              saveError: tCalc('save.error'),
              saveRequireLogin: tCalc('save.requireLogin'),
            }}
          />
        </div>

        {/* In-Content Ad */}
        <AdInContent />

        {/* Examples and FAQ */}
        <TaxScenarioExamples
          locale={locale}
          translations={{
            exampleTitle: tCalc('exampleTitle'),
            example1Title: tCalc('example1Title'),
            example1Desc: tCalc('example1Desc'),
            example2Title: tCalc('example2Title'),
            example2Desc: tCalc('example2Desc'),
            example3Title: tCalc('example3Title'),
            example3Desc: tCalc('example3Desc'),
            example4Title: tCalc('example4Title'),
            example4Desc: tCalc('example4Desc'),
          }}
        />

        {/* All Calculators - Dashboard Cards */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-primary dark:text-brand-text-dark mb-2 tracking-tight">
              {locale === 'th' ? 'เครื่องมือคำนวณภาษีทั้งหมด' : 'All Tax Calculators'}
            </h2>
            <p className="text-brand-text-light dark:text-brand-text-dark-light opacity-90">
              {locale === 'th' ? 'เลือกเครื่องมือที่ต้องการใช้งาน' : 'Choose the tool you need'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/income-tax">
              <Card variant="dashboard" padding="lg" hover className="h-full group">
                <div className="mb-4 w-14 h-14 rounded-xl bg-brand-primary-100 dark:bg-brand-primary-900/30 flex items-center justify-center group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-200">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    💼
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-2">
                  {locale === 'th' ? 'ภาษีเงินได้บุคคลธรรมดา' : 'Personal Income Tax'}
                </h3>
                <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                  {locale === 'th'
                    ? 'คำนวณภาษีแบบก้าวหน้า 8 ขั้น (0-35%)'
                    : '8-bracket progressive tax (0-35%)'}
                </p>
              </Card>
            </Link>

            <Link href="/vat">
              <Card variant="dashboard" padding="lg" hover className="h-full group">
                <div className="mb-4 w-14 h-14 rounded-xl bg-brand-accent-100 dark:bg-brand-accent-900/30 flex items-center justify-center group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-200">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    🏪
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-2">
                  {locale === 'th' ? 'ภาษีมูลค่าเพิ่ม (VAT)' : 'Value Added Tax (VAT)'}
                </h3>
                <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                  {locale === 'th'
                    ? 'คำนวณ VAT 7% และ 10% พร้อมเปรียบเทียบ'
                    : 'Calculate 7% and 10% VAT with comparison'}
                </p>
              </Card>
            </Link>

            <Link href="/social-security">
              <Card variant="dashboard" padding="lg" hover className="h-full group">
                <div className="mb-4 w-14 h-14 rounded-xl bg-brand-primary-100 dark:bg-brand-primary-900/30 flex items-center justify-center group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-200">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    🏥
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-2">
                  {locale === 'th' ? 'ประกันสังคม' : 'Social Security'}
                </h3>
                <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                  {locale === 'th'
                    ? 'คำนวณเงินสมทบ SSF และกองทุนสวัสดิการ'
                    : 'Calculate SSF and Welfare Fund'}
                </p>
              </Card>
            </Link>

            <Link href="/dashboard">
              <Card variant="dashboard" padding="lg" hover className="h-full group">
                <div className="mb-4 w-14 h-14 rounded-xl bg-brand-accent-100 dark:bg-brand-accent-900/30 flex items-center justify-center group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-200">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    📊
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-2">
                  {locale === 'th' ? 'แดชบอร์ดภาษี' : 'Tax Dashboard'}
                </h3>
                <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                  {locale === 'th'
                    ? 'ดูกำหนดยื่นภาษีและภาพรวมทั้งหมด'
                    : 'View tax deadlines and overview'}
                </p>
              </Card>
            </Link>

            <Link href="/planner">
              <Card variant="dashboard" padding="lg" hover className="h-full group">
                <div className="mb-4 w-14 h-14 rounded-xl bg-brand-primary-100 dark:bg-brand-primary-900/30 flex items-center justify-center group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-200">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    📋
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-2">
                  {locale === 'th' ? 'วางแผนภาษี' : 'Tax Planner'}
                </h3>
                <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                  {locale === 'th'
                    ? 'วางแผนภาษีหลายใบแจ้งหนี้พร้อมกราฟ'
                    : 'Plan multiple invoices with charts'}
                </p>
              </Card>
            </Link>

            <Link href="/profit">
              <Card variant="dashboard" padding="lg" hover className="h-full group">
                <div className="mb-4 w-14 h-14 rounded-xl bg-brand-accent-100 dark:bg-brand-accent-900/30 flex items-center justify-center group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-200">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    💰
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-2">
                  {locale === 'th' ? 'คำนวณกำไร' : 'Profit Calculator'}
                </h3>
                <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                  {locale === 'th'
                    ? 'คำนวณราคาขายเพื่อให้ได้กำไรตามต้องการ'
                    : 'Calculate selling price for target profit'}
                </p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Key Features - Dashboard Style */}
        <Card variant="dashboard" padding="xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-primary dark:text-brand-text-dark mb-3 tracking-tight">
              {locale === 'th' ? 'ทำไมต้องใช้ MELLTAX?' : 'Why Use MELLTAX?'}
            </h2>
            <p className="text-brand-text-light dark:text-brand-text-dark-light opacity-90">
              {locale === 'th' ? 'เครื่องมือที่ออกแบบมาเพื่อคุณ' : 'Tools designed for you'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover transition-all duration-200 group">
              <div className="w-16 h-16 mx-auto mb-6 bg-brand-primary-100 dark:bg-brand-primary-900/30 rounded-xl flex items-center justify-center group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-200">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-3">
                {locale === 'th' ? 'ครบครันและแม่นยำ' : 'Comprehensive & Accurate'}
              </h3>
              <p className="text-brand-text-light dark:text-brand-text-dark-light leading-relaxed">
                {locale === 'th'
                  ? 'ครอบคลุมภาษีทุกประเภทตามกฎหมายไทย 2025 พร้อมอัปเดตล่าสุด'
                  : 'Covers all Thai tax types per 2025 law with latest updates'}
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover transition-all duration-200 group">
              <div className="w-16 h-16 mx-auto mb-6 bg-brand-accent-100 dark:bg-brand-accent-900/30 rounded-xl flex items-center justify-center group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-200">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-3">
                {locale === 'th' ? 'ใช้งานง่าย ฟรี 100%' : 'Easy & 100% Free'}
              </h3>
              <p className="text-brand-text-light dark:text-brand-text-dark-light leading-relaxed">
                {locale === 'th'
                  ? 'คำนวณได้ทันที ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย'
                  : 'Instant calculations, no sign-up, completely free'}
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover transition-all duration-200 group">
              <div className="w-16 h-16 mx-auto mb-6 bg-brand-primary-100 dark:bg-brand-primary-900/30 rounded-xl flex items-center justify-center group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-200">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="text-lg font-bold text-brand-text dark:text-brand-text-dark mb-3">
                {locale === 'th' ? 'รองรับสองภาษา' : 'Bilingual Support'}
              </h3>
              <p className="text-brand-text-light dark:text-brand-text-dark-light leading-relaxed">
                {locale === 'th'
                  ? 'รองรับภาษาไทยและอังกฤษเต็มรูปแบบ สลับได้ทันที'
                  : 'Full Thai and English support, switch instantly'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

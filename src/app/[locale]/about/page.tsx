/**
 * About Page
 * Phase 5: Information about MELLTAX with premium dashboard design
 * Includes: What is MELLTAX, Disclaimer, Privacy sections
 */

'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInContent } from '@/components/ads/AdInContent';
import { AdFooter } from '@/components/ads/AdFooter';
import { InfoIcon } from '@/components/icons';
import { Locale } from '@/lib/i18n/config';

export default function AboutPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 space-y-10">
        {/* Hero Section - Premium SaaS Aesthetic */}
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-light-surface to-brand-light-hover dark:from-brand-dark-surface dark:to-brand-dark-hover border border-brand-light-border dark:border-brand-dark-border shadow-dashboard overflow-hidden">
          <div className="relative p-8 md:p-12 min-h-[200px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-full border border-brand-accent/20">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-sm font-semibold text-brand-accent">
                {locale === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl md:text-[42px] font-semibold text-brand-primary dark:text-brand-text-dark mb-4 tracking-tight leading-tight">
                {t('title')}
              </h1>
              <p className="text-base md:text-lg text-brand-text-light dark:text-brand-text-dark-light leading-relaxed opacity-90 max-w-2xl">
                {locale === 'th'
                  ? 'เรียนรู้เพิ่มเติมเกี่ยวกับ MELLTAX และวิธีที่เราช่วยให้คุณคำนวณภาษีได้ง่ายขึ้น'
                  : 'Learn more about MELLTAX and how we make tax calculations simple for you'}
              </p>
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Top Ad Banner */}
        <AdBanner />

        {/* What is MELLTAX Section */}
        <Card variant="dashboard" padding="xl">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-brand-primary-100 dark:bg-brand-primary-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-primary dark:text-brand-text-dark mb-4 tracking-tight">
                  {t('whatIs')}
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-brand-text dark:text-brand-text-dark leading-relaxed">
                    {t('whatIsDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-brand-light-hover dark:bg-brand-dark-hover border border-brand-light-border dark:border-brand-dark-border">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg">✅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-1">
                      {t('feature1')}
                    </h3>
                    <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                      {locale === 'th'
                        ? 'คำนวณภาษีหัก ณ ที่จ่ายสำหรับทุกประเภทการจ่าย ตามกฎหมายไทย 2025'
                        : 'Calculate withholding tax for all payment types per Thai law 2025'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-brand-light-hover dark:bg-brand-dark-hover border border-brand-light-border dark:border-brand-dark-border">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg">🌐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-1">
                      {t('feature2')}
                    </h3>
                    <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                      {locale === 'th'
                        ? 'รองรับภาษาไทยและอังกฤษเต็มรูปแบบ สลับได้ทันที'
                        : 'Full Thai and English support, switch instantly'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-brand-light-hover dark:bg-brand-dark-hover border border-brand-light-border dark:border-brand-dark-border">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg">📋</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-1">
                      {t('feature3')}
                    </h3>
                    <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                      {locale === 'th'
                        ? 'วางแผนภาษีหลายใบแจ้งหนี้ พร้อมกราฟแสดงผล'
                        : 'Plan multiple invoices with visual charts'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-brand-light-hover dark:bg-brand-dark-hover border border-brand-light-border dark:border-brand-dark-border">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg">🎨</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-1">
                      {t('feature4')}
                    </h3>
                    <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                      {locale === 'th'
                        ? 'ดีไซน์สวยงาม รองรับโหมดมืด ใช้งานง่าย'
                        : 'Beautiful design with dark mode support'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-brand-light-hover dark:bg-brand-dark-hover border border-brand-light-border dark:border-brand-dark-border">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-1">
                      {t('feature5')}
                    </h3>
                    <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                      {locale === 'th'
                        ? 'ฟรี 100% ไม่ต้องสมัครสมาชิก ใช้ได้ทันที'
                        : '100% free, no sign-up required, instant use'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* In-Content Ad */}
        <AdInContent />

        {/* Disclaimer Section */}
        <Card variant="dashboard" padding="xl">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <InfoIcon className="text-amber-600 dark:text-amber-400" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-primary dark:text-brand-text-dark mb-4 tracking-tight">
                {t('disclaimer')}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-brand-text dark:text-brand-text-dark leading-relaxed">
                  {t('disclaimerDesc')}
                </p>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                  {locale === 'th'
                    ? '⚠️ กรุณาปรึกษาผู้เชี่ยวชาญด้านภาษีหรือนักบัญชีสำหรับคำแนะนำที่เหมาะสมกับสถานการณ์ของคุณ'
                    : '⚠️ Please consult tax professionals or accountants for advice appropriate to your situation'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Section */}
        <Card variant="dashboard" padding="xl">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🔒</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-primary dark:text-brand-text-dark mb-4 tracking-tight">
                {t('privacy')}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
                <p className="text-brand-text dark:text-brand-text-dark leading-relaxed">
                  {t('privacyDesc')}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                      {locale === 'th'
                        ? 'ไม่มีคุกกี้ติดตาม - ใช้เฉพาะ JavaScript ที่จำเป็นสำหรับการทำงานของเว็บไซต์'
                        : 'No tracking cookies - only functional JavaScript for website operation'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                      {locale === 'th'
                        ? 'ข้อมูลการคำนวณทำงานในเบราว์เซอร์ของคุณ - ไม่ถูกส่งไปยังเซิร์ฟเวอร์'
                        : 'Calculation data runs in your browser - not sent to servers'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
                      {locale === 'th'
                        ? 'หากคุณเข้าสู่ระบบในอนาคต ข้อมูลจะถูกเก็บอย่างปลอดภัยและไม่แชร์กับบุคคลที่สาม'
                        : 'If you log in (future feature), data is stored securely and never shared with third parties'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Card variant="dashboard" padding="xl">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💬</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-primary dark:text-brand-text-dark mb-4 tracking-tight">
                {t('contact')}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-brand-text dark:text-brand-text-dark leading-relaxed">
                  {t('contactDesc')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer Ad */}
        <AdFooter />
      </div>
    </div>
  );
}

/**
 * Social Security Calculator Page
 * Calculate Social Security and Welfare Fund contributions
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
// import AdBanner from '@/components/ads/AdBanner';
// import AdInContent from '@/components/ads/AdInContent';
import { Locale } from '@/lib/i18n/config';
import {
  calculateSocialSecurity,
  calculateWelfareFund,
  calculateTotalContributions,
  SOCIAL_SECURITY,
  EMPLOYEE_WELFARE_FUND,
} from '@/lib/tax/socialSecurity';

export default function SocialSecurityPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tSS = useTranslations('socialSecurity');

  const [monthlyWage, setMonthlyWage] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('10');
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    if (!monthlyWage || parseFloat(monthlyWage) <= 0) return;
    setShowResult(true);
  };

  const handleClear = () => {
    setMonthlyWage('');
    setNumberOfEmployees('10');
    setShowResult(false);
  };

  const wage = parseFloat(monthlyWage) || 0;
  const numEmployees = parseInt(numberOfEmployees) || 10;
  const ssResult = showResult ? calculateSocialSecurity(wage) : null;
  const wfResult = showResult ? calculateWelfareFund(wage, numEmployees) : null;
  const totalResult = showResult ? calculateTotalContributions(wage, numEmployees) : null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const today = new Date();
  const welfareFundActive = today >= EMPLOYEE_WELFARE_FUND.effectiveDate;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container-responsive py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
            {tSS('title')}
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            {tSS('description')}
          </p>

          {!welfareFundActive && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {tSS('welfareFund')}: {tSS('welfareFundStart')}
              </p>
            </div>
          )}
        </div>

        {/* Top Ad */}
        {/* <AdBanner slotId="SOCIAL_SECURITY_TOP" className="mb-8" /> */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Calculator Form */}
          <div className="space-y-6">
            <Card variant="bordered" padding="lg">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {tSS('calculate')}
              </h2>

              <div className="space-y-4">
                <Input
                  label={tSS('monthlyWage')}
                  type="number"
                  step="0.01"
                  value={monthlyWage}
                  onChange={(e) => setMonthlyWage(e.target.value)}
                  placeholder="15000"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-md text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <p>
                    <strong>{tSS('limits')}:</strong>
                  </p>
                  <p>{tSS('wageRange')}</p>
                  <p>{tSS('contributionRange')}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="primary" size="lg" onClick={handleCalculate} className="flex-1">
                  {tSS('calculate')}
                </Button>
                <Button variant="outline" size="lg" onClick={handleClear}>
                  {t('clear')}
                </Button>
              </div>
            </Card>

            {/* Information Card */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-3">
                {locale === 'th' ? 'ข้อมูลเพิ่มเติม' : 'Additional Information'}
              </h3>

              <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-900">
                  <span>{tSS('minWage')}</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(SOCIAL_SECURITY.minWage)} {t('thb')}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-900">
                  <span>{tSS('maxWage')}</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(SOCIAL_SECURITY.maxWage)} {t('thb')}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-900">
                  <span>{tSS('minContribution')}</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(SOCIAL_SECURITY.minContribution)} {t('thb')}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span>{tSS('maxContribution')}</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(SOCIAL_SECURITY.maxContribution)} {t('thb')}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Results */}
          {showResult && ssResult && totalResult && (
            <div className="space-y-6">
              {/* Social Security Result */}
              <Card variant="elevated" padding="lg">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  {tSS('result')}
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tSS('monthlyWage')}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(ssResult.wage)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tSS('employeeContribution')}
                    </span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      -{formatCurrency(ssResult.employeeContribution)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tSS('employerContribution')}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(ssResult.employerContribution)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {tSS('totalContribution')}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {formatCurrency(ssResult.totalContribution)} {t('thb')}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Welfare Fund Result */}
              {wfResult && (
                <Card variant="bordered" padding="lg">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-4">
                    {tSS('welfareFund')}
                  </h3>

                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">
                        {tSS('welfareFundRate')}
                      </p>
                      <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        {formatCurrency(wfResult.employeeContribution)} {t('thb')}
                      </p>
                    </div>

                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      <p>
                        {welfareFundActive
                          ? locale === 'th'
                            ? 'กองทุนสวัสดิการแรงงานเริ่มแล้ว'
                            : 'Welfare Fund is now active'
                          : tSS('welfareFundStart')}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Total Deductions */}
              <Card variant="elevated" padding="lg">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-4">
                  {locale === 'th' ? 'สรุปรวม' : 'Total Summary'}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tSS('socialSecurityContribution')}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(totalResult.socialSecurity.employeeContribution)} {t('thb')}
                    </span>
                  </div>

                  {totalResult.welfareFund && totalResult.welfareFund.employeeContribution > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {tSS('welfareFund')}
                      </span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(totalResult.welfareFund.employeeContribution)} {t('thb')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-3 bg-neutral-900 dark:bg-white rounded-md px-4 mt-4">
                    <span className="text-base font-semibold text-white dark:text-black">
                      {tSS('totalDeductions')}
                    </span>
                    <span className="text-xl font-bold text-white dark:text-black">
                      {formatCurrency(totalResult.totalEmployeeContribution)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {tSS('netSalary')}
                    </span>
                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(wage - totalResult.totalEmployeeContribution)} {t('thb')}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* In-Content Ad */}
        {/* <AdInContent slotId="SOCIAL_SECURITY_MID" className="mb-8" /> */}
      </div>
    </div>
  );
}

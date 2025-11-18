/**
 * Personal Income Tax Calculator Page
 * Progressive tax calculator with deductions
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import AdBanner from '@/components/ads/AdBanner';
import AdInContent from '@/components/ads/AdInContent';
import { Locale } from '@/lib/i18n/config';
import {
  calculatePersonalIncomeTax,
  TAX_BRACKETS,
  ALLOWANCES,
  type Deductions,
  type PersonalIncome,
} from '@/lib/tax/personalIncomeTax';

export default function IncomeTaxPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tIncome = useTranslations('incomeTax');

  const [income, setIncome] = useState<PersonalIncome>({
    salary: 0,
    freelance: 0,
    rental: 0,
    investment: 0,
    other: 0,
  });

  const [deductions, setDeductions] = useState<Deductions>({
    personalAllowance: true,
    spouseAllowance: false,
    childrenCount: 0,
    parentsCount: 0,
    lifeInsurance: 0,
    healthInsurance: 0,
    parentHealthInsurance: 0,
    providentFund: 0,
    rmf: 0,
    ssf: 0,
    donations: 0,
    homeLoanInterest: 0,
    socialSecurity: 0,
  });

  const [showResult, setShowResult] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfParents, setNumberOfParents] = useState(0);

  const handleCalculate = () => {
    setShowResult(true);
  };

  const handleClear = () => {
    setIncome({ salary: 0, freelance: 0, rental: 0, investment: 0, other: 0 });
    setDeductions({
      personalAllowance: true,
      spouseAllowance: false,
      childrenCount: 0,
      parentsCount: 0,
      lifeInsurance: 0,
      healthInsurance: 0,
      parentHealthInsurance: 0,
      providentFund: 0,
      rmf: 0,
      ssf: 0,
      donations: 0,
      homeLoanInterest: 0,
      socialSecurity: 0,
    });
    setNumberOfChildren(0);
    setNumberOfParents(0);
    setShowResult(false);
  };

  const result = showResult ? calculatePersonalIncomeTax(income, deductions) : null;

  const totalIncome =
    income.salary + income.freelance + income.rental + income.investment + income.other;

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
            {tIncome('title')}
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            {tIncome('description')}
          </p>
        </div>

        {/* Top Ad */}
        <AdBanner slotId="INCOME_TAX_TOP" className="mb-8" />

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Income & Deductions Form */}
          <div className="space-y-6">
            {/* Income Section */}
            <Card variant="bordered" padding="lg">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {tIncome('annualIncome')}
              </h2>

              <div className="space-y-4">
                <Input
                  label={locale === 'th' ? 'เงินเดือน' : 'Salary'}
                  type="number"
                  step="0.01"
                  value={income.salary || ''}
                  onChange={(e) =>
                    setIncome({ ...income, salary: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="480000"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Input
                  label={locale === 'th' ? 'รายได้ฟรีแลนซ์' : 'Freelance Income'}
                  type="number"
                  step="0.01"
                  value={income.freelance || ''}
                  onChange={(e) =>
                    setIncome({ ...income, freelance: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Input
                  label={locale === 'th' ? 'รายได้จากการให้เช่า' : 'Rental Income'}
                  type="number"
                  step="0.01"
                  value={income.rental || ''}
                  onChange={(e) =>
                    setIncome({ ...income, rental: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Input
                  label={locale === 'th' ? 'รายได้จากการลงทุน' : 'Investment Income'}
                  type="number"
                  step="0.01"
                  value={income.investment || ''}
                  onChange={(e) =>
                    setIncome({ ...income, investment: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Input
                  label={locale === 'th' ? 'รายได้อื่นๆ' : 'Other Income'}
                  type="number"
                  step="0.01"
                  value={income.other || ''}
                  onChange={(e) =>
                    setIncome({ ...income, other: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {tIncome('totalIncome')}
                    </span>
                    <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {formatCurrency(totalIncome)} {t('thb')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Deductions Section */}
            <Card variant="bordered" padding="lg">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {tIncome('deductions')}
              </h2>

              <div className="space-y-4">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {tIncome('personalAllowance')}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(ALLOWANCES.personal)} {t('thb')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="spouseAllowance"
                    checked={deductions.spouseAllowance}
                    onChange={(e) =>
                      setDeductions({ ...deductions, spouseAllowance: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700"
                  />
                  <label
                    htmlFor="spouseAllowance"
                    className="text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    {tIncome('spouseAllowance')} ({formatCurrency(ALLOWANCES.spouse)} {t('thb')})
                  </label>
                </div>

                <div>
                  <Input
                    label={tIncome('numberOfChildren')}
                    type="number"
                    step="1"
                    value={numberOfChildren || ''}
                    onChange={(e) => {
                      const num = parseInt(e.target.value) || 0;
                      setNumberOfChildren(num);
                      setDeductions({ ...deductions, childrenCount: num });
                    }}
                    placeholder="0"
                  />
                  {numberOfChildren > 0 && (
                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                      {formatCurrency(numberOfChildren * ALLOWANCES.child)} {t('thb')}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label={tIncome('numberOfParents')}
                    type="number"
                    step="1"
                    value={numberOfParents || ''}
                    onChange={(e) => {
                      const num = parseInt(e.target.value) || 0;
                      setNumberOfParents(num);
                      setDeductions({ ...deductions, parentsCount: num });
                    }}
                    placeholder="0"
                  />
                  {numberOfParents > 0 && (
                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                      {formatCurrency(numberOfParents * ALLOWANCES.parent)} {t('thb')}
                    </p>
                  )}
                </div>

                <Input
                  label={tIncome('lifeInsurance')}
                  type="number"
                  step="0.01"
                  value={deductions.lifeInsurance || ''}
                  onChange={(e) =>
                    setDeductions({
                      ...deductions,
                      lifeInsurance: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Input
                  label={tIncome('providentFund')}
                  type="number"
                  step="0.01"
                  value={deductions.providentFund || ''}
                  onChange={(e) =>
                    setDeductions({
                      ...deductions,
                      providentFund: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Input
                  label={tIncome('rmf')}
                  type="number"
                  step="0.01"
                  value={deductions.rmf || ''}
                  onChange={(e) =>
                    setDeductions({
                      ...deductions,
                      rmf: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Input
                  label={tIncome('ssf')}
                  type="number"
                  step="0.01"
                  value={deductions.ssf || ''}
                  onChange={(e) =>
                    setDeductions({
                      ...deductions,
                      ssf: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />

                <Input
                  label={tIncome('socialSecurity')}
                  type="number"
                  step="0.01"
                  value={deductions.socialSecurity || ''}
                  onChange={(e) =>
                    setDeductions({
                      ...deductions,
                      socialSecurity: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  rightIcon={<span className="text-sm">฿</span>}
                />
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="primary" size="lg" onClick={handleCalculate} className="flex-1">
                {tIncome('calculate')}
              </Button>
              <Button variant="outline" size="lg" onClick={handleClear}>
                {t('clear')}
              </Button>
            </div>
          </div>

          {/* Right: Result */}
          {showResult && result && (
            <div className="space-y-6">
              <Card variant="elevated" padding="lg">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  {tIncome('result')}
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tIncome('totalIncome')}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(result.totalIncome)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tIncome('totalDeductions')}
                    </span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      -{formatCurrency(result.totalDeductions)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {tIncome('taxableIncome')}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {formatCurrency(result.taxableIncome)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 bg-neutral-900 dark:bg-white rounded-md px-4 mt-4">
                    <span className="text-base font-semibold text-white dark:text-black">
                      {tIncome('taxAmount')}
                    </span>
                    <span className="text-xl font-bold text-white dark:text-black">
                      {formatCurrency(result.totalTax)} {t('thb')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {tIncome('effectiveTaxRate')}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {result.effectiveRate.toFixed(2)}%
                    </span>
                  </div>

                  {result.taxByBracket.length > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {tIncome('taxBracket')}
                      </span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {result.taxByBracket[result.taxByBracket.length - 1].rate}%
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Tax Brackets Table */}
              <Card variant="bordered" padding="lg">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-4">
                  {tIncome('brackets')}
                </h3>

                <div className="space-y-2">
                  {TAX_BRACKETS.map((bracket, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 text-sm border-b border-neutral-100 dark:border-neutral-900 last:border-0"
                    >
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {bracket.max === Infinity
                          ? `${formatCurrency(bracket.min)}+`
                          : `${formatCurrency(bracket.min)} - ${formatCurrency(bracket.max)}`}
                      </span>
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {bracket.rate}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* In-Content Ad */}
        <AdInContent slotId="INCOME_TAX_MID" className="mb-8" />
      </div>
    </div>
  );
}

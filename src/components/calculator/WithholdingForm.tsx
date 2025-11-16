/**
 * WithholdingForm component
 * Form for entering withholding tax calculation parameters
 * Phase 3: Premium dashboard design with validation
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader } from '@/components/common/Card';
import { CalculatorIcon } from '@/components/icons';
import { WithholdingInput, WithholdingResult, CalculationMode } from '@/types/tax';
import { PAYMENT_CATEGORIES, getCategoryById, getDefaultTaxRateForCategory } from '@/lib/tax/withholdingRates';
import { calculateWithholding, validateWithholdingInput } from '@/lib/tax/calculateWithholding';
import { clsx } from 'clsx';

interface WithholdingFormProps {
  onCalculate: (result: WithholdingResult, input: WithholdingInput) => void;
  locale: 'th' | 'en';
  translations: {
    title: string;
    paymentType: string;
    selectPaymentType: string;
    calculationMode: string;
    grossToNet: string;
    netToGross: string;
    amount: string;
    grossAmount: string;
    netAmount: string;
    enterAmount: string;
    taxRate: string;
    calculate: string;
    clear: string;
  };
}

export function WithholdingForm({ locale, translations, onCalculate }: WithholdingFormProps) {
  // Form state
  const [paymentCategory, setPaymentCategory] = useState<string>('service');
  const [mode, setMode] = useState<CalculationMode>('gross_to_net');
  const [amount, setAmount] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-populate tax rate when category changes
  useEffect(() => {
    const defaultRate = getDefaultTaxRateForCategory(paymentCategory);
    setTaxRate(defaultRate.toString());
  }, [paymentCategory]);

  const handleCalculate = () => {
    // Validate inputs
    const input: Partial<WithholdingInput> = {
      mode,
      paymentCategory,
      taxRate: taxRate ? parseFloat(taxRate) : undefined,
      amount: amount ? parseFloat(amount) : undefined,
    };

    const validation = validateWithholdingInput(input);

    if (!validation.isValid) {
      const newErrors: Record<string, string> = {};
      validation.errors.forEach((error) => {
        if (error.includes('amount')) newErrors.amount = error;
        if (error.includes('rate')) newErrors.taxRate = error;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Calculate
    const result = calculateWithholding(input as WithholdingInput);
    onCalculate(result, input as WithholdingInput);
  };

  const handleClear = () => {
    setAmount('');
    const defaultRate = getDefaultTaxRateForCategory(paymentCategory);
    setTaxRate(defaultRate.toString());
    setErrors({});
  };

  const category = getCategoryById(paymentCategory);
  const amountLabel = mode === 'gross_to_net' ? translations.grossAmount : translations.netAmount;

  return (
    <Card variant="dashboard" padding="lg" className="h-full">
      <CardHeader
        title={translations.title}
        action={
          <CalculatorIcon className="text-brand-primary dark:text-brand-accent" size={24} />
        }
      />

      <div className="space-y-5">
        {/* Payment Category Select */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-brand-text dark:text-brand-text-dark mb-2"
          >
            {translations.paymentType}
          </label>
          <select
            id="category"
            value={paymentCategory}
            onChange={(e) => setPaymentCategory(e.target.value)}
            className={clsx(
              'w-full px-4 py-2.5 rounded-xl border transition-all duration-200',
              'bg-brand-light-surface dark:bg-brand-dark-surface',
              'border-brand-light-border dark:border-brand-dark-border',
              'text-brand-text dark:text-brand-text-dark',
              'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
              'hover:border-brand-primary-300 dark:hover:border-brand-accent'
            )}
          >
            {PAYMENT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {locale === 'th' ? cat.labelTh : cat.labelEn}
              </option>
            ))}
          </select>
          {category && (
            <p className="mt-1.5 text-xs text-brand-text-light dark:text-brand-text-dark-light">
              {locale === 'th' ? category.descriptionTh : category.descriptionEn}
            </p>
          )}
        </div>

        {/* Calculation Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-brand-text dark:text-brand-text-dark mb-2">
            {translations.calculationMode}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('gross_to_net')}
              className={clsx(
                'px-4 py-3 rounded-xl font-medium transition-all duration-200',
                'border-2',
                mode === 'gross_to_net'
                  ? 'bg-brand-accent text-white border-brand-accent shadow-md'
                  : 'bg-brand-light-surface dark:bg-brand-dark-surface text-brand-text-light dark:text-brand-text-dark-light border-brand-light-border dark:border-brand-dark-border hover:border-brand-accent hover:text-brand-accent dark:hover:text-brand-accent'
              )}
            >
              {translations.grossToNet}
            </button>
            <button
              type="button"
              onClick={() => setMode('net_to_gross')}
              className={clsx(
                'px-4 py-3 rounded-xl font-medium transition-all duration-200',
                'border-2',
                mode === 'net_to_gross'
                  ? 'bg-brand-accent text-white border-brand-accent shadow-md'
                  : 'bg-brand-light-surface dark:bg-brand-dark-surface text-brand-text-light dark:text-brand-text-dark-light border-brand-light-border dark:border-brand-dark-border hover:border-brand-accent hover:text-brand-accent dark:hover:text-brand-accent'
              )}
            >
              {translations.netToGross}
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-brand-text dark:text-brand-text-dark mb-2"
          >
            {amountLabel}
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={translations.enterAmount}
              className={clsx(
                'w-full pl-4 pr-12 py-2.5 rounded-xl border transition-all duration-200',
                'bg-brand-light-surface dark:bg-brand-dark-surface',
                'text-brand-text dark:text-brand-text-dark',
                'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
                errors.amount
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-brand-light-border dark:border-brand-dark-border hover:border-brand-primary-300 dark:hover:border-brand-accent'
              )}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-light dark:text-brand-text-dark-light font-medium">
              ฿
            </span>
          </div>
          {errors.amount && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.amount}</p>
          )}
        </div>

        {/* Tax Rate Input */}
        <div>
          <label
            htmlFor="taxRate"
            className="block text-sm font-medium text-brand-text dark:text-brand-text-dark mb-2"
          >
            {translations.taxRate}
          </label>
          <div className="relative">
            <input
              id="taxRate"
              type="number"
              step="0.1"
              min="0"
              max="35"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              placeholder="3.0"
              className={clsx(
                'w-full pl-4 pr-12 py-2.5 rounded-xl border transition-all duration-200',
                'bg-brand-light-surface dark:bg-brand-dark-surface',
                'text-brand-text dark:text-brand-text-dark',
                'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
                errors.taxRate
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-brand-light-border dark:border-brand-dark-border hover:border-brand-primary-300 dark:hover:border-brand-accent'
              )}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-light dark:text-brand-text-dark-light font-medium">
              %
            </span>
          </div>
          {errors.taxRate && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.taxRate}</p>
          )}
          <p className="mt-1.5 text-xs text-brand-text-lighter dark:text-brand-text-dark-lighter">
            {locale === 'th'
              ? 'อัตราภาษีจะถูกกรอกอัตโนมัติตามประเภทการจ่าย (สามารถปรับแต่งได้)'
              : 'Tax rate is auto-filled based on payment type (can be customized)'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleCalculate}
            className="flex-1 px-6 py-3 bg-brand-accent hover:bg-brand-accent-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            {translations.calculate}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 bg-brand-light-surface dark:bg-brand-dark-surface border-2 border-brand-light-border dark:border-brand-dark-border text-brand-text-light dark:text-brand-text-dark-light font-semibold rounded-xl hover:border-brand-primary hover:text-brand-primary dark:hover:border-brand-accent dark:hover:text-brand-accent transition-all duration-200"
          >
            {translations.clear}
          </button>
        </div>
      </div>
    </Card>
  );
}

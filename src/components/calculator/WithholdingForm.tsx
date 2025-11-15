/**
 * WithholdingForm component
 * Form for entering withholding tax calculation parameters
 */

'use client';

import { useState } from 'react';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { PaymentCategory, CalculationMode, TaxCalculationResult } from '@/types/tax';
import { getAllCategories } from '@/lib/tax/withholdingRates';
import { calculateWithholding } from '@/lib/tax/calculateWithholding';

interface WithholdingFormProps {
  locale: 'th' | 'en';
  translations: {
    title: string;
    paymentType: string;
    selectPaymentType: string;
    calculationMode: string;
    grossToNet: string;
    netToGross: string;
    amount: string;
    enterAmount: string;
    customRate: string;
    calculate: string;
    clear: string;
  };
  onCalculate: (result: TaxCalculationResult) => void;
}

export function WithholdingForm({
  locale,
  translations,
  onCalculate,
}: WithholdingFormProps) {
  const [category, setCategory] = useState<PaymentCategory>('service_general');
  const [mode, setMode] = useState<CalculationMode>('grossToNet');
  const [amount, setAmount] = useState<string>('');
  const [customRate, setCustomRate] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = getAllCategories();
  const categoryOptions = categories.map((cat) => ({
    value: cat.category,
    label: locale === 'th' ? cat.nameTh : cat.nameEn,
  }));

  const handleCalculate = () => {
    // Validate inputs
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = locale === 'th' ? 'กรุณากรอกจำนวนเงินที่ถูกต้อง' : 'Please enter a valid amount';
    }

    if (customRate && (parseFloat(customRate) < 0 || parseFloat(customRate) > 100)) {
      newErrors.customRate = locale === 'th' ? 'อัตราภาษีต้องอยู่ระหว่าง 0-100' : 'Tax rate must be between 0-100';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Perform calculation
    const result = calculateWithholding({
      category,
      mode,
      amount: parseFloat(amount),
      customRate: customRate ? parseFloat(customRate) : undefined,
    });

    onCalculate(result);
  };

  const handleClear = () => {
    setAmount('');
    setCustomRate('');
    setErrors({});
  };

  return (
    <Card variant="elevated" padding="lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {translations.title}
      </h2>

      <div className="space-y-4">
        {/* Payment Type Select */}
        <Select
          label={translations.paymentType}
          value={category}
          onChange={(e) => setCategory(e.target.value as PaymentCategory)}
          options={categoryOptions}
          placeholder={translations.selectPaymentType}
        />

        {/* Calculation Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {translations.calculationMode}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode('grossToNet')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'grossToNet'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {translations.grossToNet}
            </button>
            <button
              type="button"
              onClick={() => setMode('netToGross')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'netToGross'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {translations.netToGross}
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <Input
          label={translations.amount}
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={translations.enterAmount}
          error={errors.amount}
          rightIcon={<span className="text-sm">฿</span>}
        />

        {/* Custom Rate Input (Optional) */}
        <Input
          label={translations.customRate}
          type="number"
          step="0.1"
          min="0"
          max="100"
          value={customRate}
          onChange={(e) => setCustomRate(e.target.value)}
          placeholder="3.0"
          error={errors.customRate}
          rightIcon={<span className="text-sm">%</span>}
          helpText={locale === 'th' ? 'ถ้าไม่กรอก จะใช้อัตราตามประเภทการจ่าย' : 'If not specified, default rate will be used'}
        />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleCalculate}
          >
            {translations.calculate}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleClear}
          >
            {translations.clear}
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * PlannerAddForm component
 * Phase 4: Form to add new invoices to the tax planner
 * Premium dashboard design with auto-calculation
 */

'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { PlannerItem } from '@/types/planner';
import { PAYMENT_CATEGORIES, getCategoryById, getDefaultTaxRateForCategory } from '@/lib/tax/withholdingRates';
import { calculateWithholding } from '@/lib/tax/calculateWithholding';

interface PlannerAddFormProps {
  locale: 'th' | 'en';
  translations: {
    title: string;
    date: string;
    category: string;
    selectCategory: string;
    gross: string;
    enterGross: string;
    taxRate: string;
    description: string;
    enterDescription: string;
    addButton: string;
  };
  onAdd: (item: PlannerItem) => void;
}

export function PlannerAddForm({
  locale,
  translations,
  onAdd,
}: PlannerAddFormProps) {
  const [invoiceDate, setInvoiceDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [categoryId, setCategoryId] = useState<string>('service');
  const [gross, setGross] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('3');
  const [description, setDescription] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-update tax rate when category changes
  useEffect(() => {
    const defaultRate = getDefaultTaxRateForCategory(categoryId);
    setTaxRate(defaultRate.toString());
  }, [categoryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate
    const newErrors: Record<string, string> = {};
    const grossAmount = parseFloat(gross);
    const rate = parseFloat(taxRate);

    if (!invoiceDate) {
      newErrors.date = locale === 'th' ? 'กรุณาเลือกวันที่' : 'Please select a date';
    }

    if (!gross || isNaN(grossAmount) || grossAmount <= 0) {
      newErrors.gross = locale === 'th' ? 'กรุณากรอกจำนวนเงินที่ถูกต้อง' : 'Please enter a valid amount';
    }

    if (!taxRate || isNaN(rate) || rate < 0 || rate > 35) {
      newErrors.taxRate = locale === 'th' ? 'อัตราภาษีต้องอยู่ระหว่าง 0-35%' : 'Tax rate must be between 0-35%';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate tax using Phase 3 logic
    const result = calculateWithholding({
      mode: 'gross_to_net',
      paymentCategory: categoryId,
      taxRate: rate,
      amount: grossAmount,
    });

    // Create new planner item
    const newItem: PlannerItem = {
      id: Date.now().toString(),
      invoiceDate,
      categoryId,
      description: description || undefined,
      gross: result.gross,
      taxRate: rate,
      tax: result.tax,
      net: result.net,
    };

    onAdd(newItem);

    // Reset form
    setGross('');
    setDescription('');
    setInvoiceDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Card variant="dashboard" padding="lg" className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-brand-primary dark:text-brand-text-dark mb-1 tracking-tight">
          {translations.title}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date Input */}
        <div>
          <label
            htmlFor="invoiceDate"
            className="block text-sm font-medium text-brand-text-light dark:text-brand-text-dark-light mb-2"
          >
            {translations.date}
          </label>
          <input
            type="date"
            id="invoiceDate"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-brand-light-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-brand-text dark:text-brand-text-dark focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
          )}
        </div>

        {/* Category Select */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-brand-text-light dark:text-brand-text-dark-light mb-2"
          >
            {translations.category}
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-brand-light-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-brand-text dark:text-brand-text-dark focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
          >
            {PAYMENT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {locale === 'th' ? cat.labelTh : cat.labelEn}
              </option>
            ))}
          </select>
        </div>

        {/* Gross Amount Input */}
        <div>
          <label
            htmlFor="gross"
            className="block text-sm font-medium text-brand-text-light dark:text-brand-text-dark-light mb-2"
          >
            {translations.gross}
          </label>
          <input
            type="number"
            id="gross"
            value={gross}
            onChange={(e) => setGross(e.target.value)}
            placeholder={translations.enterGross}
            step="0.01"
            min="0"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-brand-light-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-brand-text dark:text-brand-text-dark focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
          />
          {errors.gross && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gross}</p>
          )}
        </div>

        {/* Tax Rate Input */}
        <div>
          <label
            htmlFor="taxRate"
            className="block text-sm font-medium text-brand-text-light dark:text-brand-text-dark-light mb-2"
          >
            {translations.taxRate}
          </label>
          <div className="relative">
            <input
              type="number"
              id="taxRate"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              step="0.1"
              min="0"
              max="35"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-brand-light-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-brand-text dark:text-brand-text-dark focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-lighter dark:text-brand-text-dark-lighter">
              %
            </span>
          </div>
          {errors.taxRate && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.taxRate}</p>
          )}
        </div>

        {/* Description Input (Optional) */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-brand-text-light dark:text-brand-text-dark-light mb-2"
          >
            {translations.description}
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={translations.enterDescription}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-brand-light-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-brand-text dark:text-brand-text-dark focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-brand-primary dark:bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-primary-dark dark:hover:bg-brand-accent-dark shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          {translations.addButton}
        </button>
      </form>
    </Card>
  );
}

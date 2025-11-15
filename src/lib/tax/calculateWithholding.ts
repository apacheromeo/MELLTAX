/**
 * Thai Withholding Tax Calculation Functions
 */

import { TaxCalculationInput, TaxCalculationResult } from '@/types/tax';
import { getTaxRate } from './withholdingRates';

/**
 * Calculate withholding tax based on input parameters
 *
 * Formula explanations:
 *
 * 1. Gross to Net (กรณีรับเงินรวมภาษี):
 *    - Tax Amount = Gross × Tax Rate
 *    - Net Amount = Gross - Tax Amount
 *
 * 2. Net to Gross (กรณีรับเงินสุทธิ):
 *    - Gross Amount = Net ÷ (1 - Tax Rate)
 *    - Tax Amount = Gross - Net
 *
 * @param input - The calculation input parameters
 * @returns The calculation result with all amounts
 */
export function calculateWithholding(input: TaxCalculationInput): TaxCalculationResult {
  const { category, mode, amount, customRate } = input;

  // Get the tax rate (use custom rate if provided, otherwise use standard rate)
  const taxRateConfig = getTaxRate(category);
  const taxRatePercent = customRate ?? taxRateConfig.rate;
  const taxRateDecimal = taxRatePercent / 100;

  let grossAmount: number;
  let netAmount: number;
  let taxAmount: number;

  if (mode === 'grossToNet') {
    // User enters gross amount, we calculate tax and net
    grossAmount = amount;
    taxAmount = grossAmount * taxRateDecimal;
    netAmount = grossAmount - taxAmount;
  } else {
    // mode === 'netToGross'
    // User enters net amount, we calculate gross and tax backwards
    netAmount = amount;
    grossAmount = netAmount / (1 - taxRateDecimal);
    taxAmount = grossAmount - netAmount;
  }

  // Round to 2 decimal places for currency
  grossAmount = Math.round(grossAmount * 100) / 100;
  netAmount = Math.round(netAmount * 100) / 100;
  taxAmount = Math.round(taxAmount * 100) / 100;

  return {
    grossAmount,
    netAmount,
    taxAmount,
    taxRate: taxRatePercent,
    category,
    mode,
  };
}

/**
 * Format amount as Thai Baht currency
 */
export function formatCurrency(amount: number, locale: 'th' | 'en' = 'th'): string {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number, locale: 'th' | 'en' = 'th'): string {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Validate calculation input
 */
export function validateCalculationInput(input: Partial<TaxCalculationInput>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!input.category) {
    errors.push('Payment category is required');
  }

  if (!input.mode) {
    errors.push('Calculation mode is required');
  }

  if (input.amount === undefined || input.amount === null) {
    errors.push('Amount is required');
  } else if (input.amount <= 0) {
    errors.push('Amount must be greater than zero');
  }

  if (input.customRate !== undefined) {
    if (input.customRate < 0 || input.customRate > 100) {
      errors.push('Tax rate must be between 0 and 100');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

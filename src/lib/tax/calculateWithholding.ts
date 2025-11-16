/**
 * Withholding Tax Calculation Functions
 * Phase 3: Core calculation logic
 */

import { WithholdingInput, WithholdingResult } from '@/types/tax';

/**
 * Helper function to round numbers to 2 decimal places
 */
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Calculate withholding tax based on input parameters
 *
 * Formula explanations:
 *
 * 1. Gross to Net (mode = 'gross_to_net'):
 *    - Tax = Gross × (Rate / 100)
 *    - Net = Gross - Tax
 *
 * 2. Net to Gross (mode = 'net_to_gross'):
 *    - Gross = Net / (1 - Rate/100)
 *    - Tax = Gross - Net
 *
 * @param input - The calculation input parameters
 * @returns The calculation result with all amounts
 */
export function calculateWithholding(input: WithholdingInput): WithholdingResult {
  const { mode, taxRate, amount } = input;

  // Convert percentage to decimal
  const rateDecimal = taxRate / 100;

  let gross: number;
  let net: number;
  let tax: number;

  if (mode === 'gross_to_net') {
    // User enters gross amount, we calculate tax and net
    gross = amount;
    tax = gross * rateDecimal;
    net = gross - tax;
  } else {
    // mode === 'net_to_gross'
    // User enters net amount, we calculate gross and tax backwards
    net = amount;
    gross = net / (1 - rateDecimal);
    tax = gross - net;
  }

  // Round all values to 2 decimal places
  return {
    gross: round2(gross),
    net: round2(net),
    tax: round2(tax),
    taxRate,
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
 * Returns errors if validation fails
 */
export function validateWithholdingInput(input: Partial<WithholdingInput>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!input.paymentCategory) {
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

  if (input.taxRate === undefined || input.taxRate === null) {
    errors.push('Tax rate is required');
  } else if (input.taxRate <= 0) {
    errors.push('Tax rate must be greater than zero');
  } else if (input.taxRate > 35) {
    errors.push('Tax rate cannot exceed 35%');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

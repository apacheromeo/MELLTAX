/**
 * VAT Calculator for Thailand
 * Handles current 7% rate and future 10% standard rate
 */

export const VAT_RATES = {
  current: 7, // Until September 30, 2025
  standard: 10, // Legal standard rate
  zero: 0, // Exports
} as const;

export const VAT_EXPIRY_DATE = new Date('2025-09-30');
export const VAT_REGISTRATION_THRESHOLD = 1800000; // 1.8M THB

export interface VATCalculation {
  amount: number;
  rate: number;
  vatAmount: number;
  totalWithVAT: number;
  totalWithoutVAT: number;
}

/**
 * Calculate VAT from amount (excluding VAT)
 */
export function calculateVATFromExcludingAmount(
  amountExcludingVAT: number,
  rate: number = VAT_RATES.current
): VATCalculation {
  const vatAmount = (amountExcludingVAT * rate) / 100;
  const totalWithVAT = amountExcludingVAT + vatAmount;

  return {
    amount: amountExcludingVAT,
    rate,
    vatAmount: Math.round(vatAmount * 100) / 100,
    totalWithVAT: Math.round(totalWithVAT * 100) / 100,
    totalWithoutVAT: amountExcludingVAT,
  };
}

/**
 * Calculate VAT from amount (including VAT)
 */
export function calculateVATFromIncludingAmount(
  amountIncludingVAT: number,
  rate: number = VAT_RATES.current
): VATCalculation {
  const amountExcludingVAT = (amountIncludingVAT * 100) / (100 + rate);
  const vatAmount = amountIncludingVAT - amountExcludingVAT;

  return {
    amount: Math.round(amountExcludingVAT * 100) / 100,
    rate,
    vatAmount: Math.round(vatAmount * 100) / 100,
    totalWithVAT: amountIncludingVAT,
    totalWithoutVAT: Math.round(amountExcludingVAT * 100) / 100,
  };
}

/**
 * Calculate VAT payable (Output VAT - Input VAT)
 */
export function calculateVATPayable(
  outputVAT: number,
  inputVAT: number
): {
  outputVAT: number;
  inputVAT: number;
  vatPayable: number;
  isRefundable: boolean;
} {
  const vatPayable = outputVAT - inputVAT;

  return {
    outputVAT,
    inputVAT,
    vatPayable: Math.round(vatPayable * 100) / 100,
    isRefundable: vatPayable < 0,
  };
}

/**
 * Check if VAT registration is required
 */
export function shouldRegisterVAT(annualTurnover: number): {
  required: boolean;
  threshold: number;
  exceededBy: number;
  percentage: number;
} {
  const required = annualTurnover > VAT_REGISTRATION_THRESHOLD;
  const exceededBy = Math.max(0, annualTurnover - VAT_REGISTRATION_THRESHOLD);
  const percentage = (annualTurnover / VAT_REGISTRATION_THRESHOLD) * 100;

  return {
    required,
    threshold: VAT_REGISTRATION_THRESHOLD,
    exceededBy,
    percentage: Math.round(percentage * 100) / 100,
  };
}

/**
 * Calculate days until VAT rate change
 */
export function getDaysUntilVATRateChange(): number {
  const now = new Date();
  const diff = VAT_EXPIRY_DATE.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Compare current vs future VAT rates
 */
export function compareVATRates(amount: number): {
  currentRate: VATCalculation;
  standardRate: VATCalculation;
  difference: number;
  percentageIncrease: number;
} {
  const currentRate = calculateVATFromExcludingAmount(amount, VAT_RATES.current);
  const standardRate = calculateVATFromExcludingAmount(amount, VAT_RATES.standard);
  const difference = standardRate.vatAmount - currentRate.vatAmount;
  const percentageIncrease = ((VAT_RATES.standard - VAT_RATES.current) / VAT_RATES.current) * 100;

  return {
    currentRate,
    standardRate,
    difference: Math.round(difference * 100) / 100,
    percentageIncrease: Math.round(percentageIncrease * 100) / 100,
  };
}

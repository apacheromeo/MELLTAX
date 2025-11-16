/**
 * Personal Income Tax Calculator
 * Calculate Thai progressive income tax (0-35%)
 */

// Thai Personal Income Tax Brackets (2025)
export const TAX_BRACKETS = [
  { min: 0, max: 150000, rate: 0 },
  { min: 150001, max: 300000, rate: 5 },
  { min: 300001, max: 500000, rate: 10 },
  { min: 500001, max: 750000, rate: 15 },
  { min: 750001, max: 1000000, rate: 20 },
  { min: 1000001, max: 2000000, rate: 25 },
  { min: 2000001, max: 5000000, rate: 30 },
  { min: 5000001, max: Infinity, rate: 35 },
] as const;

// Personal Allowances (THB per year)
export const ALLOWANCES = {
  personal: 60000,
  spouse: 60000,
  child: 30000,
  parent: 30000, // per parent
  pregnancyChildbirth: 60000,
  lifeInsurance: 100000, // combined with health
  healthInsurance: 25000,
  parentHealthInsurance: 15000,
} as const;

export interface PersonalIncome {
  salary: number;
  freelance: number;
  rental: number;
  investment: number;
  other: number;
}

export interface Deductions {
  personalAllowance: boolean;
  spouseAllowance: boolean;
  childrenCount: number;
  parentsCount: number; // 0-4 (taxpayer + spouse parents)
  lifeInsurance: number;
  healthInsurance: number;
  parentHealthInsurance: number;
  providentFund: number;
  rmf: number; // Retirement Mutual Fund
  ssf: number; // Super Savings Fund
  donations: number;
  homeLoanInterest: number;
  socialSecurity: number;
}

export interface TaxResult {
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxByBracket: Array<{
    bracket: string;
    amount: number;
    rate: number;
    tax: number;
  }>;
  totalTax: number;
  effectiveRate: number;
  netIncome: number;
}

/**
 * Calculate personal income tax
 */
export function calculatePersonalIncomeTax(
  income: PersonalIncome,
  deductions: Deductions
): TaxResult {
  // Calculate total income
  const totalIncome =
    income.salary +
    income.freelance +
    income.rental +
    income.investment +
    income.other;

  // Calculate total deductions
  let totalDeductions = 0;

  if (deductions.personalAllowance) {
    totalDeductions += ALLOWANCES.personal;
  }

  if (deductions.spouseAllowance) {
    totalDeductions += ALLOWANCES.spouse;
  }

  totalDeductions += deductions.childrenCount * ALLOWANCES.child;
  totalDeductions += deductions.parentsCount * ALLOWANCES.parent;
  totalDeductions += Math.min(deductions.lifeInsurance, ALLOWANCES.lifeInsurance);
  totalDeductions += Math.min(deductions.healthInsurance, ALLOWANCES.healthInsurance);
  totalDeductions += Math.min(
    deductions.parentHealthInsurance,
    ALLOWANCES.parentHealthInsurance
  );
  totalDeductions += deductions.providentFund;
  totalDeductions += deductions.rmf;
  totalDeductions += deductions.ssf;
  totalDeductions += deductions.donations;
  totalDeductions += deductions.homeLoanInterest;
  totalDeductions += deductions.socialSecurity;

  // Calculate taxable income
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);

  // Calculate tax by bracket
  const taxByBracket: TaxResult['taxByBracket'] = [];
  let totalTax = 0;
  let remainingIncome = taxableIncome;

  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    const bracket = TAX_BRACKETS[i];
    const nextBracket = TAX_BRACKETS[i + 1];

    if (remainingIncome <= 0) break;

    const bracketMin = bracket.min;
    const bracketMax = bracket.max === Infinity ? Infinity : bracket.max;
    const bracketRange = bracketMax === Infinity ? Infinity : bracketMax - bracketMin + 1;

    // Amount of income in this bracket
    let amountInBracket = 0;

    if (taxableIncome <= bracketMax) {
      amountInBracket = Math.max(0, taxableIncome - bracket.min);
    } else {
      amountInBracket = Math.min(remainingIncome, bracketRange);
    }

    if (amountInBracket > 0) {
      const taxInBracket = (amountInBracket * bracket.rate) / 100;
      totalTax += taxInBracket;

      taxByBracket.push({
        bracket:
          bracket.max === Infinity
            ? `Over ${bracket.min.toLocaleString()}`
            : `${bracket.min.toLocaleString()} - ${bracket.max.toLocaleString()}`,
        amount: amountInBracket,
        rate: bracket.rate,
        tax: taxInBracket,
      });

      remainingIncome -= amountInBracket;
    }

    if (!nextBracket || taxableIncome <= bracket.max) break;
  }

  const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
  const netIncome = totalIncome - totalTax;

  return {
    totalIncome,
    totalDeductions,
    taxableIncome,
    taxByBracket,
    totalTax: Math.round(totalTax),
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    netIncome: Math.round(netIncome),
  };
}

/**
 * Calculate tax savings from deductions
 */
export function calculateTaxSavings(
  income: PersonalIncome,
  deductionsWithout: Deductions,
  deductionsWith: Deductions
): {
  taxWithout: number;
  taxWith: number;
  savings: number;
  savingsPercentage: number;
} {
  const resultWithout = calculatePersonalIncomeTax(income, deductionsWithout);
  const resultWith = calculatePersonalIncomeTax(income, deductionsWith);

  const savings = resultWithout.totalTax - resultWith.totalTax;
  const savingsPercentage =
    resultWithout.totalTax > 0
      ? (savings / resultWithout.totalTax) * 100
      : 0;

  return {
    taxWithout: resultWithout.totalTax,
    taxWith: resultWith.totalTax,
    savings,
    savingsPercentage: Math.round(savingsPercentage * 100) / 100,
  };
}

/**
 * Get tax bracket for a given income
 */
export function getTaxBracket(taxableIncome: number): typeof TAX_BRACKETS[number] {
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome >= bracket.min && taxableIncome <= bracket.max) {
      return bracket;
    }
  }
  return TAX_BRACKETS[TAX_BRACKETS.length - 1];
}

/**
 * Estimate quarterly tax payment
 */
export function estimateQuarterlyTax(annualIncome: number): {
  quarterly: number;
  monthly: number;
  annual: number;
} {
  // Simple estimation using basic deductions
  const basicDeductions: Deductions = {
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
  };

  const income: PersonalIncome = {
    salary: annualIncome,
    freelance: 0,
    rental: 0,
    investment: 0,
    other: 0,
  };

  const result = calculatePersonalIncomeTax(income, basicDeductions);

  return {
    annual: result.totalTax,
    quarterly: Math.round(result.totalTax / 4),
    monthly: Math.round(result.totalTax / 12),
  };
}

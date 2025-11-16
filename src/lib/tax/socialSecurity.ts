/**
 * Social Security Calculator for Thailand
 * Includes traditional SSF and new Employee Welfare Fund (2025)
 */

// Social Security Fund rates
export const SOCIAL_SECURITY = {
  employeeRate: 5, // 5% of wages
  employerRate: 5, // 5% of wages
  minWage: 1650, // Minimum calculation base
  maxWage: 15000, // Maximum calculation base
  minContribution: 83, // 1650 * 5% = 82.5, rounded to 83
  maxContribution: 750, // 15000 * 5% = 750
} as const;

// New Employee Welfare Fund (starting October 2025)
export const EMPLOYEE_WELFARE_FUND = {
  effectiveDate: new Date('2025-10-01'),
  initialRate: 0.25, // 0.25% from Oct 2025 - Sep 2030
  futureRate: 0.5, // 0.5% from Oct 2030 onwards
  minEmployees: 10, // Applies to employers with 10+ employees
  futureRateDate: new Date('2030-10-01'),
} as const;

export interface SocialSecurityCalculation {
  wage: number;
  calculationBase: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  employeeRate: number;
  employerRate: number;
}

export interface WelfareFundCalculation {
  wage: number;
  rate: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  effectiveFrom: Date;
}

export interface TotalContributions {
  socialSecurity: SocialSecurityCalculation;
  welfareFund: WelfareFundCalculation | null;
  totalEmployeeContribution: number;
  totalEmployerContribution: number;
  totalCost: number;
  percentageOfWage: number;
}

/**
 * Calculate Social Security contributions
 */
export function calculateSocialSecurity(monthlyWage: number): SocialSecurityCalculation {
  // Determine calculation base (min 1650, max 15000)
  const calculationBase = Math.max(
    SOCIAL_SECURITY.minWage,
    Math.min(monthlyWage, SOCIAL_SECURITY.maxWage)
  );

  const employeeContribution = Math.round((calculationBase * SOCIAL_SECURITY.employeeRate) / 100);
  const employerContribution = Math.round((calculationBase * SOCIAL_SECURITY.employerRate) / 100);

  // Ensure contributions are within min/max limits
  const finalEmployeeContribution = Math.max(
    SOCIAL_SECURITY.minContribution,
    Math.min(employeeContribution, SOCIAL_SECURITY.maxContribution)
  );
  const finalEmployerContribution = Math.max(
    SOCIAL_SECURITY.minContribution,
    Math.min(employerContribution, SOCIAL_SECURITY.maxContribution)
  );

  return {
    wage: monthlyWage,
    calculationBase,
    employeeContribution: finalEmployeeContribution,
    employerContribution: finalEmployerContribution,
    totalContribution: finalEmployeeContribution + finalEmployerContribution,
    employeeRate: SOCIAL_SECURITY.employeeRate,
    employerRate: SOCIAL_SECURITY.employerRate,
  };
}

/**
 * Calculate Employee Welfare Fund contribution
 */
export function calculateWelfareFund(
  monthlyWage: number,
  numberOfEmployees: number,
  calculationDate: Date = new Date()
): WelfareFundCalculation | null {
  // Check if applicable
  if (numberOfEmployees < EMPLOYEE_WELFARE_FUND.minEmployees) {
    return null;
  }

  // Check if effective yet
  if (calculationDate < EMPLOYEE_WELFARE_FUND.effectiveDate) {
    return null;
  }

  // Determine rate based on date
  const rate =
    calculationDate >= EMPLOYEE_WELFARE_FUND.futureRateDate
      ? EMPLOYEE_WELFARE_FUND.futureRate
      : EMPLOYEE_WELFARE_FUND.initialRate;

  const employeeContribution = Math.round((monthlyWage * rate) / 100 * 100) / 100;
  const employerContribution = Math.round((monthlyWage * rate) / 100 * 100) / 100;

  return {
    wage: monthlyWage,
    rate,
    employeeContribution,
    employerContribution,
    totalContribution: employeeContribution + employerContribution,
    effectiveFrom: EMPLOYEE_WELFARE_FUND.effectiveDate,
  };
}

/**
 * Calculate total contributions (SSF + Welfare Fund)
 */
export function calculateTotalContributions(
  monthlyWage: number,
  numberOfEmployees: number,
  calculationDate: Date = new Date()
): TotalContributions {
  const socialSecurity = calculateSocialSecurity(monthlyWage);
  const welfareFund = calculateWelfareFund(monthlyWage, numberOfEmployees, calculationDate);

  const totalEmployeeContribution =
    socialSecurity.employeeContribution + (welfareFund?.employeeContribution || 0);
  const totalEmployerContribution =
    socialSecurity.employerContribution + (welfareFund?.employerContribution || 0);
  const totalCost = totalEmployeeContribution + totalEmployerContribution;

  return {
    socialSecurity,
    welfareFund,
    totalEmployeeContribution,
    totalEmployerContribution,
    totalCost,
    percentageOfWage: monthlyWage > 0 ? Math.round((totalCost / monthlyWage) * 100 * 100) / 100 : 0,
  };
}

/**
 * Calculate annual Social Security contributions
 */
export function calculateAnnualSocialSecurity(
  monthlyWage: number,
  numberOfEmployees: number,
  months: number = 12
): {
  monthly: TotalContributions;
  annual: {
    totalEmployeeContribution: number;
    totalEmployerContribution: number;
    totalCost: number;
  };
} {
  const monthly = calculateTotalContributions(monthlyWage, numberOfEmployees);

  return {
    monthly,
    annual: {
      totalEmployeeContribution: monthly.totalEmployeeContribution * months,
      totalEmployerContribution: monthly.totalEmployerContribution * months,
      totalCost: monthly.totalCost * months,
    },
  };
}

/**
 * Check if welfare fund is applicable
 */
export function isWelfareFundApplicable(
  numberOfEmployees: number,
  calculationDate: Date = new Date()
): {
  applicable: boolean;
  reason: string;
  effectiveDate: Date | null;
} {
  if (numberOfEmployees < EMPLOYEE_WELFARE_FUND.minEmployees) {
    return {
      applicable: false,
      reason: `Requires ${EMPLOYEE_WELFARE_FUND.minEmployees}+ employees (currently ${numberOfEmployees})`,
      effectiveDate: null,
    };
  }

  if (calculationDate < EMPLOYEE_WELFARE_FUND.effectiveDate) {
    return {
      applicable: false,
      reason: 'Not yet effective',
      effectiveDate: EMPLOYEE_WELFARE_FUND.effectiveDate,
    };
  }

  return {
    applicable: true,
    reason: 'Applicable',
    effectiveDate: EMPLOYEE_WELFARE_FUND.effectiveDate,
  };
}

/**
 * Number Formatting Utilities
 * Phase 8: Helpers for formatting and parsing currency/numeric values
 */

/**
 * Format number as Thai Baht currency
 * @param value - The numeric value to format
 * @param locale - The locale to use ('th-TH' or 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrencyTHB(value: number, locale: 'th' | 'en' = 'th'): string {
  const localeString = locale === 'th' ? 'th-TH' : 'en-US';

  return new Intl.NumberFormat(localeString, {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number with thousand separators (no currency symbol)
 * @param value - The numeric value to format
 * @param locale - The locale to use ('th-TH' or 'en-US')
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted number string
 */
export function formatNumber(value: number, locale: 'th' | 'en' = 'th', decimals: number = 2): string {
  const localeString = locale === 'th' ? 'th-TH' : 'en-US';

  return new Intl.NumberFormat(localeString, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Parse currency/number string to number
 * Removes currency symbols, spaces, and commas
 * @param input - The input string to parse
 * @returns Parsed number or null if invalid
 */
export function parseCurrency(input: string): number | null {
  if (!input || typeof input !== 'string') {
    return null;
  }

  // Remove currency symbols (฿, $, etc.), spaces, and commas
  const cleaned = input
    .replace(/[฿$,\s]/g, '')
    .trim();

  // Handle empty string
  if (cleaned === '') {
    return null;
  }

  // Parse as float
  const parsed = parseFloat(cleaned);

  // Validate
  if (isNaN(parsed) || !isFinite(parsed)) {
    return null;
  }

  return parsed;
}

/**
 * Format percentage
 * @param value - The numeric value (e.g., 0.05 for 5%)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Validate and sanitize numeric input for forms
 * @param input - The input value
 * @param allowNegative - Whether to allow negative numbers
 * @returns Sanitized numeric string
 */
export function sanitizeNumericInput(input: string, allowNegative: boolean = false): string {
  // Remove non-numeric characters except decimal point and minus
  let sanitized = input.replace(/[^\d.-]/g, '');

  // Handle negative sign
  if (!allowNegative) {
    sanitized = sanitized.replace(/-/g, '');
  } else {
    // Ensure only one minus at the start
    const hasLeadingMinus = sanitized.startsWith('-');
    sanitized = sanitized.replace(/-/g, '');
    if (hasLeadingMinus) {
      sanitized = '-' + sanitized;
    }
  }

  // Ensure only one decimal point
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }

  return sanitized;
}

/**
 * Format compact number (e.g., 1000 -> 1K, 1000000 -> 1M)
 * @param value - The numeric value to format
 * @param locale - The locale to use
 * @returns Formatted compact number string
 */
export function formatCompactNumber(value: number, locale: 'th' | 'en' = 'th'): string {
  const localeString = locale === 'th' ? 'th-TH' : 'en-US';

  return new Intl.NumberFormat(localeString, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}

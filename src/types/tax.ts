/**
 * Tax-related type definitions for MELLTAX
 */

// Payment category types for withholding tax
export type PaymentCategory =
  | 'service_general'       // บริการทั่วไป
  | 'advertising'           // ค่าโฆษณา
  | 'rent'                  // ค่าเช่า
  | 'professional_service'  // บริการวิชาชีพ (กฎหมาย, บัญชี, ฯลฯ)
  | 'transport'             // ค่าขนส่ง
  | 'royalty'               // ค่าลิขสิทธิ์
  | 'commission'            // ค่านายหน้า
  | 'prize'                 // เงินรางวัล
  | 'other';                // อื่นๆ

// Calculation mode: Gross to Net or Net to Gross
export type CalculationMode = 'grossToNet' | 'netToGross';

// Withholding tax rate configuration
export interface TaxRateConfig {
  category: PaymentCategory;
  rate: number; // percentage (e.g., 3 for 3%)
  nameTh: string;
  nameEn: string;
  descriptionTh?: string;
  descriptionEn?: string;
}

// Input for tax calculation
export interface TaxCalculationInput {
  category: PaymentCategory;
  mode: CalculationMode;
  amount: number; // The input amount (gross or net depending on mode)
  customRate?: number; // Optional: override the default rate
}

// Result of tax calculation
export interface TaxCalculationResult {
  grossAmount: number;
  netAmount: number;
  taxAmount: number;
  taxRate: number;
  category: PaymentCategory;
  mode: CalculationMode;
}

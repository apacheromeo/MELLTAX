/**
 * Tax planner type definitions for MELLTAX
 */

import { PaymentCategory } from './tax';

// A single invoice in the tax planner
export interface Invoice {
  id: string;
  date: string; // ISO date string
  category: PaymentCategory;
  grossAmount: number;
  taxRate: number; // percentage
  taxAmount: number;
  netAmount: number;
  notes?: string;
}

// Summary of all invoices in the planner
export interface PlannerSummary {
  totalGross: number;
  totalTax: number;
  totalNet: number;
  effectiveTaxRate: number; // weighted average
  invoiceCount: number;
}

// Chart data point for visualization
export interface ChartDataPoint {
  name: string; // invoice identifier or date
  gross: number;
  tax: number;
  net: number;
}

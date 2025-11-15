/**
 * User-related type definitions for MELLTAX
 * (Optional - for Supabase authentication)
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
}

export interface UserSession {
  user: User | null;
  isAuthenticated: boolean;
}

// Saved calculation history
export interface SavedCalculation {
  id: string;
  userId: string;
  category: string;
  grossAmount: number;
  taxAmount: number;
  netAmount: number;
  taxRate: number;
  createdAt: string;
}

// Saved tax plan
export interface SavedPlan {
  id: string;
  userId: string;
  name: string;
  invoices: any[]; // Array of Invoice objects (from planner.ts)
  createdAt: string;
  updatedAt: string;
}

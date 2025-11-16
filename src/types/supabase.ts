/**
 * Supabase Database Types
 * Phase 6: TypeScript definitions for database tables
 * 
 * These types match the SQL schema in supabase-schema.sql
 * They provide type safety when querying Supabase
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          preferred_language: 'th' | 'en' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          preferred_language?: 'th' | 'en' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          preferred_language?: 'th' | 'en' | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tax_calculations: {
        Row: {
          id: string;
          user_id: string | null;
          calculation_mode: 'gross_to_net' | 'net_to_gross';
          payment_category: string;
          tax_rate: number;
          gross_amount: number | null;
          net_amount: number | null;
          tax_amount: number;
          currency: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          calculation_mode: 'gross_to_net' | 'net_to_gross';
          payment_category: string;
          tax_rate: number;
          gross_amount?: number | null;
          net_amount?: number | null;
          tax_amount: number;
          currency?: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          calculation_mode?: 'gross_to_net' | 'net_to_gross';
          payment_category?: string;
          tax_rate?: number;
          gross_amount?: number | null;
          net_amount?: number | null;
          tax_amount?: number;
          currency?: string;
          metadata?: Json;
          created_at?: string;
        };
      };
      tax_plans: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          period_start: string | null;
          period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          period_start?: string | null;
          period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          period_start?: string | null;
          period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tax_plan_items: {
        Row: {
          id: string;
          plan_id: string;
          invoice_date: string | null;
          payment_category: string;
          description: string | null;
          gross_amount: number;
          tax_rate: number;
          tax_amount: number;
          net_amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          plan_id: string;
          invoice_date?: string | null;
          payment_category: string;
          description?: string | null;
          gross_amount: number;
          tax_rate: number;
          tax_amount: number;
          net_amount: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          plan_id?: string;
          invoice_date?: string | null;
          payment_category?: string;
          description?: string | null;
          gross_amount?: number;
          tax_rate?: number;
          tax_amount?: number;
          net_amount?: number;
          created_at?: string;
        };
      };
    };
  };
}

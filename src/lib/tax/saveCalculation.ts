/**
 * Save Calculation Service
 * Phase 6: Persist withholding tax calculations to Supabase
 * 
 * This service:
 * - Saves calculator results to the database
 * - Associates calculations with logged-in users
 * - Handles authentication errors gracefully
 */

import { supabaseBrowser } from '@/lib/supabase/client';
import { WithholdingInput, WithholdingResult } from '@/types/tax';

export interface SaveCalculationResult {
  success: boolean;
  error?: string;
  id?: string;
}

/**
 * Save a calculation to Supabase
 * @param input - The calculator input (mode, category, amount, rate)
 * @param result - The calculated result (gross, net, tax)
 * @returns Success status and error message if any
 */
export async function saveCalculationToSupabase(
  input: WithholdingInput,
  result: WithholdingResult
): Promise<SaveCalculationResult> {
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabaseBrowser.auth.getUser();
    
    if (authError || !user) {
      return {
        success: false,
        error: 'not_authenticated',
      };
    }

    // Prepare calculation data
    const calculationData = {
      user_id: user.id,
      calculation_mode: input.mode,
      payment_category: input.paymentCategory,
      tax_rate: result.taxRate,
      gross_amount: result.gross,
      net_amount: result.net,
      tax_amount: result.tax,
      currency: 'THB',
      metadata: {
        input_amount: input.amount,
        category_name: input.paymentCategory,
      },
    };

    // Insert into database
    const { data, error } = await supabaseBrowser
      .from('tax_calculations')
      .insert(calculationData as any)
      .select('id')
      .single();

    if (error) {
      console.error('Error saving calculation:', error);
      return {
        success: false,
        error: 'database_error',
      };
    }

    return {
      success: true,
      id: (data as any).id,
    };
  } catch (error) {
    console.error('Unexpected error saving calculation:', error);
    return {
      success: false,
      error: 'unexpected_error',
    };
  }
}

/**
 * Load recent calculations for current user
 * @param limit - Maximum number of calculations to fetch
 * @returns Array of recent calculations
 */
export async function loadRecentCalculations(limit = 10) {
  try {
    const { data: { user }, error: authError } = await supabaseBrowser.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'not_authenticated', calculations: [] };
    }

    const { data, error } = await supabaseBrowser
      .from('tax_calculations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error loading calculations:', error);
      return { success: false, error: 'database_error', calculations: [] };
    }

    return {
      success: true,
      calculations: data || [],
    };
  } catch (error) {
    console.error('Unexpected error loading calculations:', error);
    return { success: false, error: 'unexpected_error', calculations: [] };
  }
}

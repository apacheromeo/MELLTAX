/**
 * useToast Hook
 * Phase 8: Hook for showing toast notifications
 */

'use client';

import { useContext } from 'react';
import { ToastContext } from '@/components/common/ToastProvider';

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}

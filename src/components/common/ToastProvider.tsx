/**
 * ToastProvider Component
 * Phase 8: Context provider for toast notifications
 * Premium toast design with auto-dismiss and animations
 */

'use client';

import { createContext, useState, useCallback, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after duration (default 4 seconds)
    const duration = toast.duration || 4000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * ToastContainer - Renders all active toasts
 */
function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

/**
 * ToastItem - Individual toast notification
 */
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const { id, type, message } = toast;

  const typeStyles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: '✓',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: '✕',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800',
      text: 'text-amber-800 dark:text-amber-200',
      icon: '⚠',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'ℹ',
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-md p-4 rounded-xl border shadow-lg backdrop-blur-sm animate-in slide-in-from-right duration-300 ${style.bg}`}
      role="alert"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-white/50 dark:bg-black/20 flex items-center justify-center font-bold ${style.text}`}>
        {style.icon}
      </div>

      {/* Message */}
      <p className={`flex-1 text-sm font-medium ${style.text}`}>
        {message}
      </p>

      {/* Close Button */}
      <button
        onClick={() => onRemove(id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors ${style.text}`}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

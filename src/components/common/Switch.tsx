/**
 * Switch component
 * Toggle switch for binary options
 */

'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, className, id, checked, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={clsx('flex items-center', className)}>
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            className="sr-only peer"
            checked={checked}
            {...props}
          />

          <label
            htmlFor={switchId}
            className={clsx(
              'relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors',
              'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              checked
                ? 'bg-primary-600'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          >
            <span
              className={clsx(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                checked ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </label>
        </div>

        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={switchId}
                className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

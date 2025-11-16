/**
 * Card component - Dashboard style
 * Reusable card container with HR dashboard aesthetic
 * Supports multiple variants and optional header/footer
 */

import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'dashboard';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default:
      'bg-brand-light-surface dark:bg-brand-dark-surface border border-brand-light-border dark:border-brand-dark-border',
    bordered:
      'bg-brand-light-surface dark:bg-brand-dark-surface border-2 border-brand-primary-200 dark:border-brand-primary-700',
    elevated:
      'bg-brand-light-surface dark:bg-brand-dark-surface shadow-card border border-brand-light-border dark:border-brand-dark-border',
    dashboard:
      'bg-brand-light-surface dark:bg-brand-dark-surface shadow-dashboard border border-brand-light-border dark:border-brand-dark-border',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  };

  const hoverStyles = hover
    ? 'hover:shadow-card-hover hover:border-brand-primary-300 dark:hover:border-brand-primary-600 transition-all duration-200 cursor-pointer'
    : 'transition-colors duration-200';

  return (
    <div
      className={clsx(
        'rounded-card',
        variantStyles[variant],
        paddingStyles[padding],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={clsx('flex items-start justify-between mb-4', className)}
      {...props}
    >
      <div className="flex-1">
        {title && (
          <h3 className="text-lg font-semibold text-brand-text dark:text-brand-text-dark">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mt-1 text-sm text-brand-text-light dark:text-brand-text-dark-light">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'mt-4 pt-4 border-t border-brand-light-border dark:border-brand-dark-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

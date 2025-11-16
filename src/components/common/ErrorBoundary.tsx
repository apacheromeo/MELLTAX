/**
 * ErrorBoundary Component
 * Phase 8: Friendly error boundary for catching React errors
 * Shows nice error UI with retry functionality
 */

'use client';

import React, { Component, ReactNode } from 'react';
import { Card } from './Card';

interface ErrorBoundaryProps {
  children: ReactNode;
  locale?: 'th' | 'en';
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { locale = 'th', fallbackTitle, fallbackMessage } = this.props;

      const title = fallbackTitle || (locale === 'th'
        ? 'เกิดข้อผิดพลาดในการแสดงผล'
        : 'Something went wrong');

      const message = fallbackMessage || (locale === 'th'
        ? 'กรุณารีเฟรชหน้านี้ หรือทดลองใหม่อีกครั้ง'
        : 'Please refresh the page or try again');

      const retryText = locale === 'th' ? 'ลองใหม่อีกครั้ง' : 'Retry';
      const refreshText = locale === 'th' ? 'รีเฟรชหน้า' : 'Refresh Page';

      return (
        <Card variant="dashboard" padding="xl">
          <div className="text-center space-y-6 py-8">
            {/* Error Icon */}
            <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-4xl">⚠️</span>
            </div>

            {/* Error Text */}
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-brand-text dark:text-brand-text-dark">
                {title}
              </h3>
              <p className="text-brand-text-light dark:text-brand-text-dark-light max-w-md mx-auto">
                {message}
              </p>
            </div>

            {/* Error Details (dev mode only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left max-w-2xl mx-auto">
                <summary className="text-sm text-brand-text-lighter dark:text-brand-text-dark-lighter cursor-pointer hover:text-brand-accent">
                  {locale === 'th' ? 'รายละเอียดข้อผิดพลาด (โหมดพัฒนา)' : 'Error Details (Dev Mode)'}
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent/90 transition-all duration-200 shadow-sm"
              >
                {retryText}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 border border-brand-light-border dark:border-brand-dark-border text-brand-text dark:text-brand-text-dark font-semibold rounded-xl hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover transition-all duration-200"
              >
                {refreshText}
              </button>
            </div>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

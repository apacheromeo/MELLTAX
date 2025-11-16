/**
 * Global Error Page
 * Phase 8: Custom error page for global app errors
 */

'use client';

import { useEffect } from 'react';
import { Card } from '@/components/common/Card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <Card variant="dashboard" padding="xl">
          <div className="text-center space-y-8 py-12">
            {/* Error Icon */}
            <div className="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-5xl">⚠️</span>
            </div>

            {/* Thai Title & Description */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-semibold text-brand-text dark:text-brand-text-dark">
                เกิดข้อผิดพลาด
              </h1>
              <p className="text-lg text-brand-text-light dark:text-brand-text-dark-light max-w-md mx-auto">
                ขออภัย เกิดข้อผิดพลาดขณะทำงาน กรุณาลองใหม่อีกครั้ง
              </p>
            </div>

            {/* English Title & Description */}
            <div className="space-y-4 pt-4 border-t border-brand-light-border dark:border-brand-dark-border">
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-text dark:text-brand-text-dark">
                Something Went Wrong
              </h2>
              <p className="text-lg text-brand-text-light dark:text-brand-text-dark-light max-w-md mx-auto">
                Sorry, an error occurred while processing your request. Please try again.
              </p>
            </div>

            {/* Error Details (dev mode only) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left max-w-2xl mx-auto">
                <summary className="text-sm text-brand-text-lighter dark:text-brand-text-dark-lighter cursor-pointer hover:text-brand-accent">
                  รายละเอียดข้อผิดพลาด (โหมดพัฒนา) / Error Details (Dev Mode)
                </summary>
                <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-auto">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                  {error.digest && `\n\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={reset}
                className="px-8 py-4 bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent/90 transition-all duration-200 shadow-sm"
              >
                ลองใหม่อีกครั้ง / Try Again
              </button>
              <button
                onClick={() => window.location.href = '/th'}
                className="px-8 py-4 border border-brand-light-border dark:border-brand-dark-border text-brand-text dark:text-brand-text-dark font-semibold rounded-xl hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover transition-all duration-200"
              >
                กลับหน้าแรก / Go Home
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

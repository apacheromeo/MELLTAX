/**
 * 404 Not Found Page
 * Phase 8: Custom 404 page with friendly design
 */

import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { MelltaxLogo } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <Card variant="dashboard" padding="xl">
          <div className="text-center space-y-8 py-12">
            {/* Logo & 404 */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <MelltaxLogo size={80} className="text-brand-primary/30 dark:text-brand-accent/30" />
              </div>
              <div className="text-8xl font-bold text-brand-primary/20 dark:text-brand-accent/20">
                404
              </div>
            </div>

            {/* Thai Title & Description */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-semibold text-brand-text dark:text-brand-text-dark">
                ไม่พบหน้าที่คุณต้องการ
              </h1>
              <p className="text-lg text-brand-text-light dark:text-brand-text-dark-light max-w-md mx-auto">
                ขออภัย หน้าที่คุณกำลังค้นหาไม่มีอยู่ หรืออาจถูกย้ายไปแล้ว
              </p>
            </div>

            {/* English Title & Description */}
            <div className="space-y-4 pt-4 border-t border-brand-light-border dark:border-brand-dark-border">
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-text dark:text-brand-text-dark">
                Page Not Found
              </h2>
              <p className="text-lg text-brand-text-light dark:text-brand-text-dark-light max-w-md mx-auto">
                Sorry, the page you're looking for doesn't exist or may have been moved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/th"
                className="px-8 py-4 bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent/90 transition-all duration-200 shadow-sm"
              >
                กลับหน้าแรก / Go Home
              </Link>
              <Link
                href="/th/planner"
                className="px-8 py-4 border border-brand-light-border dark:border-brand-dark-border text-brand-text dark:text-brand-text-dark font-semibold rounded-xl hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover transition-all duration-200"
              >
                เครื่องมือวางแผนภาษี / Tax Planner
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="pt-8 text-sm text-brand-text-lighter dark:text-brand-text-dark-lighter">
              <p className="mb-3">หรือลองเข้าชมหน้าเหล่านี้ / Or try visiting:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/th" className="hover:text-brand-accent transition-colors">
                  เครื่องคำนวณภาษี
                </Link>
                <span>•</span>
                <Link href="/th/planner" className="hover:text-brand-accent transition-colors">
                  วางแผนภาษี
                </Link>
                <span>•</span>
                <Link href="/th/profit" className="hover:text-brand-accent transition-colors">
                  คำนวณกำไร
                </Link>
                <span>•</span>
                <Link href="/th/about" className="hover:text-brand-accent transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

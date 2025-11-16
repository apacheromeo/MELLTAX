/**
 * Skeleton Component
 * Phase 8: Generic skeleton loader with shimmer animation
 * Used for loading states across the app
 */

'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%]';

  const variantClasses = {
    text: 'rounded h-4',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-label="Loading..."
      role="status"
    />
  ));

  return count > 1 ? (
    <div className="space-y-3">{skeletons}</div>
  ) : (
    <>{skeletons}</>
  );
}

/**
 * SkeletonCard - Preset for card skeleton
 */
export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-brand-light-border dark:border-brand-dark-border bg-brand-light-surface dark:bg-brand-dark-surface p-6 space-y-4">
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="100%" height={16} count={3} />
      <div className="flex gap-4 pt-4">
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={100} height={40} />
      </div>
    </div>
  );
}

/**
 * SkeletonTable - Preset for table skeleton
 */
export function SkeletonTable({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 pb-3 border-b border-brand-light-border dark:border-brand-dark-border">
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
      </div>
      {/* Table Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 py-3">
          <Skeleton variant="text" width="90%" height={14} />
          <Skeleton variant="text" width="90%" height={14} />
          <Skeleton variant="text" width="90%" height={14} />
          <Skeleton variant="text" width="90%" height={14} />
          <Skeleton variant="text" width="90%" height={14} />
          <Skeleton variant="text" width="90%" height={14} />
        </div>
      ))}
    </div>
  );
}

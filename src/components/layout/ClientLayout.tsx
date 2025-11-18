/**
 * ClientLayout Component
 *
 * Client-side layout wrapper for theme and UI functionality.
 * Note: AdSense loading is handled by ClientAdSenseWrapper in layout.tsx
 */

'use client';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return <>{children}</>;
}

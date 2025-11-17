import type { Metadata } from 'next';
import './globals.css';
import '../styles/typography.css';

export const metadata: Metadata = {
  title: 'MELLTAX - Thai Withholding Tax Calculator',
  description: 'Simple withholding tax calculator for Thailand. Free, easy to use, supports Thai and English.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Root layout must return children only when using [locale] layout
  // The locale layout handles <html> and <body> tags
  return <>{children}</>;
}

/**
 * SEO helper functions for MELLTAX
 */

import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melltax.com';
const siteName = 'MELLTAX';

interface SEOParams {
  title: string;
  description: string;
  path?: string;
  locale?: 'th' | 'en';
  images?: string[];
}

/**
 * Generate metadata for a page
 */
export function generateMetadata({
  title,
  description,
  path = '',
  locale = 'th',
  images = ['/og-image.png'],
}: SEOParams): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        'th': `${siteUrl}/th${path}`,
        'en': `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
      images: images.map(img => ({
        url: `${siteUrl}${img}`,
        width: 1200,
        height: 630,
        alt: title,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

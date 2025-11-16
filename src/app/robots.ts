/**
 * Robots.txt Configuration
 * Phase 5: SEO crawler configuration
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://melltax.com/sitemap.xml',
  };
}

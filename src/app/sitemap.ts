import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melltax.com';
  const locales = ['th', 'en'];
  const pages = ['', '/planner', '/about'];

  const urls: MetadataRoute.Sitemap = [];

  // Generate URLs for each locale and page
  locales.forEach((locale) => {
    pages.forEach((page) => {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    });
  });

  // Add root URL
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  return urls;
}

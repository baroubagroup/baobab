import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://baobab-mind-capital.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/api/'], // Bloque l'accès aux pages sensibles
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

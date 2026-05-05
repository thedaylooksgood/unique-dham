import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.maauniquedham.in';

  const routes = [
    '',
    '/temple-in-darjeeling',
    '/hindu-temple-darjeeling',
    '/best-temple-darjeeling',
    '/best-temples-darjeeling',
    '/places-to-visit-darjeeling',
    '/spiritual-places-darjeeling',
    '/puja-booking',
    '/events',
    '/gallery',
    '/guidance',
    '/sacred-store',
    '/volunteer',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}

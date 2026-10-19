import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://aerialaura.ch';
  return [
    { url: base,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/work`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/services`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/legal/privacy`,lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/legal/terms`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  ];
}

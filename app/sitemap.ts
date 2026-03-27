import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://anylystudio.com'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/commission`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/success`, lastModified: new Date(), changeFrequency: 'never', priority: 0.1 },
  ]
}

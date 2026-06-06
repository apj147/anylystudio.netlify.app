import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://anylystudio.com'
  const now = new Date()

  return [
    { url: base,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/portfolio`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/commissions`,       lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/gallery`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${base}/about`,             lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/gift`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${base}/faq`,               lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/premium`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
    { url: `${base}/terms`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3  },
    { url: `${base}/commission`,        lastModified: now, changeFrequency: 'monthly', priority: 0.6  },
    { url: `${base}/success`,           lastModified: now, changeFrequency: 'never',   priority: 0.1  },
  ]
}

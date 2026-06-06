import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://anylystudio.com'
  const now = new Date()

  return [
    { url: base,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${base}/portfolio`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/commissions`,             lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/gallery`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${base}/about`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/prints`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/journal`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${base}/journal/how-to-take-reference-photos-for-a-pet-portrait`, lastModified: new Date('2026-05-20'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/journal/choosing-the-right-size-for-your-commission`,     lastModified: new Date('2026-06-01'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/process`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${base}/gift`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${base}/faq`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/premium`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
    { url: `${base}/refund`,                  lastModified: now, changeFrequency: 'yearly',  priority: 0.4  },
    { url: `${base}/terms`,                   lastModified: now, changeFrequency: 'yearly',  priority: 0.35 },
    { url: `${base}/commission`,              lastModified: now, changeFrequency: 'monthly', priority: 0.6  },
    { url: `${base}/success`,                 lastModified: now, changeFrequency: 'never',   priority: 0.1  },
  ]
}

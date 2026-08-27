import type { MetadataRoute } from 'next';

const siteUrl = 'https://raytimz.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: siteUrl,
          ru: `${siteUrl}/ru`,
        },
      },
    },
    {
      url: `${siteUrl}/ru`,
      changeFrequency: 'monthly',
      priority: .9,
      alternates: {
        languages: {
          en: siteUrl,
          ru: `${siteUrl}/ru`,
        },
      },
    },
    {
      url: `${siteUrl}/status`,
      changeFrequency: 'always',
      priority: .7,
      alternates: {
        languages: {
          en: `${siteUrl}/status`,
          ru: `${siteUrl}/ru/status`,
        },
      },
    },
    {
      url: `${siteUrl}/ru/status`,
      changeFrequency: 'always',
      priority: .7,
      alternates: {
        languages: {
          en: `${siteUrl}/status`,
          ru: `${siteUrl}/ru/status`,
        },
      },
    },
  ];
}

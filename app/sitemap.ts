import type { MetadataRoute } from 'next';
import { projectHref, projects, type ProjectId } from './projects/projects';

const siteUrl = 'https://raytimz.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = (Object.keys(projects) as ProjectId[]).flatMap((projectId) => (
    (['en', 'ru'] as const).map((locale) => ({
      url: `${siteUrl}${projectHref(projectId, locale)}`,
      changeFrequency: 'monthly' as const,
      priority: .65,
      alternates: {
        languages: {
          en: `${siteUrl}${projectHref(projectId, 'en')}`,
          ru: `${siteUrl}${projectHref(projectId, 'ru')}`,
        },
      },
    }))
  ));

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
    ...projectEntries,
  ];
}

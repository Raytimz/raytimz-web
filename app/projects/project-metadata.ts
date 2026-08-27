import type { Metadata } from 'next';
import type { Locale } from '../localization';
import { projectHref, projects, type ProjectId } from './projects';

export function getProjectMetadata(projectId: ProjectId, locale: Locale): Metadata {
  const project = projects[projectId];
  const content = project.content[locale];
  const title = `${project.name} — Raytimz`;
  const canonical = projectHref(projectId, locale);
  const description = content.tagline;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: projectHref(projectId, 'en'),
        ru: projectHref(projectId, 'ru'),
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      alternateLocale: [locale === 'ru' ? 'en_US' : 'ru_RU'],
      url: canonical,
    },
    twitter: { card: 'summary', title, description },
  };
}

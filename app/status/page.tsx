import type { Metadata } from 'next';
import StatusPage from './status-page';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'System status — Raytimz',
  description: 'Current public availability of Raytimz services.',
  alternates: {
    canonical: '/status',
    languages: { en: '/status', ru: '/ru/status' },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'System status — Raytimz',
    description: 'Current public availability of Raytimz services.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
    images: [{
      url: '/status-og-en.png',
      width: 1731,
      height: 909,
      alt: 'System status — Live service availability',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System status — Raytimz',
    description: 'Current public availability of Raytimz services.',
    images: ['/status-og-en.png'],
  },
};

export default function EnglishStatusPage() {
  return <StatusPage locale="en" />;
}

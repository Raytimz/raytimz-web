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
};

export default function EnglishStatusPage() {
  return <StatusPage locale="en" />;
}

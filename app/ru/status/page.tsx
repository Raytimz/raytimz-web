import type { Metadata } from 'next';
import StatusPage from '../../status/status-page';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Статус систем — Raytimz',
  description: 'Актуальное состояние публичных сервисов Raytimz.',
  alternates: {
    canonical: '/ru/status',
    languages: { en: '/status', ru: '/ru/status' },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Статус систем — Raytimz',
    description: 'Актуальное состояние публичных сервисов Raytimz.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    images: [{
      url: '/status-og-ru.png',
      width: 1728,
      height: 910,
      alt: 'Статус систем — Актуальное состояние',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Статус систем — Raytimz',
    description: 'Актуальное состояние публичных сервисов Raytimz.',
    images: ['/status-og-ru.png'],
  },
};

export default function RussianStatusPage() {
  return <StatusPage locale="ru" />;
}

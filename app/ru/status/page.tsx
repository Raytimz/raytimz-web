import type { Metadata } from 'next';
import StatusPage from '../../status/status-page';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Статус сервисов — Raytimz',
  description: 'Актуальное состояние публичных сервисов Raytimz.',
  alternates: {
    canonical: '/ru/status',
    languages: { en: '/status', ru: '/ru/status' },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RussianStatusPage() {
  return <StatusPage locale="ru" />;
}

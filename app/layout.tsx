import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dmitry — Software Engineer in Switzerland',
  description: 'Personal website of Dmitry, a software engineer and EPFL Data Science master’s student based in Switzerland.',
  metadataBase: new URL('https://raytimz.com'),
  alternates: {
    canonical: '/',
    languages: { en: '/', ru: '/ru' },
  },
  openGraph: {
    title: 'Dmitry — Software Engineer in Switzerland',
    description: 'Software engineer and EPFL Data Science master’s student based in Switzerland.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
    images: [{ url: '/og-v2.png', width: 1730, height: 909, alt: 'Dmitry — Software engineer · Switzerland' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dmitry — Software Engineer in Switzerland',
    description: 'Software engineer and EPFL Data Science master’s student based in Switzerland.',
    images: ['/og-v2.png'],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get('x-raytimz-locale') === 'ru' ? 'ru' : 'en';

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

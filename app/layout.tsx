import type { Metadata } from 'next';
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
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'Hi, I’m Dmitry. Software engineer based in Switzerland.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dmitry — Software Engineer in Switzerland',
    description: 'Software engineer and EPFL Data Science master’s student based in Switzerland.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

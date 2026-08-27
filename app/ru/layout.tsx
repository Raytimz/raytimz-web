import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Дмитрий — Software engineer в Швейцарии',
  description:
    'Личный сайт Дмитрия: продуманный софт, продуктовый дизайн и Data Science в EPFL.',
  alternates: {
    canonical: '/ru',
    languages: { en: '/', ru: '/ru' },
  },
  openGraph: {
    title: 'Дмитрий — Software engineer в Швейцарии',
    description: 'Продуманный софт, продуктовый дизайн и Data Science в EPFL.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    images: [{
      url: '/og-v2.png',
      width: 1730,
      height: 909,
      alt: 'Dmitry — Software engineer · Switzerland',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Дмитрий — Software engineer в Швейцарии',
    description: 'Продуманный софт, продуктовый дизайн и Data Science в EPFL.',
    images: ['/og-v2.png'],
  },
};

export default function RussianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="ru">{children}</div>;
}

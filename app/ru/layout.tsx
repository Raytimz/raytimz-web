import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Дмитрий — инженер-программист в Швейцарии',
  description:
    'Личный сайт Дмитрия — инженера-программиста и магистранта EPFL по направлению Data Science, живущего в Швейцарии.',
  alternates: {
    canonical: '/ru',
    languages: { en: '/', ru: '/ru' },
  },
  openGraph: {
    title: 'Дмитрий — инженер-программист в Швейцарии',
    description: 'Инженер-программист и магистрант EPFL по направлению Data Science, живущий в Швейцарии.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'Привет, я Дмитрий — инженер-программист из Швейцарии.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Дмитрий — инженер-программист в Швейцарии',
    description: 'Инженер-программист и магистрант EPFL по направлению Data Science, живущий в Швейцарии.',
    images: ['/og.png'],
  },
};

export default function RussianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

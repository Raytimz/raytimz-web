import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Дмитрий — Software Engineer в Швейцарии',
  description:
    'Личный сайт Дмитрия — software engineer и магистранта EPFL по направлению Data Science в Швейцарии.',
  alternates: {
    canonical: '/ru',
    languages: { en: '/', ru: '/ru' },
  },
  openGraph: {
    title: 'Дмитрий — Software Engineer в Швейцарии',
    description: 'Software engineer и магистрант EPFL по направлению Data Science в Швейцарии.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    images: [{
      url: '/og.png',
      width: 1536,
      height: 1024,
      alt: 'Привет, я Дмитрий. Software engineer в Швейцарии.',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Дмитрий — Software Engineer в Швейцарии',
    description: 'Software engineer и магистрант EPFL по направлению Data Science в Швейцарии.',
    images: ['/og.png'],
  },
};

export default function RussianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="ru">{children}</div>;
}

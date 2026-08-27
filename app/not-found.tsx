'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const copy = {
  en: {
    eyebrow: 'Nothing here',
    title: 'Page not found',
    text: 'The address may have changed—or perhaps there was never anything here.',
    link: 'Back home',
    href: '/',
  },
  ru: {
    eyebrow: 'Здесь пусто',
    title: 'Такой страницы нет',
    text: 'Возможно, адрес изменился — или здесь пока ничего не было.',
    link: 'На главную',
    href: '/ru',
  },
} as const;

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname === '/ru' || pathname.startsWith('/ru/') ? 'ru' : 'en';
  const content = copy[locale];

  useEffect(() => {
    document.title = locale === 'ru' ? 'Страница не найдена — Raytimz' : 'Page not found — Raytimz';
  }, [locale]);

  return (
    <main className="not-found-page" lang={locale}>
      <div className="ambient-field" aria-hidden="true">
        <i className="orb orb-one" />
        <i className="orb orb-two" />
        <i className="orbit orbit-one"><b /></i>
        <i className="orbit orbit-two"><b /></i>
      </div>

      <section className="not-found-content shell">
        <p className="eyebrow">{content.eyebrow}</p>
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1>{content.title}</h1>
        <p className="not-found-text">{content.text}</p>
        <a className="not-found-link" href={content.href}>{content.link}</a>
      </section>
    </main>
  );
}

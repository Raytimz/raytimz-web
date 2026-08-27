'use client';

import { useEffect, useState } from 'react';
import type { PointerEvent } from 'react';

const socialLinks = [
  {
    platform: 'GitHub',
    href: 'https://github.com/Raytimz',
    viewBox: '0 0 496 512',
    path: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
  },
  {
    platform: 'Telegram',
    href: 'https://t.me/Raytimz',
    viewBox: '0 0 496 512',
    path: 'M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm115 168.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7.2-.7.3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3.7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6.5 9.6 2.9 2.5 2 3.2 4.8 3.5 6.7.3 1.2.7 4 .4 6.5z',
  },
  {
    platform: 'Discord',
    href: 'https://discord.com/users/402166226190860291',
    viewBox: '0 0 640 512',
    path: 'M524.5 69.8a1.5 1.5 0 0 0-.8-.7A485 485 0 0 0 404.1 32a1.8 1.8 0 0 0-1.9.9 337.5 337.5 0 0 0-14.9 30.6 447.8 447.8 0 0 0-134.4 0 309.5 309.5 0 0 0-15.1-30.6 1.9 1.9 0 0 0-1.9-.9 483.7 483.7 0 0 0-119.7 37.1 1.7 1.7 0 0 0-.8.7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7 348.2 348.2 0 0 0 30-48.8 1.9 1.9 0 0 0-1-2.6 321.2 321.2 0 0 1-45.9-21.9 1.9 1.9 0 0 1-.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9.2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1-.2 3.1 301.4 301.4 0 0 1-45.9 21.8 1.9 1.9 0 0 0-1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1.7 486 486 0 0 0 147.1-74.2 1.9 1.9 0 0 0 .8-1.4c12.3-126.8-20.5-236.9-86.9-334.5zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2s23.4-59.2 52.8-59.2c29.7 0 53.3 26.8 52.8 59.2 0 32.6-23.4 59.2-52.8 59.2zm195.4 0c-29 0-52.8-26.6-52.8-59.2s23.4-59.2 52.8-59.2c29.7 0 53.3 26.8 52.8 59.2 0 32.6-23.2 59.2-52.8 59.2z',
  },
] as const;

function TypingHeadline() {
  const sentence = 'Software engineer.';
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const reducedMotionTimer = window.setTimeout(() => setTyped(sentence), 0);
      return () => window.clearTimeout(reducedMotionTimer);
    }

    let character = 0;
    const timer = window.setInterval(() => {
      character += 1;
      setTyped(sentence.slice(0, character));
      if (character === sentence.length) window.clearInterval(timer);
    }, 58);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <h1 aria-label="Hi, I’m Dmitry, software engineer.">
      <span className="hello-line">Hi, I&apos;m</span>
      Dmitry
      <span className="typed-line" aria-hidden="true">
        {typed}<i className="typing-cursor" />
      </span>
    </h1>
  );
}

export default function Home() {
  function trackPointer(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY}px`);
  }

  function tiltCard(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${y * -3}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 5}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '-2deg');
  }

  return (
    <main onPointerMove={trackPointer}>
      <div className="pointer-glow" aria-hidden="true" />
      <div className="ambient-field" aria-hidden="true">
        <i className="orb orb-one" />
        <i className="orb orb-two" />
        <i className="orbit orbit-one"><b /></i>
        <i className="orbit orbit-two"><b /></i>
      </div>

      <section className="hero shell">
        <div className="hero-intro">
          <p className="eyebrow">About me</p>
          <TypingHeadline />
          <p className="hero-text">
            Based in Switzerland, I&apos;m drawn to thoughtful software and elegant
            product design—with plenty of room left for off-road adventures and
            well-crafted games.
          </p>
        </div>

        <div
          className="education-card"
          aria-label="Dmitry's education at EPFL"
          onPointerMove={tiltCard}
          onPointerLeave={resetTilt}
        >
          <div className="card-bar">
            <span>Education</span>
            <span>EPFL</span>
          </div>
          <div className="education-body">
            <article className="degree">
              <span className="degree-index">01</span>
              <div>
                <small>Bachelor&apos;s degree</small>
                <h2>Computer Science</h2>
              </div>
              <span className="degree-state complete">Completed</span>
            </article>
            <article className="degree">
              <span className="degree-index">02</span>
              <div>
                <small>Master&apos;s degree</small>
                <h2>Data Science</h2>
              </div>
              <span className="degree-state">Ongoing</span>
            </article>
          </div>
        </div>

        <div className="social-section">
          <p className="social-title" id="social-title">Find me:</p>
          <div className="social-links" aria-labelledby="social-title">
            {socialLinks.map(({ platform, href, viewBox, path }) => (
              <a
                className="social-link"
                href={href}
                key={platform}
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" viewBox={viewBox}>
                  <path d={path} />
                </svg>
                <span>{platform}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="shell">
        <a href="/status">System status</a>
        <span>© {new Date().getFullYear()} Dmitry</span>
      </footer>
    </main>
  );
}

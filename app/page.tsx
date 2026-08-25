'use client';

import { useEffect, useState } from 'react';
import type { PointerEvent } from 'react';

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
    <h1 aria-label="Hi, I’m Dmitry. Software engineer.">
      <span className="hello-line">Hi, I&apos;m</span>
      Dmitry.
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
        <div className="hero-copy">
          <p className="eyebrow">raytimz.com</p>
          <TypingHeadline />
          <p className="hero-text">
            Based in Switzerland, with a soft spot for thoughtful technology,
            Formula 1, and well-designed games.
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
      </section>

      <footer className="shell">
        <span>© {new Date().getFullYear()} Dmitry</span>
      </footer>
    </main>
  );
}

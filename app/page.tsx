'use client';

import { useEffect, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';

const interests = ['Technology', 'Formula 1', 'Gaming'];
const personalLinks = ['GitHub', 'Telegram', 'Discord'];

function TypingHeadline() {
  const sentence = 'I am a software engineer.';
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
    <h1 aria-label="Hi, my name is Dmitry. I am a software engineer.">
      <span className="hello-line">Hi, my name is</span>
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

  function keepPlaceholder(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
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

      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Dmitry home">
          <span className="brand-mark" aria-hidden="true">D</span>
          <span>Dmitry</span>
        </a>
        <div className="nav-links">
          <a href="#education">Education</a>
          <a href="#interests">Interests</a>
          <a href="#links">Links</a>
        </div>
        <a className="status-pill" href="https://status.raytimz.com" title="Public status page">
          <i aria-hidden="true" /> Status page
        </a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> Welcome</p>
          <TypingHeadline />
          <p className="hero-text">
            Based in Switzerland. Interested in thoughtful technology,
            fast cars, and well-designed games.
          </p>
          <a className="button primary" href="#links">Find me online <span aria-hidden="true">↘</span></a>
        </div>

        <div
          className="education-card"
          id="education"
          aria-label="Dmitry's education"
          onPointerMove={tiltCard}
          onPointerLeave={resetTilt}
        >
          <div className="card-bar">
            <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>education / epfl</span>
            <span className="profile-label"><i /> current</span>
          </div>
          <div className="education-body">
            <p className="education-title">Education</p>
            <article className="degree">
              <span className="degree-index">01</span>
              <div>
                <small>Bachelor&apos;s degree</small>
                <h2>Computer Science</h2>
                <p>EPFL</p>
              </div>
              <span className="degree-state complete">Completed</span>
            </article>
            <article className="degree">
              <span className="degree-index">02</span>
              <div>
                <small>Master&apos;s degree</small>
                <h2>Data Science</h2>
                <p>EPFL</p>
              </div>
              <span className="degree-state">Ongoing</span>
            </article>
          </div>
        </div>
      </section>

      <section className="interest-strip shell" id="interests" aria-label="Interests">
        <span className="strip-label">Interests</span>
        <div>
          {interests.map((interest, index) => (
            <span className="interest-chip" key={interest}><i>0{index + 1}</i>{interest}</span>
          ))}
        </div>
      </section>

      <section className="links-section shell" id="links">
        <div className="links-heading">
          <p className="eyebrow">Say hello</p>
          <h2>Find me online.</h2>
          <p>Profile links are placeholders for now.</p>
        </div>
        <div className="personal-links" aria-label="Personal links">
          {personalLinks.map((link, index) => (
            <a href="#" onClick={keepPlaceholder} aria-label={`${link} link placeholder`} key={link}>
              <span>0{index + 1}</span>
              <strong>{link}</strong>
              <small>Placeholder</small>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <footer className="shell">
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">D</span><span>Dmitry</span></a>
        <span>© {new Date().getFullYear()} Dmitry</span>
      </footer>
    </main>
  );
}

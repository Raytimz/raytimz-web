import Image from 'next/image';
import type { CSSProperties } from 'react';
import LanguageSwitcher from '../language-switcher';
import { statusCopy, type Locale } from '../localization';
import { getPublicStatusSnapshot } from '../status/status-data';
import type { PublicServiceStatus } from '../status/services';
import {
  projectHref,
  projectPageCopy,
  projects,
  type ProjectId,
  type ProjectVisual,
} from './projects';
import styles from './project.module.css';

const statusGlyphs: Record<PublicServiceStatus, string> = {
  operational: '✓',
  degraded: '!',
  offline: '×',
  unknown: '–',
};

function formatTime(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(new Date(value));
}

function MajesticFormVisual({ label }: { label: string }) {
  return (
    <div className={`${styles.mockup} ${styles.formMockup}`} role="img" aria-label={label}>
      <div className={styles.mockupBar}>
        <span><i /><i /><i /></span>
        <small>forms / application</small>
      </div>
      <div className={styles.formCanvas}>
        <span className={styles.formAccent} />
        <h3>Staff application</h3>
        <p>Complete the fields below. Your response will be delivered automatically.</p>
        <label>Discord username<span>Raytimz</span></label>
        <label>Department<span>Community operations</span></label>
        <div className={styles.formSubmit}>Submit response</div>
      </div>
    </div>
  );
}

function MajesticRelayVisual({ label }: { label: string }) {
  return (
    <div className={`${styles.mockup} ${styles.relayMockup}`} role="img" aria-label={label}>
      <div className={styles.mockupBar}>
        <span><i /><i /><i /></span>
        <small>majesticforms / delivery</small>
      </div>
      <div className={styles.relayCanvas}>
        <div className={styles.relayPath} aria-hidden="true">
          <span>Form</span><i>→</i><span>Relay</span><i>→</i><span>Discord</span>
        </div>
        <div className={styles.discordMessage}>
          <i />
          <div>
            <strong>New staff application</strong>
            <small>MajesticForms · Today at 18:42</small>
            <dl>
              <div><dt>Applicant</dt><dd>Raytimz</dd></div>
              <div><dt>Department</dt><dd>Community operations</dd></div>
              <div><dt>Status</dt><dd>Ready for review</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectVisualFrame({ visual }: { visual: ProjectVisual }) {
  if (visual.kind === 'image' && visual.image) {
    return (
      <div className={styles.imageFrame}>
        <Image
          alt={visual.alt ?? ''}
          className={styles.galleryImage}
          height={900}
          loading="lazy"
          src={visual.image}
          unoptimized
          width={1600}
        />
      </div>
    );
  }

  if (visual.kind === 'placeholder') {
    return (
      <div
        className={`${styles.mockup} ${styles.screenshotPlaceholder}`}
        role="img"
        aria-label={`${visual.title}. ${visual.placeholderLabel ?? ''}`}
      >
        <span className={styles.placeholderMark} aria-hidden="true"><i /><i /></span>
        <p>{visual.placeholderLabel}</p>
      </div>
    );
  }

  if (visual.kind === 'majestic-form') return <MajesticFormVisual label={visual.title} />;
  return <MajesticRelayVisual label={visual.title} />;
}

export default async function ProjectPage({
  locale,
  projectId,
}: {
  locale: Locale;
  projectId: ProjectId;
}) {
  const project = projects[projectId];
  const content = project.content[locale];
  const copy = projectPageCopy[locale];
  const statusLabels = statusCopy[locale].statusLabels;
  const snapshot = await getPublicStatusSnapshot();
  const service = snapshot.services.find(({ id }) => id === project.serviceId);
  const status = service?.status ?? 'unknown';
  const history = service?.history ?? [];
  const homeHref = locale === 'ru' ? '/ru' : '/';
  const statusHref = locale === 'ru' ? '/ru/status' : '/status';
  const pageStyle = { '--project-accent': project.accent } as CSSProperties;

  return (
    <main className={styles.page} lang={locale} style={pageStyle}>
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.orbit} />
        <span className={styles.glow} />
      </div>

      <div className={styles.content}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <a className={styles.backLink} href={statusHref}>← {copy.statusLink}</a>
            <p className={styles.eyebrow}>{copy.projectLabel} · {content.category}</p>
            <h1>{project.name}</h1>
            <p className={styles.tagline}>{content.tagline}</p>
            {content.heroDescription ? (
              <p className={styles.heroDescription}>{content.heroDescription}</p>
            ) : null}
          </div>

          <div className={styles.logoFrame} aria-label={`${project.name} logo`}>
            {project.logo.kind === 'image' ? (
              <Image
                alt={project.logo.alt}
                className={styles.logoImage}
                height={320}
                priority
                src={project.logo.src}
                unoptimized
                width={320}
              />
            ) : (
              <span className={styles.monogram}>{project.logo.text}</span>
            )}
          </div>
        </header>

        <section className={styles.statusPanel} data-status={status} aria-labelledby="project-status">
          <div className={styles.statusLead}>
            <span className={styles.statusIcon} aria-hidden="true">{statusGlyphs[status]}</span>
            <div>
              <p className={styles.sectionLabel}>{copy.statusLabel}</p>
              <h2 id="project-status">{statusLabels[status]}</h2>
              <p>{copy.statusDescriptions[status]}</p>
            </div>
          </div>

          {history.length > 0 ? (
            <div className={styles.history}>
              <div className={styles.historyHeader}>
                <span>{copy.recentChecks(history.length)}</span>
                <a href={statusHref}>{copy.statusLink} ↗</a>
              </div>
              <div
                className={styles.historyBars}
                style={{ '--history-count': history.length } as CSSProperties}
                aria-hidden="true"
              >
                {history.map((check, index) => (
                  <span
                    className={styles.historySegment}
                    data-status={check.status}
                    key={`${check.checkedAt}-${index}`}
                    title={`${statusLabels[check.status]} · ${formatTime(check.checkedAt, locale)}`}
                  />
                ))}
              </div>
              <div className={styles.historyRange}>
                <time dateTime={history[0].checkedAt}>{formatTime(history[0].checkedAt, locale)}</time>
                <time dateTime={history.at(-1)?.checkedAt}>
                  {formatTime(history.at(-1)?.checkedAt ?? snapshot.generatedAt, locale)}
                </time>
              </div>
            </div>
          ) : (
            <a className={styles.statusOnlyLink} href={statusHref}>{copy.statusLink} ↗</a>
          )}
        </section>

        <section className={styles.overview} aria-labelledby="project-overview">
          <div className={styles.overviewCopy}>
            <p className={styles.sectionLabel}>{copy.overviewLabel}</p>
            <h2 id="project-overview">{content.overviewTitle}</h2>
            {content.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <aside className={styles.stack} aria-labelledby="project-stack">
            <p className={styles.sectionLabel} id="project-stack">{copy.stackLabel}</p>
            <div className={styles.stackChips}>
              {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </aside>
        </section>

        <section className={styles.features} aria-labelledby="project-features">
          <p className={styles.sectionLabel}>{copy.featuresLabel}</p>
          <h2 className={styles.sectionHeading} id="project-features">{content.featuresTitle}</h2>
          <div className={styles.featureGrid}>
            {content.features.map((feature, index) => (
              <article className={styles.feature} key={feature.title}>
                <span>0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.visuals} aria-labelledby="project-visuals">
          <p className={styles.sectionLabel}>{copy.visualsLabel}</p>
          <h2 className={styles.sectionHeading} id="project-visuals">{content.visualsTitle}</h2>
          <div className={styles.visualGrid} data-count={content.visuals.length}>
            {content.visuals.map((visual) => (
              <figure className={styles.visual} key={visual.title}>
                <ProjectVisualFrame visual={visual} />
                <figcaption>
                  <h3>{visual.title}</h3>
                  <p>{visual.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div className="footer-nav">
            <a href={homeHref}>{copy.homeLink}</a>
            <a href={statusHref}>{copy.statusLink}</a>
            <LanguageSwitcher
              locale={locale}
              label={copy.languageLabel}
              englishHref={projectHref(projectId, 'en')}
              russianHref={projectHref(projectId, 'ru')}
            />
          </div>
          <span>© {new Date().getFullYear()} {copy.footerName}</span>
        </footer>
      </div>
    </main>
  );
}

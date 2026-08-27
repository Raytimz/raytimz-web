/* eslint-disable @next/next/no-html-link-for-pages -- Vinext currently intercepts Next links here without navigating. */
import type { Metadata } from 'next';
import { publicServiceGroups, type PublicServiceStatus } from './services';
import { getPublicStatusSnapshot } from './status-data';
import styles from './status.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'System status — Raytimz',
  description: 'Current public availability of Raytimz services.',
  robots: {
    index: true,
    follow: true,
  },
};

const statusLabels: Record<PublicServiceStatus, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  offline: 'Offline',
  unknown: 'Not monitored',
};

const statusGlyphs: Record<PublicServiceStatus, string> = {
  operational: '✓',
  degraded: '!',
  offline: '×',
  unknown: '–',
};

const summaryCopy: Record<PublicServiceStatus, { title: string; text: string }> = {
  operational: {
    title: 'All monitored systems operational',
    text: 'No problems have been detected across the services currently monitored.',
  },
  degraded: {
    title: 'Some systems are degraded',
    text: 'At least one monitored service is responding, but not operating normally.',
  },
  offline: {
    title: 'Monitored systems are offline',
    text: 'The services currently monitored are not responding.',
  },
  unknown: {
    title: 'Live monitoring is unavailable',
    text: 'No healthy state is being assumed while availability data cannot be reached.',
  },
};

function formatCheckedAt(value: string) {
  return `Checked ${new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(new Date(value))}`;
}

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(new Date(value));
}

export default async function StatusPage() {
  const snapshot = await getPublicStatusSnapshot();
  const summary = summaryCopy[snapshot.overallStatus];
  const monitoredServices = snapshot.services.filter(({ status }) => status !== 'unknown');
  const activeIncidents = monitoredServices.filter(
    ({ status }) => status === 'offline' || status === 'degraded',
  ).length;

  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.orbit} />
        <span className={styles.glow} />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Live systems</p>
          <h1 className={styles.title}>System status</h1>
          <p className={styles.intro}>A clear, public view of service availability.</p>
        </header>

        <section
          className={styles.summary}
          data-status={snapshot.overallStatus}
          aria-labelledby="status-summary-title"
        >
          <div className={styles.summaryLead}>
            <span className={styles.summaryIcon} aria-hidden="true">
              {statusGlyphs[snapshot.overallStatus]}
            </span>
            <div>
              <h2 className={styles.summaryTitle} id="status-summary-title">
                {summary.title}
              </h2>
              <p className={styles.summaryText}>{summary.text}</p>
            </div>
          </div>

          <dl className={styles.summaryFacts}>
            <div>
              <dt>Monitored</dt>
              <dd>{monitoredServices.length} / {snapshot.services.length}</dd>
            </div>
            <div>
              <dt>Incidents</dt>
              <dd>{activeIncidents}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>
                <time dateTime={snapshot.generatedAt}>{formatUpdatedAt(snapshot.generatedAt)}</time>
              </dd>
            </div>
          </dl>
        </section>

        <div className={styles.groups}>
          {publicServiceGroups.map((group) => {
            const services = snapshot.services.filter((service) => service.group === group);

            return (
              <section className={styles.group} key={group} aria-labelledby={`group-${group}`}>
                <div className={styles.groupHeader}>
                  <h2 className={styles.groupTitle} id={`group-${group}`}>{group}</h2>
                  <span>{services.length} {services.length === 1 ? 'service' : 'services'}</span>
                </div>

                <ul className={styles.serviceList}>
                  {services.map((service) => (
                    <li className={styles.serviceItem} key={service.id}>
                      <article
                        className={styles.service}
                        aria-labelledby={`service-${service.id}`}
                      >
                        <span
                          className={styles.serviceIcon}
                          data-status={service.status}
                          aria-hidden="true"
                        >
                          {statusGlyphs[service.status]}
                        </span>

                        <div className={styles.serviceCopy}>
                          <h3 className={styles.serviceName} id={`service-${service.id}`}>
                            {service.name}
                          </h3>
                          <p className={styles.serviceDescription}>{service.description}</p>
                        </div>

                        <div className={styles.serviceMeta}>
                          <span className={styles.statusBadge} data-status={service.status}>
                            {statusLabels[service.status]}
                          </span>
                          {service.checkedAt ? (
                            <time className={styles.checkedAt} dateTime={service.checkedAt}>
                              {formatCheckedAt(service.checkedAt)}
                            </time>
                          ) : (
                            <span className={styles.checkedAt}>Awaiting first check</span>
                          )}
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <footer className={styles.footer}>
          <a href="/">About me</a>
          <span>© {new Date().getFullYear()} Dmitry</span>
        </footer>
      </div>
    </main>
  );
}

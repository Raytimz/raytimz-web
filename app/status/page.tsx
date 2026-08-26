import type { Metadata } from 'next';
import Link from 'next/link';
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
      <a className={styles.skipLink} href="#service-statuses">
        Skip to service statuses
      </a>

      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.orbit} />
        <span className={styles.glow} />
      </div>

      <div className={styles.content}>
        <nav className={styles.topbar} aria-label="Status page navigation">
          <Link className={styles.brand} href="/">
            raytimz.com
          </Link>
          <span className={styles.pageLabel}>
            <span aria-hidden="true" />
            Public status
          </span>
        </nav>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Live systems</p>
          <h1 className={styles.title}>System status</h1>
          <p className={styles.intro}>
            A clear, public view of service availability. Infrastructure,
            logs, and administrative controls stay private.
          </p>
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

        <div className={styles.groups} id="service-statuses" tabIndex={-1}>
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
          <div>
            <p className={styles.footerTitle}>Public by design</p>
            <p className={styles.footerText}>
              Only published availability is shown here. No internal addresses,
              logs, or administrative details are exposed.
            </p>
          </div>
          <div className={styles.footerActions}>
            <Link className={styles.homeLink} href="/">Home</Link>
            <Link className={styles.refreshLink} href="/status?refresh=1" prefetch={false}>
              Refresh data
              <span aria-hidden="true">↻</span>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

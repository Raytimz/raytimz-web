import type { Metadata } from 'next';
import Link from 'next/link';
import { publicServiceGroups, type PublicServiceStatus } from './services';
import { getPublicStatusSnapshot } from './status-data';
import styles from './status.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'System status — Raytimz',
  description: 'Current availability of Raytimz services.',
};

const statusLabels: Record<PublicServiceStatus, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  offline: 'Offline',
  unknown: 'Not monitored',
};

const summaryCopy: Record<PublicServiceStatus, { title: string; text: string }> = {
  operational: {
    title: 'All monitored systems operational',
    text: 'No problems have been detected across the services currently monitored.',
  },
  degraded: {
    title: 'Some systems are degraded',
    text: 'At least one monitored service is reporting a problem.',
  },
  offline: {
    title: 'Monitored systems are offline',
    text: 'The currently monitored services are not responding.',
  },
  unknown: {
    title: 'Monitoring is being connected',
    text: 'Live availability data is not available yet. No healthy state is being assumed.',
  },
};

function formatCheckedAt(value: string | null) {
  if (!value) return 'Awaiting first check';

  return `Checked ${new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(new Date(value))}`;
}

function dotClass(status: PublicServiceStatus) {
  if (status === 'operational') return styles.dotOperational;
  if (status === 'degraded') return styles.dotDegraded;
  if (status === 'offline') return styles.dotOffline;
  return '';
}

export default async function StatusPage() {
  const snapshot = await getPublicStatusSnapshot();
  const summary = summaryCopy[snapshot.overallStatus];

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Link className={styles.backLink} href="/">Back to raytimz.com</Link>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Live systems</p>
          <h1 className={styles.title}>System status</h1>
          <p className={styles.intro}>
            A deliberately small view of public service availability. Internal
            infrastructure and administration details stay private.
          </p>
        </header>

        <section
          className={styles.summary}
          data-status={snapshot.overallStatus}
          aria-label={summary.title}
        >
          <span className={styles.summaryIcon} aria-hidden="true" />
          <div>
            <p className={styles.summaryTitle}>{summary.title}</p>
            <p className={styles.summaryText}>{summary.text}</p>
          </div>
        </section>

        {publicServiceGroups.map((group) => {
          const services = snapshot.services.filter((service) => service.group === group);

          return (
            <section className={styles.group} key={group}>
              <h2 className={styles.groupTitle}>{group}</h2>
              <div className={styles.serviceList}>
                {services.map((service) => (
                  <article className={styles.service} key={service.id}>
                    <span
                      className={`${styles.dot} ${dotClass(service.status)}`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className={styles.serviceName}>{service.name}</p>
                      <p className={styles.serviceDescription}>{service.description}</p>
                    </div>
                    <div className={styles.serviceMeta}>
                      <span className={styles.statusLabel}>{statusLabels[service.status]}</span>
                      <time className={styles.checkedAt} dateTime={service.checkedAt ?? undefined}>
                        {formatCheckedAt(service.checkedAt)}
                      </time>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <div className={styles.footer}>
          <p>
            Only published availability is shown here. Logs, host details and
            administrative controls are intentionally excluded.
          </p>
          <Link className={styles.refreshLink} href="/status?refresh=1" prefetch={false}>
            Refresh status
          </Link>
        </div>
      </div>
    </main>
  );
}

import LanguageSwitcher from '../language-switcher';
import { statusCopy, type Locale, type StatusCopy } from '../localization';
import { publicServiceGroups, type PublicServiceStatus } from './services';
import { getPublicStatusSnapshot } from './status-data';
import StatusAutoRefresh from './status-auto-refresh';
import styles from './status.module.css';

const statusGlyphs: Record<PublicServiceStatus, string> = {
  operational: '✓',
  degraded: '!',
  offline: '×',
  unknown: '–',
};

function formatCheckedAt(value: string, copy: StatusCopy) {
  const locale = copy.locale === 'ru' ? 'ru-RU' : 'en-GB';
  return `${copy.checkedPrefix} ${new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(new Date(value))}`;
}

function formatUpdatedAt(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(new Date(value));
}

export default async function StatusPage({ locale }: { locale: Locale }) {
  const copy = statusCopy[locale];
  const snapshot = await getPublicStatusSnapshot();
  const summary = copy.summary[snapshot.overallStatus];
  const monitoredServices = snapshot.services.filter(({ status }) => status !== 'unknown');
  const activeIncidents = monitoredServices.filter(
    ({ status }) => status === 'offline' || status === 'degraded',
  ).length;

  return (
    <main className={styles.page} lang={locale}>
      <StatusAutoRefresh />
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.orbit} />
        <span className={styles.glow} />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.intro}>{copy.intro}</p>
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
              <dt>{copy.factLabels.monitored}</dt>
              <dd>{monitoredServices.length} / {snapshot.services.length}</dd>
            </div>
            <div>
              <dt>{copy.factLabels.incidents}</dt>
              <dd>{activeIncidents}</dd>
            </div>
            <div>
              <dt>{copy.factLabels.updated}</dt>
              <dd>
                <time dateTime={snapshot.generatedAt}>
                  {formatUpdatedAt(snapshot.generatedAt, locale)}
                </time>
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
                  <h2 className={styles.groupTitle} id={`group-${group}`}>
                    {copy.groupLabels[group]}
                  </h2>
                  <span>{copy.serviceCount(services.length)}</span>
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
                          <p className={styles.serviceDescription}>
                            {copy.serviceDescriptions[service.id] ?? service.description}
                          </p>
                        </div>

                        <div className={styles.serviceMeta}>
                          <span className={styles.statusBadge} data-status={service.status}>
                            {copy.statusLabels[service.status]}
                          </span>
                          {service.checkedAt ? (
                            <time className={styles.checkedAt} dateTime={service.checkedAt}>
                              {formatCheckedAt(service.checkedAt, copy)}
                            </time>
                          ) : (
                            <span className={styles.checkedAt}>{copy.awaitingCheck}</span>
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
          <div className="footer-nav">
            <a href={copy.homeHref}>{copy.homeLink}</a>
            <LanguageSwitcher
              locale={locale}
              label={copy.languageLabel}
              englishHref="/status"
              russianHref="/ru/status"
            />
          </div>
          <span>© {new Date().getFullYear()} {copy.footerName}</span>
        </footer>
      </div>
    </main>
  );
}

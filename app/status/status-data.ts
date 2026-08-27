import {
  serviceRegistry,
  type PublicService,
  type PublicServiceHistoryPoint,
  type PublicServiceStatus,
  type PublicStatusSnapshot,
} from './services';

type KumaMonitor = {
  id?: number;
  name?: string;
};

type KumaStatusPage = {
  publicGroupList?: Array<{
    monitorList?: KumaMonitor[];
  }>;
};

type KumaHeartbeat = {
  status?: number;
  time?: string;
};

type KumaHeartbeatPage = {
  heartbeatList?: Record<string, KumaHeartbeat[]>;
};

const sourceTimeoutMilliseconds = 4_000;

function unknownSnapshot(): PublicStatusSnapshot {
  return {
    overallStatus: 'unknown',
    generatedAt: new Date().toISOString(),
    services: serviceRegistry.map(({ id, name, description, group }) => ({
      id,
      name,
      description,
      group,
      status: 'unknown',
      checkedAt: null,
      history: [],
    })),
  };
}

function toPublicStatus(status: number | undefined): PublicServiceStatus {
  if (status === 1) return 'operational';
  if (status === 0) return 'offline';
  if (status === 3) return 'degraded';
  return 'unknown';
}

function parseTimestamp(value: string | undefined) {
  if (!value) return Number.NaN;

  const normalized = value.replace(' ', 'T');
  const hasExplicitTimezone = /(?:z|[+-]\d{2}:?\d{2})$/i.test(normalized);
  return Date.parse(hasExplicitTimezone ? normalized : `${normalized}Z`);
}

function publicHistory(heartbeats: KumaHeartbeat[] | undefined): PublicServiceHistoryPoint[] {
  return (heartbeats ?? [])
    .map((heartbeat) => ({
      status: toPublicStatus(heartbeat.status),
      checkedAt: safeTimestamp(heartbeat.time),
    }))
    .filter((heartbeat): heartbeat is PublicServiceHistoryPoint => heartbeat.checkedAt !== null)
    .sort((left, right) => Date.parse(left.checkedAt) - Date.parse(right.checkedAt))
    .slice(-60);
}

function safeTimestamp(value: string | undefined): string | null {
  const timestamp = parseTimestamp(value);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

function overallStatus(services: PublicService[]): PublicServiceStatus {
  const monitored = services.filter(({ status }) => status !== 'unknown');

  if (monitored.length === 0) return 'unknown';
  if (monitored.every(({ status }) => status === 'offline')) return 'offline';
  if (monitored.some(({ status }) => status === 'offline' || status === 'degraded')) {
    return 'degraded';
  }
  return 'operational';
}

export async function getPublicStatusSnapshot(): Promise<PublicStatusSnapshot> {
  const baseUrl = process.env.UPTIME_KUMA_PUBLIC_URL?.replace(/\/+$/, '');
  const slug = process.env.UPTIME_KUMA_STATUS_PAGE_SLUG ?? 'raytimz';

  if (!baseUrl) return unknownSnapshot();

  try {
    const options: RequestInit = {
      cache: 'no-store',
      signal: AbortSignal.timeout(sourceTimeoutMilliseconds),
    };
    const encodedSlug = encodeURIComponent(slug);
    const [statusPageResponse, heartbeatResponse] = await Promise.all([
      fetch(`${baseUrl}/api/status-page/${encodedSlug}`, options),
      fetch(`${baseUrl}/api/status-page/heartbeat/${encodedSlug}`, options),
    ]);

    if (!statusPageResponse.ok || !heartbeatResponse.ok) return unknownSnapshot();

    const statusPage = await statusPageResponse.json() as KumaStatusPage;
    const heartbeatPage = await heartbeatResponse.json() as KumaHeartbeatPage;
    const monitors = statusPage.publicGroupList
      ?.flatMap(({ monitorList }) => monitorList ?? []) ?? [];

    const services: PublicService[] = serviceRegistry.map((definition) => {
      const { monitorName, ...service } = definition;
      const monitor = monitorName
        ? monitors.find(({ name }) => name === monitorName)
        : undefined;
      const history = monitor?.id === undefined
        ? []
        : publicHistory(heartbeatPage.heartbeatList?.[String(monitor.id)]);
      const latestCheck = history.at(-1);

      return {
        ...service,
        status: latestCheck?.status ?? 'unknown',
        checkedAt: latestCheck?.checkedAt ?? null,
        history,
      };
    });

    return {
      overallStatus: overallStatus(services),
      generatedAt: new Date().toISOString(),
      services,
    };
  } catch {
    return unknownSnapshot();
  }
}

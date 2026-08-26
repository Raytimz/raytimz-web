import {
  serviceRegistry,
  type PublicService,
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
    })),
  };
}

function toPublicStatus(status: number | undefined): PublicServiceStatus {
  if (status === 1) return 'operational';
  if (status === 0) return 'offline';
  if (status === 3) return 'degraded';
  return 'unknown';
}

function newestHeartbeat(heartbeats: KumaHeartbeat[] | undefined) {
  if (!heartbeats?.length) return undefined;

  return [...heartbeats].sort((left, right) => {
    const leftTime = Date.parse(left.time ?? '');
    const rightTime = Date.parse(right.time ?? '');
    return (Number.isNaN(rightTime) ? 0 : rightTime)
      - (Number.isNaN(leftTime) ? 0 : leftTime);
  })[0];
}

function safeTimestamp(value: string | undefined): string | null {
  if (!value) return null;
  const timestamp = Date.parse(value);
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
      const heartbeat = monitor?.id === undefined
        ? undefined
        : newestHeartbeat(heartbeatPage.heartbeatList?.[String(monitor.id)]);

      return {
        ...service,
        status: toPublicStatus(heartbeat?.status),
        checkedAt: safeTimestamp(heartbeat?.time),
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

export type PublicServiceStatus =
  | 'operational'
  | 'degraded'
  | 'offline'
  | 'unknown';

export type PublicServiceGroup = 'Web' | 'Bots' | 'Services';

export type PublicServiceHistoryPoint = {
  status: PublicServiceStatus;
  checkedAt: string;
};

export type PublicService = {
  id: string;
  name: string;
  description: string;
  group: PublicServiceGroup;
  status: PublicServiceStatus;
  checkedAt: string | null;
  history: PublicServiceHistoryPoint[];
};

export type PublicStatusSnapshot = {
  overallStatus: PublicServiceStatus;
  generatedAt: string;
  services: PublicService[];
};

type ServiceDefinition = Omit<PublicService, 'status' | 'checkedAt' | 'history'> & {
  monitorName?: string;
};

export const serviceRegistry: readonly ServiceDefinition[] = [
  {
    id: 'website',
    name: 'raytimz.com',
    description: 'Personal website and public pages.',
    group: 'Web',
    monitorName: 'raytimz.com',
  },
  {
    id: 'statebot',
    name: 'StateBot',
    description: 'Discord automation and community workflows.',
    group: 'Bots',
    monitorName: 'StateBot',
  },
  {
    id: 'hobbshelper',
    name: 'HobbsHelper',
    description: 'Discord assistant and supporting workflows.',
    group: 'Bots',
    monitorName: 'HobbsHelper',
  },
  {
    id: 'majestic-forms',
    name: 'MajesticForms',
    description: 'Form delivery and processing.',
    group: 'Services',
    monitorName: 'MajesticForms',
  },
] as const;

export const publicServiceGroups: readonly PublicServiceGroup[] = [
  'Web',
  'Bots',
  'Services',
];

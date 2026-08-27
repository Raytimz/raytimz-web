import type { PublicServiceGroup, PublicServiceStatus } from './status/services';

export type Locale = 'en' | 'ru';

export type LandingCopy = {
  locale: Locale;
  languageLabel: string;
  eyebrow: string;
  headline: {
    ariaLabel: string;
    greeting: string;
    name: string;
    profession: string;
  };
  introduction: string;
  education: {
    ariaLabel: string;
    title: string;
    institution: string;
    bachelorLabel: string;
    bachelorSubject: string;
    bachelorStatus: string;
    masterLabel: string;
    masterSubject: string;
    masterStatus: string;
  };
  socialTitle: string;
  statusLink: string;
  statusHref: string;
  footerName: string;
};

export const landingCopy: Record<Locale, LandingCopy> = {
  en: {
    locale: 'en',
    languageLabel: 'Language',
    eyebrow: 'About me',
    headline: {
      ariaLabel: 'Hi, I’m Dmitry, software engineer.',
      greeting: "Hi, I'm",
      name: 'Dmitry',
      profession: 'Software engineer.',
    },
    introduction:
      "Based in Switzerland, I'm drawn to thoughtful software and elegant product design—with plenty of room left for off-road adventures and well-crafted games.",
    education: {
      ariaLabel: "Dmitry's education at EPFL",
      title: 'Education',
      institution: 'EPFL',
      bachelorLabel: "Bachelor's degree",
      bachelorSubject: 'Computer Science',
      bachelorStatus: 'Completed',
      masterLabel: "Master's degree",
      masterSubject: 'Data Science',
      masterStatus: 'Ongoing',
    },
    socialTitle: 'Find me:',
    statusLink: 'System status',
    statusHref: '/status',
    footerName: 'Dmitry',
  },
  ru: {
    locale: 'ru',
    languageLabel: 'Язык',
    eyebrow: 'Обо мне',
    headline: {
      ariaLabel: 'Привет, я Дмитрий, software engineer.',
      greeting: 'Привет, я',
      name: 'Дмитрий',
      profession: 'Software engineer.',
    },
    introduction:
      'Живу в Швейцарии. Люблю продуманный софт и продукты, в которых инженерная точность сочетается с хорошим дизайном. Вне работы — бездорожье и игры, сделанные с вниманием к деталям.',
    education: {
      ariaLabel: 'Образование Дмитрия в EPFL',
      title: 'Образование',
      institution: 'EPFL',
      bachelorLabel: 'Бакалавриат',
      bachelorSubject: 'Computer Science',
      bachelorStatus: 'Завершено',
      masterLabel: 'Магистратура',
      masterSubject: 'Data Science',
      masterStatus: 'Сейчас',
    },
    socialTitle: 'На связи:',
    statusLink: 'Статус сервисов',
    statusHref: '/ru/status',
    footerName: 'Дмитрий',
  },
};

type SummaryCopy = Record<PublicServiceStatus, { title: string; text: string }>;

export type StatusCopy = {
  locale: Locale;
  languageLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  summary: SummaryCopy;
  statusLabels: Record<PublicServiceStatus, string>;
  factLabels: { monitored: string; incidents: string; updated: string };
  groupLabels: Record<PublicServiceGroup, string>;
  serviceDescriptions: Record<string, string>;
  checkedPrefix: string;
  awaitingCheck: string;
  serviceCount: (count: number) => string;
  homeLink: string;
  homeHref: string;
  footerName: string;
};

export const statusCopy: Record<Locale, StatusCopy> = {
  en: {
    locale: 'en',
    languageLabel: 'Language',
    eyebrow: 'Live systems',
    title: 'System status',
    intro: 'A clear, public view of service availability.',
    summary: {
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
    },
    statusLabels: {
      operational: 'Operational',
      degraded: 'Degraded',
      offline: 'Offline',
      unknown: 'Not monitored',
    },
    factLabels: { monitored: 'Monitored', incidents: 'Incidents', updated: 'Updated' },
    groupLabels: { Web: 'Web', Bots: 'Bots', Services: 'Services' },
    serviceDescriptions: {
      website: 'Personal website and public pages.',
      statebot: 'Discord automation and community workflows.',
      hobbshelper: 'Discord assistant and supporting workflows.',
      'majestic-forms': 'Form delivery and processing.',
    },
    checkedPrefix: 'Checked',
    awaitingCheck: 'Awaiting first check',
    serviceCount: (count) => `${count} ${count === 1 ? 'service' : 'services'}`,
    homeLink: 'About me',
    homeHref: '/',
    footerName: 'Dmitry',
  },
  ru: {
    locale: 'ru',
    languageLabel: 'Язык',
    eyebrow: 'Сервисы',
    title: 'Статус сервисов',
    intro: 'Актуальное состояние — коротко и без лишних деталей.',
    summary: {
      operational: {
        title: 'Всё работает',
        text: 'Проблем в отслеживаемых сервисах не обнаружено.',
      },
      degraded: {
        title: 'Есть нестабильные сервисы',
        text: 'Как минимум один сервис отвечает, но работает нештатно.',
      },
      offline: {
        title: 'Сервисы недоступны',
        text: 'Отслеживаемые сервисы сейчас не отвечают.',
      },
      unknown: {
        title: 'Мониторинг временно недоступен',
        text: 'Не удалось получить актуальные данные о состоянии сервисов.',
      },
    },
    statusLabels: {
      operational: 'Работает',
      degraded: 'Нестабильно',
      offline: 'Недоступно',
      unknown: 'Не отслеживается',
    },
    factLabels: { monitored: 'Отслеживается', incidents: 'Сбоев', updated: 'Обновлено' },
    groupLabels: { Web: 'Web', Bots: 'Bots', Services: 'Services' },
    serviceDescriptions: {
      website: 'Личный сайт и публичные страницы.',
      statebot: 'Discord-автоматизация и инструменты для сообщества.',
      hobbshelper: 'Discord-ассистент и связанные сценарии.',
      'majestic-forms': 'Формы и их обработка.',
    },
    checkedPrefix: 'Проверено',
    awaitingCheck: 'Проверки ещё не было',
    serviceCount: (count) => {
      const mod10 = count % 10;
      const mod100 = count % 100;
      const noun = mod10 === 1 && mod100 !== 11
        ? 'сервис'
        : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
          ? 'сервиса'
          : 'сервисов';
      return `${count} ${noun}`;
    },
    homeLink: 'Обо мне',
    homeHref: '/ru',
    footerName: 'Дмитрий',
  },
};

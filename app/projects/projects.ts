import type { Locale } from '../localization';

export type ProjectId = 'statebot' | 'hobbshelper' | 'majesticforms';

type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectVisual = {
  kind: 'image' | 'placeholder' | 'majestic-form' | 'majestic-relay';
  image?: string;
  alt?: string;
  placeholderLabel?: string;
  title: string;
  caption: string;
};

type ProjectLocalizedContent = {
  category: string;
  tagline: string;
  heroDescription?: string;
  overviewTitle: string;
  overview: string[];
  featuresTitle: string;
  visualsTitle: string;
  features: ProjectFeature[];
  visuals: ProjectVisual[];
};

export type ProjectDefinition = {
  id: ProjectId;
  serviceId: string;
  name: string;
  accent: string;
  logo: { kind: 'image'; src: string; alt: string } | { kind: 'monogram'; text: string };
  stack: string[];
  content: Record<Locale, ProjectLocalizedContent>;
};

export const projects: Record<ProjectId, ProjectDefinition> = {
  statebot: {
    id: 'statebot',
    serviceId: 'statebot',
    name: 'StateBot',
    accent: '#ff8a3d',
    logo: {
      kind: 'image',
      src: '/projects/statebot/logo.png',
      alt: 'StateBot logo',
    },
    stack: ['Node.js 22', 'discord.js 14', 'Docker', 'GitHub Actions'],
    content: {
      en: {
        category: 'Discord automation',
        tagline: 'Factions, ranks, and appointments — one consistent system.',
        heroDescription: 'A Discord bot that manages the Majestic RP community built around government factions. It enforces nickname conventions, roles, and leadership ranks, coordinates appointments, and gives administrators safeguards for large-scale actions.',
        overviewTitle: 'Technical foundations for complex Discord workflows.',
        overview: [
          'StateBot is built on Node.js 22 and discord.js 14. Its functionality is split into independent modules for slash commands, context commands, forms, buttons, and multi-step confirmation flows.',
          'Running in Docker keeps local and server environments consistent, simplifies updates, and makes every version reproducible. GitHub Actions validates the code, builds an image, and deploys it to the production instance automatically.',
        ],
        featuresTitle: 'Administrative rules, encoded once.',
        visualsTitle: 'Real workflows, captured in Discord.',
        features: [
          {
            title: 'Factions and identity',
            description: 'Nickname formats, faction roles, and rank changes are validated against the same domain rules.',
          },
          {
            title: 'Leadership appointments',
            description: 'Leader and deputy requests collect context, enforce limits, and require explicit confirmation.',
          },
          {
            title: 'Safe bulk operations',
            description: 'Roster clean-ups preview the selected faction, ranks, and affected members before execution.',
          },
        ],
        visuals: [
          {
            kind: 'placeholder',
            placeholderLabel: 'Screenshot coming soon',
            title: 'Leader appointment',
            caption: 'The `/новый-лидер` form and its request with the candidate, faction, and confirmation action.',
          },
          {
            kind: 'placeholder',
            placeholderLabel: 'Screenshot coming soon',
            title: 'Mass roster cleanup',
            caption: 'A wipe request showing the selected faction, ranks, and affected member count before confirmation.',
          },
        ],
      },
      ru: {
        category: 'Discord-автоматизация',
        tagline: 'Фракции, ранги и назначения — по единым правилам.',
        heroDescription: 'Discord-бот для автоматизированного управления сообществом игроков государственных фракций Majestic RP. Контролирует никнеймы, роли и руководящие ранги, организует назначения и помогает безопасно проводить массовые административные операции.',
        overviewTitle: 'Техническая основа сложных Discord-сценариев.',
        overview: [
          'StateBot написан на Node.js 22 и discord.js 14. Функциональность разделена на независимые модули для slash-команд, контекстных команд, форм, кнопок и многоэтапных сценариев подтверждения.',
          'Бот работает в Docker-контейнере, что обеспечивает одинаковое окружение при локальном запуске и на сервере, упрощает обновления и позволяет воспроизводимо разворачивать новые версии. GitHub Actions автоматически проверяет код, собирает образ и запускает обновление production-инстанса.',
        ],
        featuresTitle: 'Административные правила — в одном месте.',
        visualsTitle: 'Реальные сценарии в интерфейсе Discord.',
        features: [
          {
            title: 'Фракции и профиль',
            description: 'Формат никнейма, фракционные роли и ранги проверяются по единым правилам.',
          },
          {
            title: 'Назначения руководства',
            description: 'Заявки на лидеров и заместителей собирают контекст, учитывают лимиты и требуют подтверждения.',
          },
          {
            title: 'Безопасные массовые операции',
            description: 'Перед чисткой бот показывает выбранную фракцию, ранги и число затронутых участников.',
          },
        ],
        visuals: [
          {
            kind: 'placeholder',
            placeholderLabel: 'Здесь появится скриншот',
            title: 'Назначение лидера',
            caption: 'Форма `/новый-лидер` и созданная заявка с кандидатом, фракцией и кнопкой подтверждения.',
          },
          {
            kind: 'placeholder',
            placeholderLabel: 'Здесь появится скриншот',
            title: 'Массовая чистка состава',
            caption: 'Запрос на вайп с выбранной фракцией, рангами и предварительным количеством участников.',
          },
        ],
      },
    },
  },
  hobbshelper: {
    id: 'hobbshelper',
    serviceId: 'hobbshelper',
    name: 'HobbsHelper',
    accent: '#c49af3',
    logo: {
      kind: 'image',
      src: '/projects/hobbshelper/logo.jpg',
      alt: 'HobbsHelper monogram',
    },
    stack: ['Java 21', 'JDA', 'SQLite', 'HikariCP', 'OpenAI API', 'LavaPlayer'],
    content: {
      en: {
        category: 'Community assistant',
        tagline: 'One community, one deeply contextual assistant.',
        overviewTitle: 'A bot shaped around the community it serves.',
        overview: [
          'HobbsHelper brings the routines of a role-play community into one Discord companion: onboarding guides, role requests, reports, event scheduling, birthday reminders, audio and a searchable knowledge assistant.',
          'Its value comes from context. The bot understands the community’s own language, rules and recurring tasks, then places the right interaction directly in the channels where people already work.',
        ],
        featuresTitle: 'Many routines, one coherent surface.',
        visualsTitle: 'Guides with a world of their own.',
        features: [
          {
            title: 'Community memory',
            description: 'Knowledge-assisted answers combine curated material with member-aware context.',
          },
          {
            title: 'Routines in one place',
            description: 'Reports, schedules, roles, reminders and onboarding live in a consistent Discord surface.',
          },
          {
            title: 'Persistent by design',
            description: 'SQLite-backed state keeps scheduled events and community data available between restarts.',
          },
        ],
        visuals: [
          {
            kind: 'image',
            image: '/projects/hobbshelper/banner.jpg',
            alt: 'Hobbs community banner',
            title: 'A distinct community identity',
            caption: 'The assistant is built around the tone and visual language of Hobbs.',
          },
          {
            kind: 'image',
            image: '/projects/hobbshelper/atelier.jpg',
            alt: 'In-game contract interface used in a HobbsHelper guide',
            title: 'Visual onboarding guides',
            caption: 'Step-by-step material helps members understand complex in-game systems.',
          },
          {
            kind: 'image',
            image: '/projects/hobbshelper/tuning.jpg',
            alt: 'In-game tuning interface used in a HobbsHelper guide',
            title: 'Knowledge where it is useful',
            caption: 'Reference imagery is organized and delivered inside the community workflow.',
          },
        ],
      },
      ru: {
        category: 'Ассистент сообщества',
        tagline: 'Ассистент, который знает контекст сообщества.',
        overviewTitle: 'Бот, выросший из реальных задач сообщества.',
        overview: [
          'HobbsHelper объединяет повседневные процессы ролевого сообщества в одном Discord-ассистенте: приветственные материалы, роли, отчёты, события, дни рождения, аудио и поиск ответов по внутренней базе знаний.',
          'Его главное преимущество — контекст. Бот понимает привычные термины, правила и сценарии сообщества и приносит нужный инструмент прямо в те каналы, где уже идёт работа.',
        ],
        featuresTitle: 'Много задач — один цельный интерфейс.',
        visualsTitle: 'Гайды с характером собственного мира.',
        features: [
          {
            title: 'Память сообщества',
            description: 'Ответы опираются на подготовленные материалы и учитывают контекст участников.',
          },
          {
            title: 'Всё привычное — рядом',
            description: 'Отчёты, события, роли, напоминания и онбординг собраны в едином Discord-интерфейсе.',
          },
          {
            title: 'Состояние не теряется',
            description: 'SQLite хранит события и данные сообщества между перезапусками.',
          },
        ],
        visuals: [
          {
            kind: 'image',
            image: '/projects/hobbshelper/banner.jpg',
            alt: 'Баннер сообщества Hobbs',
            title: 'Собственная идентичность',
            caption: 'Ассистент продолжает характер и визуальный язык Hobbs.',
          },
          {
            kind: 'image',
            image: '/projects/hobbshelper/atelier.jpg',
            alt: 'Интерфейс контрактов из гайда HobbsHelper',
            title: 'Наглядные инструкции',
            caption: 'Пошаговые материалы помогают разобраться в сложных игровых системах.',
          },
          {
            kind: 'image',
            image: '/projects/hobbshelper/tuning.jpg',
            alt: 'Интерфейс тюнинга из гайда HobbsHelper',
            title: 'Знания в нужный момент',
            caption: 'Справочные изображения организованы и доступны прямо внутри рабочего сценария.',
          },
        ],
      },
    },
  },
  majesticforms: {
    id: 'majesticforms',
    serviceId: 'majestic-forms',
    name: 'MajesticForms',
    accent: '#70d7c7',
    logo: { kind: 'monogram', text: 'MF' },
    stack: ['Node.js', 'Express', 'Google Apps Script', 'Discord Webhooks', 'JSON'],
    content: {
      en: {
        category: 'Infrastructure service',
        tagline: 'Form submissions, delivered where the team already works.',
        overviewTitle: 'A small bridge with one job to do well.',
        overview: [
          'MajesticForms receives structured submissions from Google Forms and forwards them to the correct Discord webhook. A compact route hierarchy maps each region, server, category and form without putting webhook secrets into Apps Script.',
          'The relay stays deliberately narrow: bounded request bodies, timeouts, concurrency limits and reloadable JSON configuration make it dependable without turning it into a larger platform than the problem requires.',
        ],
        featuresTitle: 'Small surface, careful boundaries.',
        visualsTitle: 'From response to review.',
        features: [
          {
            title: 'Clear routing',
            description: 'Every form maps to one explicit region, server, category and Discord destination.',
          },
          {
            title: 'Secrets stay central',
            description: 'Webhook URLs remain server-side instead of being copied into individual form scripts.',
          },
          {
            title: 'Bounded behavior',
            description: 'Timeouts, payload limits and concurrency controls keep a tiny relay predictable.',
          },
        ],
        visuals: [
          {
            kind: 'majestic-form',
            title: 'A familiar input surface',
            caption: 'Teams keep using ordinary forms; the delivery mechanics remain invisible.',
          },
          {
            kind: 'majestic-relay',
            title: 'Structured Discord delivery',
            caption: 'Each submission arrives in the right channel as a consistent, readable message.',
          },
        ],
      },
      ru: {
        category: 'Инфраструктурный сервис',
        tagline: 'Ответы из форм — сразу туда, где работает команда.',
        overviewTitle: 'Небольшой мост, который хорошо решает одну задачу.',
        overview: [
          'MajesticForms принимает структурированные ответы из Google Forms и отправляет их в нужный Discord webhook. Компактная система маршрутов связывает регион, сервер, категорию и форму, не раскрывая адреса webhook в Apps Script.',
          'Сервис сознательно остаётся простым: ограничения размера запросов и параллельной нагрузки, таймауты и обновляемая JSON-конфигурация дают надёжность без лишней платформенной сложности.',
        ],
        featuresTitle: 'Маленький сервис с чёткими границами.',
        visualsTitle: 'От ответа до рассмотрения.',
        features: [
          {
            title: 'Понятные маршруты',
            description: 'Каждая форма однозначно связана с регионом, сервером, категорией и каналом Discord.',
          },
          {
            title: 'Секреты в одном месте',
            description: 'Webhook URL остаются на сервере и не копируются в скрипты отдельных форм.',
          },
          {
            title: 'Предсказуемая нагрузка',
            description: 'Таймауты и лимиты сохраняют устойчивость даже у небольшого сервиса.',
          },
        ],
        visuals: [
          {
            kind: 'majestic-form',
            title: 'Знакомый интерфейс',
            caption: 'Команда продолжает работать с обычными формами, не замечая механику доставки.',
          },
          {
            kind: 'majestic-relay',
            title: 'Аккуратная доставка в Discord',
            caption: 'Каждый ответ появляется в нужном канале в едином и читаемом формате.',
          },
        ],
      },
    },
  },
};

export const projectPageCopy: Record<Locale, {
  projectLabel: string;
  overviewLabel: string;
  stackLabel: string;
  featuresLabel: string;
  visualsLabel: string;
  statusLabel: string;
  statusDescriptions: { operational: string; degraded: string; offline: string; unknown: string };
  recentChecks: (count: number) => string;
  statusLink: string;
  homeLink: string;
  languageLabel: string;
  footerName: string;
}> = {
  en: {
    projectLabel: 'Project',
    overviewLabel: 'Overview',
    stackLabel: 'Built with',
    featuresLabel: 'What it handles',
    visualsLabel: 'In practice',
    statusLabel: 'Live status',
    statusDescriptions: {
      operational: 'Public monitoring reports this project as operational.',
      degraded: 'The project is responding, but public monitoring reports degraded operation.',
      offline: 'Public monitoring currently reports this project as unavailable.',
      unknown: 'Public monitoring has not been configured for this project yet.',
    },
    recentChecks: (count) => `${count} recent ${count === 1 ? 'check' : 'checks'}`,
    statusLink: 'System status',
    homeLink: 'About me',
    languageLabel: 'Language',
    footerName: 'Dmitry',
  },
  ru: {
    projectLabel: 'Проект',
    overviewLabel: 'О проекте',
    stackLabel: 'Стек',
    featuresLabel: 'Что он умеет',
    visualsLabel: 'Как это выглядит',
    statusLabel: 'Текущий статус',
    statusDescriptions: {
      operational: 'По данным публичного мониторинга проект работает штатно.',
      degraded: 'Проект отвечает, но мониторинг фиксирует нестабильную работу.',
      offline: 'Сейчас публичный мониторинг считает проект недоступным.',
      unknown: 'Публичный мониторинг для этого проекта пока не настроен.',
    },
    recentChecks: (count) => {
      const mod10 = count % 10;
      const mod100 = count % 100;
      const noun = mod10 === 1 && mod100 !== 11
        ? 'проверка'
        : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
          ? 'проверки'
          : 'проверок';
      return `${count} ${noun}`;
    },
    statusLink: 'Статус систем',
    homeLink: 'Обо мне',
    languageLabel: 'Язык',
    footerName: 'Дмитрий',
  },
};

export function projectHref(projectId: ProjectId, locale: Locale) {
  return `${locale === 'ru' ? '/ru' : ''}/projects/${projectId}`;
}

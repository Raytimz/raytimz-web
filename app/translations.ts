export type LandingCopy = {
  locale: 'en' | 'ru';
  languageLabel: string;
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
  footerName: string;
};

export const englishCopy: LandingCopy = {
  locale: 'en',
  languageLabel: 'Language',
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
  footerName: 'Dmitry',
};

export const russianCopy: LandingCopy = {
  locale: 'ru',
  languageLabel: 'Язык',
  headline: {
    ariaLabel: 'Привет, я Дмитрий, разработчик программного обеспечения.',
    greeting: 'Привет, я',
    name: 'Дмитрий',
    profession: 'Разработчик ПО.',
  },
  introduction:
    'Живу в Швейцарии и ценю продуманный софт и элегантный продуктовый дизайн — но всегда остаётся место для поездок по бездорожью и хорошо сделанных игр.',
  education: {
    ariaLabel: 'Образование Дмитрия в EPFL',
    title: 'Образование',
    institution: 'EPFL',
    bachelorLabel: 'Бакалавриат',
    bachelorSubject: 'Информатика',
    bachelorStatus: 'Завершён',
    masterLabel: 'Магистратура',
    masterSubject: 'Наука о данных',
    masterStatus: 'В процессе',
  },
  socialTitle: 'Где меня найти:',
  footerName: 'Дмитрий',
};

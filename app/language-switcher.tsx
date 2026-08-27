import type { Locale } from './localization';

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  englishHref: string;
  russianHref: string;
};

export default function LanguageSwitcher({
  locale,
  label,
  englishHref,
  russianHref,
}: LanguageSwitcherProps) {
  return (
    <nav className="language-switcher" aria-label={label}>
      {locale === 'en' ? (
        <span aria-current="page">EN</span>
      ) : (
        <a href={englishHref} hrefLang="en" lang="en">EN</a>
      )}
      <i aria-hidden="true">/</i>
      {locale === 'ru' ? (
        <span aria-current="page">RU</span>
      ) : (
        <a href={russianHref} hrefLang="ru" lang="ru">RU</a>
      )}
    </nav>
  );
}

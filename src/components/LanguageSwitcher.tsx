import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const toggleLanguage = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-current/20 hover:bg-white/10"
      aria-label={currentLang === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      {currentLang === 'fr' ? (
        <>
          <span className="text-base leading-none">🇬🇧</span>
          <span>EN</span>
        </>
      ) : (
        <>
          <span className="text-base leading-none">🇫🇷</span>
          <span>FR</span>
        </>
      )}
    </button>
  );
}

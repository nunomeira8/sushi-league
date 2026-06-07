import { Language } from '@/types/language';

export const LANGUAGE_CHANGED_EVENT = 'sushi-language-changed';

const LANGUAGE_KEY = 'sushi-language';

export function saveLanguage(language: Language) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(LANGUAGE_KEY, language);
    window.dispatchEvent(new Event(LANGUAGE_CHANGED_EVENT));
  } catch {
    // Keep the current language when browser storage is unavailable.
  }
}

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  try {
    const language = localStorage.getItem(LANGUAGE_KEY);

    if (language === 'pt' || language === 'fr') {
      return language;
    }
  } catch {
    // Fall back to English when browser storage is unavailable.
  }

  return 'en';
}

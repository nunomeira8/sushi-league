'use client';

import { useSyncExternalStore } from 'react';

import { getLanguage, LANGUAGE_CHANGED_EVENT } from '@/lib/language';
import { Language } from '@/types/language';

function subscribeToLanguage(onLanguageChange: () => void) {
  window.addEventListener('storage', onLanguageChange);
  window.addEventListener(LANGUAGE_CHANGED_EVENT, onLanguageChange);

  return () => {
    window.removeEventListener('storage', onLanguageChange);
    window.removeEventListener(LANGUAGE_CHANGED_EVENT, onLanguageChange);
  };
}

function getServerLanguage(): Language {
  return 'en';
}

export function useLanguage() {
  return useSyncExternalStore(subscribeToLanguage, getLanguage, getServerLanguage);
}

'use client';

import { useState, useEffect } from 'react';

import { ActionCard } from '@/components/home/ActionCard';
import { LanguageSelector } from '@/components/home/LanguageSelector';
import { WelcomeSection } from '@/components/home/WelcomeSection';

import { translations } from '@/i18n/translations';
import { Language } from '@/types/language';

import { getLanguage, saveLanguage } from '@/lib/language';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#FAF7F2] px-6 pt-6">
      <LanguageSelector
        selectedLanguage={language}
        onSelect={(lang) => {
          setLanguage(lang);

          saveLanguage(lang);
        }}
      />

      <div className="-mt-24 flex w-full flex-1 flex-col items-center justify-center">
        <h1 className="text-center text-5xl font-bold tracking-tight text-[#222222]">Sushi League 🍣</h1>

        <h2 className="mt-4 text-center text-xl font-medium text-[#FF8E72]">All you can (b)eat version!</h2>

        <WelcomeSection title={t.welcome} />

        <ActionCard createRoomText={t.createRoom} joinRoomText={t.joinRoom} />
      </div>
    </main>
  );
}

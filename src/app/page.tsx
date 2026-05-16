'use client';

import { useState, useEffect } from 'react';

import { ActionCard } from '@/components/home/ActionCard';
import { LanguageSelector } from '@/components/home/LanguageSelector';
import { WelcomeSection } from '@/components/home/WelcomeSection';

import { translations } from '@/i18n/translations';
import { Language } from '@/types/language';

import { getLanguage, saveLanguage } from '@/lib/language';
import { HowToPlayModal } from '@/components/home/HowToPlayModal';

export default function Home() {
  const [language, setLanguage] =
    useState<Language>('en');

  const [isHowToOpen, setIsHowToOpen] =
    useState(false);

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

        <button
          onClick={() => setIsHowToOpen(true)}
          className="mt-5 rounded-2xl border border-[#FF7F5C] bg-white px-5 py-3 font-semibold text-[#FF7F5C] shadow-sm transition hover:scale-[1.03] active:scale-95"
        >
          {t.howToPlay}
        </button>

        <WelcomeSection title={t.welcome} />

        <ActionCard createRoomText={t.createRoom} joinRoomText={t.joinRoom} />

        <HowToPlayModal isOpen={isHowToOpen} onClose={() => setIsHowToOpen(false)} t={t} />
      </div>
    </main>
  );
}

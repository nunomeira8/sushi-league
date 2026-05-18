'use client';

import { useState, useEffect } from 'react';

import { ActionCard } from '@/components/home/ActionCard';
import { LanguageSelector } from '@/components/home/LanguageSelector';
import { WelcomeSection } from '@/components/home/WelcomeSection';

import { translations } from '@/i18n/translations';
import { Language } from '@/types/language';

import { getLanguage, saveLanguage } from '@/lib/language';
import { HowToPlayModal } from '@/components/home/HowToPlayModal';
import { FeedbackModal } from '@/components/home/FeedbackModal';

import packageJson from '../../package.json';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  const [isHowToOpen, setIsHowToOpen] = useState(false);

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const t = translations[language];

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center bg-[#FAF7F2] px-6 pt-4">
      <LanguageSelector
        selectedLanguage={language}
        onSelect={(lang) => {
          setLanguage(lang);

          saveLanguage(lang);
        }}
      />

      <div className="flex w-full flex-1 flex-col items-center justify-center pt-4 sm:pt-0">
        {' '}
        <h1 className="text-center text-4xl font-bold tracking-tight text-[#222222] sm:text-5xl">Sushi League 🍣</h1>
        <h2 className="mt-3 text-center text-lg font-medium text-[#FF8E72] sm:mt-4 sm:text-xl">
          All you can (b)eat version!
        </h2>
        <button
          onClick={() => setIsHowToOpen(true)}
          className="mt-4 rounded-2xl border border-[#FF7F5C] bg-white px-4 py-2.5 text-sm font-semibold text-[#FF7F5C] shadow-sm transition hover:scale-[1.03] active:scale-95 sm:mt-5 sm:px-5 sm:py-3 sm:text-base"
        >
          {t.howToPlay}
        </button>
        <WelcomeSection title={t.welcome} />
        <ActionCard createRoomText={t.createRoom} joinRoomText={t.joinRoom} />
        <HowToPlayModal isOpen={isHowToOpen} onClose={() => setIsHowToOpen(false)} t={t} />
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          t={t}
          language={language}
          version={packageJson.version}
        />
      </div>
      <div className="flex items-center gap-2 pb-6 text-sm text-gray-400">
        <span>v{packageJson.version}</span>

        <span>•</span>

        <button onClick={() => setIsFeedbackOpen(true)} className="font-medium text-[#FF7F5C]">
          {t.feedbackSupport}
        </button>
      </div>
    </main>
  );
}

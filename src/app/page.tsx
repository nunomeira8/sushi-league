'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CircleHelp } from 'lucide-react';

import { ActionCard } from '@/components/home/ActionCard';
import { LanguageSelector } from '@/components/home/LanguageSelector';

import { translations } from '@/i18n/translations';

import { saveLanguage } from '@/lib/language';
import { useLanguage } from '@/lib/useLanguage';
import { HowToPlayModal } from '@/components/home/HowToPlayModal';
import { FeedbackModal } from '@/components/home/FeedbackModal';

import packageJson from '../../package.json';
import logo from '../../logo.png';

export default function Home() {
  const language = useLanguage();

  const [isHowToOpen, setIsHowToOpen] = useState(false);

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const t = translations[language];

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center bg-[#FAF7F2] px-5 pt-4">
      <button
        onClick={() => setIsHowToOpen(true)}
        aria-label={t.howToPlay}
        title={t.howToPlay}
        className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#F0E8DE] bg-white text-[#FF7F5C] shadow-sm transition hover:bg-[#FFF5F1] active:scale-95"
      >
        <CircleHelp size={21} strokeWidth={2.25} aria-hidden="true" />
      </button>

      <LanguageSelector
        selectedLanguage={language}
        onSelect={(lang) => {
          saveLanguage(lang);
        }}
      />

      <div className="flex w-full flex-1 flex-col items-center pt-14 pb-8 [@media(min-height:780px)]:justify-center [@media(min-height:780px)]:pt-16 [@media(min-height:780px)]:pb-16">
        <Image
          src={logo}
          alt="Sushi League - All You Can Eat Version"
          width={1024}
          height={1024}
          priority
          className="h-auto w-full max-w-[250px] [@media(min-height:780px)]:max-w-[290px]"
        />

        <p className="mt-4 text-center text-sm font-semibold whitespace-nowrap text-[#3A322E] [@media(min-height:780px)]:mt-5 [@media(min-height:780px)]:text-base">
          {t.homeIntro}
        </p>

        <div className="mt-5 flex w-full justify-center [@media(min-height:780px)]:mt-7">
          <ActionCard createRoomText={t.createRoom} joinRoomText={t.joinRoom} />
        </div>

        <HowToPlayModal isOpen={isHowToOpen} onClose={() => setIsHowToOpen(false)} t={t} />
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          t={t}
          language={language}
          version={packageJson.version}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 pb-5 text-xs text-gray-400 sm:text-sm">
        <button onClick={() => setIsFeedbackOpen(true)} className="font-medium text-[#FF7F5C]">
          {t.feedbackSupport}
        </button>

        <span>•</span>

        <a
          href="https://buymeacoffee.com/sushileague"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-[#FF7F5C] transition hover:text-[#E96849]"
        >
          Buy me a coffee
        </a>

        <span>•</span>

        <span className="text-gray-300">v{packageJson.version}</span>
      </div>
    </main>
  );
}

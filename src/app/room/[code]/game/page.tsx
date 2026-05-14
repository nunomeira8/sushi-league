'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { supabase } from '@/lib/supabase';

import { translations } from '@/i18n/translations';

import { Room } from '@/types/room';

import { useRouter } from 'next/navigation';

import { getPlayerId } from '@/lib/storage';

import { GiveUpModal } from '@/components/game/GiveUpModal';

export default function GamePage() {
  const params = useParams();

  const code = params.code as string;

  const language = 'en';

  const t = translations[language];

  const [room, setRoom] = useState<Room | null>(null);

  const [showIntro, setShowIntro] = useState(true);

  const [timeLeft, setTimeLeft] = useState(0);

  const router = useRouter();

  const [isGiveUpOpen, setIsGiveUpOpen] = useState(false);

  async function fetchRoom() {
    const { data } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!data) return;

    setRoom(data);

    const now = new Date();

    const end = new Date(data.ended_at);

    const secondsLeft = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));

    setTimeLeft(secondsLeft);
  }

  useEffect(() => {
    fetchRoom();

    const introTimeout = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => clearTimeout(introTimeout);
  }, []);

  useEffect(() => {
    if (showIntro) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showIntro]);

  if (!room) {
    return null;
  }

  async function giveUp() {
    const playerId = getPlayerId();

    await supabase
      .from('players')
      .update({
        finished: true,
      })
      .eq('id', playerId);

    router.push(`/room/${code}/waiting`);
  }

  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF7F2] px-6 py-8">
      {showIntro ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-[#222222]">{t.gameStarting}</h1>

          <p className="mt-6 max-w-sm text-lg leading-relaxed text-gray-600">{t.prepareBattle}</p>

          <div className="mt-8">
            <span className="text-6xl font-bold text-[#FF7F5C]">{room.game_duration}</span>

            <p className="mt-2 text-lg text-gray-500">{t.minutesLabel}</p>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-sm font-semibold tracking-wide text-gray-400 uppercase">{t.categoriesPlaying}</p>

            <div className="flex flex-wrap justify-center gap-2">
              {room.enabled_categories.map((category) => (
                <div
                  key={category}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#222222] shadow-sm"
                >
                  {t[category as keyof typeof t]}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center">
            <p className="text-sm tracking-wide text-gray-400 uppercase">Sushi League</p>

            <h1 className="mt-4 text-7xl font-bold text-[#FF7F5C]">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </h1>
          </div>

          <div className="flex-1" />

          <button
            onClick={() => setIsGiveUpOpen(true)}
            className="rounded-2xl bg-[#FF7F5C] py-5 text-lg font-semibold text-white shadow-sm transition active:scale-95"
          >
            {t.giveUp}
          </button>
        </>
      )}

      <GiveUpModal
        language={language as 'en' | 'pt' | 'fr'}
        isOpen={isGiveUpOpen}
        onClose={() => setIsGiveUpOpen(false)}
        onConfirm={giveUp}
      />
    </main>
  );
}

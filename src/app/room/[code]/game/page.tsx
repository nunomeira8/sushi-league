'use client';

import { useCallback, useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { supabase } from '@/lib/supabase';

import { translations } from '@/i18n/translations';

import { Room } from '@/types/room';

import { useRouter } from 'next/navigation';

import { getPlayerId } from '@/lib/storage';

import { GiveUpModal } from '@/components/game/GiveUpModal';
import { CategoryCounter } from '@/components/game/CategoryCounter';
import { useBufferedScores } from '@/components/game/useBufferedScores';
import { useLanguage } from '@/lib/useLanguage';

const CATEGORY_ORDER = ['starters', 'sushi', 'sashimi', 'temaki', 'hot_dishes'] as const;

type Category = (typeof CATEGORY_ORDER)[number];

export default function GamePage() {
  const params = useParams();

  const code = params.code as string;

  const language = useLanguage();
  const t = translations[language];

  const [room, setRoom] = useState<Room | null>(null);

  const [showIntro, setShowIntro] = useState(true);

  const [timeLeft, setTimeLeft] = useState(0);

  const router = useRouter();

  const [isGiveUpOpen, setIsGiveUpOpen] = useState(false);

  const { scores, changeScore, flushScores } = useBufferedScores(code);

  const [isFinishing, setIsFinishing] = useState(false);

  const categoryLabels: Record<Category, string> = {
    starters: t.starters,
    sushi: t.sushi,
    sashimi: t.sashimi,
    temaki: t.temaki,
    hot_dishes: t.hot_dishes,
  };

  const fetchRoom = useCallback(async () => {
    const { data } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!data) return;

    setRoom(data);

    const now = new Date();

    const end = new Date(data.ended_at);

    const secondsLeft = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));

    setTimeLeft(secondsLeft);
  }, [code]);

  const finishGame = useCallback(async () => {
    if (!room || !room.started_at) return;

    const playerId = getPlayerId();

    const startedAtValue = room.started_at;
    const startedAt = new Date(startedAtValue).getTime();

    const now = Date.now();

    const elapsedSeconds = Math.floor((now - startedAt) / 1000);

    const scoresSaved = await flushScores();

    if (!scoresSaved) return;

    const { error } = await supabase
      .from('players')
      .update({
        finished: true,

        finished_at: elapsedSeconds,
      })
      .eq('id', playerId);

    console.log('FINISH ERROR', error);

    router.push(`/room/${room.code}/waiting`);
  }, [flushScores, room, router]);

  useEffect(() => {
    const roomTimeout = setTimeout(() => {
      void fetchRoom();
    }, 0);

    const introTimeout = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => {
      clearTimeout(roomTimeout);
      clearTimeout(introTimeout);
    };
  }, [fetchRoom]);

  useEffect(() => {
    if (showIntro) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          finishGame();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [finishGame, showIntro]);

  if (!room) {
    return null;
  }

  async function giveUp() {
    if (isFinishing) return;

    setIsFinishing(true);

    try {
      const playerId = getPlayerId();

      if (!room?.started_at) return;

      const startedAt = new Date(room.started_at).getTime();

      const now = Date.now();

      const elapsedSeconds = Math.floor((now - startedAt) / 1000);

      const scoresSaved = await flushScores();

      if (!scoresSaved) return;

      await supabase
        .from('players')
        .update({
          finished: true,
          finished_at: elapsedSeconds,
        })
        .eq('id', playerId);

      router.push(`/room/${code}/waiting`);
    } finally {
      setIsFinishing(false);
    }
  }

  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  const enabledCategories = CATEGORY_ORDER.filter((category) => room.enabled_categories.includes(category));

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
              {enabledCategories.map((category) => (
                <div
                  key={category}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#222222] shadow-sm"
                >
                  {categoryLabels[category]}
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

          <div className="mt-10 flex flex-1 flex-col gap-4 overflow-y-auto pb-6">
            {enabledCategories.map((category) => (
              <CategoryCounter
                key={category}
                name={categoryLabels[category]}
                value={scores[category] || 0}
                onIncrease={() => changeScore(category, 1)}
                onDecrease={() => changeScore(category, -1)}
              />
            ))}
          </div>
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
        isLoading={isFinishing}
        onClose={() => setIsGiveUpOpen(false)}
        onConfirm={giveUp}
      />
    </main>
  );
}

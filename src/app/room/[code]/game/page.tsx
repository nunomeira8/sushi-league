'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { supabase } from '@/lib/supabase';

import { translations } from '@/i18n/translations';

import { Room } from '@/types/room';

import { useRouter } from 'next/navigation';

import { getPlayerId } from '@/lib/storage';

import { GiveUpModal } from '@/components/game/GiveUpModal';
import { CategoryCounter } from '@/components/game/CategoryCounter';

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

  const [scores, setScores] = useState<Record<string, number>>({});

  async function fetchRoom() {
    const { data } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!data) return;

    setRoom(data);

    await fetchScores();

    const now = new Date();

    const end = new Date(data.ended_at);

    const secondsLeft = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));

    setTimeLeft(secondsLeft);
  }

  async function fetchScores() {
    const playerId = getPlayerId();

    const { data } = await supabase.from('player_scores').select('*').eq('player_id', playerId);

    if (!data) return;

    const formattedScores: Record<string, number> = {};

    data.forEach((item) => {
      formattedScores[item.category] = item.score;
    });

    setScores(formattedScores);
  }

  async function updateScore(category: string, value: number) {
    const playerId = getPlayerId();

    const nextValue = Math.max(0, value);

    setScores((prev) => ({
      ...prev,
      [category]: nextValue,
    }));

    await supabase
      .from('player_scores')
      .update({
        score: nextValue,
      })
      .eq('player_id', playerId)
      .eq('category', category);
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

          finishGame();

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

  async function finishGame() {
    const playerId = getPlayerId();

    await supabase
      .from('players')
      .update({
        finished: true,
      })
      .eq('id', playerId);

    router.push(`/room/${room?.code}/waiting`);
  }

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

          <div className="mt-10 flex flex-1 flex-col gap-4 overflow-y-auto pb-6">
            {room.enabled_categories.map((category) => (
              <CategoryCounter
                key={category}
                name={t[category as keyof typeof t] as string}
                value={scores[category] || 0}
                onIncrease={() => updateScore(category, (scores[category] || 0) + 1)}
                onDecrease={() => updateScore(category, (scores[category] || 0) - 1)}
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
        onClose={() => setIsGiveUpOpen(false)}
        onConfirm={giveUp}
      />
    </main>
  );
}

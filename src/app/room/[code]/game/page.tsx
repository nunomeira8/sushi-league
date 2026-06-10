'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import { supabase } from '@/lib/supabase';

import { translations } from '@/i18n/translations';

import { Room } from '@/types/room';

import { useRouter } from 'next/navigation';

import { getPlayerId } from '@/lib/storage';
import { hasVisitedGame, markGameAsVisited } from '@/lib/gameVisitStorage';

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

  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  const [hasWelcomeBackSlot, setHasWelcomeBackSlot] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  const router = useRouter();

  const [isGiveUpOpen, setIsGiveUpOpen] = useState(false);

  const [openCategoryTooltip, setOpenCategoryTooltip] = useState<Category | null>(null);

  const { scores, changeScore, flushScores } = useBufferedScores(code);

  const [isFinishing, setIsFinishing] = useState(false);

  const isFinishingRef = useRef(false);
  const isReturningPlayerRef = useRef<boolean | null>(null);

  const categoryLabels: Record<Category, string> = {
    starters: t.starters,
    sushi: t.sushi,
    sashimi: t.sashimi,
    temaki: t.temaki,
    hot_dishes: t.hot_dishes,
  };

  const categoryDescriptions: Record<Category, string> = {
    starters: t.startersDescription,
    sushi: t.sushiDescription,
    sashimi: t.sashimiDescription,
    temaki: t.temakiDescription,
    hot_dishes: t.hot_dishesDescription,
  };

  const fetchRoom = useCallback(async () => {
    const { data } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!data) return;

    setRoom(data);

    const endTime = data.ended_at ? new Date(data.ended_at).getTime() : null;

    if (endTime) {
      setTimeLeft(Math.max(0, Math.ceil((endTime - Date.now()) / 1000)));
    }
  }, [code]);

  const finishGame = useCallback(async () => {
    if (!room || !room.started_at || isFinishingRef.current) return;

    const playerId = getPlayerId();

    isFinishingRef.current = true;

    const scoresSaved = await flushScores();

    if (!scoresSaved) {
      isFinishingRef.current = false;
      return;
    }

    const { error } = await supabase
      .from('players')
      .update({
        finished: true,
        finished_at: room.game_duration * 60,
      })
      .eq('id', playerId);

    if (error) {
      console.error('FINISH ERROR', error);
      isFinishingRef.current = false;
      return;
    }

    router.push(`/room/${room.code}/waiting`);
  }, [flushScores, room, router]);

  useEffect(() => {
    const playerId = getPlayerId();

    if (isReturningPlayerRef.current === null) {
      isReturningPlayerRef.current = playerId ? hasVisitedGame(code, playerId) : false;
    }

    const isReturningPlayer = isReturningPlayerRef.current;

    if (playerId) {
      markGameAsVisited(code, playerId);
    }

    const roomTimeout = setTimeout(() => {
      if (isReturningPlayer) {
        setShowIntro(false);
        setShowWelcomeBack(true);
        setHasWelcomeBackSlot(true);
      }

      void fetchRoom();
    }, 0);

    const introTimeout = isReturningPlayer
      ? null
      : setTimeout(() => {
          setShowIntro(false);
        }, 5000);

    const welcomeBackTimeout = isReturningPlayer
      ? setTimeout(() => {
          setShowWelcomeBack(false);
        }, 3000)
      : null;

    return () => {
      clearTimeout(roomTimeout);

      if (introTimeout) clearTimeout(introTimeout);
      if (welcomeBackTimeout) clearTimeout(welcomeBackTimeout);
    };
  }, [code, fetchRoom]);

  useEffect(() => {
    if (!room?.ended_at) return;

    const endTime = new Date(room.ended_at).getTime();

    function updateTimer() {
      const nextTimeLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

      setTimeLeft(nextTimeLeft);

      if (nextTimeLeft === 0) {
        void finishGame();
      }
    }

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    function updateTimerWhenVisible() {
      if (document.visibilityState === 'visible') {
        updateTimer();
      }
    }

    document.addEventListener('visibilitychange', updateTimerWhenVisible);
    window.addEventListener('focus', updateTimer);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', updateTimerWhenVisible);
      window.removeEventListener('focus', updateTimer);
    };
  }, [finishGame, room?.ended_at]);

  if (!room) {
    return null;
  }

  async function giveUp() {
    const activeRoom = room;

    if (isFinishing || isFinishingRef.current || !activeRoom?.started_at) return;

    isFinishingRef.current = true;
    setIsFinishing(true);
    let completed = false;

    try {
      const playerId = getPlayerId();

      const startedAt = new Date(activeRoom.started_at).getTime();

      const now = Date.now();

      const elapsedSeconds = Math.min(Math.floor((now - startedAt) / 1000), activeRoom.game_duration * 60);

      const scoresSaved = await flushScores();

      if (!scoresSaved) return;

      const { error } = await supabase
        .from('players')
        .update({
          finished: true,
          finished_at: elapsedSeconds,
        })
        .eq('id', playerId);

      if (error) {
        console.error('FINISH ERROR', error);
        return;
      }

      completed = true;
      router.push(`/room/${code}/waiting`);
    } finally {
      if (!completed) {
        isFinishingRef.current = false;
      }

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

          {hasWelcomeBackSlot && (
            <div
              className={`grid w-full transition-all duration-500 ${
                showWelcomeBack ? 'mt-5 grid-rows-[1fr]' : 'mt-0 grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  aria-live="polite"
                  className={`mx-auto w-full max-w-sm rounded-lg border px-4 py-3 text-center text-sm font-semibold transition-all duration-500 ${
                    showWelcomeBack
                      ? 'translate-y-0 border-[#FFD8CC] bg-white text-[#3A322E] opacity-100 shadow-sm'
                      : 'pointer-events-none -translate-y-1 border-transparent text-transparent opacity-0'
                  }`}
                >
                  {t.welcomeBackGame}
                </div>
              </div>
            </div>
          )}

          <div
            className={`${
              showWelcomeBack ? 'mt-5' : 'mt-10'
            } flex flex-1 flex-col gap-3 overflow-y-auto pb-5 transition-[margin] duration-500`}
          >
            {enabledCategories.map((category) => (
              <CategoryCounter
                key={category}
                name={categoryLabels[category]}
                value={scores[category] || 0}
                description={categoryDescriptions[category]}
                isTooltipOpen={openCategoryTooltip === category}
                onIncrease={() => changeScore(category, 1)}
                onDecrease={() => changeScore(category, -1)}
                onToggleTooltip={() =>
                  setOpenCategoryTooltip((currentCategory) => (currentCategory === category ? null : category))
                }
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

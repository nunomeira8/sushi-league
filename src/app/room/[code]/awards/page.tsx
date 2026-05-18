'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { supabase } from '@/lib/supabase';
import { getLanguage } from '@/lib/language';

import { AwardSlide } from '@/components/awards/AwardSlide';
import { FinalWinnerSlide } from '@/components/awards/FinalWinnerSlide';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

import { translations } from '@/i18n/translations';

export default function AwardsPage() {
  const params = useParams();

  const code = params.code as string;

  const language = getLanguage();

  const t = translations[language];

  const [awards, setAwards] = useState<any[]>([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const categoryOrder = ['starters', 'sushi', 'sashimi', 'temaki', 'hot_dishes', 'final_winner'];

  const CATEGORY_META: Record<
    string,
    {
      emoji: string;
      title: string;
    }
  > = {
    starters: {
      emoji: '🥟',
      title: t.startersAwardTitle,
    },

    sushi: {
      emoji: '🍣',
      title: t.sushiAwardTitle,
    },

    sashimi: {
      emoji: '🐟',
      title: t.sashimiAwardTitle,
    },

    temaki: {
      emoji: '🌯',
      title: t.temakiAwardTitle,
    },

    hot_dishes: {
      emoji: '🍜',
      title: t.hotDishesAwardTitle,
    },
  };

  async function fetchAwards() {
    const { data: room } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!room) {
      setIsLoading(false);
      return;
    }

    const { data } = await supabase.from('room_awards').select('*').eq('room_id', room.id).order('created_at');

    if (!data) {
      setIsLoading(false);
      return;
    }

    data.sort((a, b) => {
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });

    setAwards(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAwards();

    const interval = setInterval(() => {
      fetchAwards();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!awards.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= awards.length - 1) {
          setHasReachedEnd(true);
          return prev;
        }

        const next = prev + 1;

        if (next === awards.length - 1) {
          setHasReachedEnd(true);
        }

        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [awards]);

  useEffect(() => {
    if (awards.length === 1) {
      setHasReachedEnd(true);
    }
  }, [awards]);

  if (isLoading || !awards.length) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#FAF7F2] px-6 text-center">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="mb-4 flex justify-center">
            <LoadingSpinner />
          </div>

          <h1 className="text-2xl font-bold text-[#222222]">{t.calculatingWinners}</h1>

          <p className="mt-3 text-gray-500">Sushi League 🍣</p>
        </div>
      </main>
    );
  }

  const award = awards[currentSlide];

  const isLastSlide = currentSlide === awards.length - 1;

  function nextSlide() {
    setCurrentSlide((prev) => {
      const next = Math.min(prev + 1, awards.length - 1);

      if (next === awards.length - 1) {
        setHasReachedEnd(true);
      }

      return next;
    });
  }

  function previousSlide() {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }

  return (
    <main className="flex min-h-[100dvh] flex-col bg-[#FAF7F2] px-6 py-8">
      <div onClick={nextSlide} className="flex flex-1 flex-col">
        {!award.is_final_winner ? (
          <AwardSlide
            emoji={CATEGORY_META[award.category]?.emoji}
            title={CATEGORY_META[award.category]?.title}
            winner={award.winner_player_name}
            winnerScore={award.winner_score}
            leaderboard={award.leaderboard_json}
            winnerLabel={t.winner}
            leaderboardLabel={t.leaderboard}
          />
        ) : (
          <FinalWinnerSlide
            winner={award.leaderboard_json[0]}
            leaderboard={award.leaderboard_json}
            title={t.lastManStanding}
            finalRankingLabel={t.finalRanking}
            pointsLabel={t.points}
          />
        )}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {awards.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-[#FF7F5C]' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        {hasReachedEnd && (
          <button
            onClick={previousSlide}
            disabled={currentSlide === 0}
            className="flex-1 rounded-2xl border border-gray-200 bg-white py-3 text-sm font-semibold text-[#222222] transition active:scale-95 disabled:text-gray-300"
          >
            {t.previousAward}
          </button>
        )}

        <button
          onClick={nextSlide}
          disabled={isLastSlide}
          className="flex-1 rounded-2xl border border-[#FF7F5C] bg-white py-3 text-sm font-semibold text-[#FF7F5C] transition active:scale-95 disabled:border-gray-200 disabled:text-gray-400"
        >
          {isLastSlide ? t.awardsFinished : t.nextAward}
        </button>
      </div>
    </main>
  );
}

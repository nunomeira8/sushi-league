'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { supabase } from '@/lib/supabase';
import { getLanguage } from '@/lib/language';

import { AwardSlide } from '@/components/awards/AwardSlide';
import { ExportResultsPanel } from '@/components/awards/ExportResultsPanel';
import { FinalWinnerSlide } from '@/components/awards/FinalWinnerSlide';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

import { translations } from '@/i18n/translations';

type AwardCategory = 'starters' | 'sushi' | 'sashimi' | 'temaki' | 'hot_dishes';

type AwardCategoryOrFinal = AwardCategory | 'final_winner';

type AwardLeaderboardPlayer = {
  player_id: string;
  player_name: string;
  score: number;
  finished_at?: number | null;
  rank?: number | null;
};

type FinalLeaderboardPlayer = {
  player_id: string;
  player_name: string;
  total_score: number;
  breakdown: Record<string, number>;
  finished_at?: number | null;
  rank?: number;
};

type BaseAward = {
  category: AwardCategoryOrFinal;
  winner_player_id: string | null;
  winner_player_name: string;
  winner_score: number;
};

type CategoryAward = BaseAward & {
  category: AwardCategory;
  is_final_winner: false;
  leaderboard_json: AwardLeaderboardPlayer[];
};

type FinalAward = BaseAward & {
  category: 'final_winner';
  is_final_winner: true;
  leaderboard_json: FinalLeaderboardPlayer[];
};

type RoomAward = CategoryAward | FinalAward;

type AwardPlayer = {
  id: string;
  finished_at: number | null;
};

function getRank(leaderboard: AwardLeaderboardPlayer[], index: number) {
  if (index === 0) return 1;

  const previous = leaderboard[index - 1];
  const current = leaderboard[index];

  if (previous.score === current.score && previous.finished_at === current.finished_at) {
    return getRank(leaderboard, index - 1);
  }

  return index + 1;
}

function getFinalRank(leaderboard: FinalLeaderboardPlayer[], index: number) {
  if (index === 0) return 1;

  const previous = leaderboard[index - 1];
  const current = leaderboard[index];

  if (previous.total_score === current.total_score && previous.finished_at === current.finished_at) {
    return getFinalRank(leaderboard, index - 1);
  }

  return index + 1;
}

const categoryOrder: AwardCategoryOrFinal[] = ['starters', 'sushi', 'sashimi', 'temaki', 'hot_dishes', 'final_winner'];

function normalizeCategoryAward(award: RoomAward, playersById: Map<string, AwardPlayer>): RoomAward {
  if (award.is_final_winner || !Array.isArray(award.leaderboard_json)) {
    return award;
  }

  const hasWinner = award.leaderboard_json.some((player: AwardLeaderboardPlayer) => player.score > 0);
  const leaderboard = award.leaderboard_json
    .map((player: AwardLeaderboardPlayer) => ({
      ...player,
      finished_at: player.finished_at ?? playersById.get(player.player_id)?.finished_at ?? null,
    }))
    .sort((a: AwardLeaderboardPlayer, b: AwardLeaderboardPlayer) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      const finishedAtA = a.finished_at ?? -1;
      const finishedAtB = b.finished_at ?? -1;

      if (!hasWinner) {
        return a.player_name.localeCompare(b.player_name);
      }

      if (finishedAtB !== finishedAtA) {
        return finishedAtB - finishedAtA;
      }

      return a.player_name.localeCompare(b.player_name);
    })
    .map((player: AwardLeaderboardPlayer, index: number, sortedLeaderboard: AwardLeaderboardPlayer[]) => ({
      ...player,
      rank: hasWinner ? getRank(sortedLeaderboard, index) : null,
    }));

  const winners = leaderboard.filter((player: AwardLeaderboardPlayer) => player.rank === 1);
  const winner = winners[0];

  if (hasWinner && !winner) return award;

  return {
    ...award,
    winner_player_id: hasWinner ? (winner?.player_id ?? null) : null,
    winner_player_name: hasWinner
      ? winners.map((player: AwardLeaderboardPlayer) => player.player_name).join(' / ')
      : '',
    winner_score: hasWinner ? (winner?.score ?? 0) : 0,
    leaderboard_json: leaderboard,
  };
}

function normalizeFinalAward(award: RoomAward, playersById: Map<string, AwardPlayer>): RoomAward {
  if (!award.is_final_winner || !Array.isArray(award.leaderboard_json)) {
    return award;
  }

  const leaderboard = award.leaderboard_json
    .map((player: FinalLeaderboardPlayer) => ({
      ...player,
      finished_at: player.finished_at ?? playersById.get(player.player_id)?.finished_at ?? null,
    }))
    .sort((a: FinalLeaderboardPlayer, b: FinalLeaderboardPlayer) => {
      if (b.total_score !== a.total_score) {
        return b.total_score - a.total_score;
      }

      const finishedAtA = a.finished_at ?? -1;
      const finishedAtB = b.finished_at ?? -1;

      if (finishedAtB !== finishedAtA) {
        return finishedAtB - finishedAtA;
      }

      return a.player_name.localeCompare(b.player_name);
    })
    .map((player: FinalLeaderboardPlayer, index: number, sortedLeaderboard: FinalLeaderboardPlayer[]) => ({
      ...player,
      rank: getFinalRank(sortedLeaderboard, index),
    }));

  const winners = leaderboard.filter((player: FinalLeaderboardPlayer) => player.rank === 1);
  const winner = winners[0];

  if (!winner) return award;

  return {
    ...award,
    winner_player_id: winner.player_id,
    winner_player_name: winners
      .map((player: FinalLeaderboardPlayer) => player.player_name)
      .join(' / '),
    winner_score: winner.total_score,
    leaderboard_json: leaderboard,
  };
}

function normalizeAward(award: RoomAward, playersById: Map<string, AwardPlayer>) {
  return award.is_final_winner
    ? normalizeFinalAward(award, playersById)
    : normalizeCategoryAward(award, playersById);
}

function formatTranslation(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (message, [key, value]) => message.split(`{${key}}`).join(value),
    template,
  );
}

export default function AwardsPage() {
  const params = useParams();

  const code = params.code as string;

  const language = getLanguage();

  const t = translations[language];

  const [awards, setAwards] = useState<RoomAward[]>([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const CATEGORY_META: Record<
    AwardCategory,
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

  const CATEGORY_LABELS: Record<AwardCategory, string> = {
    starters: t.starters,
    sushi: t.sushi,
    sashimi: t.sashimi,
    temaki: t.temaki,
    hot_dishes: t.hot_dishes,
  };

  async function fetchAwards() {
    const { data: room } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!room) {
      setIsLoading(false);
      return;
    }

    const [{ data }, { data: players }] = await Promise.all([
      supabase.from('room_awards').select('*').eq('room_id', room.id).order('created_at'),
      supabase.from('players').select('id, finished_at').eq('room_id', room.id),
    ]);

    if (!data) {
      setIsLoading(false);
      return;
    }

    const playersById = new Map<string, AwardPlayer>((players || []).map((player) => [player.id, player]));

    const roomAwards = data as RoomAward[];

    roomAwards.sort((a, b) => {
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });

    setAwards(roomAwards.map((award) => normalizeAward(award, playersById)));
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

  const categoryLabel = !award.is_final_winner ? CATEGORY_LABELS[award.category] : award.category;

  const finalWinner = award.is_final_winner
    ? award.leaderboard_json[0] ?? {
        player_id: award.winner_player_id ?? '',
        player_name: award.winner_player_name,
        total_score: award.winner_score,
        breakdown: {},
      }
    : null;

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
      <div key={award.category} onClick={nextSlide} className="award-slide-shell flex flex-1 flex-col">
        {!award.is_final_winner ? (
          <AwardSlide
            emoji={CATEGORY_META[award.category].emoji}
            title={CATEGORY_META[award.category].title}
            winner={award.winner_player_name}
            winnerScore={award.winner_score}
            hasWinner={award.winner_score > 0}
            leaderboard={award.leaderboard_json}
            winnerLabel={t.winner}
            noWinnerLabel={formatTranslation(t.noWinner, {
              category: categoryLabel,
            })}
            leaderboardLabel={t.leaderboard}
          />
        ) : (
          <FinalWinnerSlide
            winner={{
              ...(finalWinner as FinalLeaderboardPlayer),
              player_name: award.winner_player_name,
            }}
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

      {hasReachedEnd && (
        <div className="mt-5 flex">
          <ExportResultsPanel
            awards={awards}
            categoryLabels={CATEGORY_LABELS}
            labels={{
              appName: 'Sushi League',
              exportResults: t.exportResults,
              exportResultsTitle: t.exportResultsTitle,
              playedOn: t.playedOn,
              categoriesInPlay: t.categoriesInPlay,
              playedBy: t.playedBy,
              finalWinner: t.finalWinnerExport,
              categoryWinners: t.categoryWinnersExport,
              leaderboard: t.leaderboard,
              winner: t.winner,
              noWinner: t.noWinner,
              points: t.points,
              copy: t.copyResults,
              share: t.shareResults,
              pdf: t.savePdf,
              copied: t.copied,
              shareUnavailable: t.shareUnavailable,
            }}
          />
        </div>
      )}

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

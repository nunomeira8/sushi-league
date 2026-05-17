'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { supabase } from '@/lib/supabase';

import { AwardSlide } from '@/components/awards/AwardSlide';
import { FinalWinnerSlide } from '@/components/awards/FinalWinnerSlide';
import { translations } from '@/i18n/translations';
import { Language } from '@/types/language';

export default function AwardsPage() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const CATEGORY_META: Record<
    string,
    {
      emoji: string;
      title: string;
    }
  > = {
    starters: {
      emoji: '🥟',
      title: t.starters + ' King',
    },

    sushi: {
      emoji: '🍣',
      title: t.sushi + ' Monster',
    },

    sashimi: {
      emoji: '🐟',
      title: t.sashimi + ' Beast',
    },

    temaki: {
      emoji: '🌯',
      title: t.temaki + ' Destroyer',
    },

    hot_dishes: {
      emoji: '🍜',
      title: t.hot_dishes + ' Warrior',
    },
  };

  const params = useParams();

  const code = params.code as string;

  const [awards, setAwards] = useState<any[]>([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const categoryOrder = ['starters', 'sushi', 'sashimi', 'temaki', 'hot_dishes', 'final_winner'];

  async function fetchAwards() {
    const { data: room } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!room) return;

    const { data } = await supabase.from('room_awards').select('*').eq('room_id', room.id).order('created_at');

    if (!data) return;

    data.sort((a, b) => {
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });

    setAwards(data);
  }

  useEffect(() => {
    fetchAwards();
  }, []);

  useEffect(() => {
    if (!awards.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= awards.length - 1) {
          return prev;
        }

        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [awards]);

  if (!awards.length) {
    return null;
  }

  const award = awards[currentSlide];

  function nextSlide() {
    setCurrentSlide((prev) => Math.min(prev + 1, awards.length - 1));
  }

  return (
    <main onClick={nextSlide} className="flex min-h-screen flex-col bg-[#FAF7F2] px-6 py-8">
      {!award.is_final_winner ? (
        <AwardSlide
          emoji={CATEGORY_META[award.category]?.emoji}
          title={CATEGORY_META[award.category]?.title}
          winner={award.winner_player_name}
          winnerScore={award.winner_score}
          leaderboard={award.leaderboard_json}
        />
      ) : (
        <FinalWinnerSlide winner={award.leaderboard_json[0]} leaderboard={award.leaderboard_json} />
      )}

      <div className="mt-8 flex justify-center gap-2">
        {awards.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-[#FF7F5C]' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/useLanguage';
import { getPlayerId } from '@/lib/storage';
import { generateAwards } from '@/lib/generateAwards';

import { translations } from '@/i18n/translations';

import { Player } from '@/types/player';
import { Room } from '@/types/room';

export default function WaitingPage() {
  const params = useParams();

  const code = params.code as string;

  const router = useRouter();

  const language = useLanguage();

  const t = translations[language];

  const [room, setRoom] = useState<Room | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);

  const [countdown, setCountdown] = useState<number | null>(null);

  const allPlayersFinished = players.length > 0 && players.every((player) => player.finished);

  async function fetchData() {
    const { data: roomData } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!roomData) return;

    setRoom(roomData);

    const { data: playersData } = await supabase
      .from('players')
      .select('*')
      .eq('room_id', roomData.id)
      .order('created_at', {
        ascending: true,
      });

    if (!playersData) return;

    setPlayers(playersData);
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!allPlayersFinished || !room) return;

    const currentPlayer = players.find((player) => player.id === getPlayerId());

    async function prepareAwards() {
      if (!room) return;

      if (currentPlayer?.is_admin && !room.awards_start_at) {
        await generateAwards(room.id);

        const awardsStart = new Date(Date.now() + 3000).toISOString();

        await supabase
          .from('rooms')
          .update({
            awards_start_at: awardsStart,
          })
          .eq('id', room.id);

        setRoom((prev) =>
          prev
            ? {
                ...prev,
                awards_start_at: awardsStart,
              }
            : null,
        );
      }
    }

    prepareAwards();
  }, [allPlayersFinished, room, players]);

  useEffect(() => {
    if (!room?.awards_start_at) return;

    const interval = setInterval(() => {
      const now = Date.now();

      const calculatingEnd = new Date(room.awards_start_at!).getTime();

      const countdownStart = calculatingEnd;
      const awardsReveal = countdownStart + 5000;

      if (now < countdownStart) {
        setCountdown(null);
        return;
      }

      const secondsLeft = Math.max(0, Math.ceil((awardsReveal - now) / 1000));

      setCountdown(secondsLeft);

      if (secondsLeft <= 0) {
        router.push(`/room/${code}/awards`);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [room?.awards_start_at]);

  if (!room) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#222222]">
              {allPlayersFinished ? t.finishedTitle : t.waitingTitle}
            </h1>

            {allPlayersFinished ? (
              <>
                {countdown === null ? (
                  <p className="mt-4 text-lg text-[#FF7F5C]">{t.calculatingWinners}</p>
                ) : (
                  <>
                    <p className="mt-4 text-lg text-[#FF7F5C]">{t.winnerReveal}</p>

                    <p className="mt-3 text-sm font-semibold text-gray-500">
                      {t.resultsIn} {countdown ?? '...'}
                    </p>
                  </>
                )}
              </>
            ) : (
              <p className="mt-3 text-gray-500">Sushi League 🍣</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {players.map((player) => (
              <div key={player.id} className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4">
                <span className="font-medium text-[#222222]">{player.name}</span>

                {!allPlayersFinished ? (
                  <div
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      player.finished ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'
                    }`}
                  >
                    {player.finished ? t.finishedEating : t.stillEating}
                  </div>
                ) : (
                  <div className="rounded-full border border-[#FF7F5C] px-3 py-1 text-xs font-semibold text-[#FF7F5C]">
                    {(player.finished_at || 0) / 60 >= room.game_duration ? (
                      t.survivedEntireTime
                    ) : (
                      <>
                        {t.survivedFor} {Math.floor((player.finished_at || 0) / 60)}m {(player.finished_at || 0) % 60}s
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

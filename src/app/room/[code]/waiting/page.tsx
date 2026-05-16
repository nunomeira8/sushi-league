'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { translations } from '@/i18n/translations';
import { Player } from '@/types/player';
import { Room } from '@/types/room';
import { getLanguage } from '@/lib/language';
import { generateAwards } from '@/lib/generateAwards';
import { useRouter } from 'next/navigation';
import { getPlayerId } from '@/lib/storage';

export default function WaitingPage() {
  const params = useParams();

  const code = params.code as string;

  const language = getLanguage();

  const t = translations[language];

  const [room, setRoom] = useState<Room | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);

  const allPlayersFinished = players.length > 0 && players.every((player) => player.finished);

  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const currentPlayer = players.find((player) => player.id === getPlayerId());

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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!allPlayersFinished || !room || players.length === 0) {
      return;
    }

    const currentPlayer = players.find((player) => player.id === getPlayerId());

    async function prepareAwards() {
      if (!room) return;

      if (currentPlayer?.is_admin) {
        await generateAwards(room.id);
      }

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);

            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }

    prepareAwards();
  }, [allPlayersFinished, room, players]);

  useEffect(() => {
    if (!allPlayersFinished) return;

    if (countdown === 0) {
      router.push(`/room/${code}/awards`);
    }
  }, [countdown, allPlayersFinished]);

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
                <p className="mt-4 text-lg text-[#FF7F5C]">{t.winnerReveal}</p>

                <p className="mt-3 text-sm font-semibold text-gray-500">
                  {t.resultsIn} {countdown}
                </p>
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

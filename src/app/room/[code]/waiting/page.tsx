'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { supabase } from '@/lib/supabase';

import { translations } from '@/i18n/translations';

import { Player } from '@/types/player';

import { Room } from '@/types/room';

export default function WaitingPage() {
  const params = useParams();

  const code = params.code as string;

  const language = 'en';

  const t = translations[language];

  const [room, setRoom] = useState<Room | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);

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

  if (!room) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#222222]">{t.waitingTitle}</h1>

            <p className="mt-3 text-gray-500">Sushi League 🍣</p>
          </div>

          <div className="flex flex-col gap-3">
            {players.map((player) => (
              <div key={player.id} className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4">
                <span className="font-medium text-[#222222]">{player.name}</span>

                <div
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    player.finished ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'
                  }`}
                >
                  {player.finished ? t.finishedEating : t.stillEating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

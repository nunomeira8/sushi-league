'use client';

import { Settings } from 'lucide-react';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { QrCode, Trash2 } from 'lucide-react';

import { supabase } from '@/lib/supabase';

import { translations } from '@/i18n/translations';

import { getPlayerId, removePlayerId } from '@/lib/storage';

import { Player } from '@/types/player';
import { Room } from '@/types/room';

import { QrCodeModal } from '../QrCodeModal';
import { SettingsModal } from '../SettingsModal';

import { getLanguage } from '@/lib/language';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function RoomPage() {
  const params = useParams();

  const router = useRouter();

  const language = getLanguage();
  const t = translations[language];

  const code = params.code as string;

  const [room, setRoom] = useState<Room | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const [isQrOpen, setIsQrOpen] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [gameDuration, setGameDuration] = useState(60);

  const [enabledCategories, setEnabledCategories] = useState<string[]>([]);

  const [settingsError, setSettingsError] = useState('');

  const [copied, setCopied] = useState(false);

  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isStartingGame, setIsStartingGame] = useState(false);

  async function fetchRoomData() {
    const { data: roomData } = await supabase.from('rooms').select('*').eq('code', code.toUpperCase()).single();

    if (!roomData) return;

    setRoom(roomData);

    setGameDuration(roomData.game_duration);

    setEnabledCategories(roomData.enabled_categories);

    const { data: playersData } = await supabase
      .from('players')
      .select('*')
      .eq('room_id', roomData.id)
      .order('created_at', {
        ascending: true,
      });

    if (!playersData) return;

    setPlayers(playersData);

    const playerId = getPlayerId();

    const me = playersData.find((player) => player.id === playerId);

    if (me) {
      setCurrentPlayer(me);
    }
  }

  useEffect(() => {
    fetchRoomData();

    const channel = supabase
      .channel(`room-${code}`)

      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
        },
        async () => {
          await fetchRoomData();
        },
      )

      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
        },
        async (payload) => {
          const updatedRoom = payload.new as Room;

          if (updatedRoom.code === code.toUpperCase() && updatedRoom.is_started) {
            router.push(`/room/${code}/game`);
          }
        },
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!currentPlayer) return;

    const stillExists = players.find((player) => player.id === currentPlayer.id);

    if (!stillExists) {
      removePlayerId();

      alert(t.kicked);

      router.push('/');
    }
  }, [players]);

  async function kickPlayer(player: Player) {
    if (!room) return;

    await supabase.from('room_blocklist').insert({
      room_id: room.id,
      player_name: player.name,
    });

    await supabase.from('players').delete().eq('id', player.id);
  }

  async function toggleReady() {
    if (!currentPlayer) return;

    await supabase
      .from('players')
      .update({
        is_ready: !currentPlayer.is_ready,
      })
      .eq('id', currentPlayer.id);
  }

  function toggleCategory(category: string) {
    setSettingsError('');

    if (enabledCategories.includes(category)) {
      setEnabledCategories(enabledCategories.filter((item) => item !== category));

      return;
    }

    setEnabledCategories([...enabledCategories, category]);
  }

  async function saveSettings() {
    if (!room || isSavingSettings) return;

    if (enabledCategories.length === 0) {
      setSettingsError(t.atLeastOneCategory);
      return;
    }

    setSettingsError('');
    setIsSavingSettings(true);

    try {
      await supabase
        .from('rooms')
        .update({
          game_duration: gameDuration,
          enabled_categories: enabledCategories,
        })
        .eq('id', room.id);

      setIsSettingsOpen(false);
    } finally {
      setIsSavingSettings(false);
    }
  }

  if (!room) {
    return null;
  }

  const allPlayersReady = players.length > 0 && players.every((player) => player.is_ready);

  async function startGame() {
    if (!room || isStartingGame) return;

    setIsStartingGame(true);

    try {
      const startedAt = new Date();
      const endedAt = new Date(startedAt.getTime() + room.game_duration * 60 * 1000);

      await supabase
        .from('rooms')
        .update({
          is_started: true,
          started_at: startedAt.toISOString(),
          ended_at: endedAt.toISOString(),
        })
        .eq('id', room.id);

      const { data: playersData } = await supabase.from('players').select('*').eq('room_id', room.id);

      if (playersData) {
        const scoresToInsert = playersData.flatMap((player) =>
          room.enabled_categories.map((category) => ({
            player_id: player.id,
            category,
            score: 0,
          })),
        );

        await supabase.from('player_scores').insert(scoresToInsert);
      }

      router.push(`/room/${room.code}/game`);
    } finally {
      setIsStartingGame(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.roomCode}</p>

              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(room.code);

                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 1500);
                }}
                className="transition active:scale-95"
              >
                <h1 className="text-4xl font-bold text-[#FF7F5C]">{room.code}</h1>

                <p
                  className={`text-xs font-medium text-[#6BA368] transition-opacity ${
                    copied ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {t.copied}
                </p>
              </button>
            </div>

            <button
              onClick={() => setIsQrOpen(true)}
              className="rounded-2xl border border-gray-200 bg-[#F3F1EC] p-3 text-[#222222] shadow-sm transition hover:scale-105 active:scale-95"
            >
              <QrCode size={26} strokeWidth={2.5} />
            </button>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-[#222222]">{t.players}</h2>

            <div className="flex flex-col gap-3">
              {players.map((player) => (
                <div key={player.id} className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4">
                  <div className="flex flex-col">
                    <span className="text-[#222222]">{player.name}</span>

                    {player.id === currentPlayer?.id && <span className="text-xs text-gray-400">{t.you}</span>}
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        player.is_ready ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'
                      }`}
                    >
                      {player.is_ready ? t.ready : t.notReady}
                    </div>

                    {player.is_admin && <span className="text-sm text-[#FF7F5C]">{t.admin}</span>}

                    {currentPlayer?.is_admin && player.id !== currentPlayer.id && (
                      <button
                        onClick={() => kickPlayer(player)}
                        className="rounded-xl bg-red-50 p-2 text-red-500 transition active:scale-95"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {!allPlayersReady && (
  <button
    onClick={toggleReady}
    disabled={currentPlayer?.is_ready}
    className={`w-full rounded-2xl py-4 text-lg font-semibold text-white shadow-sm transition active:scale-95 ${
      currentPlayer?.is_ready
        ? 'cursor-default bg-[#6BA368]'
        : 'bg-[#FF7F5C] hover:brightness-95'
    }`}
  >
    {currentPlayer?.is_ready ? `✅ ${t.readyConfirmed}` : t.markReady}
  </button>
)}

            {currentPlayer?.is_admin && (
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="mt-3 mb-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-4 text-lg font-semibold text-[#222222] shadow-sm transition active:scale-95"
              >
                <Settings size={20} />

                {t.settings}
              </button>
            )}

            {allPlayersReady && currentPlayer?.is_admin && (
              <button
                onClick={startGame}
                disabled={isStartingGame}
                className="w-full rounded-2xl bg-[#FF7F5C] py-4 text-lg font-semibold text-white shadow-sm transition hover:brightness-95 active:scale-95 disabled:opacity-60"
              >
                <span className="flex items-center justify-center gap-2">
                  {isStartingGame && <LoadingSpinner size="sm" />}
                  {isStartingGame ? t.startingGame : t.start}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <QrCodeModal
        language={language as 'en' | 'pt' | 'fr'}
        roomCode={room.code}
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

      <SettingsModal
        language={language as 'en' | 'pt' | 'fr'}
        isOpen={isSettingsOpen}
        duration={gameDuration}
        categories={enabledCategories}
        isSaving={isSavingSettings}
        onClose={() => setIsSettingsOpen(false)}
        onDurationChange={setGameDuration}
        onToggleCategory={toggleCategory}
        onSave={saveSettings}
        error={settingsError}
      />
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { RoomForm } from '@/components/forms/RoomForm';
import { LanguageSelector } from '@/components/home/LanguageSelector';

import { supabase } from '@/lib/supabase';
import { savePlayerId } from '@/lib/storage';

import { getLanguage, saveLanguage } from '@/lib/language';

import { translations } from '@/i18n/translations';
import { Language } from '@/types/language';

export default function JoinPage() {
  const router = useRouter();

  const [roomCode, setRoomCode] = useState('');

  const [username, setUsername] = useState('');

  const [error, setError] = useState('');

  const [language, setLanguage] = useState<Language>('en');

  const [isRoomCodeLocked, setIsRoomCodeLocked] = useState(false);

  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    setLanguage(getLanguage());

    const params = new URLSearchParams(window.location.search);

    const roomFromUrl = params.get('room');

    if (roomFromUrl) {
      setRoomCode(roomFromUrl);

      setIsRoomCodeLocked(true);
    }
  }, []);

  const t = translations[language];

  async function handleJoinRoom() {
    if (isJoining) return;

    setError('');
    setIsJoining(true);

    try {
      const { data: room } = await supabase.from('rooms').select('*').eq('code', roomCode.toUpperCase()).single();

      if (!room) {
        setError(t.roomNotFound);
        return;
      }

      const { data: blockedPlayer } = await supabase
        .from('room_blocklist')
        .select('*')
        .eq('room_id', room.id)
        .eq('player_name', username)
        .maybeSingle();

      if (blockedPlayer) {
        setError(t.notAllowed);
        return;
      }

      const { data: existingPlayer } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', room.id)
        .eq('name', username)
        .maybeSingle();

      if (existingPlayer) {
        setError(t.usernameTaken);
        return;
      }

      const { data: player } = await supabase
        .from('players')
        .insert({
          room_id: room.id,
          name: username,
          is_admin: false,
        })
        .select()
        .single();

      savePlayerId(player.id);

      router.push(`/room/${room.code}`);
    } finally {
      setIsJoining(false);
    }
  }
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <div className="absolute top-6 flex w-full justify-end px-6">
        <LanguageSelector
          selectedLanguage={language}
          onSelect={(lang) => {
            setLanguage(lang);
            saveLanguage(lang);
          }}
        />
      </div>

      <RoomForm
        title={t.joinRoom}
        showRoomCode
        isRoomCodeLocked={isRoomCodeLocked}
        usernamePlaceholder={t.username}
        roomCodePlaceholder={t.roomCode}
        continueText={t.continue}
        username={username}
        roomCode={roomCode}
        isLoading={isJoining}
        loadingText={t.joiningRoom}
        onUsernameChange={setUsername}
        onRoomCodeChange={setRoomCode}
        onSubmit={handleJoinRoom}
        error={error}
      />
    </main>
  );
}

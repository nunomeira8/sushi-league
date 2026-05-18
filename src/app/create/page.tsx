'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { RoomForm } from '@/components/forms/RoomForm';
import { LanguageSelector } from '@/components/home/LanguageSelector';

import { generateRoomCode } from '@/lib/generateRoomCode';
import { supabase } from '@/lib/supabase';
import { savePlayerId } from '@/lib/storage';
import { getLanguage, saveLanguage } from '@/lib/language';

import { translations } from '@/i18n/translations';
import { Language } from '@/types/language';

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function CreatePage() {
  const router = useRouter();

  const [username, setUsername] = useState('');

  const [language, setLanguage] = useState<Language>('en');

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const t = translations[language];

  async function handleCreateRoom() {
    if (isCreating) return;

    setIsCreating(true);

    try {
      const roomCode = generateRoomCode();

      const { data: room } = await supabase
        .from('rooms')
        .insert({
          code: roomCode,
          name: `${username}'s room`,
          duration: 60,
        })
        .select()
        .single();

      const { data: player } = await supabase
        .from('players')
        .insert({
          room_id: room.id,
          name: username,
          is_admin: true,
        })
        .select()
        .single();

      savePlayerId(player.id);

      router.push(`/room/${roomCode}`);
    } finally {
      setIsCreating(false);
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
        title={t.createRoom}
        usernamePlaceholder={t.username}
        roomCodePlaceholder=""
        continueText={t.continue}
        username={username}
        roomCode=""
        isLoading={isCreating}
        loadingText={t.creatingRoom}
        onUsernameChange={setUsername}
        onRoomCodeChange={() => {}}
        onSubmit={handleCreateRoom}
      />
    </main>
  );
}

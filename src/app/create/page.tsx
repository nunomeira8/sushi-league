'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { RoomForm } from '@/components/forms/RoomForm';

import { generateRoomCode } from '@/lib/generateRoomCode';
import { supabase } from '@/lib/supabase';
import { savePlayerId } from '@/lib/storage';

export default function CreatePage() {
  const router = useRouter();

  const [username, setUsername] = useState('');

  async function handleCreateRoom() {
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
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <RoomForm
        title="Create Room"
        usernamePlaceholder="Username"
        roomCodePlaceholder=""
        continueText="Continue"
        username={username}
        roomCode=""
        onUsernameChange={setUsername}
        onRoomCodeChange={() => { }}
        onSubmit={handleCreateRoom}
      />
    </main>
  );
}

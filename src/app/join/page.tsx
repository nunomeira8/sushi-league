'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { RoomForm } from '@/components/forms/RoomForm';

import { supabase } from '@/lib/supabase';
import { savePlayerId } from '@/lib/storage';

import { useEffect } from 'react';

export default function JoinPage() {
  const router = useRouter();

  const [roomCode, setRoomCode] = useState('');

  const [username, setUsername] = useState('');

  const [error, setError] = useState('');

  async function handleJoinRoom() {
    setError('');

    const { data: room } = await supabase.from('rooms').select('*').eq('code', roomCode.toUpperCase()).single();

    if (!room) {
      setError('Room not found');
      return;
    }

    const { data: blockedPlayer } = await supabase
      .from("room_blocklist")
      .select("*")
      .eq("room_id", room.id)
      .eq("player_name", username)
      .maybeSingle();

    if (blockedPlayer) {
      setError("Not allowed to join this room");
      return;
    }

    const { data: existingPlayer } = await supabase
      .from('players')
      .select('*')
      .eq('room_id', room.id)
      .eq('name', username)
      .maybeSingle();

    if (existingPlayer) {
      setError('Username already taken');
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
  }

  const [isRoomCodeLocked, setIsRoomCodeLocked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const roomFromUrl = params.get('room');

    if (roomFromUrl) {
      setRoomCode(roomFromUrl);
      setIsRoomCodeLocked(true);
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <RoomForm
        title="Join Room"
        showRoomCode
        isRoomCodeLocked={isRoomCodeLocked}
        usernamePlaceholder="Username"
        roomCodePlaceholder="Room code"
        continueText="Continue"
        username={username}
        roomCode={roomCode}
        onUsernameChange={setUsername}
        onRoomCodeChange={setRoomCode}
        onSubmit={handleJoinRoom}
        error={error}
      />
    </main>
  );
}

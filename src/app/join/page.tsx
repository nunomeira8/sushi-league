'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { RoomForm } from '@/components/forms/RoomForm'

import { supabase } from '@/lib/supabase'

export default function JoinPage() {
  const router = useRouter()

  const [roomCode, setRoomCode] =
    useState('')

  const [username, setUsername] =
    useState('')

  const [error, setError] =
    useState('')

  async function handleJoinRoom() {
    setError('')

    const { data: room } = await supabase
      .from('rooms')
      .select('*')
      .eq('code', roomCode.toUpperCase())
      .single()

    if (!room) {
      setError('Room not found')
      return
    }

    const { data: existingPlayer } =
      await supabase
        .from('players')
        .select('*')
        .eq('room_id', room.id)
        .eq('name', username)
        .single()

    if (existingPlayer) {
      setError('Username already taken')
      return
    }

    await supabase.from('players').insert({
      room_id: room.id,
      name: username,
      is_admin: false,
    })

    router.push(`/room/${room.code}`)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <RoomForm
        title="Join Room"
        showRoomCode
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
  )
}
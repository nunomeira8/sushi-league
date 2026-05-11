"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

type Player = {
  id: string;
  name: string;
  is_admin: boolean;
};

type Room = {
  id: string;
  code: string;
};

export default function RoomPage() {
  const params = useParams();

  const code = params.code as string;

  const [room, setRoom] = useState<Room | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);

  async function fetchRoomData() {
    const { data: roomData } = await supabase
      .from("rooms")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (!roomData) return;

    setRoom(roomData);

    const { data: playersData } = await supabase
      .from("players")
      .select("*")
      .eq("room_id", roomData.id);

    setPlayers(playersData || []);
  }

  useEffect(() => {
    let mounted = true;

    async function initializeRoom() {
      if (!mounted) return;

      await fetchRoomData();
    }

    initializeRoom();

    const interval = setInterval(() => {
      initializeRoom();
    }, 3000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!room) {
    return null;
  }

  const admin = players.find((player) => player.is_admin);

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="mb-6">
            <p className="text-sm text-gray-500">Room Code</p>

            <h1 className="text-4xl font-bold text-[#FF7F5C]">{room.code}</h1>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-[#222222]">
              Players
            </h2>

            <div className="flex flex-col gap-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    bg-[#FAF7F2]
                    p-4
                  "
                >
                  <span className="text-[#222222]">{player.name}</span>

                  {player.is_admin && (
                    <span className="text-sm text-[#FF7F5C]">Admin</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {admin && (
            <button
              className="
                mt-6
                w-full
                rounded-2xl
                bg-[#FF7F5C]
                py-4
                text-lg
                font-semibold
                text-white
              "
            >
              Start
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

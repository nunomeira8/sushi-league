"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { translations } from "@/i18n/translations";
import { getPlayerId, removePlayerId } from "@/lib/storage";

import { Player } from "@/types/player";
import { Room } from "@/types/room";
import { QrCodeModal } from "../QrCodeModal";
import { QrCode, Trash2 } from "lucide-react";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();

  const language = "en";
  const t = translations[language];

  const code = params.code as string;

  const [room, setRoom] = useState<Room | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const [isQrOpen, setIsQrOpen] = useState(false);

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
      .channel("room-players")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
        },
        () => {
          fetchRoomData();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!currentPlayer) return;

    const stillExists = players.find(
      (player) => player.id === currentPlayer.id,
    );

    if (!stillExists) {
      removePlayerId();

      alert(t.kicked);

      router.push("/");
    }
  }, [players]);

  if (!room) {
    return null;
  }

  async function kickPlayer(player: Player) {
    if (!room) return;

    await supabase.from("room_blocklist").insert({
      room_id: room.id,
      player_name: player.name,
    });

    await supabase.from("players").delete().eq("id", player.id);
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Room Code</p>

              <h1 className="text-4xl font-bold text-[#FF7F5C]">{room.code}</h1>
            </div>

            {currentPlayer?.is_admin && (
              <button
                onClick={() => setIsQrOpen(true)}
                className="
  rounded-2xl
  border
  border-gray-200
  bg-[#F3F1EC]
  p-3
  text-[#222222]
  shadow-sm
  transition
  hover:scale-105
  active:scale-95
      "
              >
                <QrCode size={26} strokeWidth={2.5} />
              </button>
            )}
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
                  <div className="flex flex-col">
                    <span className="text-[#222222]">{player.name}</span>

                    {player.id === currentPlayer?.id && (
                      <span className="text-xs text-gray-400">{t.you}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {player.is_admin && (
                      <span className="text-sm text-[#FF7F5C]">{t.admin}</span>
                    )}

                    {currentPlayer?.is_admin &&
                      player.id !== currentPlayer.id && (
                        <button
                          onClick={() => kickPlayer(player)}
                          className="
          rounded-xl
          bg-red-50
          p-2
          text-red-500
          transition
          active:scale-95
        "
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentPlayer?.is_admin && (
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
      <QrCodeModal
        roomCode={room.code}
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />
    </main>
  );
}

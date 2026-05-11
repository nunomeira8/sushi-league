"use client";

type Props = {
  title: string;
  showRoomCode?: boolean;
  usernamePlaceholder: string;
  roomCodePlaceholder: string;
  continueText: string;

  username: string;
  roomCode: string;

  onUsernameChange: (value: string) => void;
  onRoomCodeChange: (value: string) => void;
  onSubmit: () => void;

  error?: string;
};

export function RoomForm({
  title,
  showRoomCode = false,
  usernamePlaceholder,
  roomCodePlaceholder,
  continueText,
  username,
  roomCode,
  onUsernameChange,
  onRoomCodeChange,
  onSubmit,
  error,
}: Props) {
  return (
    <div className="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <h2 className="mb-6 text-center text-3xl font-bold text-[#222222]">
        {title}
      </h2>

      <div className="flex flex-col gap-4">
        {showRoomCode && (
          <input
            value={roomCode}
            onChange={(e) => onRoomCodeChange(e.target.value)}
            placeholder={roomCodePlaceholder}
            className="
    rounded-2xl
    border
    border-gray-200
    bg-white
    p-4
    text-[#222222]
    placeholder:text-gray-400
    outline-none
  "
          />
        )}

        <input
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder={usernamePlaceholder}
          className="
    rounded-2xl
    border
    border-gray-200
    bg-white
    p-4
    text-[#222222]
    placeholder:text-gray-400
    outline-none
  "
        />

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <button
          onClick={onSubmit}
          className="
            rounded-2xl
            bg-[#FF7F5C]
            py-4
            text-lg
            font-semibold
            text-white
            active:scale-95
          "
        >
          {continueText}
        </button>
      </div>
    </div>
  );
}

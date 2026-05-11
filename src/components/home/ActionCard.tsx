import Link from "next/link";

type Props = {
  createRoomText: string;
  joinRoomText: string;
};

export function ActionCard({ createRoomText, joinRoomText }: Props) {
  return (
    <div className="mt-8 w-full max-w-sm rounded-[32px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col gap-4">
        <Link href="/create" className="w-full">
          <button
            className="
        w-full
        rounded-2xl
        bg-[#FF7F5C]
        px-5
        py-4
        text-lg
        font-semibold
        text-white
        shadow-md
        transition
        active:scale-95
      "
          >
            {createRoomText}
          </button>
        </Link>

        <Link href="/join" className="w-full">
          <button
            className="
        w-full
        rounded-2xl
        border-2
        border-[#6BA368]
        bg-white
        px-5
        py-4
        text-lg
        font-semibold
        text-[#5D8F5A]
        transition
        active:scale-95
      "
          >
            {joinRoomText}
          </button>
        </Link>
      </div>
    </div>
  );
}

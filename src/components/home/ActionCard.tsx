import Link from 'next/link';
import { LogIn, Plus } from 'lucide-react';

type Props = {
  createRoomText: string;
  joinRoomText: string;
};

export function ActionCard({ createRoomText, joinRoomText }: Props) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Link
        href="/create"
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#FF7F5C] px-4 py-3 text-base font-semibold text-white shadow-[0_5px_14px_rgba(255,127,92,0.24)] transition hover:bg-[#F26F4C] active:scale-[0.98]"
      >
        <Plus size={20} strokeWidth={2.5} aria-hidden="true" />
        {createRoomText}
      </Link>

      <Link
        href="/join"
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-lg border-2 border-[#6BA368] bg-white px-4 py-3 text-base font-semibold text-[#5D8F5A] shadow-sm transition hover:bg-[#F4F8F3] active:scale-[0.98]"
      >
        <LogIn size={19} strokeWidth={2.5} aria-hidden="true" />
        {joinRoomText}
      </Link>
    </div>
  );
}

'use client';

import { Minus, Plus } from 'lucide-react';

type Props = {
  name: string;

  value: number;

  onIncrease: () => void;

  onDecrease: () => void;
};

export function CategoryCounter({ name, value, onIncrease, onDecrease }: Props) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Category</p>

          <h2 className="text-2xl font-bold text-[#222222]">{name}</h2>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-400">Pieces</p>

          <p className="text-5xl font-bold text-[#FF7F5C]">{value}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={onDecrease}
          className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-[#FAF7F2] active:scale-95"
        >
          <Minus size={26} className="text-[#FF7F5C]" />
        </button>

        <button
          onClick={onIncrease}
          className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-[#FF7F5C] active:scale-95"
        >
          <Plus size={26} className="text-white" />
        </button>
      </div>
    </div>
  );
}

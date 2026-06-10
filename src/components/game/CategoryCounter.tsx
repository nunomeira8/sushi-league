'use client';

import { Info, Minus, Plus } from 'lucide-react';

type Props = {
  name: string;

  value: number;

  description: string;

  isTooltipOpen: boolean;

  onIncrease: () => void;

  onDecrease: () => void;

  onToggleTooltip: () => void;
};

export function CategoryCounter({
  name,
  value,
  description,
  isTooltipOpen,
  onIncrease,
  onDecrease,
  onToggleTooltip,
}: Props) {
  return (
    <div className="relative rounded-lg bg-white p-4 shadow-[0_3px_14px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="truncate text-xl font-bold text-[#222222]">{name}</h2>
          <button
            type="button"
            onClick={onToggleTooltip}
            aria-label={`${name}: ${description}`}
            aria-expanded={isTooltipOpen}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-[#FAF7F2] hover:text-[#FF7F5C] active:scale-95"
          >
            <Info size={17} strokeWidth={2.25} aria-hidden="true" />
          </button>
        </div>
        <p className="min-w-14 text-right text-4xl leading-none font-bold text-[#FF7F5C]">{value}</p>
      </div>

      {isTooltipOpen && (
        <div
          role="tooltip"
          className="absolute top-13 right-4 left-4 z-10 rounded-lg border border-[#FFD8CC] bg-[#FFF9F6] px-3 py-2.5 text-sm leading-relaxed text-[#5F554F] shadow-lg"
        >
          {description}
        </div>
      )}

      <div className="mt-4 grid grid-cols-[52px_1fr] gap-3">
        <button
          onClick={onDecrease}
          aria-label={`Decrease ${name}`}
          className="flex h-12 items-center justify-center rounded-lg bg-[#FAF7F2] text-[#FF7F5C] transition active:scale-95"
        >
          <Minus size={23} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <button
          onClick={onIncrease}
          aria-label={`Increase ${name}`}
          className="flex h-12 items-center justify-center rounded-lg bg-[#FF7F5C] text-white shadow-sm transition active:scale-[0.98]"
        >
          <Plus size={25} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

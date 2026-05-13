'use client';

import { Minus, Plus } from 'lucide-react';

import { translations } from '@/i18n/translations';

type Props = {
  language: 'en' | 'pt' | 'fr';

  isOpen: boolean;

  duration: number;

  categories: string[];

  onClose: () => void;

  onDurationChange: (value: number) => void;

  onToggleCategory: (category: string) => void;

  onSave: () => void;

  error?: string;
};

const categoryKeys = ['starters', 'sushi', 'sashimi', 'temaki', 'hot_dishes'];

export function SettingsModal({
  language,
  isOpen,
  duration,
  categories,
  onDurationChange,
  onToggleCategory,
  onSave,
  error,
}: Props) {
  const t = translations[language];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-[32px] bg-white p-6 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-[#222222]">{t.settings}</h2>

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold text-gray-500">{t.gameDuration}</p>

          <div className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4">
            <button
              onClick={() => onDurationChange(Math.max(5, duration - 5))}
              className="rounded-xl bg-white p-2 shadow-sm"
            >
              <Minus className="text-[#FF7F5C]" size={20} />
            </button>

            <div className="text-center">
              <p className="text-3xl font-bold text-[#FF7F5C]">{duration}</p>

              <p className="text-sm text-gray-500">{t.minutes}</p>
            </div>

            <button onClick={() => onDurationChange(duration + 5)} className="rounded-xl bg-white p-2 shadow-sm">
              <Plus className="text-[#FF7F5C]" size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {categoryKeys.map((category) => {
            const enabled = categories.includes(category);

            return (
              <div key={category} className="rounded-2xl bg-[#FAF7F2] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#222222]">{t[category as keyof typeof t]}</p>

                    <p className="mt-1 text-sm text-gray-500">{t[`${category}Description` as keyof typeof t]}</p>
                  </div>

                  <button
                    onClick={() => onToggleCategory(category)}
                    className={`relative flex h-7 w-12 items-center rounded-full transition ${
                      enabled ? 'bg-[#6BA368]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute h-5 w-5 rounded-full bg-white transition-all ${
                        enabled ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {error && <p className="mt-4 text-center text-sm font-medium text-red-500">{error}</p>}
        <button onClick={onSave} className="mt-4 w-full rounded-2xl bg-[#FF7F5C] py-4 text-lg font-semibold text-white">
          {t.save}
        </button>
      </div>
    </div>
  );
}

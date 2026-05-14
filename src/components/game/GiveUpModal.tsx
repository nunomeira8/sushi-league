'use client';

import { translations } from '@/i18n/translations';

type Props = {
  language: 'en' | 'pt' | 'fr';

  isOpen: boolean;

  onClose: () => void;

  onConfirm: () => void;
};

export function GiveUpModal({ language, isOpen, onClose, onConfirm }: Props) {
  const t = translations[language];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-[32px] bg-white p-6 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-[#222222]">{t.giveUpTitle}</h2>

        <p className="mt-4 text-center leading-relaxed text-gray-500">{t.giveUpDescription}</p>

        <div className="mt-8 flex flex-col gap-3">
          <button onClick={onClose} className="w-full rounded-2xl bg-[#FF7F5C] py-4 text-lg font-semibold text-white">
            {t.keepEating}
          </button>

          <button
            onClick={onConfirm}
            className="mx-auto rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-500"
          >
            {t.yesGiveUp}
          </button>
        </div>
      </div>
    </div>
  );
}

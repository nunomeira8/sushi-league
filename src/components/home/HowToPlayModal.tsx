'use client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  t: any;
};

export function HowToPlayModal({ isOpen, onClose, t }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl"
      >
        <div className="overflow-y-auto px-6 pt-6 pb-4">
          <h1 className="text-center text-3xl font-bold text-[#222222]">{t.howToPlay}</h1>

          <div className="mt-8 flex flex-col gap-6 text-left">
            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">🍣 {t.goalTitle}</h2>

              <p className="mt-2 text-gray-600">{t.goalDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">👥 {t.joinRoomTitle}</h2>

              <p className="mt-2 text-gray-600">{t.joinRoomDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">⏱️ {t.chooseBattleTitle}</h2>

              <p className="mt-2 text-gray-600">{t.chooseBattleDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">✅ {t.readyTitle}</h2>

              <p className="mt-2 text-gray-600">{t.readyDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">🔥 {t.gameTitle}</h2>

              <p className="mt-2 text-gray-600">{t.gameDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">😵 {t.htp_giveUpTitle}</h2>

              <p className="mt-2 text-gray-600">{t.htp_giveUpDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">🏆 {t.winnerTitle}</h2>

              <p className="mt-2 text-gray-600">{t.winnerDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">⏳ {t.tiebreakerTitle}</h2>

              <p className="mt-2 text-gray-600">{t.tiebreakerDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#FF7F5C]">🧾 {t.exportTitle}</h2>

              <p className="mt-2 text-gray-600">{t.exportDescription}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-white p-5">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-[#FF7F5C] py-4 text-lg font-semibold text-white shadow-md transition active:scale-95"
          >
            {t.howToPlayButton}
          </button>
        </div>
      </div>
    </div>
  );
}

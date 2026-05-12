'use client';

import QRCode from 'react-qr-code';

type Props = {
  roomCode: string;
  isOpen: boolean;
  onClose: () => void;
};

export function QrCodeModal({ roomCode, isOpen, onClose }: Props) {
  if (!isOpen) {
    return null;
  }

  const joinUrl = `${window.location.origin}/join?room=${roomCode}`;

  return (
    <button onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
      <div className="flex flex-col items-center rounded-[32px] bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-[#222222]">Invite your friends!</h2>

        <div className="rounded-2xl bg-white p-4">
          <QRCode value={joinUrl} size={240} />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">Scan to join instantly</p>

        <p className="mt-2 text-center text-xs break-all text-gray-400">{joinUrl}</p>
      </div>
    </button>
  );
}

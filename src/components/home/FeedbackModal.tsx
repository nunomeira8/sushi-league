'use client';

import { useState } from 'react';

import { supabase } from '@/lib/supabase';

type FeedbackType = 'feedback' | 'bug' | 'suggestion' | 'support';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  t: any;
  language: 'en' | 'pt' | 'fr';
  version: string;
};

const feedbackTypes: FeedbackType[] = ['feedback', 'bug', 'suggestion', 'support'];

export function FeedbackModal({ isOpen, onClose, t, language, version }: Props) {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<FeedbackType>('feedback');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) {
    return null;
  }

  const placeholder = t[`feedbackPlaceholder_${type}`] || t.feedbackMessagePlaceholder;

  function resetAndClose() {
    setName('');
    setRoomCode('');
    setMessage('');
    setType('feedback');
    setError('');
    setIsSuccess(false);
    setIsSending(false);
    onClose();
  }

  async function handleSubmit() {
    if (!message.trim()) {
      setError(t.feedbackMessageRequired);
      return;
    }

    setError('');
    setIsSending(true);

    const metadata = {
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      version,
    };

    const { error: submitError } = await supabase.from('feedback').insert({
      name: name.trim() || null,
      room_code: roomCode.trim().toUpperCase() || null,
      language,
      type,
      message: message.trim(),
      metadata,
    });

    setIsSending(false);

    if (submitError) {
      setError(submitError.message);
      return;
    }

    setIsSuccess(true);

    setTimeout(() => {
      resetAndClose();
    }, 2000);
  }

  return (
    <div onClick={resetAndClose} className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-6">
      <div className="flex min-h-full items-center justify-center">
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl"
        >
          <div className="overflow-y-auto px-6 pt-6 pb-4">
            {isSuccess ? (
              <div className="py-10 text-center">
                <h2 className="text-3xl font-bold text-[#222222]">{t.feedbackSuccessTitle}</h2>

                <p className="mt-4 leading-relaxed text-gray-500">{t.feedbackSuccessMessage}</p>
              </div>
            ) : (
              <>
                <h2 className="text-center text-3xl font-bold text-[#222222]">{t.feedbackTitle}</h2>

                <p className="mt-3 text-center text-sm leading-relaxed text-gray-500">{t.feedbackSubtitle}</p>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {feedbackTypes.map((feedbackType) => {
                    const isSelected = feedbackType === type;

                    return (
                      <button
                        key={feedbackType}
                        onClick={() => {
                          setType(feedbackType);
                          setError('');
                        }}
                        className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition active:scale-95 ${
                          isSelected
                            ? 'border-[#FF7F5C] bg-[#FF7F5C] text-white'
                            : 'border-gray-200 bg-white text-[#222222]'
                        }`}
                      >
                        {t[`feedbackType${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}`]}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={t.feedbackNamePlaceholder}
                    className="rounded-2xl border border-gray-200 bg-white p-4 text-[#222222] outline-none placeholder:text-gray-400"
                  />

                  <input
                    value={roomCode}
                    onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
                    placeholder={t.feedbackRoomCodePlaceholder}
                    className="rounded-2xl border border-gray-200 bg-white p-4 text-[#222222] outline-none placeholder:text-gray-400"
                  />

                  <textarea
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      setError('');
                    }}
                    placeholder={placeholder}
                    rows={5}
                    className="resize-none rounded-2xl border border-gray-200 bg-white p-4 text-[#222222] outline-none placeholder:text-gray-400"
                  />

                  {error && <p className="text-center text-sm font-medium text-red-500">{error}</p>}
                </div>
              </>
            )}
          </div>

          {!isSuccess && (
            <div className="border-t border-gray-100 bg-white p-5">
              <button
                onClick={handleSubmit}
                disabled={isSending}
                className="w-full rounded-2xl bg-[#FF7F5C] py-4 text-lg font-semibold text-white shadow-md transition active:scale-95 disabled:opacity-60"
              >
                {isSending ? '...' : t.feedbackSend}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

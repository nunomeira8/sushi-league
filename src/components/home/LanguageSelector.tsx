'use client';

import { Language } from '@/types/language';

type Props = {
  selectedLanguage: Language;
  onSelect: (language: Language) => void;
};

const languages = [
  {
    code: 'en',
    label: '🇬🇧 EN',
  },
  {
    code: 'pt',
    label: '🇵🇹 PT',
  },
  {
    code: 'fr',
    label: '🇫🇷 FR',
  },
] as const;

export function LanguageSelector({ selectedLanguage, onSelect }: Props) {
  return (
    <div className="absolute top-4 right-4 flex gap-2">
      {languages.map((language) => {
        const isSelected = selectedLanguage === language.code;

        return (
          <button
            key={language.code}
            onClick={() => onSelect(language.code)}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition active:scale-95 ${
              isSelected ? 'bg-[#FF7F5C] text-white' : 'bg-white text-gray-700'
            } `}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}

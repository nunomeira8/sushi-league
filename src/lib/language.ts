import { Language } from '@/types/language';

const LANGUAGE_KEY =
    'sushi-language';

export function saveLanguage(
    language: Language
) {
    localStorage.setItem(
        LANGUAGE_KEY,
        language
    );
}

export function getLanguage(): Language {
    const language =
        localStorage.getItem(
            LANGUAGE_KEY
        );

    if (
        language === 'pt' ||
        language === 'fr'
    ) {
        return language;
    }

    return 'en';
}
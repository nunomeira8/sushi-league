import { Language } from '@/types/language'

export const translations = {
  en: {
    welcome: 'Ready to roll?',
    createRoom: 'Create Room',
    joinRoom: 'Join Room',
  },

  pt: {
    welcome: 'Preparado para a batalha?',
    createRoom: 'Criar Sala',
    joinRoom: 'Entrar na Sala',
  },

  fr: {
    welcome: 'À toi de jouer!',
    createRoom: 'Créer une Salle',
    joinRoom: 'Rejoindre une Salle',
  },
} satisfies Record<Language, Record<string, string>>
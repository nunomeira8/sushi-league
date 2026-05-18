import { Language } from '@/types/language'

export const translations = {
  en: {
    welcome: 'Ready to roll?',
    createRoom: 'Create Room',
    joinRoom: 'Join Room',
    roomCode: 'Room Code',
    username: 'Username',
    enterRoomCode: 'Enter room code',
    start: 'Start',
    players: 'Players',
    createRoomTitle: 'Create a Room',
    joinRoomTitle: 'Join a Room',
    continue: 'Continue',
    roomNotFound: 'Room not found',
    usernameTaken: 'Username already taken',
    kicked: 'You were removed from the room',
    notAllowed: 'Not allowed to join this room',
    inviteFriends:
      'Invite your friends!',
    scanToJoin:
      'Scan to join instantly',
    admin: 'Admin',
    you: 'You',
    ready: 'Ready',
    notReady: 'Not Ready',
    waitingPlayers: 'Waiting for players...',
    settings: 'Settings',
    save: 'Save',
    gameDuration: 'Game Duration',
    minutes: 'minutes',
    starters: 'Starters',
    startersDescription:
      'Crepes, tempura or more',
    sushi: 'Sushi',
    sushiDescription:
      'Any sushi piece',
    sashimi: 'Sashimi',
    sashimiDescription:
      'Any type of sashimi',
    temaki: 'Temaki',
    temakiDescription:
      'Any type of temaki',
    hot_dishes: 'Hot Dishes',
    hot_dishesDescription:
      'Noodles, rice or others',
    gameStarting: 'Game starting!',
    prepareBattle:
      'Prepare to defeat your friends and become the Sushi League champion.',
    categoriesPlaying:
      'Categories in play',
    minutesLabel: 'minutes',
    imDone:
      'I surrender to the sushi 🍣',
    giveUp: 'I’m Done Eating',
    giveUpTitle:
      'Done eating already? 🍣',
    giveUpDescription:
      'Your score is safe! You’ll simply wait for the remaining players.',
    yesGiveUp:
      'Yes, I am done',
    keepEating:
      'No, I can still eat',
    waitingTitle:
      'The sushi battlefield continues...',
    stillEating:
      'Still eating',
    finishedEating:
      'Already surrendered',
    finishedTitle:
      'The sushi battle is over',
    winnerReveal:
      'Prepare yourselves for the best part... let’s discover the winner.',
    survivedFor:
      'Survived for',
    survivedEntireTime:
      'Survived the entire battle',
    resultsIn: 'Results in',
    howToPlay: 'How to Play',
    howToPlayButton: "OK... I'm hungry 🍣",
    goalTitle: 'Goal',
    goalDescription:
      'Eat sushi, count what you eat and try to finish with the highest score.',
    joinRoomDescription:
      'Create a room or join one using a room code or QR Code. Pick your name and join your friends.',
    chooseBattleTitle: 'Game Settings',
    chooseBattleDescription:
      'The admin chooses the game duration and which categories will count.',
    readyTitle: 'Get Ready',
    readyDescription:
      'Every player must press READY before the battle begins.',
    gameTitle: 'Time to Eat 🍣',
    gameDescription:
      'During the game, use the counters to track what you eat in each category.',
    htp_giveUpTitle: 'When You Can’t Eat Anymore',
    htp_giveUpDescription:
      'Finished before time runs out? Mark yourself as done and wait for the other players.',
    winnerTitle: 'Results',
    winnerDescription:
      'At the end, category winners are revealed… and finally the Sushi League Champion.',
    calculatingWinners: 'Calculating winners...',
  },

  pt: {
    welcome: 'Preparado para a batalha?',
    createRoom: 'Criar Sala',
    joinRoom: 'Entrar na Sala',
    roomCode: 'Código da Sala',
    username: 'Nome de utilizador',
    enterRoomCode: 'Inserir código da sala',
    start: 'Começar',
    players: 'Jogadores',
    createRoomTitle: 'Criar Sala',
    joinRoomTitle: 'Entrar na Sala',
    continue: 'Continuar',
    roomNotFound: 'Sala não encontrada',
    usernameTaken: 'Nome já está em uso',
    kicked: 'Foste removido da sala',
    notAllowed: 'Não tens permissão para entrar nesta sala',
    inviteFriends:
      'Convida os teus amigos!',
    scanToJoin:
      'Faz scan para entrar',
    admin: 'Admin',
    you: 'Tu',
    ready: 'Pronto',
    notReady: 'Não Pronto',
    waitingPlayers: 'À espera dos jogadores...',
    settings: 'Definições',
    save: 'Guardar',
    gameDuration: 'Duração do Jogo',
    minutes: 'minutos',
    starters: 'Entradas',
    startersDescription:
      'Crepes, tempura e mais',
    sushi: 'Sushi',
    sushiDescription:
      'Qualquer peça de sushi',
    sashimi: 'Sashimi',
    sashimiDescription:
      'Qualquer tipo de sashimi',
    temaki: 'Temaki',
    temakiDescription:
      'Qualquer tipo de temaki',
    hot_dishes: 'Pratos Quentes',
    hot_dishesDescription:
      'Noodles, arroz ou outros',
    gameStarting: 'O jogo vai começar!',
    prepareBattle:
      'Prepara-te para derrotar os teus amigos e tornares-te o campeão da Sushi League.',
    categoriesPlaying:
      'Categorias em jogo',
    minutesLabel: 'minutos',
    imDone:
      'Já não entra mais sushi 🍣',
    giveUp: 'Terminei de Comer',
    giveUpTitle:
      'Já não consegues comer mais? 🍣',
    giveUpDescription:
      'Os teus pontos ficam guardados! Vais apenas esperar pelos restantes jogadores.',
    yesGiveUp:
      'Sim, já chega',
    keepEating:
      'Não, ainda aguento',
    waitingTitle:
      'A batalha do sushi continua...',
    stillEating:
      'Ainda a comer',
    finishedEating:
      'Já desistiu',
    finishedTitle:
      'A batalha do sushi terminou',
    winnerReveal:
      'Preparem-se para a melhor parte... vamos descobrir o vencedor.',
    survivedFor:
      'Aguentou durante',
    survivedEntireTime:
      'Sobreviveu à batalha inteira',
    resultsIn: 'Resultados em',
    howToPlay: 'Como Jogar',
    howToPlayButton: 'OK... fiquei com fome 🍣',
    goalTitle: 'Objetivo',
    goalDescription:
      'Come sushi, conta as peças que comes e tenta terminar com a maior pontuação.',
    joinRoomDescription:
      'Cria uma sala ou entra numa existente com um código ou QR Code. Escolhe o teu nome e junta-te aos teus amigos.',
    chooseBattleTitle: 'Configurar o Jogo',
    chooseBattleDescription:
      'O admin escolhe o tempo da partida e as categorias que vão contar para a pontuação.',
    readyTitle: 'Preparar a Batalha',
    readyDescription:
      'Todos os jogadores têm de carregar em READY antes do jogo começar.',
    gameTitle: 'Hora de Comer 🍣',
    gameDescription:
      'Durante o tempo do jogo, usa os contadores para registar o que estás a comer em cada categoria.',
    htp_giveUpTitle: 'Quando Já Não Dá Mais',
    htp_giveUpDescription:
      'Terminaste antes do tempo? Podes marcar que acabaste e esperar pelos restantes jogadores.',
    winnerTitle: 'Os Resultados',
    winnerDescription:
      'No fim aparecem os vencedores de cada categoria e o campeão final da Sushi League.',
    calculatingWinners: 'A calcular os vencedores...',
  },

  fr: {
    welcome: 'À toi de jouer!',
    createRoom: 'Créer une Salle',
    joinRoom: 'Rejoindre une Salle',
    roomCode: 'Code de Salle',
    username: "Nom d'utilisateur",
    enterRoomCode: 'Entrer le code',
    start: 'Démarrer',
    players: 'Joueurs',
    createRoomTitle: 'Créer une Salle',
    joinRoomTitle: 'Rejoindre une Salle',
    continue: 'Continuer',
    roomNotFound: 'Salle introuvable',
    usernameTaken: 'Nom déjà utilisé',
    kicked: 'Vous avez été exclu de la salle',
    notAllowed: "Vous n'êtes pas autorisé à rejoindre cette salle",
    inviteFriends:
      'Invite tes amis !',
    scanToJoin:
      'Scanne pour rejoindre',
    admin: 'Admin',
    you: 'Vous',
    ready: 'Prêt',
    notReady: 'Pas Prêt',
    waitingPlayers: 'En attente des joueurs...',
    settings: 'Paramètres',
    save: 'Sauvegarder',
    gameDuration: 'Durée du Jeu',
    minutes: 'minutes',
    starters: 'Entrées',
    startersDescription:
      'Crêpes, tempura et plus',
    sushi: 'Sushi',
    sushiDescription:
      'Toutes les pièces de sushi',
    sashimi: 'Sashimi',
    sashimiDescription:
      'Tout type de sashimi',
    temaki: 'Temaki',
    temakiDescription:
      'Tout type de temaki',
    hot_dishes: 'Plats Chauds',
    hot_dishesDescription:
      'Nouilles, riz et plats chauds',
    gameStarting: 'Le jeu va commencer !',
    prepareBattle:
      'Prépare-toi à battre tes amis et devenir le champion de la Sushi League.',
    categoriesPlaying:
      'Catégories en jeu',
    minutesLabel: 'minutes',
    imDone:
      'Je ne peux plus manger 🍣',
    giveUp: 'J’ai Fini de Manger',
    giveUpTitle:
      'Tu n’en peux plus ? 🍣',
    giveUpDescription:
      'Ton score est sauvegardé ! Tu attendras simplement les autres joueurs.',
    yesGiveUp:
      'Oui, j’abandonne',
    keepEating:
      'Non, je continue',
    waitingTitle:
      'La bataille du sushi continue...',
    stillEating:
      'Encore en train de manger',
    finishedEating:
      'A déjà abandonné',
    finishedTitle:
      'La bataille du sushi est terminée',
    winnerReveal:
      'Préparez-vous pour le meilleur moment... découvrons le gagnant.',
    survivedFor:
      'A survécu pendant',
    survivedEntireTime:
      'A survécu à toute la bataille',
    resultsIn: 'Résultats dans',
    howToPlay: 'Comment Jouer',
    howToPlayButton: "OK... j'ai faim 🍣",
    goalDescription:
      'Mange des sushis, compte ce que tu manges et essaie d’obtenir le meilleur score.',
    joinRoomDescription:
      'Crée une salle ou rejoins-en une avec un code ou un QR Code. Choisis ton nom et rejoins tes amis.',

    chooseBattleTitle: 'Configurer la Partie',
    chooseBattleDescription:
      'L’admin choisit la durée du jeu et les catégories qui compteront.',

    readyTitle: 'Préparez-vous',
    readyDescription:
      'Tous les joueurs doivent appuyer sur READY avant le début de la bataille.',

    gameTitle: 'À Table 🍣',
    gameDescription:
      'Pendant le jeu, utilise les compteurs pour enregistrer ce que tu manges dans chaque catégorie.',

    htp_giveUpTitle: 'Quand Tu N’en Peux Plus',
    htp_giveUpDescription:
      'Tu as terminé avant la fin ? Indique que tu as fini et attends les autres joueurs.',

    winnerTitle: 'Résultats',
    winnerDescription:
      'À la fin, les gagnants de chaque catégorie sont révélés… puis le grand champion de Sushi League.',
    calculatingWinners:
      'Calcul des gagnants...',
  },
} satisfies Record<Language, Record<string, string>>
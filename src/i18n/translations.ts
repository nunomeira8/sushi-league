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
    giveUp: 'Give Up',
    giveUpTitle:
      'Are you really giving up?',
    giveUpDescription:
      'Your opponents are still fighting for sushi glory.',
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
      'Eat sushi. Beat your rivals. Regret nothing.',
    joinRoomDescription:
      'Create or join a room and pick your name.',
    chooseBattleTitle: 'Choose the Battle',
    chooseBattleDescription:
      'The admin chooses the game duration and categories in play.',
    readyTitle: 'Everyone Must Be Ready',
    readyDescription:
      'Nobody escapes. Everyone presses READY before the battle begins.',
    gameTitle: 'Battle Time',
    gameDescription:
      'Count your food with the counters, survive the timer and try not to vomit.',
    htp_giveUpTitle: 'Giving Up',
    htp_giveUpDescription:
      'You can surrender… but the sushi shame lasts forever.',
    winnerTitle: 'The Final Champion',
    winnerDescription:
      'At the end, each category winners appear and then… THE SUSHI LEAGUE CHAMPION.',
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
    giveUp: 'Desistir',
    giveUpTitle:
      'Queres mesmo desistir?',
    giveUpDescription:
      'Os teus adversários ainda estão na batalha pelo sushi.',
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
      'Comer sushi. Vencer os adversários. Arrepender-se depois.',
    joinRoomDescription:
      'Cria ou entra numa sala e escolhe o teu nome.',
    chooseBattleTitle: 'Escolher a Batalha',
    chooseBattleDescription:
      'O admin escolhe o tempo do jogo e as categorias. Tens medo de noodles? Desativa pratos quentes.',
    readyTitle: 'Todos Têm de Estar Prontos',
    readyDescription:
      'Ninguém foge. Toda a gente tem de carregar READY antes da batalha começar.',
    gameTitle: 'Hora da Batalha',
    gameDescription:
      'Conta a tua comida, usa os contadores e tenta não vomitar.',
    htp_giveUpTitle: 'Desistir',
    htp_giveUpDescription:
      'Podes desistir… mas a vergonha do sushi dura para sempre.',
    winnerTitle: 'O Grande Campeão',
    winnerDescription:
      'No final aparecem os vencedores por categoria e depois… O CAMPEÃO DA SUSHI LEAGUE.',
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
    giveUp: 'Abandonner',
    giveUpTitle:
      'Tu veux vraiment abandonner ?',
    giveUpDescription:
      'Tes adversaires continuent encore la bataille du sushi.',
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
    goalTitle: 'Objectif',
    goalDescription:
      'Manger des sushis. Battre ses adversaires. Regretter après.',
    joinRoomDescription:
      'Créez ou rejoignez une salle et choisissez votre nom.',
    chooseBattleTitle: 'Choisir la Bataille',
    chooseBattleDescription:
      "L’admin choisit la durée et les catégories du jeu.",
    readyTitle: 'Tout le Monde Doit Être Prêt',
    readyDescription:
      'Personne ne s’échappe. Tout le monde doit appuyer sur READY.',
    gameTitle: 'L’Heure du Combat',
    gameDescription:
      'Comptez votre nourriture, utilisez les compteurs et essayez de ne pas vomiter.',
    htp_giveUpTitle: 'Abandonner',
    htp_giveUpDescription:
      'Vous pouvez abandonner… mais la honte sushi dure pour toujours.',
    winnerTitle: 'Le Champion',
    winnerDescription:
      'À la fin, les gagnants des catégories apparaissent puis… LE CHAMPION DE LA SUSHI LEAGUE.',
    calculatingWinners:
      'Calcul des gagnants...',
  },
} satisfies Record<Language, Record<string, string>>
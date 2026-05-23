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
    creatingRoom: 'Creating room...',
    joinRoomTitle: 'Join a Room',
    joiningRoom: 'Joining room...',
    continue: 'Continue',
    roomNotFound: 'Room not found',
    usernameTaken: 'Username already taken',
    usernameRequired: 'Please add a name',
    usernameMinLength: 'Name must have at least 3 characters',
    kicked: 'You were removed from the room',
    notAllowed: 'Not allowed to join this room',
    inviteFriends:
      'Invite your friends!',
    scanToJoin:
      'Scan to join instantly',
    copied: 'Copied!',
    admin: 'Admin',
    you: 'You',
    ready: 'Ready',
    notReady: 'Not Ready',
    markReady: 'I’m Ready 🍣',
    readyConfirmed: 'Ready!',
    waitingPlayers: 'Waiting for players...',
    settings: 'Settings',
    save: 'Save',
    savingSettings: 'Saving settings...',
    startingGame: 'Starting game...',
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
    atLeastOneCategory: 'At least one category must be selected',
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
    finishingGame: 'Finishing...',
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
    //Feedback&Support
    feedbackSupport: 'Feedback & Support',
    feedbackTitle: 'Feedback / Support',
    feedbackSubtitle:
      'Help us make Sushi League better than your next sushi order 🍣',
    feedbackNamePlaceholder: 'Your name (optional)',
    feedbackRoomCodePlaceholder: 'Room code (optional)',
    feedbackMessagePlaceholder:
      'Tell us what happened, what you loved, hated, or what would make Sushi League even more fun...',
    feedbackTypeFeedback: '❤️ Feedback',
    feedbackTypeBug: '🐛 Bug Report',
    feedbackTypeSuggestion: '💡 Suggestion',
    feedbackTypeSupport: '🆘 Support',
    feedbackPlaceholder_feedback:
      'What did you enjoy? What could be improved?',
    feedbackPlaceholder_bug:
      'What happened? What did you expect to happen?',
    feedbackPlaceholder_suggestion:
      'What would make Sushi League even better?',
    feedbackPlaceholder_support:
      'Need help? Tell us what’s happening.',
    feedbackMessageRequired: 'Please write a message before sending.',
    feedbackSend: 'Send feedback 🍣',
    sendingFeedback: 'Sending feedback...',
    feedbackSuccessTitle: 'Thank you! ❤️',
    feedbackSuccessMessage:
      'Your feedback has been sent. You may have just improved Sushi League forever.',
    //Awards
    winner: 'Winner',
    noWinner: 'No one touched {category}. The sushi survived.',
    leaderboard: 'Leaderboard',
    finalRanking: 'Final Ranking',
    lastManStanding: 'Last Man Standing',
    points: 'pts',
    previousAward: 'Previous Award',
    nextAward: 'Next Award',
    awardsFinished: 'Awards Finished',
    exportResults: 'Export Results',
    exportResultsTitle: 'Game Results',
    playedOn: 'Played on',
    categoriesInPlay: 'Categories in play',
    playedBy: 'Played by',
    finalWinnerExport: 'Final Winner',
    categoryWinnersExport: 'Category Winners',
    copyResults: 'Copy',
    shareResults: 'Share',
    savePdf: 'PDF',
    shareUnavailable: 'Sharing is not available here. Results copied instead.',
    startersAwardTitle: 'Starters King',
    sushiAwardTitle: 'Sushi Monster',
    sashimiAwardTitle: 'Sashimi Beast',
    temakiAwardTitle: 'Temaki Destroyer',
    hotDishesAwardTitle: 'Hot Dish Warrior',
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
    creatingRoom: 'A criar sala...',
    joinRoomTitle: 'Entrar na Sala',
    joiningRoom: 'A entrar na sala...',
    continue: 'Continuar',
    roomNotFound: 'Sala não encontrada',
    usernameTaken: 'Nome já está em uso',
    usernameRequired: 'Por favor adiciona um nome',
    usernameMinLength: 'O nome tem de ter pelo menos 3 caracteres',
    kicked: 'Foste removido da sala',
    notAllowed: 'Não tens permissão para entrar nesta sala',
    inviteFriends:
      'Convida os teus amigos!',
    scanToJoin:
      'Faz scan para entrar',
    copied: 'Copiado!',
    admin: 'Admin',
    you: 'Tu',
    ready: 'Pronto',
    notReady: 'Não Pronto',
    markReady: 'Estou Pronto 🍣',
    readyConfirmed: 'Pronto!',
    waitingPlayers: 'À espera dos jogadores...',
    settings: 'Definições',
    save: 'Guardar',
    savingSettings: 'A guardar definições...',
    startingGame: 'A começar o jogo...',
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
    atLeastOneCategory: 'Pelo menos uma categoria deve ser selecionada',
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
    finishingGame: 'A terminar...',
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
    //Feedback&Support
    feedbackSupport: 'Feedback & Suporte',
    feedbackTitle: 'Feedback / Suporte',
    feedbackSubtitle:
      'Ajuda-nos a tornar a Sushi League melhor que o teu próximo pedido de sushi 🍣',
    feedbackNamePlaceholder: 'O teu nome (opcional)',
    feedbackRoomCodePlaceholder: 'Código da sala (opcional)',
    feedbackMessagePlaceholder:
      'Conta-nos o que aconteceu, o que gostaste, o que odiaste ou o que tornaria a Sushi League ainda mais divertida...',
    feedbackTypeFeedback: '❤️ Feedback',
    feedbackTypeBug: '🐛 Bug',
    feedbackTypeSuggestion: '💡 Sugestão',
    feedbackTypeSupport: '🆘 Ajuda',
    feedbackPlaceholder_feedback:
      'O que gostaste? O que podia ser melhorado?',
    feedbackPlaceholder_bug:
      'O que aconteceu? O que esperavas que acontecesse?',
    feedbackPlaceholder_suggestion:
      'O que tornaria a Sushi League ainda melhor?',
    feedbackPlaceholder_support:
      'Precisas de ajuda? Conta-nos o que se passa.',
    feedbackMessageRequired: 'Escreve uma mensagem antes de enviar.',
    feedbackSend: 'Enviar feedback 🍣',
    sendingFeedback: 'A enviar feedback...',
    feedbackSuccessTitle: 'Obrigado! ❤️',
    feedbackSuccessMessage:
      'O teu feedback foi enviado. Talvez tenhas acabado de melhorar a Sushi League para sempre.',
    //Awards
    winner: 'Vencedor',
    noWinner: 'Ninguem tocou em {category}. O sushi ganhou esta ronda.',
    leaderboard: 'Classificação',
    finalRanking: 'Classificação Final',
    lastManStanding: 'Campeão da Sushi League',
    points: 'pts',
    previousAward: 'Prémio Anterior',
    nextAward: 'Próximo Prémio',
    awardsFinished: 'Prémios Terminados',
    exportResults: 'Exportar Resultados',
    exportResultsTitle: 'Resultados do Jogo',
    playedOn: 'Jogado em',
    categoriesInPlay: 'Categorias em jogo',
    playedBy: 'Jogado por',
    finalWinnerExport: 'Vencedor Final',
    categoryWinnersExport: 'Vencedores por Categoria',
    copyResults: 'Copiar',
    shareResults: 'Partilhar',
    savePdf: 'PDF',
    shareUnavailable: 'A partilha não está disponível aqui. Os resultados foram copiados.',
    startersAwardTitle: 'Rei das Entradas',
    sushiAwardTitle: 'Monstro do Sushi',
    sashimiAwardTitle: 'Besta do Sashimi',
    temakiAwardTitle: 'Destruidor de Temakis',
    hotDishesAwardTitle: 'Guerreiro dos Pratos Quentes',
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
    creatingRoom: 'Création de la salle...',
    joinRoomTitle: 'Rejoindre une Salle',
    joiningRoom: 'Entrée dans la salle...',
    continue: 'Continuer',
    roomNotFound: 'Salle introuvable',
    usernameTaken: 'Nom déjà utilisé',
    usernameRequired: 'Ajoute un nom, s’il te plaît',
    usernameMinLength: 'Le nom doit avoir au moins 3 caractères',
    kicked: 'Vous avez été exclu de la salle',
    notAllowed: "Vous n'êtes pas autorisé à rejoindre cette salle",
    inviteFriends:
      'Invite tes amis !',
    scanToJoin:
      'Scanne pour rejoindre',
    copied: 'Copié !',
    admin: 'Admin',
    you: 'Vous',
    ready: 'Prêt',
    notReady: 'Pas Prêt',
    markReady: 'Je Suis Prêt 🍣',
    readyConfirmed: 'Prêt !',
    waitingPlayers: 'En attente des joueurs...',
    settings: 'Paramètres',
    save: 'Sauvegarder',
    savingSettings: 'Sauvegarde...',
    startingGame: 'Démarrage du jeu...',
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
    atLeastOneCategory: 'Au moins une catégorie doit être sélectionnée',
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
    finishingGame: 'Fin du jeu...',
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
    //Feedback&Support
    feedbackSupport: 'Feedback & Support',
    feedbackTitle: 'Feedback / Support',
    feedbackSubtitle:
      'Aide-nous à rendre Sushi League meilleure que ta prochaine commande de sushi 🍣',
    feedbackNamePlaceholder: 'Ton nom (optionnel)',
    feedbackRoomCodePlaceholder: 'Code de la salle (optionnel)',
    feedbackMessagePlaceholder:
      'Dis-nous ce qui s’est passé, ce que tu as aimé, détesté, ou ce qui rendrait Sushi League encore plus fun...',
    feedbackTypeFeedback: '❤️ Feedback',
    feedbackTypeBug: '🐛 Bug',
    feedbackTypeSuggestion: '💡 Suggestion',
    feedbackTypeSupport: '🆘 Aide',
    feedbackPlaceholder_feedback:
      'Qu’est-ce que tu as aimé ? Qu’est-ce qui pourrait être amélioré ?',
    feedbackPlaceholder_bug:
      'Que s’est-il passé ? Que pensais-tu qu’il allait se passer ?',
    feedbackPlaceholder_suggestion:
      'Qu’est-ce qui rendrait Sushi League encore meilleure ?',
    feedbackPlaceholder_support:
      'Besoin d’aide ? Dis-nous ce qui se passe.',
    feedbackMessageRequired: 'Écris un message avant d’envoyer.',
    feedbackSend: 'Envoyer le feedback 🍣',
    sendingFeedback: 'Envoi du feedback...',
    feedbackSuccessTitle: 'Merci ! ❤️',
    feedbackSuccessMessage:
      'Ton feedback a été envoyé. Tu viens peut-être d’améliorer Sushi League pour toujours.',
    // Awards
    winner: 'Gagnant',
    noWinner: "Personne n'a touche a {category}. Les sushis gagnent ce round.",
    leaderboard: 'Classement',
    finalRanking: 'Classement Final',
    lastManStanding: 'Champion de Sushi League',
    points: 'pts',
    previousAward: 'Prix Précédent',
    nextAward: 'Prix Suivant',
    awardsFinished: 'Prix Terminés',
    exportResults: 'Exporter les Résultats',
    exportResultsTitle: 'Résultats du Jeu',
    playedOn: 'Joué le',
    categoriesInPlay: 'Catégories en jeu',
    playedBy: 'Joué par',
    finalWinnerExport: 'Gagnant Final',
    categoryWinnersExport: 'Gagnants par Catégorie',
    copyResults: 'Copier',
    shareResults: 'Partager',
    savePdf: 'PDF',
    shareUnavailable: 'Le partage n’est pas disponible ici. Les résultats ont été copiés.',
    startersAwardTitle: 'Roi des Entrées',
    sushiAwardTitle: 'Monstre du Sushi',
    sashimiAwardTitle: 'Bête du Sashimi',
    temakiAwardTitle: 'Destructeur de Temakis',
    hotDishesAwardTitle: 'Guerrier des Plats Chauds',
  },
} satisfies Record<Language, Record<string, string>>

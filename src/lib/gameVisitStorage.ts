const GAME_VISIT_PREFIX = 'sushi-league-game-visited';

function getGameVisitKey(roomCode: string, playerId: string) {
  return `${GAME_VISIT_PREFIX}:${roomCode.toUpperCase()}:${playerId}`;
}

export function hasVisitedGame(roomCode: string, playerId: string) {
  try {
    return localStorage.getItem(getGameVisitKey(roomCode, playerId)) === 'true';
  } catch {
    return false;
  }
}

export function markGameAsVisited(roomCode: string, playerId: string) {
  try {
    localStorage.setItem(getGameVisitKey(roomCode, playerId), 'true');
  } catch {
    // The intro may repeat when browser storage is unavailable.
  }
}

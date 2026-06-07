export type PendingGameScores = {
  scores: Record<string, number>;
  dirtyCategories: string[];
};

const SCORE_STORAGE_PREFIX = 'sushi-league-pending-scores';

function getStorageKey(roomCode: string, playerId: string) {
  return `${SCORE_STORAGE_PREFIX}:${roomCode.toUpperCase()}:${playerId}`;
}

export function getPendingGameScores(roomCode: string, playerId: string): PendingGameScores | null {
  try {
    const value = localStorage.getItem(getStorageKey(roomCode, playerId));

    if (!value) return null;

    const parsed = JSON.parse(value) as Partial<PendingGameScores>;

    if (!parsed.scores || !Array.isArray(parsed.dirtyCategories)) {
      return null;
    }

    return {
      scores: parsed.scores,
      dirtyCategories: parsed.dirtyCategories,
    };
  } catch {
    return null;
  }
}

export function savePendingGameScores(roomCode: string, playerId: string, pendingScores: PendingGameScores) {
  try {
    localStorage.setItem(getStorageKey(roomCode, playerId), JSON.stringify(pendingScores));
  } catch {
    // Database sync remains available when browser storage is blocked.
  }
}

export function removePendingGameScores(roomCode: string, playerId: string) {
  try {
    localStorage.removeItem(getStorageKey(roomCode, playerId));
  } catch {
    // Nothing else to clean up when browser storage is blocked.
  }
}
